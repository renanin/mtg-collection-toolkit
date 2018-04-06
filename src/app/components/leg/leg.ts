import { Prop, Watch } from 'vue-property-decorator';
import { State, Mutation } from 'vuex-class';
import Component from 'vue-class-component';
import Vue from 'vue';
import request from 'request';
import AutocompleteResults from '../../classes/interfaces/autocompleteResults';
import BecomesCard from '../../classes/interfaces/becomesCard';
import Card from '../../classes/card';
import CardSearchResult from '../../classes/interfaces/cardSearchResult';
import Leg from '../../classes/leg';

@Component({})

/**
 * @class LegComponent
 * @classdesc A component for use on the add trades page which represents a single side of a trade
 * @extends Vue
 */
export default class LegComponent extends Vue {
  @State config;

  /**
   * The title to be displayed in the top toolbar
   * @name LegComponent#title
   * @type {string}
   */
  @Prop() title: string;

  /**
   * The leg
   * @name LegComponent#value
   * @type {Leg}
   */
  @Prop() value: Leg;

  /**
   * Whether this leg has the greater value or not
   * @name LegComponent#greater
   * @type {boolean}
   */
  @Prop() greater: boolean;

  @Mutation linkCardInfo;

  /**
   * A local copy of the leg being edited
   * @name LegComponent#leg
   * @type {Leg}
   * @private
   */
  private leg: Leg = new Leg();

  /**
   * The list of cards displayed and edited in the table
   * @name LegComponent#cards
   * @type {BecomesCard[]}
   * @private
   */
  private becomingCard: BecomesCard = {
    name: '',
    quantity: 1,
    printings: [],
    id: '',
    marketPrice: 0,
  };

  /**
   * The current progress in adding a new card
   * @name LegComponent#stage
   * @type {number}
   * @private
   */
  private stage: number = 0;

  /**
   * Autocomplete search results
   * @name LegComponent#searchResults
   * @type {Promise<string[]>}
   * @private
   */
  private searchResults: Promise<string[]> = new Promise((resolve) => resolve([]));

  /**
   * The total value of the cash and cards in the leg
   * @name LegComponent#sum
   * @type {number}
   * @private
   */
  sum(): number {
    let sum = 0;
    sum += Number(this.leg.cash);
    this.leg.cards.forEach((card) => {
      sum += Number(card.marketPrice);
    });
    return sum;
  }

  /**
   * Validates & updates the cash amount in the leg
   * @param amount 
   */
  updateCash(amount: number) {
    this.leg.cash = amount;
    this.$emit('input', this.leg);
  }

  /**
   * Adds a card
   */
  addCard() {
    let id = '';
    let price = 0;
    this.becomingCard.printings.forEach((printing) => {
      if (printing.code === this.becomingCard.printing) {
        id = printing.id;
        price = printing.price;
      }
    });
    const card = new Card(id, this.becomingCard.quantity, this.becomingCard.condition, price);
    this.leg.cards.push(card);
    this.becomingCard = {
      name: '',
      quantity: 1,
      printings: [],
      id: '',
      marketPrice: 0,
    };
    this.stage = 0;
    this.$emit('input', this.leg);
    this.$forceUpdate();
  }

  /**
   * Fetches a list of printings of the specified card
   * @prop {BecomesCard} card The card to fetch the printings of
   */
  fetchPrintings(card: BecomesCard) {
    request(
      `https://api.scryfall.com/cards/search?order=set&q=%21%E2%80%9C${encodeURIComponent(card.name)}%E2%80%9D&unique=prints`,
      (err, res, body) => {
        if (err) {
          // @TODO
        } else {
          const result: CardSearchResult = JSON.parse(body);
          const printings = [];
          result.data.forEach((printing) => {
            this.linkCardInfo(printing);
            printings.push({
              code: printing.set,
              id: printing.id,
              price: Number(printing.usd),
            });
          });
          card.printings = printings;
          this.stage += 1;
          if (this.config.useLatest || this.config.quickAdd) {
            card.printing = printings[0].code;
            this.stage += 1;
            if (this.config.quickAdd) {
              this.addCard();
            }
          }
        }
      },
    );
  }

  /**
   * Performs an autocomplete search with Scryfall
   * @prop {string} term The text currently in the input box
   */
  autocomplete(term: string) {
    this.searchResults = new Promise((resolve) => {
      request(
        `https://api.scryfall.com/cards/autocomplete?q=${encodeURIComponent(term)}`,
        (err, res, body) => {
          if (err) {
            // @TODO
          } else {
            const result: AutocompleteResults = JSON.parse(body);
            resolve(result.data);
          }
        },
      );
    });
  }

  /**
   * Deletes the card at the specified index
   * @prop {number} index The index of the card to delete
   */
  deleteCard(index: number) {
    this.leg.cards.splice(index, 1);
    this.$emit('input', this.leg);
  }

  /**
   * Syncs Leg#leg and Leg#value
   */
  @Watch('value')
  onValueChanged() {
    this.leg = this.value;
  }
}
