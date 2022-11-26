const express = require('express')
const app = express()
const port = 3000
const fs = require('fs')
const fullData = JSON.parse(fs.readFileSync('mockDB.json'))
var bodyParser = require('body-parser')


app.get('/api/users', (req, res) => {
  res.send({ data: JSON.parse(fullData) })
})

app.get('/api/user/id/:id', (req, res) => {
    let user = fullData.filter(user => 
        user.id === parseInt(req.params.id)
    )
  res.send({ data: user[0] || 'No User found with that id'})
})

app.get('/api/user/name/:name', (req, res) => {
    let user = fullData.filter(user => 
        user.username === req.params.name
    )
  res.send({ data: user[0] || 'No User found with that name'})
})

app.get('/api/user/email/:email', (req, res) => {
    let user = fullData.filter(user => 
        user.email === req.params.email
    )
  res.send({ data: user[0] || 'No User found with that email'})
})

app.post('/api/user', (req, res) => {
    console.log(req)
    let user = req.body.user
    fs.readFile('mockDB.json', (err, data) => {
        let json = JSON.parse(data);
        json.push('pushing user', user)
        fs.writeFile('mockDB.json', JSON.stringify(json))
    })
  res.send({ data: 'User Added!'})
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})