import Vue from 'vue';

export default interface SettingsPageComponent extends Vue {
  backupBeforeReset: boolean;
  reset();
  abandonReset();
  confirmReset();
  forceReset();
  createBackup(): Promise<void>;
  backup();
}
