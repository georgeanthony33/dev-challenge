const express = require('express')
const mongoose = require('mongoose')
const app = express()

const router = require('./config/router')
const { port, dbURI } = require('./config/environment')

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
  if (err) return console.log(err)
  console.log('Mongo is connected')
})

app.use('/api', router)

app.listen(port, () => console.log(`Up and running on port ${port}`))