import React from "react";
import renderer from "react-test-renderer";
import MovieCard from "./movie-card.jsx";

const movie = {
  name: `12 Angry Men`,
  posterUrl: `https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQuhFZT3lQfr0vDy4XWMHQ8X93FWuamEuw_5iB4dmOTxc_w79rA`
};

it(`Should render MovieCard component`, () => {
  const tree = renderer
    .create(
        <MovieCard
          movie={movie}
          onMovieTitleClick={() => {}}
          onMovieCardHover={() => {}}
        />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
