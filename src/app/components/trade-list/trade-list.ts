import { ComponentOptions } from 'vue';
import request from 'request';
import TradeListComponent from './component';
import Card from '../../classes/card';
import Cash from '../../classes/cash';

export default {
  props: ['label','value','editable'],
  data() {
    return {
      cards: [],
      isEditable: false,
    };
  },
  watch: {
    value: 'updateCards',
  },
  created() {
    this.updateCards();
  },
  methods: {
    updateCards() {
      this.cards = this.value;
      this.isEditable = this.editable;
    },
    addCard() {
      this.cards.push(new Card());
    },
    addCash() {
      this.cards.push(new Cash());
    },
    getTotalPrice() {
      let total = 0;
      this.cards.forEach((card) => {
        if (card.isCash()) {
          total += card.getAmount();
        } else {
          if (!isNaN(card.getPrice())) {
            total += card.getPrice();
          }
        }
      });
      return total;
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
      if (card.isCash()) {
        card.price = card.getAmount();
      } else {
        card.printings.forEach((printing) => {
          if (printing.set === card.printing) {
            card.price = Number(printing.usd);
          }
        });
      }
      this.$emit('input', this.cards);
    },
    toggleEditable() {
      this.isEditable = !this.isEditable;
    },
    isCash(card) {
      return card.isCash();
    },
  },
} as ComponentOptions<TradeListComponent>;
