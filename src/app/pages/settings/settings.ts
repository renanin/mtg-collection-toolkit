import fs from 'fs';
import read from 'read-big-file';
import { ComponentOptions } from 'vue';
import SettingsPageComponent from './component';
import bus from '../../../bus';

export default {
  data() {
    return {
      backupBeforeReset: true,
    };
  },
  methods: {
    reset() {
      (this.$refs.confirmResetDialog as any).open();
    },
    abandonReset() {
      (this.$refs.confirmResetDialog as any).close();
    },
    createBackup() {
      return new Promise((resolve, reject) => {
        read('userdata/collection.mtgcollection').then((oldCollection) => {
          fs.writeFile(
            `userdata/collection-backup-${Date.now()}.mtgcollection`,
            oldCollection,
            (e) => {
              if (e) {
                reject(`Error backing up collection: ${e}`);
              } else {
                resolve();
              }
            },
          );
        });
      });
    },
    backup() {
      this.createBackup().then(() => {
        bus.$emit('notify', 'Sucessfully created backup');
      }).catch((e) => {
        bus.$emit('notify', e);
      });
    },
    forceReset() {
      fs.writeFile('userdata/collection.mtgcollection', '{}', (e) => {
        if (e) {
          bus.$emit('notify', `Error resetting collection: ${e}`);
        } else {
          bus.$emit('notify', 'Successfully reset collection');
        }
      });
    },
    confirmReset() {
      if (this.backupBeforeReset) {
        this.createBackup().then(() => {
          this.forceReset();
        }).catch((e) => {
          bus.$emit('notify', e);
        });
      } else {
        this.forceReset();
      }
      (this.$refs.confirmResetDialog as any).close();
    },
  },
} as ComponentOptions<SettingsPageComponent>;
