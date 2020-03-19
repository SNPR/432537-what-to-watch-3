import * as React from "react";
import Tabs from "../tabs/tabs";
import SimilarMovies from "../similar-movies/similar-movies";
import {connect} from "react-redux";
import {getMovies} from "../../reducer/data/selectors";
import {
  getAuthorizationStatus,
  getAvatarUrl
} from "../../reducer/user/selectors";
import {AuthorizationStatus} from "../../reducer/user/user";
import {Link} from "react-router-dom";
import {AppRoute} from "../../utils/constants";
import {Operation, Operation as DataOperation} from "../../reducer/data/data";
import history from "../../history";
import {ActionCreator} from "../../reducer/state/state";
import {getSelectedMovie} from "../../reducer/state/selectors";
import withActiveTab from "../../hocs/with-active-tab/with-active-tab";
import {Movie} from "../../types";
import {AxiosPromise} from "axios";

const TabsWrapped = withActiveTab(Tabs);

type MoviePageProps = {
  movie: Movie;
  movies: Movie[];
  onMovieCardClick: (id: string | number) => void;
  authorizationStatus: string;
  addMovieToMyList: (id: string | number) => AxiosPromise;
  removeMovieFromMyList: (id: string | number) => AxiosPromise;
  onMovieCardMouseOver: (evt: React.SyntheticEvent<HTMLElement>) => void;
  onMovieCardMouseOut: () => void;
  isPlaying: boolean;
  changeSelectedMovieId: (
    id: string
  ) => {
    type: string;
    payload: string;
  };
  getComments: (id: string) => AxiosPromise;
  id: string;
  avatarUrl: string;
};

class MoviePage extends React.PureComponent<MoviePageProps, {}> {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const {id, changeSelectedMovieId, getComments} = this.props;

    changeSelectedMovieId(id);
    getComments(id);
  }

  render() {
    const {
      movie,
      onMovieCardClick,
      movies,
      authorizationStatus,
      addMovieToMyList,
      removeMovieFromMyList,
      avatarUrl
    } = this.props;

    return movie ? (
      <>
        <section className="movie-card movie-card--full">
          <div className="movie-card__hero">
            <div className="movie-card__bg">
              <img src={movie.bigPosterUrl} alt={movie.name} />
            </div>

            <h1 className="visually-hidden">WTW</h1>

            <header className="page-header movie-card__head">
              <div className="logo">
                <Link to={AppRoute.ROOT} className="logo__link">
                  <span className="logo__letter logo__letter--1">W</span>
                  <span className="logo__letter logo__letter--2">T</span>
                  <span className="logo__letter logo__letter--3">W</span>
                </Link>
              </div>

              <div className="user-block">
                {authorizationStatus === AuthorizationStatus.AUTH ? (
                  <Link to={AppRoute.MY_LIST}>
                    <div className="user-block__avatar">
                      <img
                        src={avatarUrl}
                        alt="User avatar"
                        width="63"
                        height="63"
                      />
                    </div>
                  </Link>
                ) : (
                  <Link to={AppRoute.LOGIN} className="user-block__link">
                    Sign in
                  </Link>
                )}
              </div>
            </header>

            <div className="movie-card__wrap">
              <div className="movie-card__desc">
                <h2 className="movie-card__title">{movie.name}</h2>
                <p className="movie-card__meta">
                  <span className="movie-card__genre">{movie.genre}</span>
                  <span className="movie-card__year">{movie.releaseYear}</span>
                </p>

                <div className="movie-card__buttons">
                  <button
                    className="btn btn--play movie-card__button"
                    type="button"
                    onClick={() =>
                      history.push(
                          `${AppRoute.FILMS}/${movie.id}${AppRoute.PLAYER}`
                      )
                    }
                  >
                    <svg viewBox="0 0 19 19" width="19" height="19">
                      <use xlinkHref="#play-s"></use>
                    </svg>
                    <span>Play</span>
                  </button>
                  <button
                    className="btn btn--list movie-card__button"
                    type="button"
                    onClick={() => {
                      if (movie.isFavorite) {
                        removeMovieFromMyList(movie.id);
                      } else {
                        addMovieToMyList(movie.id);
                      }
                    }}
                  >
                    {movie.isFavorite ? (
                      <svg viewBox="0 0 18 14" width="18" height="14">
                        <use xlinkHref="#in-list"></use>
                      </svg>
                    ) : (
                      <svg viewBox="0 0 19 20" width="19" height="20">
                        <use xlinkHref="#add"></use>
                      </svg>
                    )}
                    <span>My list</span>
                  </button>
                  {authorizationStatus === AuthorizationStatus.AUTH && (
                    <Link
                      to={`${AppRoute.FILMS}/${movie.id}${AppRoute.ADD_REVIEW}`}
                      className="btn movie-card__button"
                    >
                      Add review
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="movie-card__wrap movie-card__translate-top">
            <div className="movie-card__info">
              <div className="movie-card__poster movie-card__poster--big">
                <img
                  src={movie.posterUrl}
                  alt={movie.name}
                  width="218"
                  height="327"
                />
              </div>

              <TabsWrapped movie={movie} />
            </div>
          </div>
        </section>
        <div className="page-content">
          <section className="catalog catalog--like-this">
            <h2 className="catalog__title">More like this</h2>

            <SimilarMovies
              movies={movies}
              movie={movie}
              onMovieCardClick={onMovieCardClick}
            />
          </section>

          <footer className="page-footer">
            <div className="logo">
              <Link to={AppRoute.ROOT} className="logo__link logo__link--light">
                <span className="logo__letter logo__letter--1">W</span>
                <span className="logo__letter logo__letter--2">T</span>
                <span className="logo__letter logo__letter--3">W</span>
              </Link>
            </div>

            <div className="copyright">
              <p>© 2019 What to watch Ltd.</p>
            </div>
          </footer>
        </div>
      </>
    ) : (
      <h1>Loading...</h1>
    );
  }
}

const mapStateToProps = (state) => ({
  movies: getMovies(state),
  authorizationStatus: getAuthorizationStatus(state),
  movie: getSelectedMovie(state),
  avatarUrl: getAvatarUrl(state)
});

const mapDispatchToProps = (dispatch) => ({
  addMovieToMyList(id) {
    dispatch(Operation.addMovieToMyList(id));
  },
  removeMovieFromMyList(id) {
    dispatch(Operation.removeMovieFromMyList(id));
  },
  changeSelectedMovieId(id) {
    dispatch(ActionCreator.changeSelectedMovieId(id));
  },
  getComments(id) {
    dispatch(DataOperation.getComments(id));
  }
});

export {MoviePage};

export default connect(mapStateToProps, mapDispatchToProps)(MoviePage);
