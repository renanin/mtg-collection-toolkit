import Component from 'vue-class-component';
import Vue from 'vue';

@Component({
  props: {
    title: {
      type: String,
      required: true,
    },
  },
})

export default class NmdeToolbar extends Vue {}
