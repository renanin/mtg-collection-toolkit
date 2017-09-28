const fs = require('fs');
const path = require('path');

module.exports = function cacheExists(category, name) {
  return new Promise((resolve) => {
    console.log(`Checking if cache ${category}/${name.toLowerCase()} exists`);
    resolve(fs.existsSync(path.resolve(__dirname, `../cache/${category}/${name.toLowerCase()}.mtgcache`)));
  });
};
