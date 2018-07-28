let express = require('express')
let app = express()

app.get('/', (req, res) => {
    res.send('Hello world')
})

app.get('/about', (req, res) => {
    res.send('About me')
})

app.listen(8000, () => {
    console.log('Server is running...')
})