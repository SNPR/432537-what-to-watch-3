import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app/app.jsx";

const Movie = {
  NAME: `The Grand Budapest Hotel`,
  GENRE: `Drama`,
  RELEASE_YEAR: 2014,
  POSTER_URL: `img/the-grand-budapest-hotel-poster.jpg`
};

ReactDOM.render(
    <App
      name={Movie.NAME}
      genre={Movie.GENRE}
      releaseYear={Movie.RELEASE_YEAR}
      posterUrl={Movie.POSTER_URL}
    />,
    document.querySelector(`#root`)
);
