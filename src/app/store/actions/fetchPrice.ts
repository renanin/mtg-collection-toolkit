import request from 'request';
import BecomesCard from '../../classes/interfaces/becomesCard';
import MarketPriceSearchResult from '../../classes/interfaces/tcgplayer/marketPriceSearchResult';
import PricePayload from '../../classes/interfaces/pricePayload';

/**
 * Fetches the current TCGPlayer price of the supplied card
 * @returns {Promise<number>} A promise that will resolve with the price of the card
 */
export default function fetchPrice({ dispatch, state }, payload: PricePayload): Promise<number> {
  return new Promise(async (resolve, reject) => {
    const sku = await dispatch('fetchSKU', payload);
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
