import React, { Component } from 'react'
import './App.css'
import axios from 'axios'
import PokeLoop from './PokeLoop/PokeLoop'
import PokeCaughtLoop from './PokeCaughtLoop/PokeCaughtLoop'

export default class App extends Component {
  state = {
    pokemon: [],
    caughtPokemon: [],
    showCaughtPokemon: false,
  }
  componentDidMount() {
    axios.get('/api/pokemon')
      .then((response) => {
        this.setState({
          pokemon: response.data.pokemon,
          caughtPokemon: response.data.caughtPokemon,
        })
        console.log(response.data.pokemon)
      })
  }
  handleCatch = (id, name) => {
    let body = {
      id
    }
    axios.post('/api/pokemon', body)
      .then((response) => {
        this.setState({
          caughtPokemon: response.data
        })
      })
    console.log(`You caught ${name}`)
  }
  handleToggle = () => {
    if (this.state.showCaughtPokemon === this.state.caughtPokemon) {
      this.setState({
        showCaughtPokemon: this.state.pokemon
      })
    } else {
      this.setState({
        showCaughtPokemon: this.state.caughtPokemon
      })
    }
    }
  
  render() {
    return (
      <div className='App'>
        <div>
          <button onClick={this.handleToggle}>Toggle</button>
        </div>
        {this.state.showCaughtPokemon ? <PokeCaughtLoop caughtPokemon={this.state.caughtPokemon}/> : <PokeLoop pokemon={this.state.pokemon}/>}

      </div>
    )
  }
}
