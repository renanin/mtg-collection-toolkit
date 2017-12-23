import fs from 'fs';
import read from 'read-big-file';
import request from 'request';
import SetCodeResults from '../classes/setCodeResults';

export default function getSetCode(name: string): Promise<SetCodeResults> {
  return new Promise(async (resolve, reject) => {
    fs.exists(`cache/set_codes/${name}.mtgcache`, (exists) => {
      if (exists) {
        read(`cache/set_codes/${name}.mtgcache`, true).then((res) => {
          resolve(res);
        }).catch((e) => {
          reject(`Could not read 'cache/set_codes/${name}.mtgcache': ${e}`);
        });
      } else {
        request(
          `https://api.magicthegathering.io/v1/sets?name=${encodeURIComponent(name)}`,
          (err, res, body) => {
            if (err) {
              reject(`Error requesting 'https://api.magicthegathering.io/v1/sets?name=`
              + `${encodeURIComponent(name)}': ${err}`);
            } else {
              fs.writeFile(`cache/set_codes/${name}.mtgcache`, body, (err) => {
                if (err) {
                  reject(`Could not write to 'cache/set_codes/${name}.mtgcache': ${err}`);
                } else {
                  try {
                    resolve(JSON.parse(body));
                  } catch (e) {
                    reject(`Could not parse set code results: ${e}`);
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
