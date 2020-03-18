import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import './styles/main.scss'

class App extends React.Component {
  state = {
    productData: [],
    filteredData: [],
    suppliersDropdown: [],
    productsDropdown: [],
    filterSelections: {
      supplier: 'All',
      product: 'All',
      minPrice: '',
      maxPrice: ''
    }
  }

  async componentDidMount() {
    try {
      const res = await axios.get('/api/products')
      const productData = res.data

      productData.sort(this.compare)

      const suppliersDropdown = Array.from(new Set(productData.map(product => (product.supplier.name))))
      const productsDropdown = Array.from(new Set(productData.map(product => (product.name))))
      this.setState({
        productData,
        suppliersDropdown,
        productsDropdown,
        filteredData: productData
      })
    } catch (err) {
      console.log(err)
    }
  }

  compare = (a, b) => {
    const supplierA = a.supplier.name.toUpperCase()
    const supplierB = b.supplier.name.toUpperCase()
    const priceA = a.price
    const priceB = b.price
  
    let comparison = 0
    if (supplierA > supplierB) {
      comparison = 1
    } else if (supplierA < supplierB) {
      comparison = -1
    } else {
      if (priceA > priceB) {
        comparison = 1
      } else if (priceA < priceB) {
        comparison = -1
      }
    }
    return comparison
  }

  handleChange = e => {
    e.persist()
    const filterSelections = {
      ...this.state.filterSelections,
      [e.target.name]: e.target.value
    }
    this.setState({ filterSelections }, () => this.filterDropdowns(e.target.name))
  }

  filterDropdowns(filterName) {
    const filteredDataByPrice = this.state.productData.filter(product => (
      (product.price >= this.state.filterSelections.minPrice || this.state.filterSelections.minPrice === '') &&
      (product.price <= this.state.filterSelections.maxPrice || this.state.filterSelections.maxPrice === '')
    ))
    if (filterName === 'product') {
      const filteredDataByProduct = filteredDataByPrice.filter(product => (
        product.name === this.state.filterSelections.product || this.state.filterSelections.product === 'All'
      ))
      const suppliersDropdown = Array.from(new Set(filteredDataByProduct.map(product => (product.supplier.name))))
      this.setState({ suppliersDropdown })
    } else if (filterName === 'supplier') {
      const filteredDataBySupplier = filteredDataByPrice.filter(product => (
        product.supplier.name === this.state.filterSelections.supplier || this.state.filterSelections.supplier === 'All'
      ))
      const productsDropdown = Array.from(new Set(filteredDataBySupplier.map(product => (product.name))))
      this.setState({ productsDropdown })
    } else if (filterName === 'minPrice' || filterName === 'maxPrice') {
      const filteredDataBySupplier = filteredDataByPrice.filter(product => (
        product.supplier.name === this.state.filterSelections.supplier || this.state.filterSelections.supplier === 'All'
      ))
      const suppliersDropdown = Array.from(new Set(filteredDataByPrice.map(product => (product.supplier.name))))
      const productsDropdown = Array.from(new Set(filteredDataBySupplier.map(product => (product.name))))
      if (!suppliersDropdown.includes(this.state.filterSelections.supplier) && !productsDropdown.includes(this.state.filterSelections.product)) {
        const supplier = 'All'
        const product = 'All'
        this.setState({ 
          filterSelections: {
            ...this.state.filterSelections,
            supplier,
            product
          }
        })
      } else if (!suppliersDropdown.includes(this.state.filterSelections.supplier)) {
        const supplier = 'All'
        this.setState({ 
          filterSelections: {
            ...this.state.filterSelections,
            supplier
          }
        })
      } else if (!productsDropdown.includes(this.state.filterSelections.product)) {
        const product = 'All'
        this.setState({ 
          filterSelections: {
            ...this.state.filterSelections,
            product
          }
        })
      }
      this.setState({ suppliersDropdown, productsDropdown })
    }
  }

  handleSubmit = e => {
    e.preventDefault()
    const filteredData = this.state.productData.filter(product => 
      (product.supplier.name === this.state.filterSelections.supplier
        || this.state.filterSelections.supplier === 'All')
      && (product.name === this.state.filterSelections.product
        || this.state.filterSelections.product === 'All')
      && (product.price >= this.state.filterSelections.minPrice
        || this.state.filterSelections.minPrice === '')
      && (product.price <= this.state.filterSelections.maxPrice
        || this.state.filterSelections.maxPrice === '')
    )
    this.setState({ filteredData })
  }

  render() {
    if (!this.state.productData) return null
    return (
      <div className="frontpage-container">
        <div className="title-container">
          <h1>The Wongle People</h1>
          <h2>Choose your favourite wongle from your favourite supplier!</h2>
        </div>
        <div className="products-outer-container">
          <div className="inputs-container">
            <h2>Product Search</h2>
            <form>
              <div className="filter-input">
                <label htmlFor="selSupplier">Supplier</label>
                <select
                  id="selSupplier"
                  name="supplier"
                  className="suppliers"
                  onChange={this.handleChange}
                >
                  <option value="All">All</option>
                  {this.state.suppliersDropdown.map(supplier => (
                    <option key={supplier} value={supplier}>{supplier}</option>
                  ))}
                </select>
              </div>
              <div className="filter-input">
                <label htmlFor="selProduct">Product</label>
                <select
                  id="selProduct"
                  name="product"
                  className="products"
                  onChange={this.handleChange}
                >
                  <option value="All">All</option>
                  {this.state.productsDropdown.map(product => (
                    <option key={product} value={product}>{product}</option>
                  ))}
                </select>
              </div>
              <div className="filter-input">
                <label htmlFor="selMinPrice">Min Price (£)</label>
                <input
                  id="selMinPrice"
                  className="input"
                  name="minPrice"
                  type="number"
                  onBlur={this.handleChange}
                />
              </div>
              <div className="filter-input">
                <label htmlFor="selMaxPrice">Max Price (£)</label>
                <input
                  id="selMaxPrice"
                  className="input"
                  name="maxPrice"
                  type="number"
                  onBlur={this.handleChange}
                />
              </div>
              <button onClick={this.handleSubmit}>Search</button>
            </form>
          </div>
          <div className="product-listing-container">
            <h2>Product Listing</h2>
            <table>
              <thead>
                <tr>
                  <th>Supplier</th>
                  <th>Product</th>
                  <th>Price (£)</th>
                </tr>
              </thead>
              <tbody>
                {this.state.filteredData.map(product => (
                  <tr key={product._id}>
                    <td>{product.supplier.name}</td>
                    <td>{product.name}</td>
                    <td>{product.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)