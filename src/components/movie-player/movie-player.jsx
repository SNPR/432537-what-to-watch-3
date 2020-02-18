import React from "react";
import PropTypes from "prop-types";

const MoviePlayer = ({movie, muted}) => {
  return (
    <video
      muted={muted}
      controls
      poster={movie.posterUrl}
      width="100%"
      autoPlay
    >
      <source src={movie.trailerUrl} />
    </video>
  );
};

MoviePlayer.propTypes = {
  movie: PropTypes.shape({
    name: PropTypes.string.isRequired,
    posterUrl: PropTypes.string.isRequired,
    bigPosterUrl: PropTypes.string.isRequired,
    trailerUrl: PropTypes.string.isRequired,
    director: PropTypes.string.isRequired,
    starring: PropTypes.arrayOf(PropTypes.string).isRequired,
    runTime: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    releaseYear: PropTypes.number.isRequired,
    rating: PropTypes.number.isRequired,
    votes: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired
  }).isRequired,
  muted: PropTypes.bool.isRequired
};

export default MoviePlayer;
