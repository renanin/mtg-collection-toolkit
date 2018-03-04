import { Prop, Watch } from 'vue-property-decorator';
import Component from 'vue-class-component';
import Vue from 'vue';
import request from 'request';
import AutocompleteResults from '../../classes/interfaces/autocompleteResults';
import BecomesCard from '../../classes/interfaces/becomesCard';
import Card from '../../classes/card';
import CardSearchResult from '../../classes/interfaces/cardSearchResult';
import Leg from '../../classes/leg';
import scrapePrices from '../../util/scrapePrices';

@Component({})

/**
 * @class LegComponent
 * @classdesc A component for use on the add trades page which represents a single side of a trade
 * @extends Vue
 */
export default class LegComponent extends Vue {
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
  private cards: BecomesCard[] = [];

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
  private get sum(): number {
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
    this.cards.push({
      name: '',
      quantity: 1,
      printings: [],
      editing: true,
      id: '',
      marketPrice: 0,
    });
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
            printings.push({
              code: printing.set,
              id: printing.id,
              price: Number(printing.usd),
            });
          });
          card.printings = printings;
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
            this.resizeMenu();
          }
        },
      );
    });
  }

  /**
   * Forces the autocomplete menu to be bigger
   */
  resizeMenu() {
    const menu = <HTMLElement>document.querySelectorAll('.md-menu-content-bottom-start.md-menu-content-small')[0];
    menu.style.width = 'auto';
    menu.style.maxWidth = `${window.innerWidth}px`;
  }

  /**
   * Pushes changes to the store
   * @param {number} index The index of the card to push
   */
  submitCard(index: number) {
    let id = '';
    let price = 0;
    this.cards[index].printings.forEach((printing) => {
      if (printing.code === this.cards[index].printing) {
        id = printing.id;
        price = printing.price;
      }
    });
    this.leg.cards[index] = new Card(id, this.cards[index].quantity, this.cards[index].condition, price);
    this.cards[index].editing = false;
    this.cards[index].marketPrice = price;
    this.$emit('input', this.leg);
    this.$forceUpdate();
  }

  /**
   * Deletes the card at the specified index
   * @prop {number} index The index of the card to delete
   */
  deleteCard(index: number) {
    // @TODO
  }

  @Watch('value')
  /**
   * Syncs Leg#leg and Leg#value
   */
  onValueChanged() {
    this.leg = this.value;
  }
}
