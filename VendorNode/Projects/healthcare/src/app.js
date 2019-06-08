App = {
  loading: false,
  contracts: {},

  load: async () => {
    await App.loadWeb3()
    await App.loadAccount()
    await App.loadContract()
    await App.render()
  },

  // https://medium.com/metamask/https-medium-com-metamask-breaking-change-injecting-web3-7722797916a8
  loadWeb3: async () => {
    if (typeof web3 !== 'undefined') {
      App.web3Provider = web3.currentProvider
      web3 = new Web3(web3.currentProvider)
    } else {
      window.alert("Please connect to Metamask.")
    }
    // Modern dapp browsers...
    if (window.ethereum) {
      window.web3 = new Web3(ethereum)
      try {
        // Request account access if needed
        await ethereum.enable()
        // Acccounts now exposed
        web3.eth.sendTransaction({/* ... */})
      } catch (error) {
        // User denied account access...
      }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
      App.web3Provider = web3.currentProvider
      window.web3 = new Web3(web3.currentProvider)
      // Acccounts always exposed
      web3.eth.sendTransaction({/* ... */})
    }
    // Non-dapp browsers...
    else {
      console.log('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  },

  loadAccount: async () => {
    // Set the current blockchain account
    App.account = web3.eth.accounts[0]
  },

  loadContract: async () => {
    // Create a JavaScript version of the smart contract
    const medRec = await $.getJSON('MedRec.json')
    App.contracts.MedRec = TruffleContract(medRec)
    App.contracts.MedRec.setProvider(App.web3Provider)

    // Hydrate the smart contract with values from the blockchain
    App.medRec = await App.contracts.MedRec.deployed()
  },

  render: async () => {
    // Prevent double render
    if (App.loading) {
      return
    }

    // Update app loading state
    App.setLoading(true)

    // Render Account
    $('#account').html(App.account)

    // Update loading state
    App.setLoading(false)
  },
  
  setLoading: (boolean) => {
    App.loading = boolean
    const loader = $('#loader')
    const content = $('#content')
    if (boolean) {
      loader.show()
      content.hide()
    } else {
      loader.hide()
      content.show()
    }
  },
  
  register: async() => {
   App.setLoading(true);
   const id = $('#id').val();
   const firstName = $('#fname').val();
   const lastName = $('#lname').val();
   const date = new Date($('#dob').val());
   const curr_date = new Date();
   const problem = $('#problem').val();
   const doctorAssigned = $('#doctor').val();
   await App.medRec.registration(parseInt(id), firstName + " " + lastName, date.getFullYear(), date.getMonth()+1, date.getDate(), curr_date.getFullYear(), curr_date.getMonth()+1, curr_date.getDate(), problem, doctorAssigned);
   App.setLoading(false);
   window.location.reload()
  },
  
  /*checkPatient: async() => {
  	const variable = await App.medRec.vewPatient(298641984692);
  	console.log(variable);
	window.stop()
  }*/
}

$(() => {
  $(window).load(() => {
    App.load()
  })
})
