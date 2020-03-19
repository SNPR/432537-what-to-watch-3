import * as React from "react";
import MoviePlayer from "../movie-player/movie-player";
import withPlayer from "../../hocs/with-player/with-player";
import {Movie} from "../../types";

const MoviePlayerWrapped = withPlayer(MoviePlayer);

type MovieCardProps = {
  movie: Movie;
  onMovieCardClick: (evt: React.SyntheticEvent<HTMLElement>) => void;
  onMovieCardMouseOver: (evt: React.SyntheticEvent<HTMLElement>) => void;
  onMovieCardMouseOut: () => void;
  isPlaying: boolean;
};

const MovieCard: React.FunctionComponent<MovieCardProps> = (
    props: MovieCardProps
) => {
  const {
    movie,
    onMovieCardClick,
    onMovieCardMouseOver,
    onMovieCardMouseOut,
    isPlaying
  } = props;

  return (
    <article
      className="small-movie-card catalog__movies-card"
      onMouseOver={onMovieCardMouseOver}
      onMouseOut={onMovieCardMouseOut}
      onClick={onMovieCardClick}
    >
      <div className="small-movie-card__image">
        {isPlaying ? (
          <MoviePlayerWrapped movie={movie} muted={true} autoPlay={true} />
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

export default MovieCard;
