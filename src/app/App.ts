import { Action, Mutation } from 'vuex-class';
import Component from 'vue-class-component';
import Vue from 'vue';
import credentials from '../../credentials.json';
import router from '../bootstrap';
import store from './store';
import request from 'request';

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
  @Mutation setAccessToken;
  @Action fetchCategories;

  created() {
    // Fetch access token
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
