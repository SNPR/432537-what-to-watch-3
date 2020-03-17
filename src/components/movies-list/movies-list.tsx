import * as React from "react";
import MovieCard from "../movie-card/movie-card";
import {Movie} from "../../types";

type MoviesListProps = {
  movies: Movie[];
  onMovieCardClick: (id: number | string) => void;
  onMovieCardMouseOver: (index: number) => void;
  onMovieCardMouseOut: () => void;
  selectedMovieId: number;
  isPlaying: boolean;
};

const MoviesList: React.FunctionComponent<MoviesListProps> = (
    props: MoviesListProps
) => {
  const {
    onMovieCardMouseOver,
    onMovieCardMouseOut,
    selectedMovieId,
    isPlaying,
    movies,
    onMovieCardClick
  } = props;

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

export default MoviesList;
