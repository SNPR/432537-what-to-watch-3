import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import MovieCard from "./movie-card.jsx";

Enzyme.configure({
  adapter: new Adapter()
});

const movie = {
  name: `Star Wars: A New Hope`,
  posterUrl: `https://www.gstatic.com/tv/thumb/v22vodart/4407/p4407_v_v8_be.jpg/images?q=tbn:ANd9GcSkmMH-bEDUS2TmK8amBqgIMgrfzN1_mImChPuMrunA1XjNTSKm`
};

it(`Should pass data to handler on hover`, () => {
  const onMovieCardHover = jest.fn();

  const movieCard = shallow(
      <MovieCard
        movie={movie}
        onMovieTitleClick={() => {}}
        onMovieCardHover={() => onMovieCardHover(movie)}
      />
  );

  movieCard.simulate(`mouseover`);

  expect(onMovieCardHover.mock.calls.length).toBe(1);
  expect(onMovieCardHover.mock.calls[0][0]).toMatchObject(movie);
});
