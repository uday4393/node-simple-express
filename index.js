const express = require('express')
const app = express()
const port = 3000
const fs = require('fs')
const fullData = JSON.parse(fs.readFileSync('mockDB.json'))
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })
const { 
    v1: uuidv1,
    v4: uuidv4,
  } = require('uuid');

// Get all Users
app.get('/api/users', (req, res) => {
  res.send({ data: JSON.parse(fullData) })
})

// GEt user by ID
app.get('/api/user/id/:id', (req, res) => {
    let user = fullData.filter(user => 
        user.id === parseInt(req.params.id)
    )
  res.send({ data: user[0] || 'No User found with that id'})
})

// Get User by Name
app.get('/api/user/name/:name', (req, res) => {
    let user = fullData.filter(user => 
        user.username === req.params.name
    )
  res.send({ data: user[0] || 'No User found with that name'})
})

// Get User by Email
app.get('/api/user/email/:email', (req, res) => {
    let user = fullData.filter(user => 
        user.email === req.params.email
    )
  res.send({ data: user[0] || 'No User found with that email'})
})

// Add User
app.post('/api/user', jsonParser, (req, res) => {
    console.log(req.body)
    let user = req.body.user
    fs.readFile('mockDB.json', (err, data) => {
        let json = JSON.parse(data);
        let id = uuidv4() // get a new user id and add it to backend
        json.push('pushing user', { id, ...user })
        fs.writeFile('mockDB.json', JSON.stringify(json), (err) => {
            if(err) throw new Error('User saving Failed')
        })
    })
  res.send({ data: 'User Added!'})
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})