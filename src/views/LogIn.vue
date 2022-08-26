<template>
  <div class="form-container">
    <div class="form-wrapper">
      <h3>Log In</h3>
      <form @submit.prevent="handleLogIn">
        <div class="form-group">
          <label>Email</label>
          <input
            v-model="creds.email"
            type="email"
            class="form-control"
            placeholder="email"
          />
        </div>
        <div class="form-group">
          <label>Password</label>
          <input
            v-model="creds.password"
            type="password"
            class="form-control"
            placeholder="password"
          />
        </div>
        <button class="btn btn-primary btn-block">Login</button>
      </form>
      <button
        @click.prevent="handleEthLogin"
        v-if="isMetaMaskInstalled"
        class="btn web3"
      >
        Login w Metamask
      </button>
      <div v-if="!isMetaMaskInstalled" class="warning">
        Must Download Metamask
      </div>
    </div>
  </div>
</template>

<script setup>
import useAuth from '../composables/auth'
import { useRouter } from 'vue-router'
import { ref } from 'vue'

import { ethers } from 'ethers'

const { logIn, makeWeb3AuthRequest } = useAuth()

const router = useRouter()
const { ethereum } = window

const isMetaMaskInstalled = () => {
  //Have to check the ethereum binding on the window object to see if it's installed
  return Boolean(ethereum && ethereum.isMetaMask)
}

const creds = ref({
  email: '',
  password: '',
})

async function handleLogIn() {
  const response = await logIn(creds.value)
  if (!response.error) {
    router.push('/')
  }
}

// when login with metamask is clicked we retrieve and return the accounts associated with the wallet
//  see this link to compare signed message and public key
// https://github.com/OpenQDev/OpenQ-Github-OAuth-Server/pull/1/files
async function handleEthLogin() {
  /*  const res = await ethereum
    .request({ method: 'eth_requestAccounts' })
    .catch((error) => console.log(error))

  const address = res[0]
  console.log(address)

  ethereum.on('message', (message) => console.log(message))

  ethereum.on('connect', (info) => console.log(`connected to network ${info}`))

  const signedMessage = ethereum
    .request({ method: 'personal_sign', params: [address, '0x00000'] })
    .catch((error) => console.log(error))

  console.log(signedMessage) */

  // A Web3Provider wraps a standard Web3 provider, which is
  // what MetaMask injects as window.ethereum into each page
  const provider = new ethers.providers.Web3Provider(window.ethereum)

  // MetaMask requires requesting permission to connect users accounts
  const address = await provider.send('eth_requestAccounts', [])

  // The MetaMask plugin also allows signing transactions to
  // send ether and pay to change state within the blockchain.
  // For this, you need the account signer...
  const signer = provider.getSigner()
  const nonce = `nonce signed on ${new Date().getTime()}`

  const signature = await signer.signMessage(nonce)
  console.log(signer)
  console.log(signature)

  const response = await makeWeb3AuthRequest({
    address: address[0],
    signature: signature,
    message: nonce,
  })
  if (!response.error) {
    router.push('/')
  }
}
</script>

<style>
.form-container {
  display: flex;
  flex-direction: column;
  justify-content: top;
  align-items: center;
  padding-top: 60px;
  height: 100vh;
  background-color: rgb(255, 255, 255);
}

.form-wrapper {
  border-radius: 8px;
  display: flex;
  width: 300px;
  flex-direction: column;
  justify-content: left;
  align-items: left;
  padding: 50px;
  gap: 20px;
  background: #ffffff;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
}

.form-group {
  display: flex;
  flex-direction: column;
  order: 0;
  flex-grow: 0;
  font-family: Arial, Helvetica, sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  justify-content: left;
  margin: 10px 0px 10px 0px;
  gap: 10px;
  white-space: nowrap;
}
.btn {
  margin-top: 20px;
  width: 100%;
  border-radius: 4px;
  padding: 8px;
  background-color: rgb(255, 228, 152);
  border-radius: 4px;
  border: none;
  cursor: pointer;
}

.web3 {
  background-color: rgb(224, 146, 255);
}
label {
  width: auto;
  color: rgb(63, 63, 63);
}
input {
  display: block;
  align-self: right;
  width: 100%;
  border: 1px solid #d2d2d2;
  border-radius: 4px;
  padding: 2px 0px 2px 8px;
  box-sizing: border-box;
}

::placeholder {
  color: lightgray;
}
</style>
