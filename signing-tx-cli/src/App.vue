<template>
  <div>
    <nav class="navbar navbar-light bg-light" style="">
      <a class="navbar-brand" href="#">Ether Message</a>
      <ul class='navbar-nav mr-auto'>
        <li class='nav-item'>{{addr}}</li>
      </ul>
    </nav>
    <div id="app">
      <img class='img-fluid' src="./assets/logo.jpg">
      <router-view/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  beforeCreate () {
    this.$store.dispatch('registerWeb3')
    console.log(this.$store.state.web3.coinbase)
  },
  data () {
    return {
      addr: this.$store.state.web3.coinbase
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
