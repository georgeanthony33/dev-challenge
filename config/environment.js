require('dotenv').config()
const port = process.env.PORT || 4000

const env = process.env.NODE_ENV || 'development'
const dbURI = env === 'production' ? 'mongodb://localhost:27017/wongle-data' : `mongodb://localhost:27017/wongle-data-${env}`

module.exports = { port, env, dbURI }