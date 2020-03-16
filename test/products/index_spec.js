/* global api, describe, it, beforeEach, afterEach, expect */
const Supplier = require('../../models/supplier')
const Product = require('../../models/product')

describe('GET /products', () => {

  beforeEach(done => {
    Supplier.create({
      name: 'New Co Ltd'
    })
      .then(createdSupplier => {
        Product.create({
          name: 'Small wongle',
          supplier: createdSupplier,
          price: 5
        }, {
          name: 'Large wongle',
          supplier: createdSupplier,
          price: 8
        })
      })
      .then(() => done())
  })

  afterEach(done => {
    Supplier.deleteMany()
      .then(() => Product.deleteMany())
      .then(() => done())
  })

  it('should return a 200 response', (done) => {
    api.get('/api/products')
      .end((err, res) => {
        expect(res.status).to.eq(200)
        done()
      })
  })

  it('should return an array', (done) => {
    api.get('/api/products')
      .end((err, res) => {
        expect(res.body).to.be.an('array')
        done()
      })
  })

  it('should return an array of objects', (done) => {
    api.get('/api/products')
      .end((err, res) => {
        res.body.forEach(product => {
          expect(product).to.be.an('object')
        })
        done()
      })
  })

  it('should return an array of objects with the correct fields', (done) => {
    api.get('/api/products')
      .end((err, res) => {
        res.body.forEach(product => {
          expect(product).to.contains.keys([
            '_id',
            'name',
            'supplier',
            'price'
          ])
        })
        done()
      })
  })

  it('should return an array of objects with the correct fields and value types', (done) => {
    api.get('/api/products')
      .end((err, res) => {
        res.body.forEach(product => {
          expect(product._id).to.be.a('string')
          expect(product.name).to.be.a('string')
          expect(product.supplier.name).to.be.an('string')
          expect(product.price).to.be.a('number')
        })
        done()
      })
  })

  it('should return the correct data', (done) => {
    api.get('/api/products')
      .end((err, res) => {
        expect(res.body[0]._id).to.exist
        expect(res.body[0].name).to.eq('Small wongle')
        expect(res.body[0].supplier.name).to.eq('New Co Ltd')
        expect(res.body[0].price).to.eq(5)
        done()
      })
  })

})