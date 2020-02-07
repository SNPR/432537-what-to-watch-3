import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app/app.jsx";

const Movie = {
  NAME: `The Grand Budapest Hotel`,
  GENRE: `Drama`,
  RELEASE_YEAR: 2014
};

const MOVIES = [`The Shawshank Redemption`, `Pulp Fiction`, `Star Wars`];

ReactDOM.render(
    <App
      name={Movie.NAME}
      genre={Movie.GENRE}
      releaseYear={Movie.RELEASE_YEAR}
      movies={MOVIES}
    />,
    document.querySelector(`#root`)
);
