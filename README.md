## Simple Ethereum Verification Template

The purpose of the application is to allow users to submit a message and sign that message with their private key

Once that message is signed and propogated throughout the test network, users can then verify public address associated with that message

The application is built with vue.js, truffle, and ethereum; application can be used with metamask

### To start the application

0. Open 3 terminals that are in the root directory of this application
1. In the **first** terminal run the following command `cd signing-tx-cli && npm install -g truffle ganache-cli @vue/cli && npm install` - install all global and local dependencies required to run this application
2. In the **second** terminal run the following command `ganache-cli -i 1122` - this will deploy your local blockchain
3. In the **third** terminal run the following command `truffle migrate --reset --network development` - this will deploy your smart contracts to your local blockchain
4. In the **first** terminal run the following command `npm run dev` this will start your application 

### Sample screen shot
![alt text](https://raw.githubusercontent.com/mehranhydary/signing-ethereum-messages/signing-tx-cli/static/sample-screen.png)
