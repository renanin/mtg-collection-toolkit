import { Action, Mutation, State } from 'vuex-class';
import Component from 'vue-class-component';
import Vue from 'vue';
import async from 'async';
import request from 'request';
import AutocompleteResults from '../../classes/autocompleteResults';
import Item from '../../classes/item';
import Printing from '../../classes/printing';
import SearchResults from '../../classes/searchResults';
import Trade from '../../classes/trade';

@Component({})

/**
 * @class Trades
 * @classdesc The trades page
 * @extends Vue
 */
export default class Trades extends Vue {
  @State trades: Trade[];
  @Action fetchCard;
  @Mutation addCard;
  @Mutation addTrade;

  /**
   * Whether the add trade dialog is open or not
   * @name Trades#addTradeDialog
   * @type {boolean}
   * @private
   */
  private addTradeDialog: boolean = false;

  /**
   * The trade currently being edited
   * @name Trades#newTrade
   * @type {Trade}
   * @private
   */
  private newTrade: Trade = new Trade();

  /**
   * Autocomplete search results
   * @name Trades#autocomplete
   * @type {Promise<string[]>}
   * @private
   */
  private autocomplete: Promise<string[]> = new Promise(resolve => []);

  /**
   * Adds a card to the user's side of the current trade
   */
  addMyCard() {
    this.newTrade.addMyCard();
  }

  /**
   * Adds a card to the other party's side of the current trade
   */
  addTheirCard() {
    this.newTrade.addTheirCard();
  }

  /**
   * Fetches autocomplete results
   * @prop {string} name The string currently entered into the text box
   */
  fetchCardNames(name: string) {
    this.autocomplete = new Promise(resolve => {
      let autocomplete = [];
      request(
        `https://api.scryfall.com/cards/autocomplete?q=${encodeURIComponent(name)}`,
        (err, res, body) => {
          const results: AutocompleteResults = JSON.parse(body);
          for (let i = 0; i < results.data.length; i += 1) {
            autocomplete.push(results.data[i]);
          }
          resolve(autocomplete);
        },
      );
    });
  }

  /**
   * Fetches info for printings of the currently edited card
   * @prop {Item} card The item being edited
   */
  fetchCardPrintings(card: Item) {
    request(
      `https://api.scryfall.com/cards/search?order=set&q=%21%E2%80%9C${encodeURIComponent(card.name)}%E2%80%9D&unique=prints`,
      (err, res, body) => {
        const results: SearchResults = JSON.parse(body);
        for (let i = 0; i < results.data.length; i += 1) {
          card.printings.push(new Printing(results.data[i].set_name, results.data[i].set));
        }
      },
    );
  }

  /**
   * Adds the trade to the system
   */
  trade() {
    const trade = new Trade(this.newTrade.date);
    async.eachSeries(
      this.newTrade.myCards,
      (card, next) => {
        this.fetchCard(card).then((card) => {
          this.addCard(card);
          trade.myCards.push(card);
          next();
        });
      },
      () => {
        async.eachSeries(
          this.newTrade.theirCards,
          (card, next) => {
            this.fetchCard(card).then((card) => {
              this.addCard(card);
              trade.theirCards.push(card);
              next();
            });
          },
          () => {
            this.addTrade(trade);
            this.addTradeDialog = false;
            this.newTrade = new Trade();
          },
        );
      },
    );
  }
}
