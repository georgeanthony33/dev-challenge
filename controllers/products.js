const Product = require('../models/product')

function indexRoute(req, res) {
  Product
    .find()
    .populate('supplier')
    .then(products => res.status(200).json(products))
    .catch(err => res.json(err))
}

module.exports = {
  index: indexRoute
}