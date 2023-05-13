<template>
  <UserRegist/>
</template>
<script>
import UserRegist from "@/components/UserRegist.vue";

export default {
  name: 'App',
  components: {
    UserRegist,
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
