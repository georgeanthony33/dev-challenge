const mongoose = require('mongoose')

const productSchema = new mongoose.Model({
  name: { type: String, required: true },
  supplier: { type: mongoose.Schema.ObjectId, ref: 'Supplier', required: true },
  price: { type: Number, required: true }
})

module.exports = mongoose.model('Product', productSchema)