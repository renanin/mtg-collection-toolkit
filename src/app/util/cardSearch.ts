import request from 'request';
import fs from 'fs';
import read from 'read-big-file';
import path from 'path';
import CardResponse from '../classes/cardResponse';

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

export default async function cardSearch2(name: string, targetSet: string) {
  return new Promise(async (resolve, reject) => {
    await createSetDir(encodeURIComponent(targetSet));
    const cacheFile = `cache/search/${encodeURIComponent(targetSet)}`
                    + `/${encodeURIComponent(name)}.mtgcache`;
    fs.exists(
      cacheFile,
      (exists) => {
        if (exists) {
          read(cacheFile, true).then((res) => {
            resolve(res);
          }).catch((e) => {
            reject(`Error reading cache: ${e}`);
          });
        } else {
          request(
            `https://api.scryfall.com/cards/search?order=set`
            + `&q=%2B%2B%21%22${name}%22+game%3Apaper`,
            (err, res, body) => {
              if (err) {
                reject(`Error requesting API: ${err}`);
              } else {
                try {
                  fs.writeFile(
                    cacheFile,
                    body,
                    (err) => {
                      if (err) {
                        reject(`Could not write to cache: ${err}`);
                      } else {
                        resolve(JSON.parse(body));
                      }
                    },
                  );
                } catch (e) {
                  reject(e);
                }
              }
            },
          );
        }
      },
    );
  });
}
