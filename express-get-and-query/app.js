const express = require('express')
const app = express()
const hbs = require('hbs')

// this sets hbs as a templating engine for this express app
app.set('view engine', 'hbs')

// // this enables us to use partials in handlebars  
hbs.registerPartials(__dirname + '/views/partials')

const movies = require('./movies')
app.get('/', function (req, res) {
	res.render('movies', { movieList: movies, doctitle: 'Movies' })
})

app.get('/about', function (req, res) {
	// layout: false disables the layout for this route
	res.render('about', { title: 'About', layout: false })
})
// http://localhost:3000/search?query=hello
// app.get('/search', (req, res) => {
// 	// to access the query string we use: req.query.<name of the key>
// 	const query = req.query
// 	res.send(query)
// })

app.get('/moviesearch', (req, res) => {
	const queryString = req.query.q
	const filteredMovies = movies.filter(movie => {
		return movie.title.toLowerCase().includes(queryString.toLowerCase())
	})
	// res.send(filteredMovies)
	res.render('movies', { movieList: filteredMovies })

})

app.get('/:title', (req, res) => {
	// const title = req.params.title 
	const clickedMovie = movies.find(function (movie) {
		return movie.title === req.params.title
	})
	console.log(clickedMovie)
	res.render('movieDetails', { movie: clickedMovie, doctitle: 'Detail Page' })
})



// https://github.com/J-1000
// app.get('/:username', (req, res) {

// })



// the colon indicates that movieTitle is a route parameter (variable)
app.get('/movies/:movieTitle/cast/:actorId', function (req, res) {
	// we use req.params.<name of the variable> to access the value 
	// of the route parameter
	// const title = req.params.movieTitle
	// res.send(title)
	const params = req.params
	res.send(params)
})


app.listen(3000, function () {
	console.log('server listening')
})