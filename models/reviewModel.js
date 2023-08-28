const sequelize = require('../config/db.config')
const {DataTypes} = require('sequelize')
const Movie = require('../models/movieModel')

const Review = sequelize.define('reviews', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    review: {
        type: DataTypes.STRING,
        allowNull: false
    },
    rating: {
        type: DataTypes.INTEGER,
        require: false,
        validate: {
            min: 0,
            max: 5
        }
    },
    authorId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    movieId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
})

// counting average rating before save
Review.beforeSave(async (review) => {
    try {
        const movieId = review.movieId;
        const movie = await Movie.findByPk(movieId);

        const reviews = await Review.findAll({where: {movieId}});
        let totalRating = reviews.length + 1
        let averageRating = review.rating
        if (reviews.length > 0) {
            totalRating = reviews.reduce((sum, r) => sum + r.rating, 0);
            averageRating = totalRating / reviews.length;
        }

        await movie.update({votesAverage: averageRating, votesCount: reviews.length + 1});
    } catch (error) {
        console.log(error)
    }
});

module.exports = Review