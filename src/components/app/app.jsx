import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {Switch, Route, BrowserRouter} from "react-router-dom";
import Main from "../main/main.jsx";

const movieTitleClickHandler = () => {};

class App extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {name, genre, releaseYear, movies} = this.props;
    return (
      <Main
        name={name}
        genre={genre}
        releaseYear={releaseYear}
        movies={movies}
        onMovieTitleClick={movieTitleClickHandler}
      />
    );
  }
}

App.propTypes = {
  name: PropTypes.string.isRequired,
  genre: PropTypes.string.isRequired,
  releaseYear: PropTypes.number.isRequired,
  movies: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        posterUrl: PropTypes.string.isRequired
      }).isRequired
  ).isRequired
};

export default App;
