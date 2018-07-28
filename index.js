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

// 
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

app.listen(8000, () => {
    console.log('Server is running...')
})