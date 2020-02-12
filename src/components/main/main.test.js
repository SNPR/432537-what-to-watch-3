import React from "react";
import renderer from "react-test-renderer";
import Main from "./main.jsx";

const Movie = {
  NAME: `The Godfather`,
  GENRE: `Drama`,
  RELEASE_YEAR: 1972
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
  },
  {
    name: `Seven Samurai`,
    posterUrl: `https://lh3.googleusercontent.com/proxy/uCMd0BWvzRk-9TXG2lmlrKRfYf-j5bIB2bW4nJZ2ihLzyZErqplfokWFSrn9pdH2LoMMoCyjeQHqHi3jzBk63_jCgn9MqDVl-LxP`
  },
  {
    name: `Back to the Future`,
    posterUrl: `https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcT9d_lBBx0xxB7_d4RP82MlRcK82lzT2W1ZavxhV39SSTZOofDX`
  },
  {
    name: `Blade Runner`,
    posterUrl: `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzBrtjEYPZ9LdbAgkIib6W6u5S7fOm8XRlUkd9kCDbftfly3u_`
  }
];

it(`Should render App component`, () => {
  const tree = renderer
    .create(
        <Main
          name={Movie.NAME}
          genre={Movie.GENRE}
          releaseYear={Movie.RELEASE_YEAR}
          movies={films}
          onMovieTitleClick={() => {}}
        />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
