import { Prop, Watch } from 'vue-property-decorator';
import Component from 'vue-class-component';
import Vue from 'vue';
import request from 'request';
import AutocompleteResults from '../../classes/interfaces/autocompleteResults';
import BecomesCard from '../../classes/interfaces/becomesCard';
import CardSearchResult from '../../classes/interfaces/cardSearchResult';
import Leg from '../../classes/leg';

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
  private leg: Leg;

  /**
   * The list of cards displayed and edited in the table
   * @name LegComponent#cards
   * @type {BecomesCard[]}
   * @private
   */
  private cards: BecomesCard[];

  /**
   * Autocomplete search results
   * @name LegComponent#searchResults
   * @type {Promise<string[]>}
   * @private
   */
  private searchResults: Promise<string[]>;

  /**
   * The total value of the cash and cards in the leg
   * @name LegComponent#sum
   * @type {number}
   * @private
   */
  private get sum(): number {
    return this.leg.cash;
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
      printing: 0,
      editing: true,
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
            printings.push(printing.set);
          });
          card.printings = printings;
        }
      },
    );
  }

  @Watch('value')
  /**
   * Syncs Leg#leg and Leg#value
   */
  onValueChanged() {
    this.leg = this.value;
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
   * @constructs
   */
  constructor() {
    super();
    this.leg = new Leg();
    this.cards = [];
    this.searchResults = new Promise((resolve) => resolve([]));
  }
}
