const Movie = require('../models/Movie.js');
const Rating = require('../models/Rating.js');

module.exports.controller = (app) => {
  // Get movies list
  app.get('/movies', (req, res) => {
    Movie.find({}, '_id name description release_year genre', (error, movies) => {
      if (error) {
        console.log(error);
      }
      res.send({
        movies,
      });
    });
  });

  // Get a single movie
  app.get('/api/movies/:id', (req, res) => {
    Movie.findById(
      { _id: req.params.id },
      '_id name description release_year genre',
      (error, movie) => {
        if (error) {
          console.log(error);
        }
        res.send(movie);
      }
    );
  });

  // Add a new movie
  app.post('/movies', (req, res) => {
    const newMovie = new Movie({
      name: req.body.name,
      description: req.body.description,
      release_year: req.body.release_year,
      genre: req.body.genre,
    });

    newMovie.save((error, movie) => {
      if (error) {
        console.log(error);
      }
      res.send(movie);
    });
  });

  // Rate a  movie
  app.post('/movies/rate/:id', (req, res) => {
    const rating = new Rating({
      movie_id: req.params.id,
      user_id: req.body.user_id,
      rate: req.body.rate,
    });

    rating.save((error, rating) => {
      if (error) {
        console.log(error);
      }
      res.send({
        movie_id: rating.movie_id,
        user_id: rating.user_id,
        rate: rating.rate,
      });
    });
  });

  // Update existing movie
  app.put('/movies/:id', (req, res) => {
    Movie.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          name: req.body.name,
          description: req.body.description,
          release_year: req.body.release_year,
          genre: req.body.genre,
        },
      },
      (error, movie) => {
        if (error) {
          console.log(error);
        }
        res.send({ message: 'success' });
      }
    );
  });

  // Delete Movie
  app.delete('/movies/:id', (req, res) => {
    Movie.deleteMany(
      {
        _id: req.params.id,
      },
      (error, movies) => {
        if (error) {
          console.log(error);
        }
        res.send({ success: true });
      }
    );
  });
};
