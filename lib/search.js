const request = require('request');
const fs = require('fs');
const path = require('path');
const cacheExists = require('./cacheExists');
const cache = require('./cache');

module.exports = function search(name) {
  return new Promise((resolve, reject) => {
    cacheExists('search', name).then((exists) => {
      if (exists) {
        fs.readFile(path.resolve(__dirname, `../cache/search/${name.toLowerCase()}.mtgcache`), 'utf-8', (err, body) => {
          if (err) {
            reject(err);
          } else {
            try {
              const data = JSON.parse(body);
              data.fromCache = true;
              resolve(data);
            } catch (e) {
              reject(e);
            }
          }
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
