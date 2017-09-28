const fs = require('fs');
const path = require('path');

module.exports = function error(message) {
  console.error(message);
  fs.writeFile(path.resolve(__dirname, '../debug.log'), message, 'utf-8');
};
