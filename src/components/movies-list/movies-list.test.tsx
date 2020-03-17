import * as React from "react";
import * as renderer from "react-test-renderer";
import MoviesList from "./movies-list";
import { Movie } from "../../types";

const films: Movie[] = [
  {
    name: `MovieName`,
    posterUrl: `https://url.com`,
    previewUrl: `https://url.com`,
    bigPosterUrl: `https://url.com`,
    backgroundColor: `blue`,
    description: `Descrtiption`,
    rating: 9,
    votes: 3452,
    director: `Director`,
    starring: [`Artist 1`, `Artist 2`],
    runTime: `2h 30m`,
    genre: `Action`,
    releaseYear: 1995,
    id: 1,
    isFavorite: false,
    videoUrl: `https://url.com`,
    trailerUrl: `https://url.com`
  }
];

it(`Should render MoviesList component`, () => {
  const tree = renderer
    .create(
      <MoviesList
        movies={films}
        onMovieCardClick={() => {}}
        onMovieCardMouseOver={() => {}}
        onMovieCardMouseOut={() => {}}
        isPlaying={false}
        selectedMovieId={1}
      />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
