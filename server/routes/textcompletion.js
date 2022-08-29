require('dotenv').config()

const { Configuration, OpenAIApi } = require('openai')

const express = require('express')
const router = express.Router()

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})

const openai = new OpenAIApi(configuration)

router.get('/', async (req, res) => {
  const response = await openai.listModels()
  console.log(response)
  res.send(response.data)
})

router.post('/', async (req, res) => {
  const text = req.body
  console.log(text)
  const response = await openai.createCompletion({
    // model: 'text-davinci-002',
    model: 'text-ada-001',
    prompt: text.prompt,
    max_tokens: 64,
    temperature: 0.5,
    top_p: 1,
  })
  res.send(response.data)
})

module.exports = router
