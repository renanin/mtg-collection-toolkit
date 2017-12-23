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
            reject(err);
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
      reject(`Could not create search cache directory for ${set}: ${e}`);
    }
    fs.exists(`cache/search/${set}/${name}`, (exists) => {
      if (exists) {
        read(`cache/search/${set}/${name}`, true).then((res) => {
          resolve(res);
        }).catch((e) => {
          reject(`Could not read cache ${set}/${name}: ${e}`);
        });
      } else {
        request(
          `https://api.scryfall.com/cards/search?q=${encodeURIComponent(name)}+e%3A${set}`,
          (err, res, body) => {
            if (err) {
              reject(`Could not access API: ${set}`);
            } else {
              fs.writeFile(`cache/search/${set}/${name}`, body, (err) => {
                if (err) {
                  reject(`Could not write to cache: ${err}`);
                } else {
                  try {
                    resolve(JSON.parse(body));
                  } catch (e) {
                    reject(`Could not parse search results for ${name} in ${set}: ${e}`);
                  }
                }
              });
            }
          },
        );
      }
    });
  });
}
