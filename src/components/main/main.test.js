import React from "react";
import renderer from "react-test-renderer";
import Main from "./main.jsx";

const Movie = {
  NAME: `The Godfather`,
  GENRE: `Drama`,
  RELEASE_YEAR: 1972
};

const MOVIES = [
  {
    name: `The Dark Knight`,
    posterUrl: `img/johnny-english.jpg`,
    posterDescription: `The Dark Knight`
  },
  {
    name: `The Shawshank Redemption`,
    posterUrl: `img/johnny-english.jpg`,
    posterDescription: `The Shawshank Redemption`
  },
  {
    name: `Pulp Fiction`,
    posterUrl: `img/johnny-english.jpg`,
    posterDescription: `Pulp Fiction`
  }
];

it(`Should render App component`, () => {
  const tree = renderer
    .create(
        <Main
          name={Movie.NAME}
          genre={Movie.GENRE}
          releaseYear={Movie.RELEASE_YEAR}
          movies={MOVIES}
        />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
