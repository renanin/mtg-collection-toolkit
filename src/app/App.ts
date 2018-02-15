import { Action } from 'vuex-class';
import Component from 'vue-class-component';
import Vue from 'vue';
import DashboardItem from './components/dashboard-item/dashboard-item.vue';
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
  get demoGains() {
    let data = [
      {
        name: 'Hangarback Walker',
        set: 'MS2',
        acquiredPrice: 3.33,
        currentPrice: 43.5,
        weeklyChange: -0.05,
        weeklyChangePercent: null,
        totalChangePercent: null,
      }, {
        name: 'Emrakul, the Aeons Torn',
        set: 'ROE',
        acquiredPrice: 15.00,
        currentPrice: 44.99,
        weeklyChange: 0.43
      }, {
        name: 'Purphoros, God of the Forge',
        set: 'THS',
        acquiredPrice: 3.33,
        currentPrice: 34,
        weeklyChange: 0.2
      }, {
        name: 'The Scarab God',
        set: 'HOU',
        acquiredPrice: 3.33,
        currentPrice: 33,
        weeklyChange: 0.03
      }, {
        name: 'True-Name Nemesis',
        set: 'C13',
        acquiredPrice: 29.99,
        currentPrice: 30.3,
        weeklyChange: 0.31
      }
    ];
    for (let i = 0; i < data.length; i += 1) {
      data[i].weeklyChangePercent = Math.round((((data[i].currentPrice + data[i].weeklyChange) - data[i].currentPrice) / data[i].currentPrice) * 10000) / 100;
      if (data[i].acquiredPrice) {
        data[i].totalChangePercent = Math.round(((data[i].currentPrice - data[i].acquiredPrice) / data[i].acquiredPrice) * 10000) / 100;
      } else {
        data[i].acquiredPrice = 'N/A';
        data[i].totalChangePercent = 'N/A';
      }
    }
    return data;
  }
}
