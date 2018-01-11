import { ComponentOptions } from 'vue';
import request from 'request';
import TradesPageComponent from './component';
import Card from '../../classes/card';

export default {
  data() {
    return {
      myCards: [],
    };
  },
  methods: {
    addTrade() {
      this.$refs.addTradeDialog.open();
    },
    addCard() {
      this.myCards.push(new Card());
    },
    autocomplete(chars) {
      return new Promise((resolve, reject) => {
        request(
          `https://api.scryfall.com/cards/autocomplete?q=${chars.q}`,
          (err, res, body) => {
            if (err) {
              reject(err);
            } else {
              try {
                const results = JSON.parse(body);
                const transformed = [];
                results.data.forEach((name) => {
                  transformed.push({
                    name,
                  });
                });
                resolve(transformed);
              } catch (e) {
                reject(e);
              }
            }
          },
        );
      });
    },
    getPrintings(card) {
      request(
        `https://api.scryfall.com/cards/search?order=set&q=%2B%2B%21%22`
         + `${encodeURIComponent(card.name)}%22`,
        (err, res, body) => {
          if (err) {
            console.error(err);
          } else {
            try {
              const results = JSON.parse(body);
              card.printings = results.data;
            } catch (e) {
              console.error(e);
            }
          }
        },
      );
    },
    updatePrice(card) {
      card.printings.forEach((printing) => {
        if (printing.set === card.printing) {
          card.price = Number(printing.usd);
        }
      });
    },
    getMyTotalPrice() {
      let total = 0;
      this.myCards.forEach((card) => {
        if (!isNaN(card.price)) {
          total += card.price;
        }
      });
      return total;
    },
  },
} as ComponentOptions<TradesPageComponent>;
