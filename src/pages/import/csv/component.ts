import Vue from 'vue';

export default interface ImportCSVComponent extends Vue {
  path: string;
  headers: string[];
  body: string[][];
  headerOptions: string[];
}
