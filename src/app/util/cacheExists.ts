import fs from 'fs';
import path from 'path';

export default function cacheExists(category: string, name: string) {
  return new Promise((resolve) => {
    resolve(
      fs.existsSync(
        path.resolve(`../cache/${category}/${name.toLowerCase()}.mtgcache`)));
  });
}
