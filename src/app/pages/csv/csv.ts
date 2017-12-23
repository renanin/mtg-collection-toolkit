import { ComponentOptions } from 'vue';
import { remote } from 'electron';
import async from 'async';
import fs from 'fs';
import read from 'read-big-file';
import CSVPageComponent from './component';
import bus from '../../../bus';
import Collection from '../../classes/collection';
import getSetCode from '../../util/getSetCode';
import cardSearch from '../../util/cardSearch';

export default {
  data() {
    return {
      quantityCol: 0,
      nameCol: 2,
      setCol: 3,
      foilCol: 6,
      hasHeader: true,
      file: '',
      parsed: [[], [], []],
      setNameMap: {},
      loading: false,
      progress: 0,
      completed: 0,
      total: 0,
      errors: [],
      manualSetName: '',
      setCodeResults: {},
      resolveSetChoice() {},
    };
  },
  methods: {
    importCSV() {
      (this.$refs.importDialog as any).open();
    },
    selectFile() {
      remote.dialog.showOpenDialog(
        {
          title: 'Open CSV',
          filters: [
            {
              name: 'CSV',
              extensions: ['csv'],
            },
          ],
        },
        (file) => {
          this.file = file[0];
        },
      );
    },
    cancelImport() {
      (this.$refs.importDialog as any).close();
      (this.$refs.previewDialog as any).close();
      this.parsed = [[], [], []];
    },
    importStage1() {
      read(this.file).then((csv) => {
        const lines = csv.split(/\n/);
        const parsed = [];
        if (this.hasHeader) {
          lines.shift();
        }
        lines.forEach((line) => {
          parsed.push([]);
          let current = '';
          let inString = false;
          line.split('').forEach((char) => {
            if (char === '\"') {
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
        this.parsed = parsed;
        this.total = parsed.length;
        (this.$refs.importDialog as any).close();
        (this.$refs.previewDialog as any).open();
      }).catch((e) => {
        bus.$emit('notify', `Could not open CSV: ${e}`);
      });
    },
    chooseSet(results): Promise<string> {
      return new Promise((resolve) => {
        console.log('Waiting for choice...');
        (this.$refs.chooseSetDialog as any).open();
        this.resolveSetChoice = resolve;
      });
    },
    setChoice(code: string) {
      console.log(`Got choice: ${code}, resolving...`);
      this.resolveSetChoice(code);
      this.resolveSetChoice = () => {};
      (this.$refs.chooseSetDialog as any).close();
    },
    importStage2() {
      this.loading = true;
      (this.$refs.previewDialog as any).close();
      const collection: Collection = {};
      async.eachSeries(
        this.parsed,
        async (line, next) => {
          this.completed += 1;
          this.progress = (this.completed / this.total) * 100;
          const setName = line[this.setCol];
          console.log(`Set name: ${setName}`);
          const setCode = async () => {
            return new Promise(async (resolve, reject) => {
              console.log(`Determining set code of ${setName}`);
              if (this.setNameMap[setName]) {
                console.log(`Set code (${this.setNameMap[setName]}) is already in memory`);
                resolve(this.setNameMap[setName]);
              } else {
                try {
                  console.log('Getting set code...');
                  const setCodeResults = await getSetCode(setName);
                  if (setCodeResults.sets.length > 1) {
                    console.log('Multiple possibilities');
                    this.manualSetName = setName;
                    this.setCodeResults = setCodeResults;
                    console.log('Waiting for user response...');
                    const choice = await this.chooseSet(setCodeResults);
                    console.log(`User chose ${choice}`);
                    // Wait for previous dialog to close :\
                    setTimeout(
                      () => {
                        resolve(choice);
                      },
                      1000,
                    );
                  } else {
                    console.log(`Found 1 possibility: ${setCodeResults.sets[0].code}`);
                    resolve(setCodeResults.sets[0].code);
                  }
                } catch (e) {
                  console.error(`Error getting set code for ${setName}: ${e}`);
                  reject(`Error getting set code for ${setName}: ${e}`);
                }
              }
            });
          };
          try {
            const code = <string>await setCode();
            console.log(`Determined set code: ${code}`);
            this.setNameMap[setName] = code;
            console.log(`Searching for ${line[this.nameCol]} in ${code}`);
            cardSearch(line[this.nameCol], code).then((result: {
              code: string;
              data: {
                id: string;
              }[];
            }) => {
              if (result.code === 'not_found') {
                console.error(`No such card ${line[this.nameCol]} in set ${code}`);
                this.errors.push(`No such card ${line[this.nameCol]} in set ${code}`);
                next();
              } else {
                if (!collection[code]) {
                  console.log('Creating new set entry');
                  collection[code.toLowerCase()] = {};
                }
                console.log(`Done: ${line}`);
                collection[code.toLowerCase()][result.data[0].id] = Number(line[this.quantityCol]);
                next();
              }
            }).catch((e) => {
              console.error(`Error searching for ${line[this.nameCol]}: ${e}`);
              this.errors.push(`Error searching for ${line[this.nameCol]}: ${e}`);
              next();
            });
          } catch (e) {
            console.error(e);
            this.errors.push(e);
          }
        },
        () => {
          this.$store.commit('loadCollection', collection);
          this.$store.commit('emptySets');
          this.$store.dispatch('fetchSets');
          this.loading = false;
          fs.writeFile('userdata/collection.mtgcollection', JSON.stringify(collection), (err) => {
            if (err) {
              bus.$emit('notify', `Could not write to collection: ${err}`);
            } else {
              bus.$emit('notify', `Successfully imported ${this.total - this.errors.length} cards`);
              this.$router.push('/database');
            }
          });
        },
      );
    },
  },
} as ComponentOptions<CSVPageComponent>;
