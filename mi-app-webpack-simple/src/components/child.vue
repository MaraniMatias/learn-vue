<template>
<div>
  <h1>{{ reversedMessage }}</h1>
</div>
</template>

<script>
export default {
  data: function () {
    return {
      message: 'Welcome to your Vue.js app!'
    };
  },
 computed: {
    reversedMessage: function () {
      return this.message.split('').reverse().join('')
    }
  }
}
</script>

<style scoped>
h1 {
  font-style: italic;
  color: red;
}
</style>
