import * as React from "react";
import {configure, shallow} from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import MovieCard from "./movie-card";
import {Movie} from "../../types";
import {noop} from "../../utils/utils";

configure({
  adapter: new Adapter()
});

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

it(`Should pass data to handler on hover`, () => {
  const movieCardMouseOverHandler = jest.fn();
  const movieCardMouseOutHandler = jest.fn();

  const movieCard = shallow(
      <MovieCard
        movie={movie}
        isPlaying={true}
        onMovieCardClick={noop}
        onMovieCardMouseOver={() => movieCardMouseOverHandler(movie)}
        onMovieCardMouseOut={movieCardMouseOutHandler}
      />
  );

  movieCard.simulate(`mouseover`);
  movieCard.simulate(`mouseout`);

  expect(movieCardMouseOverHandler.mock.calls.length).toBe(1);
  expect(movieCardMouseOverHandler.mock.calls[0][0]).toMatchObject(movie);
  expect(movieCardMouseOutHandler.mock.calls.length).toBe(1);
});
