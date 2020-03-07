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
          onMovieCardClick={() => onMovieCardClick(movie.id)}
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
      })
  ).isRequired,
  onMovieCardClick: PropTypes.func.isRequired,
  onMovieCardMouseOver: PropTypes.func.isRequired,
  onMovieCardMouseOut: PropTypes.func.isRequired,
  selectedMovieId: PropTypes.number,
  isPlaying: PropTypes.bool.isRequired
};

export default MoviesList;
