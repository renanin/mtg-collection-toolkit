import fs from 'fs';
import path from 'path';

export default function cache(category: string, name: string): Promise<string> {
  return new Promise((resolve, reject) => {
    fs.readFile(
      path.resolve(`../cache/${category}/${name.toLowerCase()}.mtgcache`), 'utf-8', (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
  });
}
