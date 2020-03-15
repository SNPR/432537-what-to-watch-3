import React from "react";
import MoviesList from "../movies-list/movies-list";
import PropTypes from "prop-types";
import withActiveMovieCard from "../../hocs/with-active-movie-card/with-active-movie-card";

const MAX_SIMILAR_MOVIES_AMOUNT = 4;

const MoviesListWrapped = withActiveMovieCard(MoviesList);

const getSimilarMovies = (movies, movie) => {
  return movies
    .filter(
      similarMovie =>
        similarMovie.genre === movie.genre && similarMovie.name !== movie.name
    )
    .slice(0, MAX_SIMILAR_MOVIES_AMOUNT);
};

const SimilarMovies = ({ movies, movie, onMovieCardClick }) => {
  return (
    <MoviesListWrapped
      movies={getSimilarMovies(movies, movie)}
      onMovieCardClick={onMovieCardClick}
    />
  );
};

SimilarMovies.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      posterUrl: PropTypes.string,
      previewUrl: PropTypes.string,
      bigPosterUrl: PropTypes.string,
      backgroundColor: PropTypes.string,
      description: PropTypes.string,
      rating: PropTypes.number,
      votes: PropTypes.number,
      director: PropTypes.string,
      starring: PropTypes.arrayOf(PropTypes.string),
      runTime: PropTypes.string,
      genre: PropTypes.string,
      releaseYear: PropTypes.number,
      id: PropTypes.number,
      isFavorite: PropTypes.bool,
      videoUrl: PropTypes.string,
      trailerUrl: PropTypes.string
    }).isRequired
  ).isRequired,
  movie: PropTypes.shape({
    name: PropTypes.string,
    posterUrl: PropTypes.string,
    previewUrl: PropTypes.string,
    bigPosterUrl: PropTypes.string,
    backgroundColor: PropTypes.string,
    description: PropTypes.string,
    rating: PropTypes.number,
    votes: PropTypes.number,
    director: PropTypes.string,
    starring: PropTypes.arrayOf(PropTypes.string),
    runTime: PropTypes.string,
    genre: PropTypes.string,
    releaseYear: PropTypes.number,
    id: PropTypes.number,
    isFavorite: PropTypes.bool,
    videoUrl: PropTypes.string,
    trailerUrl: PropTypes.string
  }).isRequired,
  onMovieCardClick: PropTypes.func.isRequired
};

export default SimilarMovies;
