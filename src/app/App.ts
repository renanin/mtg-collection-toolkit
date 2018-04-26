import { Action, Mutation } from 'vuex-class';
import Component from 'vue-class-component';
import Vue from 'vue';
import credentials from '../../credentials.json';
import router from '../bootstrap';
import store from './store';
import request from 'request';
import CategoryResult from './classes/interfaces/categoryResult';

@Component({
  router,
  store,
})

/**
 * @class App
 * @classdesc The main app component
 * @extends Vue
 */
export default class App extends Vue {
  /**
   * Sets the TCGPlayer access token for the session
   * @param {string} token The access token
   */
  @Mutation setAccessToken: (token: string) => void;

  /**
   * Fetches TCGPlayer category information from the cache or API
   * @returns {Promise<CategoryResult[]>} A promise that will resolve with the list of categories
   */
  @Action fetchCategories: () => Promise<CategoryResult[]>;

  /**
   * Fetches the access token
   */
  fetchAccessToken() {
    request.post(
      {
        url: 'https://api.tcgplayer.com/token',
        form: {
          grant_type: 'client_credentials',
          client_id: credentials.client_id,
          client_secret: credentials.client_secret,
        },
      },
      (err, res, body) => {
        if (err) {
          // @TODO
          console.error(err);
        } else {
          try {
            const res = JSON.parse(body);
            this.setAccessToken(res.access_token);
            this.fetchCategories();
          } catch (e) {
            // @TODO
            console.error(e);
          }
        }
      },
    );
  }
}
