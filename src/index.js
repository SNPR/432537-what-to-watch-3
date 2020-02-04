import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app/app.jsx";

const Movie = {
  NAME: `The Grand Budapest Hotel`,
  GENRE: `Drama`,
  RELEASE_YEAR: 2014,
  POSTER: {
    URL: `img/the-grand-budapest-hotel-poster.jpg`,
    DESCRIPTION: `The Grand Budapest Hotel poster`
  }
};

ReactDOM.render(
    <App
      name={Movie.NAME}
      genre={Movie.GENRE}
      releaseYear={Movie.RELEASE_YEAR}
      posterUrl={Movie.POSTER.URL}
      posterDescription={Movie.POSTER.DESCRIPTION}
    />,
    document.querySelector(`#root`)
);
