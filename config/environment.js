require('dotenv').config()
const port = process.env.PORT || 4000
// const dbURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/wongle-data'

const env = process.env.NODE_ENV || 'development'
const dbURI = env === 'production' ? process.env.MONGODB_URI : `${process.env.MONGODB_URI}-${env}`

module.exports = { port, env, dbURI }