'use strict'
const fs = require('fs')
const path = require('path')
const petsPath = path.join(__dirname, 'pets.json')
const express = require('express')
const app = express()
    // const env = require('dotenv').config()
const port = process.env.PORT || 8000


app.get('/pets', function(req, res) {
    fs.readFile(petsPath, 'utf8', function(err, petsJSON) {
        if (err) {
            console.error('err', err.stack);
            return res.sendStatus(500)
        }
        let pets = JSON.parse(petsJSON)
        res.send(pets)
    })

})

app.get('/pets/:id', function(req, res) {

    fs.readFile(petsPath, 'utf8', function(err, petsJSON) {
        if (err) {
            console.error('err', err.stack);
            return res.sendStatus(500);
        }

        console.log('req.params', req.params);
        let id = Number.parseInt(req.params.id)
        let pets = JSON.parse(petsJSON)

        if (id < 0 || id >= pets.length || Number.isNaN(id)) {
            res.sendStatus(404)
        }

          res.send(pets[id])

    })
})
app.listen(port, function() {
    console.log("Listening on port:", port);
})
