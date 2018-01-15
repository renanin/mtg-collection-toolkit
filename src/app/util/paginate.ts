import async from 'async';
import request from 'request';
import APIResponse from '../classes/apiResponse';

/**
 * Paginates Scryfall API responses.
 * @param {string} url The base endpoint to request.
 * @return {Promise<any>} A promise that will resolve with
 *                        the combination of data items from all pages.
 */
export default function paginate(url: string): Promise<any[]> {
  return new Promise((resolve, reject) => {
    let hasMore = true;
    let nextUrl = url;
    let data = [];
    async.whilst(
      () => hasMore,
      (next) => {
        request(nextUrl, (err, res, body) => {
          if (err) {
            next(`Error requesting ${nextUrl}: ${err}`);
          } else {
            try {
              const response = <APIResponse>JSON.parse(body);
              hasMore = response.has_more;
              nextUrl = response.next_page;
              data = data.concat(response.data);
              next();
            } catch (e) {
              next(`Error parsing response from ${nextUrl}: ${e}`);
            }
          }
        });
      },
      (err) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      },
    );
  });
}
