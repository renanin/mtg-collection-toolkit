import Vue from 'vue';
import MTGSetComponent from './component';

export default {
  props: {
    name: String,
    icon: String,
  },
} as Vue.ComponentOptions<MTGSetComponent>;
