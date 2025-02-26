<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <button @click="connectWallet">Connect Wallet</button>
    <button @click="ethSign">Eth Sign</button>
    <div id="root"></div>
  </div>
</template>

<script>
import Client from './core.js'

export default {
  name: 'HelloWorld',
  props: {
    msg: String,
  },
  data() {
    return {
      client: null,
      chainId: null,
      account: null,
    }
  },
  methods: {
    async connectWallet() {
      const core = new Client()
      //1. connect binance wallet
      const { client, chainId, accounts } = await core.connect()
      console.log('client', client)
      console.log('chainId', chainId)
      console.log('accounts', accounts)
      this.client = client
      this.chainId = chainId
      this.account = 'binance_' + accounts[0]

      //2. get nonce
      const nonce = 1

      if (client) {
        //3. get Signature
        const signature = await core.ethSign(this.client, this.account, nonce)
        console.log('signature', signature)
        //4. signature send to server

        return
      }
      alert('Please connect to wallet')
    },
    async ethSign() {
      const core = new Client()

      await core.ethSign(this.client)
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
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
