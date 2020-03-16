const Supplier = require('../models/supplier')

function indexRoute(req, res) {
  Supplier
    .find()
    .then(suppliers => res.status(200).json(suppliers))
    .catch(err => res.json(err))
}

module.exports = {
  index: indexRoute
}