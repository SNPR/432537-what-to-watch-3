import * as React from "react";
import * as renderer from "react-test-renderer";
import MoviePlayer from "./movie-player";
import {Movie} from "../../types";
import {noop} from "../../utils/utils";

const movie: Movie = {
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
};

it(`Should render MoviePlayer component`, () => {
  const tree = renderer
    .create(
        <MoviePlayer
          movie={movie}
          muted={true}
          autoPlay={true}
          onPlayButtonClick={noop}
          videoRef={React.createRef()}
        />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
