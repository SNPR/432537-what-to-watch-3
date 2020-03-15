import * as React from "react";
import PropTypes from "prop-types";

const MoviePlayer = ({
  movie,
  muted,
  autoPlay,
  onPlayButtonClick,
  videoRef
}) => {
  return (
    <video
      ref={videoRef}
      muted={muted}
      controls
      poster={movie.posterUrl}
      width="100%"
      autoPlay={autoPlay}
      onClick={onPlayButtonClick}
    >
      <source src={movie.trailerUrl} />
    </video>
  );
};

MoviePlayer.propTypes = {
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
  muted: PropTypes.bool.isRequired,
  autoPlay: PropTypes.bool.isRequired,
  onPlayButtonClick: PropTypes.func,
  videoRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) })
  ])
};

export default MoviePlayer;
