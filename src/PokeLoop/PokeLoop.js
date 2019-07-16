import React, { Component } from 'react'
import './PokeLoop.css'

class PokeLoop extends Component {
    render() {
        const pokeLoop = this.props.pokemon.map((e, i) => {
            return <div className='pokeCards' key={i}>
                <div className='name'>
                    {e.name.slice(0, 1).toUpperCase()}{e.name.slice(1)}
                    <br />
                    ID: {e.id}
                </div>
                <div className='boxInCard'>
                    <img src={e.sprites.front_default} alt='pokemon sprite' />
                </div>
                <button onClick={() => { this.props.handleCatch(e.id, e.name) }}>Catch</button>
            </div>
        })
        return (
            <div className='pokeLoop'>
                {pokeLoop}
            </div>
        )
    }
}

export default PokeLoop