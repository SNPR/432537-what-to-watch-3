import * as React from "react";
import {Route, Router, Switch} from "react-router-dom";
import Main from "../main/main";
import MoviePage from "../movie-page/movie-page";
import SignIn from "../sign-in/sign-in";
import {connect} from "react-redux";
import {Operation as UserOperation} from "../../reducer/user/user";
import {getAuthorizationStatus} from "../../reducer/user/selectors";
import AddReview from "../add-review/add-review";
import {getSelectedMovie} from "../../reducer/state/selectors";
import history from "../../history";
import {AppRoute} from "../../utils/constants";
import MyList from "../my-list/my-list";
import PrivateRoute from "../private-route/private-route";
import withPlayer from "../../hocs/with-player/with-player";
import BigMoviePlayer from "../big-movie-player/big-movie-player";
import {getPromoMovie} from "../../reducer/data/selectors";
import {ActionCreator} from "../../reducer/state/state";
import {Operation as DataOperation} from "../../reducer/data/data";
import withFormValidation from "../../hocs/with-form-validation/with-form-validation";
import withAuthErrorMessage from "../../hocs/with-auth-error-message/with-auth-error-message";
import {Movie} from "../../types";
import {AxiosPromise} from "axios";

const BigMoviePlayerWrapped = withPlayer(BigMoviePlayer);
const AddReviewWrapped = withFormValidation(AddReview);
const SignInWrapped = withAuthErrorMessage(SignIn);

type AppProps = {
  login: (
    {email, password}: { email: string; password: string },
    onSuccess: () => void,
    onError: (err: string) => void
  ) => void;
  authorizationStatus: string;
  selectedMovie: Movie;
  promoMovie: Movie;
  changeSelectedMovieId: (
    id: string
  ) => {
    type: string;
    payload: string;
  };
  getComments: (id: string) => AxiosPromise;
};

class App extends React.PureComponent<AppProps, {}> {
  constructor(props) {
    super(props);
    this.handleMovieCardClick = this.handleMovieCardClick.bind(this);
  }

  handleMovieCardClick(selectedMovieId) {
    const {changeSelectedMovieId, getComments, selectedMovie} = this.props;

    if (selectedMovie && selectedMovie.id !== selectedMovieId) {
      changeSelectedMovieId(selectedMovieId);
      getComments(selectedMovieId);
    }

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
            render={() => <Main onMovieCardClick={this.handleMovieCardClick} />}
          />

          <Route
            exact
            path={`${AppRoute.FILMS}/:id`}
            render={(props) => (
              <MoviePage
                id={Number(props.match.params.id)}
                onMovieCardClick={this.handleMovieCardClick}
              />
            )}
          />

          <PrivateRoute
            exact
            path={`${AppRoute.FILMS}/:id${AppRoute.ADD_REVIEW}`}
            render={(props) => {
              return (
                <AddReviewWrapped id={Number(props.computedMatch.params.id)} />
              );
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
              <MyList onMovieCardClick={this.handleMovieCardClick} />
            )}
          />

          <Route
            exact
            path={AppRoute.LOGIN}
            render={(props) => (
              <SignInWrapped goBack={props.history.goBack} onSubmit={login} />
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
  login(authData, onSuccess, onError) {
    dispatch(UserOperation.login(authData, onSuccess, onError));
  },
  changeSelectedMovieId(id) {
    dispatch(ActionCreator.changeSelectedMovieId(id));
  },
  getComments(id) {
    dispatch(DataOperation.getComments(id));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
