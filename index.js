let express = require('express')
let app = express()

const datastore = require('./datastore.json')

let aboutHandler = (req, res) => {
    return res.send(datastore)
}

app.get('/', aboutHandler)

app.get('/about', aboutHandler)

app.listen(8000, () => {
    console.log('Server is running...')
})