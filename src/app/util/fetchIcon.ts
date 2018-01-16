import fs from 'fs';
import request from 'request';
import Set from '../classes/set';

export default function fetchIcon(set: Set) {
  return new Promise((resolve, reject) => {
    fs.exists(`cache/icons/${set.getCode()}`, (exists) => {
      if (exists) {
        resolve();
      } else {
        request(set.getIcon())
          .pipe(fs.createWriteStream(`cache/icons/${set.getCode()}.svg`))
          .on('close', () => {
            resolve();
          });
      }
    });
  });
}
