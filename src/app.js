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
      product: 'All'
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
        productsDropdown
      })
    } catch (err) {
      console.log(err)
    }
  }

  handleChange = e => {
    console.log(e.target.name, e.target.value)
    const filterSelections = {
      ...this.state.filterSelections,
      [e.target.name]: e.target.value
    }
    this.setState({ filterSelections })
  }

  render() {
    console.log(this.state.filterSelections)
    if (!this.state.productData) return null
    return (
      <div className="frontpage-container">
        <div className="title-container">
          <h1>The Wongle People</h1>
        </div>
        <div className="inputs-container">
          <select name="supplier" className="suppliers" onChange={this.handleChange}>
            <option value="All">All</option>
            {this.state.suppliersDropdown.map(supplier => (
              <option key={supplier} value={supplier}>{supplier}</option>
            ))}
          </select>
          <select name="product" className="products" onChange={this.handleChange}>
            <option value="All">All</option>
            {this.state.productsDropdown.map(product => (
              <option key={product} value={product}>{product}</option>
            ))}
          </select>
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
              {this.state.productData.filter(product => (product.supplier.name === this.state.filterSelections.supplier || this.state.filterSelections.supplier === 'All') && (product.name === this.state.filterSelections.product || this.state.filterSelections.product === 'All')).map(product => (
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