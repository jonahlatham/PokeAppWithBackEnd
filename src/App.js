import React, { Component } from 'react'
import './App.css'
import axios from 'axios'
import PokeLoop from './PokeLoop/PokeLoop'
import PokeCaughtLoop from './PokeCaughtLoop/PokeCaughtLoop'
import swal from 'sweetalert2';


export default class App extends Component {
  state = {
    pokemon: [],
    caughtPokemon: [],
    showCaughtPokemon: false,
    textBox: '',
    filterCaughtPokemon: [],
    filterPokemon: [],
  }
  componentDidMount() {
    axios.get('/api/pokemon')
      .then((response) => {
        this.setState({
          pokemon: response.data.pokemon,
          caughtPokemon: response.data.caughtPokemon,
          filterPokemon: response.data.pokemon,
          filterCaughtPokemon: response.data.caughtPokemon,
        })
        console.log(response.data.pokemon)
      })
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    }, this.handleFilter)
  }

  handleFilter = () => {
    const filterCaughtPokemon = this.state.caughtPokemon.filter((e, i) => {
      return e.name.includes(this.state.textBox)
    })
    const filterPokemon = this.state.pokemon.filter((e, i) => {
      return e.name.includes(this.state.textBox)
    })
    this.setState({
      filterCaughtPokemon,
      filterPokemon
    })
  }

  handleRelease = (id, name) => {
    swal.fire({
      title: `Do you really want to say goodbye to ${name.charAt(0).toUpperCase()}${name.slice(1)} forever?`,
      text: 'You cannot revert this!!!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#f52e12',
      cancelButtonColor: '#2562a0',
      confirmButtonText: 'Yes, release it!'
    })
      .then((result) => {
        if (result.value) {
          return axios.delete(`/api/pokemon/?id=${id}`)
        }
      })
      .then((response) => {
        this.setState({
          caughtPokemon: response.data,
          filterCaughtPokemon: response.data
        })
        swal.fire(`You'll never see ${name.charAt(0).toUpperCase()}${name.slice(1)} again...`)
      })
  }

  handleCatch = (id, name) => {
    let body = {
      id
    }
    axios.post('/api/pokemon', body)
      .then((response) => {
        this.setState({
          caughtPokemon: response.data,
          filterCaughtPokemon: response.data
        })
        swal.fire({
          title: `You caught ${name.charAt(0).toUpperCase()}${name.slice(1)}!`,
          text: `${name.charAt(0).toUpperCase()}${name.slice(1)} was sent to PC`,
          type: 'success',
          showConfirmButton: false
        })
      })
    console.log(`You caught ${name.charAt(0).toUpperCase()}${name.slice(1)}`)
  }
  handleToggle = () => {
    this.setState({
      showCaughtPokemon: !this.state.showCaughtPokemon,
    })
  }

  render() {
    return (
      <div className='App'>
        <div className='header'>
          <div className='togbtn'>
            <button className='buttonToggle' onClick={this.handleToggle}>Toggle</button>
          </div>
          <div>
            <img className='pkimg' src="https://bit.ly/2SllOXz" alt="Pokemon" />
          </div>
          <div className='inpt'>
            <input type="text" placeholder='Search' name='textBox' value={this.state.textBox} onChange={this.handleChange} />
          </div> 
        </div>
        <div className='list'>
          <div className='pokeList'>
            {this.state.showCaughtPokemon ? <PokeCaughtLoop handleRelease={this.handleRelease} caughtPokemon={this.state.filterCaughtPokemon} /> : <PokeLoop handleCatch={this.handleCatch} pokemon={this.state.filterPokemon} />}
          </div>
        </div>
        <div>
          <audio src='http://www.pokezorworld.com/anime/wav/themesong.wav' autoPlay/>
        </div>
      </div>
    )
  }
}