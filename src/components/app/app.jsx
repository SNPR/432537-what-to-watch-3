import React, {PureComponent} from "react";
import {Switch, Route, Router, Redirect} from "react-router-dom";
import Main from "../main/main.jsx";
import MoviePage from "../movie-page/movie-page.jsx";
import PropTypes from "prop-types";
import SignIn from "../sign-in/sign-in.jsx";
import {connect} from "react-redux";
import {Operation as UserOperation} from "../../reducer/user/user.js";
import {getAuthorizationStatus} from "../../reducer/user/selectors.js";
import {AuthorizationStatus} from "../../reducer/user/user.js";
import AddReview from "../add-review/add-review.jsx";
import {getSelectedMovie} from "../../reducer/state/selectors.js";
import {ActionCreator} from "../../reducer/state/state.js";
import history from "../../history.js";
import {AppRoute} from "../../utils/constants.js";
import MyList from "../my-list/my-list.jsx";

class App extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isBigMoviePlayerVisible: false
    };
    this.movieCardClickHandler = this.movieCardClickHandler.bind(this);
    this.handleVisibility = this.handleVisibility.bind(this);
  }

  movieCardClickHandler(selectedMovieId) {
    this.props.changeSelectedMovieId(selectedMovieId);
    this.props.getComments(selectedMovieId);
  }

  handleVisibility() {
    this.setState({
      isBigMoviePlayerVisible: !this.state.isBigMoviePlayerVisible
    });
  }

  _renderApp() {
    const {isBigMoviePlayerVisible} = this.state;
    const {selectedMovie} = this.props;

    if (selectedMovie) {
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
        onMovieCardClick={this.movieCardClickHandler}
        isBigMoviePlayerVisible={isBigMoviePlayerVisible}
        onVisibilityChange={this.handleVisibility}
      />
    );
  }

  render() {
    const {login, authorizationStatus} = this.props;

    return (
      <Router history={history}>
        <Switch>
          <Route exact path="/">
            {this._renderApp()}
          </Route>
          <Route exact path={AppRoute.ADD_REVIEW}>
            <AddReview />
          </Route>
          <Route
            exact
            path={AppRoute.MY_LIST}
            render={() => (
              <MyList onMovieCardClick={this.movieCardClickHandler} />
            )}
          />
          <Route exact path={AppRoute.LOGIN}>
            {authorizationStatus === AuthorizationStatus.NO_AUTH ? (
              <SignIn onSubmit={login} />
            ) : (
              this._renderApp()
            )}
          </Route>
        </Switch>
      </Router>
    );
  }
}

const mapStateToProps = (state) => ({
  authorizationStatus: getAuthorizationStatus(state),
  selectedMovie: getSelectedMovie(state)
});

const mapDispatchToProps = (dispatch) => ({
  login(authData) {
    dispatch(UserOperation.login(authData));
  },
  changeSelectedMovieId(id) {
    dispatch(ActionCreator.changeSelectedMovieId(id));
  }
});

App.propTypes = {
  getComments: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  authorizationStatus: PropTypes.string.isRequired,
  changeSelectedMovieId: PropTypes.func.isRequired,
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
  })
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
