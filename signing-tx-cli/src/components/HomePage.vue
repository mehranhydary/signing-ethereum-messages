<template>
  <div class="signedMessage">
    <h1>{{ msg }}</h1>
    <p>The purpose of this application is to sign messages for the Ethereum blockchain with your Ethereum address</p>
    <form>
    <div class="form-group">
      <label>Message</label>
      <input type="text" ref="message" class="form-control" placeholder="Enter message">
      <small id="" class="form-text text-muted">Sign your message with your private key.</small>
    </div>
    <button class='btn btn-secondary' v-on:click="signMessage()">Sign!</button>
  </form><br/>
  <h4>{{signedMessageTitle}}</h4>
  <h5>{{signedMessage}}</h5>
  <button class='btn btn-secondary' v-on:click="verifyMessage()">Verify!</button><br/>
  <span v-if="verified" class="badge badge-pill badge-success">Account is verified</span>
  <span v-else class="badge badge-pill badge-danger">Account is unverified</span>
  </div>
</template>

<script>
import json from '../../../build/contracts/Verification.json'
export default {
  name: 'signedMessage',
  beforeCreate () {
    this.$store.dispatch('registerWeb3')
  },
  data () {
    return {
      msg: 'Sign your message!',
      signedMessage: '',
      signedMessageTitle: '',
      verified: false
    }
  },
  methods: {
    signMessage: function () {
      let message = this.$refs.message.value ? this.$refs.message.value : ''
      this.$store.state.web3.sign(this.$store.state.web3.sha3(message), this.$store.state.web3.coinbase)
        .then(result => {
          this.signedMessage = result
          this.signedMessageTitle = 'Signed Message'
        })
        .catch(err => console.log(err))
    },
    verifyMessage: function () {
      let contract = new this.$store.state.web3.Contract(json.abi, json.networks[1122].address)
      let message = this.$refs.message.value ? this.$refs.message.value : ''
      contract.methods.recover(this.$store.state.web3.sha3(message), this.signedMessage)
        .call()
        .then(result => {
          this.verified = (result.toLowerCase() === this.$store.state.web3.coinbase.toLowerCase())
        })
        .catch(err => console.log(err))
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
