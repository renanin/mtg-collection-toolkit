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
          let setCode = '';
          if (this.setNameMap[setName]) {
            setCode = this.setNameMap[setName];
          } else {
            try {
              setCode = await getSetCode(setName);
              this.setNameMap[setName] = setCode;
            } catch (e) {
              this.errors.push(`Error getting set code for ${setName}: ${e}`);
              next();
            }
          }
          console.log(`Searching for ${line[this.nameCol]}`);
          cardSearch(line[this.nameCol], setCode).then((result: {
            code: string;
            data: {
              id: string;
            }[];
          }) => {
            if (result.code === 'not_found') {
              this.errors.push(`No such card ${line[this.nameCol]} in set ${setCode}`);
              next();
            } else {
              if (!collection[setCode]) {
                collection[setCode.toLowerCase()] = {};
              }
              collection[setCode.toLowerCase()][result.data[0].id] = Number(line[this.quantityCol]);
              next();
            }
          }).catch((e) => {
            this.errors.push(`Error searching for ${line[this.nameCol]}: ${e}`);
            next();
          });
        },
        (e) => {
          if (e) {
            bus.$emit('notify', `Error assembling CSV: ${e}`);
          } else {
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
          }
        },
      );
    },
  },
} as ComponentOptions<CSVPageComponent>;
