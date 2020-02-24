import React, {PureComponent} from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {ALL_GENRES} from "../../utils/constants.js";
import {ActionCreator} from "../../reducer.js";
import MoviesList from "../movies-list/movies-list.jsx";

class GenresList extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      genres: []
    };
  }

  getGenresList(movies) {
    return [ALL_GENRES, ...new Set(movies.map((movie) => movie.genre))];
  }

  componentDidMount() {
    this.props.filterMoviesByGenre(this.props.genre);
    this.props.changeGenre(this.props.genre);
    this.setState(() => ({genres: this.getGenresList(this.props.movies)}));
  }

  render() {
    const {
      movies,
      genre,
      changeGenre,
      filterMoviesByGenre,
      onMovieCardClick
    } = this.props;

    return (
      <>
        <ul className="catalog__genres-list">
          {(this.state.genres || this.getGenresList(movies)).map(
              (availableGenre, index) => (
                <li
                  className={`catalog__genres-item ${
                    genre === availableGenre ? `catalog__genres-item--active` : ``
                  }`}
                  key={availableGenre + index}
                >
                  <a
                    className="catalog__genres-link"
                    onClick={() => {
                      changeGenre(availableGenre);
                      filterMoviesByGenre(availableGenre);
                    }}
                  >
                    {availableGenre}
                  </a>
                </li>
              )
          )}
        </ul>

        <MoviesList movies={movies} onMovieCardClick={onMovieCardClick} />
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  genre: state.genre,
  movies: state.films
});

const mapDispatchToProps = (dispatch) => ({
  changeGenre(genre) {
    dispatch(ActionCreator.changeGenre(genre));
  },
  filterMoviesByGenre(genre) {
    dispatch(ActionCreator.filterMoviesByGenre(genre));
  }
});

GenresList.propTypes = {
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
  ).isRequired,
  genre: PropTypes.string.isRequired,
  changeGenre: PropTypes.func.isRequired,
  filterMoviesByGenre: PropTypes.func.isRequired,
  onMovieCardClick: PropTypes.func.isRequired
};

export {GenresList};
export default connect(mapStateToProps, mapDispatchToProps)(GenresList);
