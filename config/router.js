const router = require('express').Router()
const products = require('../controllers/products')
const suppliers = require('../controllers/suppliers')

router.route('/products')
  .get(products.index)

router.route('/suppliers')
  .get(suppliers.index)

module.exports = router