import React from "react";
import Main from "../main/main.jsx";
import PropTypes from "prop-types";

const movieTitleClickHandler = () => {};

const App = ({name, genre, releaseYear, movies}) => {
  return (
    <Main
      name={name}
      genre={genre}
      releaseYear={releaseYear}
      movies={movies}
      onMovieTitleClick={movieTitleClickHandler}
    />
  );
};

App.propTypes = {
  name: PropTypes.string.isRequired,
  genre: PropTypes.string.isRequired,
  releaseYear: PropTypes.number.isRequired,
  movies: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired
};

export default App;
