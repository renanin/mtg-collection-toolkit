import request from 'request';
import BecomesCard from '../../classes/interfaces/becomesCard';
import MarketPriceSearchResult from '../../classes/interfaces/tcgplayer/marketPriceSearchResult';

/**
 * Fetches the current TCGPlayer price of the supplied card
 * @returns {Promise<number>} A promise that will resolve with the price of the card
 */
export default function fetchPrice({ dispatch, state }, card: BecomesCard): Promise<number> {
  return new Promise(async (resolve, reject) => {
    const sku = await dispatch('fetchSKU', card);
    request.get(
      {
        url: `http://api.tcgplayer.com/pricing/marketprices/${sku}`,
        auth: {
          bearer: state.accessToken,
        },
      },
      (err, res, body) => {
        if (err) {
          reject(err);
        } else {
          try {
            const result: MarketPriceSearchResult = JSON.parse(body);
            resolve(result.results[0].price);
          } catch (e) {
            reject(e);
          }
        }
      },
    );
  });
}
