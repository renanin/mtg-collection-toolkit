import Vue from 'vue';

export default interface CSVPageComponent extends Vue {
  quantityCol: number;
  nameCol: number;
  setCol: number;
  foilCol: number;
  hasHeader: boolean;
  file: string;
  parsed: string[][];
  setNameMap: {
    [name: string]: string;
  };
  loading: boolean;
  progress: number;
  completed: number;
  total: number;
  errors: string[];
  importCSV();
  selectFile();
  importStage1();
  importStage2();
}
