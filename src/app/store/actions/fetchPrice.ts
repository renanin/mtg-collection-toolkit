import request from 'request';
import BecomesCard from '../../classes/interfaces/becomesCard';

/**
 * Fetches the current TCGPlayer price of the supplied card
 */
export default function fetchPrice({ dispatch, state }, card: BecomesCard) {
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
            const result = JSON.parse(body);
            console.log(result.results[0].price);
            resolve(result.results[0].price);
          } catch (e) {
            reject(e);
          }
        }
      },
    );
  });
}
