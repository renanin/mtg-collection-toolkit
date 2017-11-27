import Vue from 'vue';

export default interface MTGSetComponent extends Vue {
  name: string;
  icon: string;
  cardCount: number;
  code: string;
  progress: number;
  edit: Function;
}
