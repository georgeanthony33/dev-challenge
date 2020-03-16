const mongoose = require('mongoose')
const { dbURI } = require('../config/environment')
const Supplier = require('../models/supplier')
const Product = require('../models/product')

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true }, (err, db) => {
  if (err) return console.log(err)
  db.dropDatabase()
    .then(() => {
      return Supplier.create([
        {
          name: 'New Co Ltd'
        }, {
          name: 'Old Co Ltd'
        }
      ])
    })
    .then(createdSuppliers => {
      console.log(`${createdSuppliers.length} suppliers created`)
      return Product.create([
        {
          name: 'Small wongle',
          supplier: createdSuppliers[0],
          price: 5
        }, {
          name: 'Large wongle',
          supplier: createdSuppliers[0],
          price: 8
        }, {
          name: 'Super wongle',
          supplier: createdSuppliers[0],
          price: 12
        }, {
          name: 'Mini wongle',
          supplier: createdSuppliers[1],
          price: 4
        }, {
          name: 'Small wongle',
          supplier: createdSuppliers[1],
          price: 6
        }, {
          name: 'Large wongle',
          supplier: createdSuppliers[1],
          price: 9
        }, {
          name: 'Super wongle',
          supplier: createdSuppliers[1],
          price: 13
        }
      ])
    })
    .then(createdProducts => console.log(`${createdProducts.length} products created`))
    .catch(err => console.log(err))
    .finally(() => mongoose.connection.close())
})