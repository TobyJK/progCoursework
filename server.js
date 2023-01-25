const express = require('express')
const app = express()
const fs = require("fs")

app.use(express.static('client'))

const fileName = "./films.json"
app.use(express.json())
const films = require(fileName)

app.get('/random', function(req, resp){
    let film = Object.keys(films)[Math.floor(Object.keys(films).length * Math.random())]
    let image = films[film]["Path"]
    resp.send([film, image])
})

app.listen(8090)