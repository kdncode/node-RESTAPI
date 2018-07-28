let express = require('express')
let bodyParser = require('body-parser')
let app = express()

let movieRouter = require('./routers/movieRouter')

app.use(bodyParser.json({
    type: 'application/json'
}))

app.use('/movies', movieRouter)

// Redirect Movies page to Home page
app.get('/', (req, res) => {
    return res.redirect('/movies')
})

app.listen(8000, () => {
    console.log('Server is running...')
})