import { ComponentOptions } from 'vue';
import MTGCardComponent from './component';

export default {
  props: ['card'],
  methods: {
    increment() {
      this.card.increment();
    },
    decrement() {
      this.card.decrement();
    },
  },
} as ComponentOptions<MTGCardComponent>;
