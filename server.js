'use strict'
const fs = require('fs')
const path = require('path')
const petsPath = path.join(__dirname, 'pets.json')

const express = require('express')
const app = express()
const port = process.env.PORT || 8000

const bodyParser = require('body-parser')
const morgan = require('morgan')

app.use(bodyParser.urlencoded({
    extended: true
}));
app.disable('x-powered-by');
app.use(morgan('short'));
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

        let id = Number.parseInt(req.params.id)
        let pets = JSON.parse(petsJSON)

        if (id < 0 || id >= pets.length || Number.isNaN(id)) {
            res.sendStatus(404)
        }
        res.send(pets[id])
    })
})

app.post('/pets', function(req, res) {
    fs.readFile(petsPath, 'utf8', function(readErr, petsJSON) {
        if (readErr) {
            console.error(err.stack);
            return res.sendStatus(500);
        }

        let pets = JSON.parse(petsJSON);
        let age = parseInt(req.body.age)

        if (!pets) {
            return res.sendStatus(400);
        }

        pets.push({
            age: age,
            kind: req.body.kind,
            name: req.body.name,
        })

        var newPetsJSON = JSON.stringify(pets);

        fs.writeFile(petsPath, newPetsJSON, function(writeErr) {
            if (writeErr) {
                console.error(writeErr.stack);
                return res.sendStatus(500);
            }

            res.set('Content-Type', 'text/plain');
            res.send(pets);
        });
    });
});
app.put('/pets/:id', function(req, res) {
    fs.readFile(petsPath, 'utf8', function(readErr, petsJSON) {
        if (readErr) {
            console.error(err.stack);
            return res.sendStatus(500);
        }

        let id = Number.parseInt(req.params.id)
        let pets = JSON.parse(petsJSON)
        let age = parseInt(req.body.age)

        if (id < 0 || id >= pets.length || Number.isNaN(id)) {
            res.sendStatus(404)
        }
        let pet = ({
            age: age,
            kind: req.body.kind,
            name: req.body.name,
        })

        if (!pets) {
            return res.sendStatus(400);
        }

        pets[id] = pet
        console.log(pet);
        // res.send(pet)


        var newPetsJSON = JSON.stringify(pets);

        fs.writeFile(petsPath, newPetsJSON, function(writeErr) {
            if (writeErr) {
                console.error(writeErr.stack);
                return res.sendStatus(500);
            }
            res.set('Content-Type', 'text/plain');
            res.send(pet);
        });
    });
});
app.delete('/pets/:id', function(req, res) {
  fs.readFile(petsPath, 'utf8', function(readErr, petsJSON) {
    if (readErr) {
      console.error(err.stack);
      return res.sendStatus(500);
    }

    var id = Number.parseInt(req.params.id);
    var pets = JSON.parse(petsJSON);

    if (id < 0 || id >= pets.length || Number.isNaN(id) ) {
      return res.sendStatus(404);
    }

    var pet = pets.splice(id, 1)[0];
    var newpetsJSON = JSON.stringify(pets);

    fs.writeFile(petsPath, newpetsJSON, function(writeErr) {
      if (writeErr) {
        console.error(writeErr.stack);
        return res.sendStatus(500);
      }

      res.set('Content-Type', 'text/plain');
      res.send(pet);
    });
  });
});
app.listen(port, function() {
    console.log("Listening on port:", port);
})
