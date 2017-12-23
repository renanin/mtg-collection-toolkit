import fs from 'fs';
import read from 'read-big-file';
import request from 'request';

interface SetCodeResults {
  sets: {
    code: string;
    onlineOnly?: boolean;
  }[];
}

function readSetCode(name: string): Promise<SetCodeResults> {
  return new Promise((resolve, reject) => {
    fs.exists(`cache/set_codes/${name}.mtgcache`, (exists) => {
      if (exists) {
        read(`cache/set_codes/${name}.mtgcache`, true).then((res) => {
          resolve(res);
        }).catch((e) => {
          reject(`Could not read cache: ${e}`);
        });
      } else {
        request(
          `https://api.magicthegathering.io/v1/sets?name=${encodeURIComponent(name)}`,
          (err, res, body) => {
            if (err) {
              reject(`Could not read API: ${err}`);
            } else {
              fs.writeFile(`cache/set_codes/${name}.mtgcache`, body, (err) => {
                if (err) {
                  reject(`Could not write to cache: ${err}`);
                } else {
                  try {
                    resolve(JSON.parse(body));
                  } catch (e) {
                    reject(`Could not parse results: ${e}`);
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

export default function getSetCode(name: string): Promise<string> {
  return new Promise(async (resolve, reject) => {
    const results: SetCodeResults = await readSetCode(name);
    for (let i = 0; i < results.sets.length; i += 1) {
      // @TODO
      if (!results.sets[i].onlineOnly) {
        resolve(results.sets[i].code);
      }
    }
    reject(`No set ${name} found!`);
  });
}