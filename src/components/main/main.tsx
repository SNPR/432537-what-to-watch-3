import * as React from "react";
import GenresList from "../genres-list/genres-list";
import ShowMoreButton from "../show-more-button/show-more-button";
import {connect} from "react-redux";
import {getPromoMovie} from "../../reducer/data/selectors";
import {
  getAuthorizationStatus,
  getAvatarUrl
} from "../../reducer/user/selectors";
import {AuthorizationStatus} from "../../reducer/user/user";
import {Link} from "react-router-dom";
import {AppRoute} from "../../utils/constants";
import {Operation} from "../../reducer/data/data";
import history from "../../history";
import {Movie} from "../../types";
import {AxiosPromise} from "axios";

type MainProps = {
  promoMovie: Movie;
  onMovieCardClick: (id: string | number) => void;
  authorizationStatus: string;
  addMovieToMyList: (id: string | number) => AxiosPromise;
  removeMovieFromMyList: (id: string | number) => AxiosPromise;
  avatarUrl: string;
};

const Main: React.FunctionComponent<MainProps> = (props: MainProps) => {
  const {
    onMovieCardClick,
    promoMovie,
    authorizationStatus,
    addMovieToMyList,
    removeMovieFromMyList,
    avatarUrl
  } = props;

  return (
    <>
      <section className="movie-card">
        <div className="movie-card__bg">
          <img src={promoMovie.bigPosterUrl} alt={promoMovie.name} />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header movie-card__head">
          <div className="logo">
            <a className="logo__link">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </a>
          </div>

          <div className="user-block">
            {authorizationStatus === AuthorizationStatus.AUTH ? (
              <div className="user-block__avatar">
                <Link to={AppRoute.MY_LIST}>
                  <img
                    src={avatarUrl}
                    alt="User avatar"
                    width="63"
                    height="63"
                  />
                </Link>
              </div>
            ) : (
              <Link to={AppRoute.LOGIN} className="user-block__link">
                Sign in
              </Link>
            )}
          </div>
        </header>

        <div className="movie-card__wrap">
          <div className="movie-card__info">
            <div className="movie-card__poster">
              <img
                src={promoMovie.posterUrl}
                alt={promoMovie.name}
                width="218"
                height="327"
              />
            </div>

            <div className="movie-card__desc">
              <h2 className="movie-card__title">{promoMovie.name}</h2>
              <p className="movie-card__meta">
                <span className="movie-card__genre">{promoMovie.genre}</span>
                <span className="movie-card__year">
                  {promoMovie.releaseYear}
                </span>
              </p>

              <div className="movie-card__buttons">
                <button
                  className="btn btn--play movie-card__button"
                  type="button"
                  onClick={() =>
                    history.push(
                        `${AppRoute.FILMS}/${promoMovie.id}${AppRoute.PLAYER}`
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
                    if (promoMovie.isFavorite) {
                      removeMovieFromMyList(promoMovie.id);
                    } else {
                      addMovieToMyList(promoMovie.id);
                    }
                  }}
                >
                  {promoMovie.isFavorite ? (
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
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="page-content">
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

        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>

          <GenresList onMovieCardClick={onMovieCardClick} />

          <ShowMoreButton />
        </section>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  promoMovie: getPromoMovie(state),
  authorizationStatus: getAuthorizationStatus(state),
  avatarUrl: getAvatarUrl(state)
});

const mapDispatchToProps = (dispatch) => ({
  addMovieToMyList(id) {
    dispatch(Operation.addMovieToMyList(id));
  },
  removeMovieFromMyList(id) {
    dispatch(Operation.removeMovieFromMyList(id));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
