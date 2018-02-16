import request from 'request';
import Card from '../classes/card';
import CardResult from '../classes/cardResult';
import Item from '../classes/item';
import Printing from '../classes/printing';
import SearchResults from '../classes/searchResults';

export default {
  /**
   * Fetches and stores information about the supplied item
   * @param {Item} card The item to fetch info about
   */
  fetchCard({ commit }, card: Item) {
    return new Promise((resolve) => {
      request(
        `https://api.scryfall.com/cards/search?q=${encodeURIComponent(card.name)}+e%3A${card.printing}`,
        (err, res, body) => {
          const results: SearchResults = JSON.parse(body);
          const card: CardResult = results.data[0];
          resolve(new Card(card.name, new Printing(card.set_name, card.set), Number(card.usd)));
        },
      );
    });
  }
};
