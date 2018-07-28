let express = require('express')
let app = express()

let MovieStore = require('./MovieStore')
let movieStore = new MovieStore();

app.get('/movies', (req, res) => {
    res.send(movieStore.all())
})

// Redirect Movies page to Home page
app.get('/', (req, res) => {
    res.redirect('/movies')
})

app.listen(8000, () => {
    console.log('Server is running...')
})