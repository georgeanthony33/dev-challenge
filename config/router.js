const router = require('express').Router()
const products = require('../controllers/products')

router.route('/products')
  .get(products.index)

module.exports = router