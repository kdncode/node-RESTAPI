let express = require('express')

let movieRouter = express.Router()

let MovieStore = require('../MovieStore')
let movieStore = new MovieStore()


movieRouter.get('/movies', (req, res) => {
    res.send(movieStore.all())
})

function paginate(data, size, page) {
    let index = page - 1;
    return data.slice(index * size, (index + 1) * size)
}

// SEARCH Movie
movieRouter.get('/', (req, res) => {
    let movies = movieStore.search(req.query.title)

    let page = parseInt(req.query.page) || 1,
        size = parseInt(req.query.size) || 2;

    console.log(page, size);

    let results = paginate(movies, size, page)

    return res.json({
        title: req.query.title,
        totalPage: movies.length,
        page: page, 
        size: size,
        payload: results
    })
})

// GET Movie title
movieRouter.get('/:title', (req, res) => {   
    
    let foundMovies = movieStore.find(req.params.title)

    if (foundMovies.length < 1) {
        res.statusCode = 404;
        return res.json({ message: 'Movie not found'})
    }

    return res.json({
        message: 'Found movie',
        payload: foundMovies.pop()
    })
})

// POST Movie
movieRouter.post('/', (req, res) => {
    
    // Check if movie's title is null || space
    if (!req.body.Title || req.body.Title.trim().length < 1) {
        res.statusCode = 400
        return res.json({
            message: "Missing or invalid title"
        })
    }

    // Check if movie already exists
    if (movieStore.has(req.body.Title)) {
        res.statusCode = 400
        return res.json({
            message: "Movie already existed"
        })
    }

    movieStore.add(req.body)

    return res.json({
        message: "Added movie successfully!"
    })
})

// UPDATE or PUT movie
movieRouter.put('/:title', (req, res) => {

    if (!movieStore.update(req.params.title, req.body)) {
        res.statusCode = 500 // internal server error
        return res.json({
            message: "Failed to update movie info"
        })
    }

    return res.json({
        message: "Updated movie successfully"
    })
})


// DELETE movie
movieRouter.delete('/:title', (req, res) => {

    if (!movieStore.has(req.params.title)) {
        res.statusCode = 404 
        return res.json({
            message: "Movie not found"
        })
    }

    movieStore.remove(req.params.title)

    return res.json({
        message: "Deleted movie successfully"
    })
})

module.exports = movieRouter;