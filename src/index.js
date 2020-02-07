import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app/app.jsx";

const Movie = {
  NAME: `The Grand Budapest Hotel`,
  GENRE: `Drama`,
  RELEASE_YEAR: 2014
};

const MOVIES = [
  {
    name: `The Shawshank Redemption`,
    posterUrl: `img/johnny-english.jpg`,
    posterDescription: `The Shawshank Redemption`
  },
  {
    name: `Pulp Fiction`,
    posterUrl: `img/johnny-english.jpg`,
    posterDescription: `Pulp Fiction`
  },
  {
    name: `Star Wars`,
    posterUrl: `img/johnny-english.jpg`,
    posterDescription: `Star Wars`
  }
];

ReactDOM.render(
    <App
      name={Movie.NAME}
      genre={Movie.GENRE}
      releaseYear={Movie.RELEASE_YEAR}
      movies={MOVIES}
    />,
    document.querySelector(`#root`)
);
