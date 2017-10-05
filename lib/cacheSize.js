const fs = require('fs');
const path = require('path');
const async = require('async');

module.exports = function cacheSize() {
  return new Promise((resolve, reject) => {
    console.log('Getting total size of cache');
    const data = {
      total: 0,
    };
    fs.readdir(path.resolve(__dirname, '../cache/'), (err, categories) => {
      if (err) {
        reject(err);
      } else {
        async.eachSeries(categories, (dir, callback) => {
          data[dir] = 0;
          fs.readdir(path.resolve(__dirname, `../cache/${dir}`), (err2, files) => {
            async.eachSeries(files, (file, callback2) => {
              fs.stat(path.resolve(__dirname, `../cache/${dir}/${file}`), (err3, stats) => {
                if (err3) {
                  callback2(err3);
                } else {
                  data[dir] += stats.size;
                  data.total += stats.size;
                  callback2();
                }
              });
            }, (err3) => {
              callback(err3);
            });
          });
        }, (err2) => {
          if (err2) {
            reject(err2);
          } else {
            resolve(data);
          }
        });
      }
    });
  });
};
