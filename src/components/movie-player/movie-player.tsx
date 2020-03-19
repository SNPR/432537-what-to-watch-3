import * as React from "react";
import {Movie} from "../../types";

type MoviePlayerProps = {
  movie: Movie;
  muted: boolean;
  autoPlay: boolean;
  onPlayButtonClick: () => void;
  videoRef: React.RefObject<HTMLVideoElement>;
};

const MoviePlayer: React.FunctionComponent<MoviePlayerProps> = (
    props: MoviePlayerProps
) => {
  const {movie, muted, autoPlay, onPlayButtonClick, videoRef} = props;

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

export default MoviePlayer;
