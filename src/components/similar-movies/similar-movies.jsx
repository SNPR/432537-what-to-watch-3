import React from "react";
import MoviesList from "../movies-list/movies-list.jsx";

const getSimilarMovies = (movies, movie) => {
  return movies.filter(
    similarMovie =>
      similarMovie.genre === movie.genre && similarMovie.name !== movie.name
  );
};

const SimilarMovies = ({ movies, movie }) => {
  return (
    <MoviesList
      movies={getSimilarMovies(movies, movie)}
      onMovieCardClick={() => {}}
    />
  );
};

export default SimilarMovies;
