const sequelize = require('../config/db.config')
const {DataTypes} = require('sequelize')

const Movie = sequelize.define('movies', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    originalTitle: {
        type: DataTypes.STRING,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    tagline: {
        type: DataTypes.STRING,
        allowNull: false
    },
    overview: {
        type: DataTypes.STRING,
        allowNull: false
    },
    posterPath: {
        type: DataTypes.STRING,
        defaultValue: 'movie_default.jpg',
        allowNull: false
    },
    releaseDate: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    runtime: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('Released', 'Upcoming'),
        allowNull: false
    },
    revenue: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    budget: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    votesAverage: {
        type: DataTypes.FLOAT,
        defaultValue: 0
    },
    votesCount: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    imdbId: {
        type: DataTypes.STRING,
    },
    originalLanguage: {
        type: DataTypes.STRING,
        allowNull: false
    },
    spokenLanguage: {
        type: DataTypes.STRING,
        allowNull: false
    },
    country: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

module.exports = Movie
