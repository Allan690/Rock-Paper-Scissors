<template>
  <div id="app">
    <HomeComponent></HomeComponent>
  </div>
</template>

<script>
import HomeComponent from "@/components/HomeComponent";

export default {
  name: 'app',
  components: {
    HomeComponent
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
