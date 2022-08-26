require('dotenv').config()
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')

const uri = process.env.MONGODB_URI
const { MongoClient } = require('mongodb')
const client = new MongoClient(uri)

const sessions = require('express-session')
const MongoStore = require('connect-mongo')

const app = express()

// middleware

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(
  sessions({
    secret: 'secret',
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60,
      sameSite: false,
      secure: false,
      httpOnly: true,
    },
    resave: false,
    store: MongoStore.create({
      client,
      dbName: 'test',
      collectionName: 'sessions',
      autoRemove: 'native',
    }),
  })
)

app.use(
  cors({
    origin: ['http://localhost:3000'],
    credentials: true,
    exposedHeaders: ['*', 'Authorization'],
    allowedHeaders: ['Content-Type', 'Authorization', 'x-csrf-token'],
    methods: ['GET', 'PUT', 'POST'],
  })
)

// routes
const signup = require('./routes/signup')
const login = require('./routes/login')
const web3login = require('./routes/web3login')
const home = require('./routes/home')
const logout = require('./routes/logout')
const user = require('./routes/user')
const messages = require('./routes/messages')
const textcompletion = require('./routes/textcompletion')

app.use('/signup', signup)
app.use('/login', login)
app.use('/web3login', web3login)
app.use('/home', home)
app.use('/logout', logout)
app.use('/user', user)
app.use('/messages', messages)
app.use('/textcompletion', textcompletion)

app.listen(8000, () => {
  console.log('server listening on port 8000')
})
