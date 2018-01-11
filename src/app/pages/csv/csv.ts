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
import CardResponse from '../../classes/cardResponse';

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
      done: false,
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
        (this.$refs.chooseSetDialog as any).open();
        this.resolveSetChoice = resolve;
      });
    },
    setChoice(code: string) {
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
          const cardName = line[this.nameCol];
          try {
            const cardInfo = <any>await cardSearch(cardName, setName);
            const printings = <CardResponse[]>cardInfo.data;
            let match = null;
            if (printings) {
              printings.forEach((printing) => {
                if (printing.set === setName || printing.set_name === setName) {
                  match = printing;
                }
              });
            }
            if (match) {
              const code = cardInfo.set;
              if (!collection[code]) {
                collection[code] = {};
              }
              collection[code][cardInfo.id] = Number(line[this.quantityCol]);
              next();
            } else {
              this.errors.push(`No printing of ${name} in ${setName}`);
              next();
            }
          } catch (e) {
            console.error(e);
            this.errors.push(e);
            next();
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
              this.done = true;
            }
          });
        },
      );
    },
  },
} as ComponentOptions<CSVPageComponent>;
