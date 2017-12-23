import fs from 'fs';
import read from 'read-big-file';
import request from 'request';

async function createSetDir(set: string) {
  return new Promise((resolve, reject) => {
    fs.exists(`cache/search/${set}`, (exists) => {
      if (exists) {
        resolve();
      } else {
        fs.mkdir(`cache/search/${set}`, (err) => {
          if (err) {
            reject(`Could not create folder 'cache/search/${set}'!`);
          } else {
            resolve();
          }
        });
      }
    });
  });
}

export default function cardSearch(name: string, set: string) {
  return new Promise(async (resolve, reject) => {
    try {
      await createSetDir(set);
    } catch (e) {
      reject(e);
    }
    fs.exists(`cache/search/${set}/${name}.mtgcache`, (exists) => {
      if (exists) {
        read(`cache/search/${set}/${name}.mtgcache`, true).then((res) => {
          resolve(res);
        }).catch((e) => {
          reject(`Could not read 'cache/search/${set}/${name}.mtgcache': ${e}`);
        });
      } else {
        request(
          `https://api.scryfall.com/cards/search?q=${encodeURIComponent(name)}+e%3A${set}`,
          (err, res, body) => {
            if (err) {
              reject(
                `Error requesting 'https://api.scryfall.com/cards/search?q=`
                + `${encodeURIComponent(name)}+e%3A${set}': ${err}`);
            } else {
              fs.writeFile(`cache/search/${set}/${name}.mtgcache`, body, (err) => {
                if (err) {
                  reject(`Could not write to 'cache/search/${set}/${name}.mtgcache': ${err}`);
                }
                try {
                  resolve(JSON.parse(body));
                } catch (e) {
                  reject(`Could not parse search results: ${e}`);
                }
              });
            }
          },
        );
      }
    });
  });
}
