const request = require('request');
const cacheExists = require('./cacheExists');
const cache = require('./cache');
const readCache = require('./readCache');

module.exports = function search(name) {
  return new Promise((resolve, reject) => {
    cacheExists('search', name).then((exists) => {
      if (exists) {
        readCache('search', name).then((body) => {
          try {
            const data = JSON.parse(body);
            data.fromCache = true;
            resolve(data);
          } catch (e) {
            reject(e);
          }
        }).catch((err) => {
          reject(err);
        });
      } else {
        request(`https://api.magicthegathering.io/v1/cards?name=${name}`, (err, res, body) => {
          if (err) {
            reject(err);
          } else {
            try {
              const data = JSON.parse(body);
              data.fromCache = false;
              cache('search', name, data).then(() => {
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
