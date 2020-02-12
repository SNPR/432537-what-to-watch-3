import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import MovieCard from "./movie-card.jsx";

Enzyme.configure({
  adapter: new Adapter()
});

const movie = {
  name: `Movie name`,
  posterUrl: `https://poster-url.com`,
  bigPosterUrl: `https://image-url.com/1.jpg`,
  director: `Director Name`,
  starring: [`Actor 1`, `Actor 2`, `Actor 3`],
  runTime: `1h 00m`,
  genre: `Movie Genre`,
  releaseYear: 2000,
  rating: 8.9,
  votes: 4235,
  description: `Movie description`
};

it(`Should pass data to handler on hover`, () => {
  const onMovieCardHover = jest.fn();

  const movieCard = shallow(
      <MovieCard
        movie={movie}
        onMovieCardClick={() => {}}
        onMovieCardHover={() => onMovieCardHover(movie)}
      />
  );

  movieCard.simulate(`mouseover`);

  expect(onMovieCardHover.mock.calls.length).toBe(1);
  expect(onMovieCardHover.mock.calls[0][0]).toMatchObject(movie);
});
