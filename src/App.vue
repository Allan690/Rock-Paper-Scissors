<template>
  <div id="app">
    <GameComponent></GameComponent>
  </div>
</template>

<script>
import GameComponent from "@/components/GameComponent";

export default {
  name: 'app',
  components: {
    GameComponent
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Raleway&display=swap');
#app {
  font-family: "Raleway", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
