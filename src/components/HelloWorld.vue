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
    }
  },
  methods: {
    async connectWallet() {
      if (!this.client) {
        this.client = new Client()
      }
      await this.client.connect()
    },
    async ethSign() {
      if (!this.client) {
        this.client = new Client()
      }
      await this.client.ethSign()
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
