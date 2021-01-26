import React, { Component } from 'react'
import './App.css'
class App extends Component {
  state = {
    cow: '',
    text: '',
    category: '',
    stock: ''
  }
componentDidMount() {
    this.fetchCow()
  }
fetchCow = async () => {
    const response = await fetch(`/api/cow`)
    const initialCow = await response.json()
    const cow = initialCow.moo
    this.setState({ cow })
  }
customCow = async evt => {
    evt.preventDefault()
    const text = this.state.text
    const response = await fetch(`/api/cow/${text}`)
    const custom = await response.json()
    const cow = custom.moo
    this.setState({ cow, text: '' })
  }
handleChange = evt => {
    this.setState({ [evt.target.name]: evt.target.value })
    console.log(this.state.text)
  }

testPostgrePost = async evt => {
  evt.preventDefault()
  const category = this.state.category
  const stock = this.state.stock

  const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ category: category, stocks: [stock] })
    };
    fetch(`/api/stocks`, requestOptions)
        .then(response => response.json())
        .then(data => console.log(data));
}

render() {
    return (
      <div>
      <div className="App">
        <h3>Text Cow. Moo</h3>
        <code>{this.state.cow}</code>
        <form onSubmit={this.customCow}>
          <label>Custom Cow Text:</label>
          <input
            type="text"
            name="text"
            value={this.state.text}
            onChange={this.handleChange}
          />
          <button type="submit">Show me a talking cow!</button>
        </form>
      </div>

      <div style={{marginTop: '10px'}}>
      <form onSubmit={this.testPostgrePost}>
        <label>Test Json postgre:</label>
        <div>
          <input
            type="text"
            name="category"
            value={this.state.category}
            onChange={this.handleChange}
          />
        </div>
        <div>
          <input
            type="text"
            name="stock"
            value={this.state.stock}
            onChange={this.handleChange}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      </div>

      </div>
    )
  }
}
export default App
