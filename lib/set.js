const request = require('request');
const async = require('async');
const cacheExists = require('./cacheExists');
const cache = require('./cache');
const readCache = require('./readCache');

function getPage(code, page = 1) {
  return new Promise((resolve, reject) => {
    console.log(`Requesting https://api.magicthegathering.io/v1/cards?set=${code}&page=${page}`);
    request(`https://api.magicthegathering.io/v1/cards?set=${code}&page=${page}`, (err, res, body) => {
      if (err) {
        reject(err);
      } else {
        try {
          resolve(JSON.parse(body));
        } catch (e) {
          reject(e);
        }
      }
    });
  });
}

module.exports = function set(code, name) {
  return new Promise((resolve, reject) => {
    console.log(`Getting set info for ${code}`);
    cacheExists('set', code).then((exists) => {
      if (exists) {
        readCache('set', code).then((body) => {
          try {
            const data = JSON.parse(body);
            data.fromCache = true;
            console.log('Returning set data from cache');
            resolve(data);
          } catch (e) {
            reject(e);
          }
        }).catch((err) => {
          reject(err);
        });
      } else {
        const data = {
          fromCache: false,
          code,
          name,
          cards: [],
        };
        let cont = true;
        let page = 1;
        async.whilst(() => cont, (callback) => {
          getPage(code, page).then((res) => {
            data.cards = data.cards.concat(res.cards);
            page += 1;
            if (res.cards.length < 100) {
              console.log('Reached end of results');
              cont = false;
            }
            callback();
          }).catch((err) => {
            callback(err);
          });
        }, (error) => {
          if (error) {
            reject(error);
          } else {
            cache('set', code, data).then(() => {
              console.log('Returning new set data');
              resolve(data);
            }).catch((err) => {
              reject(err);
            });
          }
        });
      }
    });
  });
};
