import React, {PureComponent} from "react";
import {Switch, Route, Router} from "react-router-dom";
import Main from "../main/main.jsx";
import MoviePage from "../movie-page/movie-page.jsx";
import PropTypes from "prop-types";
import SignIn from "../sign-in/sign-in.jsx";
import {connect} from "react-redux";
import {Operation as UserOperation} from "../../reducer/user/user.js";
import {getAuthorizationStatus} from "../../reducer/user/selectors.js";
import AddReview from "../add-review/add-review.jsx";
import {getSelectedMovie} from "../../reducer/state/selectors.js";
import history from "../../history.js";
import {AppRoute} from "../../utils/constants.js";
import MyList from "../my-list/my-list.jsx";
import PrivateRoute from "../private-route/private-route.jsx";
import withPlayer from "../../hocs/with-player/with-player.jsx";
import BigMoviePlayer from "../big-movie-player/big-movie-player.jsx";
import {getPromoMovie} from "../../reducer/data/selectors.js";
import {ActionCreator} from "../../reducer/state/state.js";
import {Operation as DataOperation} from "../../reducer/data/data.js";

const BigMoviePlayerWrapped = withPlayer(BigMoviePlayer);

class App extends PureComponent {
  constructor(props) {
    super(props);
    this.movieCardClickHandler = this.movieCardClickHandler.bind(this);
  }

  movieCardClickHandler(selectedMovieId) {
    const {changeSelectedMovieId, getComments} = this.props;

    changeSelectedMovieId(selectedMovieId);
    getComments(selectedMovieId);
    history.push(`${AppRoute.FILMS}/${selectedMovieId}`);
  }

  render() {
    const {login, promoMovie, selectedMovie} = this.props;

    return (
      <Router history={history}>
        <Switch>
          <Route
            exact
            path={AppRoute.ROOT}
            render={() => (
              <Main onMovieCardClick={this.movieCardClickHandler} />
            )}
          />

          <Route
            exact
            path={`${AppRoute.FILMS}/:id`}
            render={(props) => (
              <MoviePage
                id={Number(props.match.params.id)}
                onMovieCardClick={this.movieCardClickHandler}
              />
            )}
          />

          <PrivateRoute
            exact
            path={`${AppRoute.FILMS}/:id${AppRoute.ADD_REVIEW}`}
            render={(props) => {
              return <AddReview id={Number(props.computedMatch.params.id)} />;
            }}
          />

          <Route
            exact
            path={`${AppRoute.FILMS}/:id${AppRoute.PLAYER}`}
            render={(props) => (
              <BigMoviePlayerWrapped
                onExitButtonClick={props.history.goBack}
                movie={selectedMovie || promoMovie}
                autoPlay={false}
                muted={true}
                id={Number(props.match.params.id) || promoMovie.id}
              />
            )}
          />

          <PrivateRoute
            exact
            path={AppRoute.MY_LIST}
            render={() => (
              <MyList onMovieCardClick={this.movieCardClickHandler} />
            )}
          />

          <Route
            exact
            path={AppRoute.LOGIN}
            render={(props) => (
              <SignIn goBack={props.history.goBack} onSubmit={login} />
            )}
          />
        </Switch>
      </Router>
    );
  }
}

const mapStateToProps = (state) => ({
  authorizationStatus: getAuthorizationStatus(state),
  selectedMovie: getSelectedMovie(state),
  promoMovie: getPromoMovie(state),
  movie: getSelectedMovie(state)
});

const mapDispatchToProps = (dispatch) => ({
  login(authData) {
    dispatch(UserOperation.login(authData));
  },
  changeSelectedMovieId(id) {
    dispatch(ActionCreator.changeSelectedMovieId(id));
  },
  getComments(id) {
    dispatch(DataOperation.getComments(id));
  }
});

App.propTypes = {
  login: PropTypes.func.isRequired,
  authorizationStatus: PropTypes.string.isRequired,
  selectedMovie: PropTypes.shape({
    name: PropTypes.string,
    posterUrl: PropTypes.string,
    previewUrl: PropTypes.string,
    bigPosterUrl: PropTypes.string,
    backgroundColor: PropTypes.string,
    description: PropTypes.string,
    rating: PropTypes.number,
    votes: PropTypes.number,
    director: PropTypes.string,
    starring: PropTypes.arrayOf(PropTypes.string),
    runTime: PropTypes.string,
    genre: PropTypes.string,
    releaseYear: PropTypes.number,
    id: PropTypes.number,
    isFavorite: PropTypes.bool,
    videoUrl: PropTypes.string,
    trailerUrl: PropTypes.string
  }),
  promoMovie: PropTypes.shape({
    name: PropTypes.string,
    posterUrl: PropTypes.string,
    previewUrl: PropTypes.string,
    bigPosterUrl: PropTypes.string,
    backgroundColor: PropTypes.string,
    description: PropTypes.string,
    rating: PropTypes.number,
    votes: PropTypes.number,
    director: PropTypes.string,
    starring: PropTypes.arrayOf(PropTypes.string),
    runTime: PropTypes.string,
    genre: PropTypes.string,
    releaseYear: PropTypes.number,
    id: PropTypes.number,
    isFavorite: PropTypes.bool,
    videoUrl: PropTypes.string,
    trailerUrl: PropTypes.string
  }),
  changeSelectedMovieId: PropTypes.func.isRequired,
  getComments: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
