import React, { Component } from 'react'
import './App.css'
import axios from 'axios'

const baseUrl = ''

export default class App extends Component {
  state = {
    inputs : {
      FirstName: '',
      LastName: '',
      Age: '',
    }
  }
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  clicks = () => {
    return <div>
      {this.state.inputs.FirstName}
      {this.state.inputs.LirstName}
      {this.state.inputs.Age}
  </div>
  }
  render() {
    const loopInputs = Object.keys(this.state.inputs).map((e,i)=>{
      return <input key ={i} placeholder={e} type='text' name={e} value={this.state[e]} onChange={this.handleChange}/>
      console.log(e)
    })
    return (
      <div className='App'>
        <div className='inputs'>
            {loopInputs}
            <button onClick={this.clicks}>Display</button>
        </div>
      </div>
    )
  }
}
