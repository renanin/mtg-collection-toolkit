import { Action } from 'vuex-class';
import Component from 'vue-class-component';
import Vue from 'vue';
import request from 'request';
import Autocomplete from './classes/autocomplete';
import AutocompleteResult from './classes/autocompleteResult';
import Card from './classes/card';
import DashboardItem from './components/dashboard-item/dashboard-item.vue';
import Printing from './classes/printing';
import SearchResults from './classes/searchResults';
import router from '../bootstrap';
import store from './store';

@Component({
  router,
  store,
  components: {
    DashboardItem,
  },
})

/**
 * @class App
 * @classdesc The main App component
 * @extends Vue
 */
export default class App extends Vue {
  /**
   * The open state of the add trade dialog
   * @name App#tradeDialogOpen
   * @type {boolean}
   * @private
   */
  private tradeDialogOpen: boolean = false;

  /**
   * The results of the autocomplete search
   * @name App#cardResults
   * @type {Promise<Autocomplete[]>}
   * @private
   */
  private cardResults: Promise<Autocomplete[]> = new Promise(resolve => resolve([]));

  /**
   * The "My Items" card currently being edited
   * @name App#myItem
   * @type {Card}
   * @private
   */
  private myItem: Card = new Card();

  /**
   * Fetches autocomplete results from Scryfall
   */
  autocomplete(name: string) {
    console.log(name);
    this.cardResults = new Promise((resolve, reject) => {
      request(
        `https://api.scryfall.com/cards/autocomplete?q=${encodeURIComponent(name)}`,
        (err, res, body) => {
          if (err) {
            reject(err);
          } else {
            const result: AutocompleteResult = JSON.parse(body);
            const cardResults = [];
            for (let i = 0; i < result.data.length; i += 1) {
              cardResults.push(result.data[i]);
            }
            resolve(cardResults);
          }
        },
      )
    });
  }

  /**
   * A list of the printings of the card with the "My Item" name
   * @name App#myItemPrintings
   * @type {Promise<Printing[]>}
   */
  fetchPrintings(): Promise<Printing[]> {
    return new Promise((resolve, reject) => {
      let printings = [];
      request(
        `https://api.scryfall.com/cards/search?order=set&q=%21%E2%80%9C${encodeURIComponent(this.myItem.name)}%E2%80%9D&unique=prints`,
        (err, res, body) => {
          if (err) {
            reject(err);
          } else {
            const result: SearchResults = JSON.parse(body);
            for (let i = 0; i < result.data.length; i += 1) {
              printings.push({
                code: result.data[i].set,
                name: result.data[i].set_name,
              });
            }
            this.myItem.printings = printings;
            resolve(printings);
          }
        },
      );
    });
  }
}
