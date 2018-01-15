import { ComponentOptions } from 'vue';
import NmdeToolbarComponent from './component';

export default {
  props: {
    title: {
      type: String,
      required: true,
    },
  },
} as ComponentOptions<NmdeToolbarComponent>;
