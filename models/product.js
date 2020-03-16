const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  supplier: { type: mongoose.Schema.ObjectId, ref: 'Supplier', required: true },
  price: { type: Number, required: true }
})

productSchema.plugin(require('mongoose-unique-validator'))

module.exports = mongoose.model('Product', productSchema)