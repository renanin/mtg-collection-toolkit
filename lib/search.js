const request = require('request');
const cacheExists = require('./cacheExists');
const cache = require('./cache');
const readCache = require('./readCache');

module.exports = function search(name) {
  return new Promise((resolve, reject) => {
    console.log(`Searching for "${name}"`);
    cacheExists('search', name).then((exists) => {
      if (exists) {
        readCache('search', name).then((body) => {
          try {
            const data = JSON.parse(body);
            data.fromCache = true;
            console.log('Returning search data from cache');
            resolve(data);
          } catch (e) {
            reject(e);
          }
        }).catch((err) => {
          reject(err);
        });
      } else {
        console.log(`Requesting https://api.magicthegathering.io/v1/cards?name=${name}`);
        request(`https://api.magicthegathering.io/v1/cards?name=${name}`, (err, res, body) => {
          if (err) {
            reject(err);
          } else {
            try {
              const data = JSON.parse(body);
              data.fromCache = false;
              cache('search', name, data).then(() => {
                console.log('Returning new search data');
                resolve(data);
              }).catch((e) => {
                reject(e);
              });
            } catch (e) {
              reject(e);
            }
          }
        });
      }
    });
  });
};
