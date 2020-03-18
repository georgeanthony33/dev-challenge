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
      const productsDropdown = Array.from(new Set(filteredDataBySupplier.map(product => (product.name))))
      const suppliersDropdown = Array.from(new Set(filteredDataByPrice.map(product => (product.supplier.name))))
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
    console.log(this.state.filterSelections.maxPrice)
    if (!this.state.productData) return null
    return (
      <div className="frontpage-container">
        <div className="title-container">
          <h1>The Wongle People</h1>
          <h2>Choose your favourite wongle from your favourite supplier!</h2>
        </div>
        <div className="inputs-container">
          <h2>Product pricing</h2>
          <form>
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
            <label htmlFor="selMinPrice">Min Price</label>
            <input
              id="selMinPrice"
              className="input"
              name="minPrice"
              type="number"
              onBlur={this.handleChange}
            />
            <label htmlFor="selMaxPrice">Max Price</label>
            <input
              id="selMaxPrice"
              className="input"
              name="maxPrice"
              type="number"
              onBlur={this.handleChange}
            />
            <button onClick={this.handleSubmit}>Search</button>
          </form>
        </div>
        <div className="products-container">
          <h2>Product details</h2>
          <table>
            <thead>
              <tr>
                <th>Supplier</th>
                <th>Product</th>
                <th>Price</th>
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
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)