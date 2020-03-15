import React from "react";
import MoviesList from "../movies-list/movies-list";
import withActiveMovieCard from "../../hocs/with-active-movie-card/with-active-movie-card";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import {AppRoute} from "../../utils/constants";
import {getMyMoviesList} from "../../reducer/data/selectors.js";
import {connect} from "react-redux";

const MoviesListWrapped = withActiveMovieCard(MoviesList);

const MyList = ({onMovieCardClick, movies}) => {
  return (
    <div className="user-page">
      <header className="page-header user-page__head">
        <div className="logo">
          <Link to={AppRoute.ROOT} className="logo__link">
            <span className="logo__letter logo__letter--1">W</span>
            <span className="logo__letter logo__letter--2">T</span>
            <span className="logo__letter logo__letter--3">W</span>
          </Link>
        </div>

        <h1 className="page-title user-page__title">My list</h1>

        <div className="user-block">
          <Link to={MyList}>
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

      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>

        <MoviesListWrapped
          onMovieCardClick={onMovieCardClick}
          movies={movies}
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
  );
};

MyList.propTypes = {
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
      }).isRequired
  ).isRequired,
  onMovieCardClick: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  movies: getMyMoviesList(state)
});

export default connect(mapStateToProps)(MyList);
