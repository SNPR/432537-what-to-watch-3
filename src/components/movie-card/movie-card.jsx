import React from "react";
import PropTypes from "prop-types";

const MovieCard = ({movie, onMovieCardClick, onMovieCardHover}) => {
  return (
    <article
      className="small-movie-card catalog__movies-card"
      onMouseOver={onMovieCardHover}
      onClick={onMovieCardClick}
    >
      <div className="small-movie-card__image">
        <img src={movie.posterUrl} alt={movie.name} width="280" height="175" />
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
    posterUrl: PropTypes.string.isRequired
  }).isRequired,
  onMovieCardClick: PropTypes.func.isRequired,
  onMovieCardHover: PropTypes.func.isRequired
};

export default MovieCard;
