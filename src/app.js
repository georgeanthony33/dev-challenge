import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import './styles/main.scss'

class App extends React.Component {
  state = {

  }

  async componentDidMount() {
    try {
      const res = await axios.get('/api/products')
      console.log(res)
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    return (
      <h1>Hello</h1>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)