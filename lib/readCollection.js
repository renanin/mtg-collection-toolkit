const fs = require('fs');
const path = require('path');

module.exports = function readCollection() {
  return new Promise((resolve, reject) => {
    const file = path.resolve(__dirname, '../userdata/collection.mtgcollection');
    console.log(`Reading collection from ${file}`);
    fs.readFile(file, 'utf-8', (err, content) => {
      if (err) {
        reject(err);
      } else {
        resolve(content);
      }
    });
  });
};
