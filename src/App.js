import React, { Component } from 'react'
import './App.css'
import axios from 'axios'

export default class App extends Component {
  state = {
    pokemon: [],
  }
  componentDidMount() {
    axios.get('/api/pokemon')
      .then((response) => {
        this.setState({
          pokemon: response.data
        })
        console.log(response.data)
      })
  }
  render() {
    const pokeLoop = this.state.pokemon.map((e, i) => {
      return <div className='pokeCards' key={i}>
        <div className='name'>
          {e.name.slice(0, 1).toUpperCase()}{e.name.slice(1)}
          <br/>
          ID: {e.id}
        </div>
        <div className='boxInCard'>
          <img src={e.sprites.front_default} alt='pokemon sprite' />
          <br />
        Height: {e.height}m
        <br/>
        Weight: {e.weight}kg
        </div>
      </div>
    })
    return (
      <div className='App'>

        {pokeLoop}

      </div>
    )
  }
}
