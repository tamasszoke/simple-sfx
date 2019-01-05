<template>
  <div class="hello">
    <h2>Click on the logo to test the sound!</h2>
    <p>Watch the console for more.</p>
    <a
      className="App-link"
      href="https://github.com/tamasszoke/simple-sfx"
      target="_blank"
      rel="noopener noreferrer"
    >
      simple-sfx module
    </a>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
