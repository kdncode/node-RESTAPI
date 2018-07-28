let express = require('express')
let app = express()

let aboutHandler = (req, res) => {
    res.send('New about me by handler')
}

app.get('/', (req, res) => {
    res.send('Hello world')
})

app.get('/about', aboutHandler)

app.listen(8000, () => {
    console.log('Server is running...')
})