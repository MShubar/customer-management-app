//Require
const express = require('express')
const cors = require('cors')
const session = require('express-session')
const bodyParser = require('body-parser')
const app = express()

require('dotenv').config()
const SESSION_SECRET = process.env.SESSION_SECRET || 'default-secret'
const PORT = process.env.PORT || 5000
app.use(
  cors({
    origin: 'http://localhost:5173'
  })
)
app.use(bodyParser.json())
app.use(express.json())
app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: process.env.NODE_ENV === 'production' }
  })
)

//Routes
const userRoutes = require('./routes/auth')
const customerRoutes = require('./routes/customers')

app.use('/users', userRoutes)
app.use('/customers', customerRoutes)

//server execute
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
})
