import React from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {ActionCreator} from "../../reducer/state/state.js";

const ShowMoreButton = ({movies, showedMovies, showMoreMovies}) => {
  return showedMovies < movies.length ? (
    <div className="catalog__more">
      <button
        className="catalog__button"
        type="button"
        onClick={showMoreMovies}
      >
        Show more
      </button>
    </div>
  ) : null;
};

const mapStateToProps = (state) => ({
  movies: state.DATA.films,
  showedMovies: state.STATE.showedMovies
});

const mapDispatchToProps = (dispatch) => ({
  showMoreMovies() {
    dispatch(ActionCreator.showMoreMovies());
  }
});

ShowMoreButton.propTypes = {
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
  showMoreMovies: PropTypes.func.isRequired,
  showedMovies: PropTypes.number.isRequired
};

export {ShowMoreButton};
export default connect(mapStateToProps, mapDispatchToProps)(ShowMoreButton);
