import React from "react";
import PropTypes from "prop-types";
import Tabs from "../tabs/tabs.jsx";
import SimilarMovies from "../similar-movies/similar-movies.jsx";
import withPlayer from "../../hocs/with-player/with-player.jsx";
import BigMoviePlayer from "../big-movie-player/big-movie-player.jsx";
import {connect} from "react-redux";
import {getMovies} from "../../reducer/data/selectors.js";
import {getAuthorizationStatus} from "../../reducer/user/selectors.js";
import {AuthorizationStatus} from "../../reducer/user/user";
import {Link} from "react-router-dom";
import {AppRoute} from "../../utils/constants.js";
import {Operation} from "../../reducer/data/data.js";

const BigMoviePlayerWrapped = withPlayer(BigMoviePlayer);

const MoviePage = ({
  movie,
  onMovieCardClick,
  isBigMoviePlayerVisible,
  onVisibilityChange,
  movies,
  authorizationStatus,
  addMovieToMyList,
  removeMovieFromMyList
}) => {
  return isBigMoviePlayerVisible ? (
    <BigMoviePlayerWrapped
      onExitButtonClick={onVisibilityChange}
      movie={movie}
      autoPlay={false}
      muted={true}
    />
  ) : (
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
              <Link to={AppRoute.MY_LIST}>
                <div className="user-block__avatar">
                  <img
                    src="img/avatar.jpg"
                    alt="User avatar"
                    width="63"
                    height="63"
                  />
                </div>
              </Link>
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
                  onClick={onVisibilityChange}
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
                    to={AppRoute.ADD_REVIEW}
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

            <Tabs movie={movie} />
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
      )
    </>
  );
};

MoviePage.propTypes = {
  movie: PropTypes.shape({
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
  }).isRequired,
  movies: PropTypes.arrayOf(
      PropTypes.shape({
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
  ).isRequired,
  onMovieCardClick: PropTypes.func.isRequired,
  isBigMoviePlayerVisible: PropTypes.bool.isRequired,
  onVisibilityChange: PropTypes.func.isRequired,
  authorizationStatus: PropTypes.string.isRequired,
  addMovieToMyList: PropTypes.func.isRequired,
  removeMovieFromMyList: PropTypes.func.isRequired
};
const mapStateToProps = (state) => ({
  movies: getMovies(state),
  authorizationStatus: getAuthorizationStatus(state)
});

const mapDispatchToProps = (dispatch) => ({
  addMovieToMyList(id) {
    dispatch(Operation.addMovieToMyList(id));
  },
  removeMovieFromMyList(id) {
    dispatch(Operation.removeMovieFromMyList(id));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(MoviePage);
