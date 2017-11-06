import read from 'read-big-file';
import request from 'request';
import async from 'async';
import Card from '../../../classes/card';
import Collection from '../../../classes/collection';
import Set from '../../../classes/set';

export default {
  data() {
    return {
      path: '',
      headers: [],
      body: [],
      headerOptions: [],
    };
  },
  methods: {
    start() {
      read(this.path).then((data) => {
        const split = data.split(/\n/);
        const parsed = [];
        split.forEach((line) => {
          parsed.push([]);
          let current = '';
          let inString = false;
          line.split('').forEach((char) => {
            if (char === '"') {
              inString = !inString;
            } else if (char === ',' && !inString) {
              parsed[parsed.length - 1].push(current);
              current = '';
            } else {
              current += char;
            }
          });
          parsed[parsed.length - 1].push(current);
        });
        this.headers = parsed[0];
        parsed.shift();
        this.body = parsed;
      }).catch((e) => {
        console.error(e);
      });
    },
    updatePath(fileList) {
      this.path = fileList[0].path;
    },
    build() {
      const nameCol = this.headerOptions.indexOf('name');
      const quantityCol = this.headerOptions.indexOf('quantity');
      const setCol = this.headerOptions.indexOf('set');
      const condCol = this.headerOptions.indexOf('condition');
      const foilCol = this.headerOptions.indexOf('foilCol');
      const setMapping = {};
      const collection = new Collection();
      async.eachSeries(this.body, (row, rowCallback) => {
        // @TODO: Cache results
        request(`https://api.magicthegathering.io/v1/sets?name=${row[setCol]}`, (searchError, searchRes, searchBody) => {
          if (searchError) {
            rowCallback(searchError);
          } else {
            const searchResults = JSON.parse(searchBody);
            // @TODO: Handle multiple results
            const code = searchResults.sets[0].code;
            const setName = searchResults.sets[0].name;
            const setInfo = {
              fromCache: false,
              code,
              name: setName,
              cards: [],
            };
            let loop = true;
            let page = 1;

            const createCard = function createCard() {
              if (!collection.sets[code]) {
                collection.sets[code] = new Set(code, setName);
              }
              let cardInfo;
              for (let i = 0; i < setInfo.cards.length; i += 1) {
                if (setInfo.cards[i].name === row[nameCol]) {
                  cardInfo = setInfo.cards[i];
                  break;
                }
              }
              if (cardInfo) {
                console.log(`Adding ${row[nameCol]}`);
                const card = new Card(row[nameCol], code, setName, cardInfo.multiverseid, row[quantityCol], row[foilCol]);
                collection.sets[code].addCard(card);
                rowCallback();
              } else {
                rowCallback(`Card not found in ${setName}: ${row[nameCol]}`);
              }
            };

            if (!setInfo[code]) {
              // @TODO: Use cache
              async.whilst(() => loop, (cardListCallback) => {
                console.log(`Getting https://api.magicthegathering.io/v1/cards?set=${code}&page=${page}`);
                request(`https://api.magicthegathering.io/v1/cards?set=${code}&page=${page}`, (cardListError, cardListRes, cardListBody) => {
                  if (cardListError) {
                    cardListCallback(cardListError);
                  } else {
                    const info = JSON.parse(cardListBody);
                    setInfo.cards = setInfo.cards.concat(info.cards);
                    page += 1;
                    if (info.cards.length < 100) {
                      loop = false;
                    }
                    cardListCallback();
                  }
                });
              }, (err2) => {
                if (err2) {
                  rowCallback(err2);
                } else {
                  setMapping[setInfo.code] = setInfo;
                  createCard();
                }
              });
            } else {
              createCard();
            }
          }
        });
      }, (err) => {
        if (err) {
          console.error(err);
        } else {
          console.log('Done');
        }
      });
    },
  },
};
