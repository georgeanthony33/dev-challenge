/* global api, describe, it, beforeEach, afterEach, expect */
const Supplier = require('../../models/supplier')

describe('GET /suppliers', () => {

  beforeEach(done => {
    Supplier.create({
      name: 'New Co Ltd'
    }, {
      name: 'Old Co Ltd'
    })
      .then(() => done())
  })

  afterEach(done => {
    Supplier.deleteMany()
      .then(() => done())
  })

  it('should return a 200 response', (done) => {
    api.get('/api/suppliers')
      .end((err, res) => {
        expect(res.status).to.eq(200)
        done()
      })
  })

  it('should return an array', (done) => {
    api.get('/api/suppliers')
      .end((err, res) => {
        expect(res.body).to.be.an('array')
        done()
      })
  })

  it('should return an array of objects', (done) => {
    api.get('/api/suppliers')
      .end((err, res) => {
        res.body.forEach(supplier => {
          expect(supplier).to.be.an('object')
        })
        done()
      })
  })

  it('should return an array of objects with the correct fields', (done) => {
    api.get('/api/suppliers')
      .end((err, res) => {
        res.body.forEach(supplier => {
          expect(supplier).to.contains.keys([
            '_id',
            'name'
          ])
        })
        done()
      })
  })

  it('should return an array of objects with the correct fields and value types', (done) => {
    api.get('/api/suppliers')
      .end((err, res) => {
        res.body.forEach(supplier => {
          expect(supplier._id).to.be.a('string')
          expect(supplier.name).to.be.a('string')
        })
        done()
      })
  })

  it('should return the correct data', (done) => {
    api.get('/api/suppliers')
      .end((err, res) => {
        expect(res.body[0]._id).to.exist
        expect(res.body[0].name).to.eq('New Co Ltd')
        done()
      })
  })

})