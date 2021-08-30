const HDWalletProvider = require("@truffle/hdwallet-provider");
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*", // Match any network id
      websockets: true
    },
    rinkeby: {
      provider: function() {
        return new HDWalletProvider(process.env.MNEMONIC, process.env.PROVIDER)
      },
      network_id: 4
    }
  },
  compilers: {
    solc: {
      version: "^0.8.6"
    }
  }
};