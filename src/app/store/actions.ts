import request from 'request';
import async from 'async';
import BasicSetInfo from '../classes/basicSetInfo';
import cacheExists from '../util/cacheExists';
import readCache from '../util/readCache';
import writeCache from '../util/writeCache';
import CacheResults from '../classes/cacheResults';
import ApiResult from '../classes/apiResult';
import Card from '../classes/card';

export default {
  loadSet({ state, commit }, info: BasicSetInfo) {
    function getPage(code: string, page: number = 1): Promise<ApiResult> {
      return new Promise((resolve, reject) => {
        request(
          `https://api.magicthegathering.io/v1/cards?set=${code}&page=${page}`,
          (err, res, body) => {
            if (err) {
              reject(err);
            } else {
              try {
                resolve(JSON.parse(body));
              } catch (e) {
                reject(e);
              }
            }
          });
      });
    }
    cacheExists('set', info.code).then((exists) => {
      if (exists) {
        readCache('set', info.code).then((body) => {
          try {
            const data: CacheResults = JSON.parse(body);
            data.fromCache = true;
            commit('loadSet', data);
          } catch (e) {
            console.error(e);
          }
        }).catch((err) => {
          console.error(err);
        });
      } else {
        const data: CacheResults = {
          fromCache: false,
          code: info.code,
          name: info.name,
          cards: [],
        };
        let cont = true;
        let page = 1;
        async.whilst(
          () => cont,
          (callback) => {
            getPage(info.code, page).then((res) => {
              res.cards.forEach((card) => {
                data.cards.push(new Card(card.name, card.set, card.setName, card.multiverseid));
              });
              page += 1;
              if (res.cards.length < 100) {
                cont = false;
              }
              callback();
            }).catch((err) => {
              callback(err);
            });
          },
          (error) => {
            if (error) {
              console.error(error);
            } else {
              writeCache('set', info.code, data).then(() => {
                commit('loadSet', data);
              }).catch((err) => {
                console.error(err);
              });
            }
          });
      }
    });
  },
};
