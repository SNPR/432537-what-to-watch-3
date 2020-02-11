import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Main from "./main.jsx";

Enzyme.configure({
  adapter: new Adapter()
});

const Movie = {
  NAME: `Psycho`,
  GENRE: `Horror`,
  RELEASE_YEAR: 1960
};

const films = [
  {
    name: `Star Wars: A New Hope`,
    posterUrl: `https://www.gstatic.com/tv/thumb/v22vodart/4407/p4407_v_v8_be.jpg/images?q=tbn:ANd9GcSkmMH-bEDUS2TmK8amBqgIMgrfzN1_mImChPuMrunA1XjNTSKm`
  },
  {
    name: `2001: A Space Odyssey`,
    posterUrl: `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdmmLZ7lXsw1WRy7c5qN3mka2e9ANSpHIG2INi53P6OVS8KyJo/images?q=tbn:ANd9GcRz_2nKTNlxhVtzbh29kgL3m2ebLv3TlYyzrbyqBtEUxt6mBuZ-`
  },
  {
    name: `Goodfellas`,
    posterUrl: `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkuxYKBhyPQq4e_cbYRDfZRjWkUx2GIKlUpUkHiuVeLg2GhN0D`
  },
  {
    name: `Taxi Driver`,
    posterUrl: `https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQ4QYpWCQ5pareSyOO3YNI3YsOmAeF4qcRDwHCDwf3-a3F0Y7N6/images?q=tbn:ANd9GcTLgFST-pqPgU9CcWUDE4xqqgSxB1n7dulszo08FjRyXyCxV8TH`
  },
  {
    name: `Casablanca`,
    posterUrl: `https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRlIHtgWeQQsiZaY5iw_A5FTDeKr7bNFWo1W_zObm0h_ti2Yk0V`
  }
];

it(`Should welcome button be pressed`, () => {
  const movieTitleClickHandler = jest.fn();

  const main = mount(
      <Main
        name={Movie.NAME}
        genre={Movie.GENRE}
        releaseYear={Movie.RELEASE_YEAR}
        movies={films}
        onMovieTitleClick={movieTitleClickHandler}
      />
  );

  const movieTitle = main.find(`h3.small-movie-card__title`).first();

  movieTitle.props().onClick();

  expect(movieTitleClickHandler.mock.calls.length).toBe(1);
});
