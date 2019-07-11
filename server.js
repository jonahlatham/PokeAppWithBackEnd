const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const axios = require('axios')
const baseUrl = 'https://pokeapi.co/api/v2/pokemon'

const app = express()
app.use(cors())
app.use(bodyParser.json())
let pokemon = []
<<<<<<< HEAD
let caughtPokemon = []
=======
>>>>>>> c9aa60bcc3df8ec195e496aa9247fa069abbde76

app.get('/api/pokemon/', (request, response, next) => {
    if (pokemon.length === 0) {
        let arr = []
        for (let i = 1; i <= 151; i++) {
            arr.push(axios.get(`${baseUrl}/${i}`))
        }
        Promise.all(arr)
            .then((res) => {
                pokemon = res.map((e, i) => {
                    return e.data
                })
<<<<<<< HEAD
                response.send({pokemon, caughtPokemon})
=======
                response.send(pokemon)
>>>>>>> c9aa60bcc3df8ec195e496aa9247fa069abbde76
            })
            .catch((err) => {
                console.log(err)
            })
    } else {
<<<<<<< HEAD
        response.send({pokemon, caughtPokemon})
    }
})

app.post('/api/pokemon', (request, response, next) => {
    let pokemonToAdd = pokemon.reduce((r,e,i)=>{
        if(request.body.id === e.id){
            r = e
        }
        return r
    }, {})
    caughtPokemon.push(pokemonToAdd)
    response.send(caughtPokemon)
})

app.delete('/api/pokemon', (request, response, next)=>{
    let pokemonToRelease = pokemon.filter((e,i) => {
        if(request.body.id === e.id){
            return false
        }
        return e
    })
    caughtPokemon.splice(request.body.id)
    response.send(caughtPokemon)
})

=======
        response.send(pokemon)
    }
})

>>>>>>> c9aa60bcc3df8ec195e496aa9247fa069abbde76
const port = process.env.PORT || 8090

app.listen(port, () => {
    console.log(`Listening on Port ${port}`)
})

<<<<<<< HEAD
// http://localhost:8090
=======
// http://localhost:8080
>>>>>>> c9aa60bcc3df8ec195e496aa9247fa069abbde76
