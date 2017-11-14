"use strict";

Vue.component('hello-component', {
  template: '#hello',
  data: function () {
    return {
      message: 'Welcome to your Vue.js app!'
    };
  },
  methods: {
    change: function(value) {
      this.message = "new " + value;
    }
  }
});
