import Web3 from 'web3'

let getWeb3 = new Promise(function (resolve, reject) {
  // Check for injected web3 (mist/metamask)
  var web3js = window.web3
  if (typeof web3js !== 'undefined') {
    var web3 = new Web3(web3js.currentProvider)
    resolve({
      injectedWeb3: web3.eth.net.isListening(),
      web3 () {
        return web3
      }
    })
  } else {
    reject(new Error('Unable to connect to Metamask'))
  }
})
  .then(result => {
    return new Promise(function (resolve, reject) {
      let networkId = result.web3().givenProvider.networkVersion ? result.web3().givenProvider.networkVersion : 'Please provide a network id'
      result = Object.assign({}, result, {networkId})
      resolve(result)
    })
  })
  .then(result => {
    return new Promise(function (resolve, reject) {
      result = Object.assign({}, result, { coinbase: result.web3().eth.givenProvider.selectedAddress })
      resolve(result)
    })
  })
  .then(result => {
    return new Promise(function (resolve, reject) {
      // Retrieve balance for coinbase
      result.web3().eth.getBalance(result.coinbase, (err, balance) => {
        if (err) {
          reject(new Error('Unable to retrieve balance for address: ' + result.coinbase))
        } else {
          result = Object.assign({}, result, { balance })
          resolve(result)
        }
      })
    })
  })
  .then(result => {
    return new Promise(function (resolve, reject) {
      // Retrieve the msg / tx signing function
      let sign = result.web3().eth.sign ? result.web3().eth.sign : null
      result = Object.assign({}, result, {sign})
      resolve(result)
    })
  })
  .then(result => {
    return new Promise(function (resolve, reject) {
      let sha3 = result.web3().utils.sha3 ? result.web3().utils.sha3 : null
      result = Object.assign({}, result, {sha3})
      resolve(result)
    })
  })
  .then(result => {
    return new Promise(function (resolve, reject) {
      let contract = result.web3().eth.Contract ? result.web3().eth.Contract : null
      result = Object.assign({}, result, {contract})
      resolve(result)
    })
  })
export default getWeb3
