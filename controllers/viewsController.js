const catchAsync = require('../utils/catchAsync')
const request = require('request')

const apiKey = '1fb720b97cc13e580c2c35e1138f90f8';
const apiBaseUrl = 'http://api.themoviedb.org/3';
const nowPlayingUrl = `${apiBaseUrl}/movie/now_playing?api_key=${apiKey}`;
const imageBaseUrl = 'http://image.tmdb.org/t/p/w300';

const indexPage = catchAsync(async (req, res, next) => {
    request.get(nowPlayingUrl, (error, response, movieData) => {
        const parsedData = JSON.parse(movieData)
        res.render('index', {
            parsedData: parsedData.results,
        })
    })
})

const getMovieById = catchAsync(async (req, res, next) => {
    const movieId = req.params.id;
    const thisMovieUrl = `${apiBaseUrl}/movie/${movieId}?api_key=${apiKey}`

    request.get(thisMovieUrl, (error, response, movieData) => {
        const parsedData = JSON.parse(movieData)
        res.render('single-movie', {
            parsedData
        })
    })
})

const search = catchAsync(async (req, res, next) => {
    const userSearchTerm = encodeURI(req.body.movieSearch);
    const cat = req.body.cat;
    const movieUrl = `${apiBaseUrl}/search/${cat}?query=${userSearchTerm}&api_key=${apiKey}`
    request.get(movieUrl, (error, response, movieData) => {
        let parsedData = JSON.parse(movieData);
        if (cat == "person") {
            parsedData.results = parsedData.results[0].known_for;
        }
        res.render('index', {
            parsedData: parsedData.results
        })
    })
})

const favorites = catchAsync(async (req, res, next) => {
    request.get(nowPlayingUrl, (error, response, movieData) => {
        const parsedData = JSON.parse(movieData)
        res.render('favorite', {
            parsedData: parsedData.results,
        })
    })
})

module.exports = {
    indexPage,
    getMovieById,
    search,
    favorites,
}