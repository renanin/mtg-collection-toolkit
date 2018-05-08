import { Action, Mutation, State } from 'vuex-class';
import { Prop, Watch } from 'vue-property-decorator';
import Component from 'vue-class-component';
import Vue from 'vue';
import async from 'async';
import request from 'request';
import AutocompleteResults from '../../classes/interfaces/scryfall/autocompleteResults';
import BecomesCard from '../../classes/interfaces/becomesCard';
import Card from '../../classes/card';
import CardResult from '../../classes/interfaces/scryfall/cardResult';
import CardSearchResult from '../../classes/interfaces/scryfall/cardSearchResult';
import CategoryResult from '../../classes/interfaces/tcgplayer/categoryResult';
import Config from '../../classes/interfaces/config';
import ErrorMessage from '../../classes/interfaces/errorMessage';
import Leg from '../../classes/leg';
import PricePayload from '../../classes/interfaces/pricePayload';
import Trade from '../../classes/trade';

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
   * The trade
   * @name LegComponent#value
   * @type {Trade}
   */
  @Prop() value: Trade;

  /**
   * Whether this leg has the greater value or not
   * @name LegComponent#greater
   * @type {boolean}
   */
  @Prop() greater: boolean;

  /**
   * The index of this leg in the trade
   * @name LegComponent#index
   * @type {number}
   */
  @Prop() index: number;

  /**
   * The global configuration state
   * @name LegComponent#config
   * @type {Config}
   */
  @State config: Config;

  /**
   * TCGPlayer access token
   * @name LegComponent#accessToken
   * @type {string}
   */
  @State accessToken: string;

  /**
   * A list of TCGPlayer categories
   * @name LegComponent#categories
   * @type {CategoryResult[]}
   */
  @State categories: CategoryResult[];

  /**
   * Links local card info with the Vuex store
   * @param {CardResult} printing The card printing
   */
  @Mutation linkCardInfo: (printing: CardResult) => void;

  /**
   * Fetches the current TCGPlayer mid price for the specified card
   * @param {PricePayload} payload Payload with card name and printing code
   * @returns {number} The price of the card
   */
  @Action fetchPrice: (payload: PricePayload) => number;

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
    this.value.legs[this.index] = this.leg;
    this.$emit('input', this.value);
  }

  /**
   * Adds a card
   */
  addCard() {
    let id = '';
    let price = 0;
    this.becomingCard.printings.forEach(async (printing) => {
      if (printing.code === this.becomingCard.printing) {
        id = printing.id;
        price = printing.price;
      }
    });
    const card = new Card(id, this.becomingCard.quantity, price);
    this.leg.cards.push(card);
    this.becomingCard = {
      name: '',
      quantity: 1,
      printings: [],
      id: '',
      marketPrice: 0,
    };
    this.stage = 0;
    this.value.legs[this.index] = this.leg;
    this.$emit('input', this.value);
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
          async.eachSeries(
            result.data,
            async (printing: CardResult, next) => {
              this.linkCardInfo(printing);
              try {
                console.log(`Getting pricing information for ${printing.set}`);
                printings.push({
                  price: await this.fetchPrice({
                    card: printing,
                    printing: printing.set,
                  }),
                  code: printing.set,
                  id: printing.id,
                });
                next();
              } catch (e) {
                const error = <ErrorMessage>e;
                if (error.code === 1) {
                  next(error.message);
                } else {
                  next(e);
                }
              }
            },
            (err) => {
              if (err) {
                console.error(err);
              } else {
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
    this.leg = this.value.legs[this.index];
  }
}
