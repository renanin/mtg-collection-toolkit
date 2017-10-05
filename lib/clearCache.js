const fs = require('fs');
const path = require('path');
const async = require('async');

module.exports = function clearCache(category) {
  return new Promise((resolve, reject) => {
    console.log(`Clearing ${category}`);
    fs.readdir(path.resolve(__dirname, `../cache/${category}`), (err, files) => {
      if (err) {
        reject(err);
      } else {
        async.eachSeries(files, (file, callback) => {
          console.log(`Deleting ${category}/${file}`);
          fs.unlink(path.resolve(__dirname, `../cache/${category}/${file}`), (err2) => {
            if (err2) {
              callback(err2);
            } else {
              callback();
            }
          });
        }, (err2) => {
          if (err2) {
            reject(err2);
          } else {
            resolve();
          }
        });
      }
    });
  });
};
