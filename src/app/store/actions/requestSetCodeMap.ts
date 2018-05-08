import fs from 'fs';
import read from 'read-big-file';
import SetCodeMap from '../../classes/interfaces/setCodeMap';

/**
 * Reads the set code map from the cache
 */
export default function requestSetCodeMap(): Promise<SetCodeMap> {
  return new Promise((resolve, reject) => {
    read('cache/setCodeMap.json', true)
      .then((map: SetCodeMap) => {
        resolve(map);
      })
      .catch((err) => {
        resolve({});
      });
  });
}
