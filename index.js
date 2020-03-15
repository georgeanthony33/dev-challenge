const express = require('express')
const mongoose = require('mongoose')
const app = express()

const { port, dbURI } = require('./config/environment')

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
  if (err) return console.log(err)
  console.log('Mongo is connected')
})

app.listen(port, () => console.log(`Up and running on port ${port}`))