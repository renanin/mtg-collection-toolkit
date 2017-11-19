import Vue from 'vue';

export default interface CSVPageComponent extends Vue {
  path: string;
  headers: string[];
  body: string[][];
  headerOptions: string[];
}
