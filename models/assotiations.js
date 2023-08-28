const Movie = require("./movieModel");
const Genre = require("./genreModel");
const ProductionCompany = require("./productionCompanyModel");
const Review = require("./reviewModel");
const User = require("./usersModel");

// Movie with genre
Movie.belongsToMany(Genre, {as: 'genres', through: 'movie_genres'})
Genre.belongsToMany(Movie, {as: 'movies', through: 'movie_genres'})

// Movie with product companies
Movie.belongsToMany(ProductionCompany, {as: 'productCompanies', through: 'movie_product_companies'})
ProductionCompany.belongsToMany(Movie, {as: 'movies', through: 'movie_product_companies'})

// Movie with reviews
Movie.hasMany(Review, {as: 'reviews', allowNull: false})
Review.belongsTo(Movie, {as: 'movie'})

// Review with user
Review.belongsTo(User, {as: 'author'})
User.hasMany(Review, {as: 'reviews', foreignKey: 'authorId', allowNull: false})
