module.exports = {
  networks: {
  	development: {
  		host: 'localhost',
  		port: 8001,
  		network_id: "*",
  		gas: 4600000
  	}
  },
  solc: {
    optimizer: {
      enabled: true,
      runs: 200
    }
  }
}
