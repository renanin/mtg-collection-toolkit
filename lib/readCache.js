const fs = require('fs');
const path = require('path');

module.exports = function cache(category, name) {
  return new Promise((resolve, reject) => {
    fs.readFile(path.resolve(__dirname, `../cache/${category}/${name.toLowerCase()}.mtgcache`), 'utf-8', (err, data) => {
      if (err) {
        reject(err);
      } else {
        console.log('Successfully read cache');
        resolve(data);
      }
    });
  });
};
