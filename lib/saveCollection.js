const fs = require('fs');
const path = require('path');

module.exports = function saveCollection(collection) {
  return new Promise((resolve, reject) => {
    const file = path.resolve(__dirname, '../userdata/collection.mtgcollection');
    console.log(`Saving collection to ${file}`);
    fs.writeFile(file, collection, 'utf-8', (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};
