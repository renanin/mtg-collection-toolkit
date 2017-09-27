const fs = require('fs');
const path = require('path');

module.exports = function cache(category, name, content) {
  return new Promise((resolve, reject) => {
    fs.writeFile(path.resolve(__dirname, `../cache/${category}/${name.toLowerCase()}.mtgcache`), JSON.stringify(content), (err) => {
      if (err) {
        reject(err);
      } else {
        resolve(true);
      }
    });
  });
};
