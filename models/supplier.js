const mongoose = require('mongoose')

const supplierSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true }
})

supplierSchema.plugin(require('mongoose-unique-validator'))

module.exports = mongoose.model('Supplier', supplierSchema)