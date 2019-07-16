import React, { Component } from 'react'
import './PokeCaughtLoop.css'

class PokeCaughtLoop extends Component {


    render() {

        const pokeCaughtLoop = this.props.caughtPokemon.map((e, i) => {
            return <div className='pokeCards' key={i}>
                <div className='name'>
                    {e.name.slice(0, 1).toUpperCase()}{e.name.slice(1)}
                    <br />
                    ID: {e.id}
                </div>
                <div className='boxInCard'>
                    <img src={e.sprites.front_default} alt='pokemon sprite' />
                    <br />
                    Height: {e.height}m
                    <br />
                    Weight: {e.weight}kg
              </div>
        <button onClick={() => { this.props.handleRelease(e.caughtId, e.name) }}>Release</button>
            </div>
        })

        return (
            <div className='pokeCaughtLoop'>
                {pokeCaughtLoop}
            </div>
        )
    }
}

export default PokeCaughtLoop