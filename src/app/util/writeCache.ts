import fs from 'fs';
import path from 'path';

export default function cache(category: string, name: string, content: any) {
  return new Promise((resolve, reject) => {
    fs.writeFile(
      path.resolve(`../cache/${category}/${name.toLowerCase()}.mtgcache`),
      JSON.stringify(content),
      (err) => {
        if (err) {
          reject(err);
        } else {
          resolve(true);
        }
      });
  });
}
