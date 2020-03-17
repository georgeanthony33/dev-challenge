import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import './styles/main.scss'

class App extends React.Component {
  state = {
    productData: []
  }

  async componentDidMount() {
    try {
      const res = await axios.get('/api/products')
      const productData = res.data
      this.setState({ productData })
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    console.log(this.state.productData)
    if (!this.state.productData) return null
    return (
      <div className="frontpage-container">
        <div className="title-container">
          <h1>The Wongle People</h1>
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
              {this.state.productData.map(product => (
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