import React from "react";
import renderer from "react-test-renderer";
import Main from "./main.jsx";

const Movie = {
  NAME: `The Godfather`,
  GENRE: `Drama`,
  RELEASE_YEAR: 1972
};

const MOVIES = [`The Dark Knight`, `The Shawshank Redemption`, `Pulp Fiction`];

it(`Should render App component`, () => {
  const tree = renderer
    .create(
        <Main
          name={Movie.NAME}
          genre={Movie.GENRE}
          releaseYear={Movie.RELEASE_YEAR}
          movies={MOVIES}
          onMovieTitleClick={() => {}}
        />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
