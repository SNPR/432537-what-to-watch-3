import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {Switch, Route, BrowserRouter} from "react-router-dom";
import Main from "../main/main.jsx";
import MovieDetails from "../movie-details/movie-details.jsx";
import MoviePage from "../movie-page/movie-page.jsx";

class App extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      selectedMovieId: null
    };
    this.movieCardClickHandler = this.movieCardClickHandler.bind(this);
  }

  movieCardClickHandler(selectedMovieId) {
    this.setState({selectedMovieId});
  }

  _renderApp() {
    const {name, genre, releaseYear, movies} = this.props;
    const {selectedMovieId} = this.state;

    if (selectedMovieId !== null) {
      return <MoviePage movie={this.props.movies[selectedMovieId]} />;
    }

    return (
      <Main
        name={name}
        genre={genre}
        releaseYear={releaseYear}
        movies={movies}
        onMovieCardClick={this.movieCardClickHandler}
      />
    );
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {this._renderApp()}
          </Route>
          <Route exact path="/dev-movie-details">
            <MovieDetails
              movie={this.props.movies[this.state.selectedMovieId || 0]}
            />
          </Route>
        </Switch>
      </BrowserRouter>
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
        posterUrl: PropTypes.string.isRequired,
        bigPosterUrl: PropTypes.string.isRequired,
        director: PropTypes.string.isRequired,
        starring: PropTypes.arrayOf(PropTypes.string).isRequired,
        runTime: PropTypes.string.isRequired,
        genre: PropTypes.string.isRequired,
        releaseYear: PropTypes.number.isRequired,
        rating: PropTypes.number.isRequired,
        votes: PropTypes.number.isRequired,
        description: PropTypes.string.isRequired
      }).isRequired
  ).isRequired
};

export default App;
