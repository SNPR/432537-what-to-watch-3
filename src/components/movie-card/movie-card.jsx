import React from "react";
import PropTypes from "prop-types";
import MoviePlayer from "../movie-player/movie-player.jsx";

const MovieCard = ({
  movie,
  onMovieCardClick,
  onMovieCardMouseOver,
  onMovieCardMouseOut,
  isPlaying
}) => {
  return (
    <article
      className="small-movie-card catalog__movies-card"
      onMouseOver={onMovieCardMouseOver}
      onMouseOut={onMovieCardMouseOut}
      onClick={onMovieCardClick}
    >
      <div className="small-movie-card__image">
        {isPlaying ? (
          <MoviePlayer movie={movie} muted={true} autoPlay={true} />
        ) : (
          <img
            src={movie.posterUrl}
            alt={movie.name}
            width="280"
            height="175"
          />
        )}
      </div>
      <h3 className="small-movie-card__title">
        <a className="small-movie-card__link" href="#">
          {movie.name}
        </a>
      </h3>
    </article>
  );
};

MovieCard.propTypes = {
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
  }),
  isPlaying: PropTypes.bool.isRequired,
  onMovieCardClick: PropTypes.func.isRequired,
  onMovieCardMouseOver: PropTypes.func.isRequired,
  onMovieCardMouseOut: PropTypes.func.isRequired
};

export default MovieCard;
