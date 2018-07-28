let express = require('express')
let bodyParser = require('body-parser')
let app = express()

app.use(bodyParser.json({
    type: 'application/json'
}))

let MovieStore = require('./MovieStore')
let movieStore = new MovieStore();

app.get('/movies', (req, res) => {
    res.send(movieStore.all())
})

// Redirect Movies page to Home page
app.get('/', (req, res) => {
    res.redirect('/movies')
})

// GET Movie title
app.get('/movies/:title', (req, res) => {   
    
    let foundMovies = movieStore.find(req.params.title)

    if (foundMovies.length < 1) {
        res.statusCode = 404;
        return res.send({ message: 'Movie not found'})
    }

    return res.send({
        message: 'Found movie',
        payload: foundMovies.pop()
    })
})

// POST Movie
app.post('/movies', (req, res) => {
    
    // Check if movie's title is null || space
    if (!req.body.Title || req.body.Title.trim().length < 1) {
        res.statusCode = 400
        return res.send({
            message: "Missing or invalid title"
        })
    }

    // Check if movie already exists
    if (movieStore.has(req.body.Title)) {
        res.statusCode = 400
        return res.send({
            message: "Movie already existed"
        })
    }

    movieStore.add(req.body)

    return res.send({
        message: "Movie added successfully!"
    })
})

// UPDATE or PUT movie
app.put('/movies/:title', (req, res) => {

    if (!movieStore.update(req.params.title, req.body)) {
        res.statusCode = 500 // internal server error
        return res.send({
            message: "Failed to update movie info"
        })
    }

    return res.send({
        message: "Update movie successfully"
    })
})

app.listen(8000, () => {
    console.log('Server is running...')
})