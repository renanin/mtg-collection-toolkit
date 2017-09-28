const fs = require('fs');
const path = require('path');

module.exports = function cache(category, name, content) {
  return new Promise((resolve, reject) => {
    console.log(`Writing to cache ${category}/${name.toLowerCase()}`);
    fs.writeFile(path.resolve(__dirname, `../cache/${category}/${name.toLowerCase()}.mtgcache`), JSON.stringify(content), (err) => {
      if (err) {
        reject(err);
      } else {
        console.log('Successfully wrote to cache');
        resolve(true);
      }
    });
  });
};
