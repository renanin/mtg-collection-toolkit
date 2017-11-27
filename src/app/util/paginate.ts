import request from 'request';
import async from 'async';

export default function paginate(url: string): Promise<any> {
  return new Promise((resolve, reject) => {
    let results = [];
    let hasMore = true;
    async.whilst(
      () => hasMore,
      (callback) => {
        request(url, (err, res, body) => {
          if (err) {
            callback(err);
          } else if (res.statusCode < 200 || res.statusCode >= 400) {
            callback(`Error ${res.statusCode}`);
          } else {
            try {
              const data = JSON.parse(body);
              hasMore = data.has_more;
              results = results.concat(data.data);
              callback();
            } catch (e) {
              callback(e);
            }
          }
        });
      },
      (err) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      },
    );
  });
}
