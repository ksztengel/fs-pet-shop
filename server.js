'use strict'
const fs = require('fs')
const path = require('path')
const petsPath = path.join(__dirname, 'pets.json')
const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const app = express()
const router = express.Router()
const port = process.env.PORT || 8000
 console.log(petsPath);
 app.use(bodyParser.json());

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

// app.post('/', function(req, res) {
//   fs.readFile(petsPath, 'utf8', function(err, petsJSON) {
//       if (err) {
//           console.error('err', err.stack);
//           return res.sendStatus(500);
//       }
//     console.log(req.body);
//     var age = parseInt(req.body.age)
//     pets.push({
//         age: age,
//         kind: req.body.kind,
//         name: req.body.name,
//     })
//     res.redirect('/pets')
// })
// })
app.post('/pets', function(req, res) {
  fs.readFile(petsPath, 'utf8', function(readErr, petsJSON) {
    if (readErr) {
      console.error(err.stack);
      return res.sendStatus(500);
    }

    var pets = JSON.parse(petsJSON);
    // var pet = req.body.name;
    let age = req.body.age
        age = parseInt(age)
      pets.push({
          age: age,
          kind: req.body.kind,
          name: req.body.name,
      })

    if (!pets) {
      return res.sendStatus(400);
    }

    // guests.push(guest);
//
//     var newPetsJSON = JSON.stringify(pets);
//
//     fs.writeFile(petsPath, newPetsJSON, function(writeErr) {
//       if (writeErr) {
//         console.error(writeErr.stack);
//         return res.sendStatus(500);
//       }
//
      res.set('Content-Type', 'text/plain');
      res.send(pets);
    // });
  });
});
app.listen(port, function() {
    console.log("Listening on port:", port);
})

// module.exports = router;
