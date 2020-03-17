import * as React from "react";
import MoviesList from "../movies-list/movies-list";
import withActiveMovieCard from "../../hocs/with-active-movie-card/with-active-movie-card";
import {Movie} from "../../types";

const MAX_SIMILAR_MOVIES_AMOUNT = 4;

const MoviesListWrapped = withActiveMovieCard(MoviesList);

const getSimilarMovies = (movies: Movie[], movie: Movie): Movie[] => {
  return movies
    .filter(
        (similarMovie) =>
          similarMovie.genre === movie.genre && similarMovie.name !== movie.name
    )
    .slice(0, MAX_SIMILAR_MOVIES_AMOUNT);
};

type SimilarMoviesProps = {
  movies: Movie[];
  movie: Movie;
  onMovieCardClick: (id: number | string) => void;
};

const SimilarMovies: React.FunctionComponent<SimilarMoviesProps> = (
    props: SimilarMoviesProps
) => {
  const {movies, movie, onMovieCardClick} = props;

  return (
    <MoviesListWrapped
      movies={getSimilarMovies(movies, movie)}
      onMovieCardClick={onMovieCardClick}
    />
  );
};

export default SimilarMovies;
