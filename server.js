'use strict'
const fs = require('fs')
const path = require('path')
const petsPath = path.join(__dirname, 'pets.json')
const express = require('express')
const app = express()
// const env = require('dotenv').config()
const port = process.env.PORT || 8000

// app.get('/',function(req,res){
//   res.send("Hello World")
// })

app.get('/pets', function (req,res){
  fs.readFile(petsPath, 'utf8', function(err, petsJSON){
    if (err){
      console.error('err', err.stack);
      return res.sendStatus(500)
  }
    let pets = JSON.parse(petsJSON)
    res.send(pets)
  })

})

app.get('/pets/:index', function(req, res) {
  fs.readFile(petsPath, 'utf8', function(err, petsJSON){
    if (err) {
      console.error('err', err.stack);
      return res.sendStatus(500);
    }
    let index = Number.parseInt(req.params.index)
    console.log('req.params', req.params);
    let pets = JSON.parse(petsJSON)
    if (index < 0 || index >= pets.length || Number.isNaN(index)){
      res.sendStatus(404)
    }
    if (index === pets.index)
    res.send(pets)
})
})
app.listen(port,function(){
  console.log("Listening on port:", port);
})
