import fs from 'fs';
import Card from '../classes/card';
import Set from '../classes/set';
import Collection from '../classes/collection';

export default function save(set: Set, collection: Collection) {
  return new Promise((resolve, reject) => {
    const nonZeroCards = {};
    set.getCards().forEach((card: Card) => {
      if (card.getQuantity() > 0) {
        nonZeroCards[card.getID()] = card.getQuantity();
      }
    });
    collection[set.getCode()] = nonZeroCards;
    fs.writeFile('userdata/collection.mtgcollection', JSON.stringify(collection), (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}
