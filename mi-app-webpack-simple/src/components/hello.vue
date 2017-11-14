<template>
<div>
  <h1>{{ message }}</h1>
  <input v-model="message">
  <button v-on:click="change('message')">change</button>
  <child></child>
</div>
</template>

<script>
import Child from './child.vue';

export default {
  components: {
    'Child': Child
  },
  data: function () {
    return {
      message: 'Welcome to your Vue.js app!'
    };
  },
  methods: {
    change: function (value) {
      this.message = "new " + value;
    }
  }
}
</script>

<style scoped>
h1 {
  font-style: italic;
  color: blue;
}
</style>
