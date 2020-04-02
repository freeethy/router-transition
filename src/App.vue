<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <transition :name="direction">
      <router-view />
    </transition>
  </div>
</template>

<script>
export default {
  computed: {
    direction() {
      return this.$store.state.routerHistory.direction;
    }
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.forward-enter-active,
.forward-leave-active,
.reverse-enter-active,
.reverse-leave-active {
  will-change: transform;
  transition: all 500ms;
  height: 100%;
  position: absolute;
  backface-visibility: hidden;
  perspective: 1000;
}
.forward-enter {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
.forward-leave-active {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.reverse-enter {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.reverse-leave-active {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
</style>
