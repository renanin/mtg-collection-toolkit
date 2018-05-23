import { Action, Mutation } from 'vuex-class';
import Component from 'vue-class-component';
import Vue from 'vue';
import fs from 'fs';
import bus from '../bus';
import credentials from '../../credentials.json';
import router from '../bootstrap';
import store from './store';
import request from 'request';
import CategoryResult from './classes/interfaces/tcgplayer/categoryResult';

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
   * Whether the error message is shown or not
   * @name LegComponent#showError
   * @type {boolean}
   * @private
   */
  private showError: boolean = false;
  
    /**
     * The error message
     * @name LegComponent#error
     * @type {string}
     * @private
     */
    private error: string = '';

  /**
   * Fetches the access token
   */
  fetchAccessToken() {
    console.group('Fetching access token...');
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
          console.error(`Error fetching access token: ${err}`);
          bus.$emit('error', 'Could not connect to TCGPlayer. Pricing information will not be available.');
        } else {
          try {
            const res = JSON.parse(body);
            this.setAccessToken(res.access_token);
          } catch (e) {
            console.error(`Error parsing access token: ${e}`);
            bus.$emit('error', 'Could not connect to TCGPlayer. Pricing information will not be available.');
          }
        }
        console.groupEnd();
      },
    );
  }

  created() {
    this.fetchAccessToken();
    bus.$on('error', (message) => {
      this.error = message;
      this.showError = true;
    });
    fs.stat('cache', (err, stats) => {
      if (err) {
        console.warn(`Error checking validity of cache: ${err}. Attempting to create folder...`);
        fs.mkdir('cache', (err2) => {
          if (err2) {
            console.warn(`Error creating cache folder: ${err2}`);
          } else{
            console.log('Created new cache folder');
          }
        });
      } else {
        if (stats.isDirectory()) {
          console.log('Cache seems valid');
        } else  {
          console.warn('Cache is not a directory!');
        }
      }
    });
  }
}
