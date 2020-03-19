import * as React from "react";
import MoviesList from "../movies-list/movies-list";
import withActiveMovieCard from "../../hocs/with-active-movie-card/with-active-movie-card";
import {Link} from "react-router-dom";
import {AppRoute} from "../../utils/constants";
import {getMyMoviesList} from "../../reducer/data/selectors";
import {getAvatarUrl} from "../../reducer/user/selectors";
import {connect} from "react-redux";
import {Movie} from "../../types";

const MoviesListWrapped = withActiveMovieCard(MoviesList);

type MyListProps = {
  movies: Movie[];
  onMovieCardClick: (id: number | string) => void;
  avatarUrl: string;
};

const MyList: React.FunctionComponent<MyListProps> = (props: MyListProps) => {
  const {onMovieCardClick, movies, avatarUrl} = props;

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
          <Link to={AppRoute.MY_LIST}>
            <div className="user-block__avatar">
              <img src={avatarUrl} alt="User avatar" width="63" height="63" />
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

const mapStateToProps = (state) => ({
  movies: getMyMoviesList(state),
  avatarUrl: getAvatarUrl(state)
});

export default connect(mapStateToProps)(MyList);
