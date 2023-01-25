const express = require('express')
const app = express()
const fs = require("fs")

app.use(express.static('client'))

const fileName = "./films.json"
app.use(express.json())
const films = require(fileName)

app.get('/random', function(req, resp){
    while (true) {
        let film = Object.keys(films)[Math.floor(Object.keys(films).length * Math.random())]
        let image = films[film]["path"]
        if (!films[film]["flag"]) {
            resp.send([film, image])
            break
        }
    }
})

app.get('/submit', function(req, resp){
    let rating = parseFloat(req.query.yourRating)
    let film = req.query.film
    films[film]["yourRating"] = rating
    films[film]["flag"] = true
    resp.send("My rating: " + films[film]["myRating"])
})

app.get('/table', function(req, resp){
    resp.send(films)
})

app.get('/specific', function(req, resp){
        let film = req.query.name
        let image = films[film]["path"]
        let done = films[film]["flag"]
        let mine = "My rating: " + films[film]["myRating"]
        let yours = "Your rating: " + films[film]["yourRating"]
        resp.send([film, image, done, mine, yours])
})

app.listen(8090)