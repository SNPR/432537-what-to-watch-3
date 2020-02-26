import React from "react";
import MovieCard from "../movie-card/movie-card.jsx";
import PropTypes from "prop-types";

const MoviesList = ({
  onMovieCardMouseOver,
  onMovieCardMouseOut,
  selectedMovieId,
  isPlaying,
  movies,
  onMovieCardClick
}) => {
  return (
    <div className="catalog__movies-list">
      {movies.map((movie, index) => (
        <MovieCard
          key={movie.name + index}
          movie={movie}
          onMovieCardClick={() => onMovieCardClick(movie)}
          onMovieCardMouseOver={() => onMovieCardMouseOver(index)}
          onMovieCardMouseOut={onMovieCardMouseOut}
          isPlaying={selectedMovieId === index && isPlaying}
        />
      ))}
    </div>
  );
};

MoviesList.propTypes = {
  movies: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        posterUrl: PropTypes.string.isRequired,
        bigPosterUrl: PropTypes.string.isRequired,
        director: PropTypes.string.isRequired,
        starring: PropTypes.arrayOf(PropTypes.string).isRequired,
        runTime: PropTypes.string.isRequired,
        genre: PropTypes.string.isRequired,
        releaseYear: PropTypes.number.isRequired,
        rating: PropTypes.number.isRequired,
        votes: PropTypes.number.isRequired,
        description: PropTypes.string.isRequired,
        reviews: PropTypes.arrayOf(
            PropTypes.shape({
              rating: PropTypes.number.isRequired,
              date: PropTypes.string.isRequired,
              author: PropTypes.string.isRequired,
              text: PropTypes.string.isRequired
            })
        ).isRequired
      }).isRequired
  ).isRequired,
  onMovieCardClick: PropTypes.func.isRequired,
  onMovieCardMouseOver: PropTypes.func.isRequired,
  onMovieCardMouseOut: PropTypes.func.isRequired,
  selectedMovieId: PropTypes.number,
  isPlaying: PropTypes.bool.isRequired
};

export default MoviesList;
