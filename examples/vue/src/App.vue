<template>
  <div id="app">
    <img @click="clickSound" src="./assets/logo.png">
    <router-view/>
  </div>
</template>

<script>
import sfx from 'simple-sfx'
// eslint-disable-next-line
this.audio = new sfx([
  './static/start.ogg'
], true)

export default {
  name: 'App',
  methods: {
    clickSound: () => {
      this.audio.play('start')
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
