const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const axios = require('axios')
const baseUrl = 'https://pokeapi.co/api/v2/pokemon'

const app = express()
app.use(cors())
app.use(bodyParser.json())
let pokemon = []
let caughtPokemon = []
let caughtId = 1

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
                response.send({pokemon, caughtPokemon})
            })
            .catch((err) => {
                console.log(err)
            })
    } else {
        response.send({pokemon, caughtPokemon})
    }
})

app.post('/api/pokemon', (request, response, next) => {
    let pokemonToAdd = Object.assign({},pokemon.reduce((r,e,i)=>{
        if(request.body.id === e.id){
            r = e
        }
        return r
    }, {}))
    pokemonToAdd.caughtId=caughtId
    caughtId++
    caughtPokemon.push(pokemonToAdd)
    response.send(caughtPokemon)
})

app.delete('/api/pokemon', (request, response, next)=>{
    caughtPokemon = caughtPokemon.filter((e,i) => {
        if(Number(request.query.id) === e.caughtId){
            return false
        }
        return e
    })
    response.send(caughtPokemon)
})

const port = process.env.PORT || 8090

app.listen(port, () => {
    console.log(`Listening on Port ${port}`)
})

// http://localhost:8090