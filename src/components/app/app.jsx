import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {Switch, Route, BrowserRouter} from "react-router-dom";
import Main from "../main/main.jsx";
import MoviePage from "../movie-page/movie-page.jsx";

class App extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      selectedMovie: null,
      isBigMoviePlayerVisible: false
    };
    this.movieCardClickHandler = this.movieCardClickHandler.bind(this);
    this.handleVisibility = this.handleVisibility.bind(this);
  }

  movieCardClickHandler(selectedMovie) {
    this.setState({selectedMovie});
  }

  handleVisibility() {
    this.setState({
      isBigMoviePlayerVisible: !this.state.isBigMoviePlayerVisible
    });
  }

  _renderApp() {
    const {name, genre, releaseYear, movies} = this.props;
    const {selectedMovie, isBigMoviePlayerVisible} = this.state;

    if (selectedMovie !== null) {
      return (
        <MoviePage
          movie={selectedMovie}
          onMovieCardClick={this.movieCardClickHandler}
          isBigMoviePlayerVisible={isBigMoviePlayerVisible}
          onVisibilityChange={this.handleVisibility}
        />
      );
    }

    return (
      <Main
        movie={selectedMovie || movies[0]}
        name={name}
        genre={genre}
        releaseYear={releaseYear}
        movies={movies}
        onMovieCardClick={this.movieCardClickHandler}
        isBigMoviePlayerVisible={isBigMoviePlayerVisible}
        onVisibilityChange={this.handleVisibility}
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
        description: PropTypes.string.isRequired,
        reviews: PropTypes.arrayOf(
            PropTypes.shape({
              rating: PropTypes.number.isRequired,
              date: PropTypes.string.isRequired,
              author: PropTypes.string.isRequired,
              text: PropTypes.string.isRequired
            })
        ).isRequired
      }).isRequired
  ).isRequired
};

export default App;
