import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {Switch, Route, BrowserRouter} from "react-router-dom";
import Main from "../main/main.jsx";
import MoviePage from "../movie-page/movie-page.jsx";
import BigMoviePlayer from "../big-movie-player/big-movie-player.jsx";

class App extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      selectedMovie: null
    };
    this.movieCardClickHandler = this.movieCardClickHandler.bind(this);
  }

  movieCardClickHandler(selectedMovie) {
    this.setState({selectedMovie});
  }

  _renderApp() {
    const {name, genre, releaseYear, movies} = this.props;
    const {selectedMovie} = this.state;

    if (selectedMovie !== null) {
      return (
        <MoviePage
          movie={selectedMovie}
          onMovieCardClick={this.movieCardClickHandler}
        />
      );
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
          <Route exact path="/dev-movie-player-big">
            <BigMoviePlayer
              autoPlay={false}
              muted={true}
              movie={{
                name: `The Matrix`,
                posterUrl: `https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcS4jfQQt_0vCA4XSwGiWkffC32Tv2oajdWhaYHHVYylYGJ3v17Q`,
                bigPosterUrl: `https://img1.looper.com/img/gallery/the-matrix-4-will-reportedly-start-something-big/intro-1576775790.jpg`,
                trailerUrl: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
                director: `The Wachowskis`,
                starring: [
                  `Keanu Reeves`,
                  `Laurence Fishburne`,
                  `Carrie-Anne Moss`,
                  `Hugo Weaving`,
                  `Joe Pantoliano`
                ],
                runTime: `2h 16m`,
                genre: `Action`,
                releaseYear: 1999,
                rating: 8.7,
                votes: 5472,
                description: `A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.`,
                reviews: [
                  {
                    rating: 9,
                    date: `December 15, 2019`,
                    author: `John Doe`,
                    text: `This is an awesome movie! You should watch it!`
                  },
                  {
                    rating: 9,
                    date: `December 15, 2019`,
                    author: `John Doe`,
                    text: `This is an awesome movie! You should watch it!`
                  },
                  {
                    rating: 9,
                    date: `December 15, 2019`,
                    author: `John Doe`,
                    text: `This is an awesome movie! You should watch it!`
                  }
                ]
              }}
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
