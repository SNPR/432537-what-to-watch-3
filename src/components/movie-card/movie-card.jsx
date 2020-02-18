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
        {!isPlaying && (
          <img
            src={movie.posterUrl}
            alt={movie.name}
            width="280"
            height="175"
          />
        )}
        {isPlaying && <MoviePlayer movie={movie} muted={true} />}
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
    description: PropTypes.string.isRequired
  }).isRequired,
  isPlaying: PropTypes.bool.isRequired,
  onMovieCardClick: PropTypes.func.isRequired,
  onMovieCardMouseOver: PropTypes.func.isRequired,
  onMovieCardMouseOut: PropTypes.func.isRequired,
};

export default MovieCard;
