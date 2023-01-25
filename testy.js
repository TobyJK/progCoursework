const express = require('express')
const app = express()
const fs = require("fs")

app.use(express.static('client'))

const fileName = "./films.json"
app.use(express.json())
const films = require(fileName)

console.log(films)
console.log(Object.keys(films)[Math.floor(Object.keys(films).length * Math.random())])