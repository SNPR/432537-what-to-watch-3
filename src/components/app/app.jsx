import React, {PureComponent} from "react";
import {Switch, Route, BrowserRouter} from "react-router-dom";
import Main from "../main/main.jsx";
import MoviePage from "../movie-page/movie-page.jsx";
import PropTypes from "prop-types";
import SignIn from "../sign-in/sign-in.jsx";
import {connect} from "react-redux";
import {Operation as UserOperation} from "../../reducer/user/user.js";
import {getAuthorizationStatus} from "../../reducer/user/selectors.js";
import {AuthorizationStatus} from "../../reducer/user/user.js";

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
    this.props.getComments(selectedMovie.id);
  }

  handleVisibility() {
    this.setState({
      isBigMoviePlayerVisible: !this.state.isBigMoviePlayerVisible
    });
  }

  _renderApp() {
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
        onMovieCardClick={this.movieCardClickHandler}
        isBigMoviePlayerVisible={isBigMoviePlayerVisible}
        onVisibilityChange={this.handleVisibility}
      />
    );
  }

  render() {
    const {login, authorizationStatus} = this.props;

    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {this._renderApp()}
          </Route>
          <Route exact path="/sign-in">
            {authorizationStatus === AuthorizationStatus.NO_AUTH ? (
              <SignIn onSubmit={login} />
            ) : (
              this._renderApp()
            )}
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = (state) => ({
  authorizationStatus: getAuthorizationStatus(state)
});

const mapDispatchToProps = (dispatch) => ({
  login(authData) {
    dispatch(UserOperation.login(authData));
  }
});

App.propTypes = {
  getComments: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  authorizationStatus: PropTypes.string.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
