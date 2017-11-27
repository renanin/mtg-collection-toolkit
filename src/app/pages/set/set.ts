import Vue from 'vue';
import SetPageComponent from './component';

export default {
  computed: {
    code() {
      return this.$route.params.code;
    },
  },
} as Vue.ComponentOptions<SetPageComponent>;
