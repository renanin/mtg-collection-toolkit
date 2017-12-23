import Vue from 'vue';
import SetCodeResults from '../../classes/setCodeResults';

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
  manualSetName: string;
  setCodeResults: SetCodeResults;
  resolveSetChoice: Function;
  importCSV();
  selectFile();
  importStage1();
  importStage2();
  chooseSet(results: SetCodeResults): Promise<string>;
}
