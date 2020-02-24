import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { ActionCreator } from "../../reducer.js";

const ShowMoreButton = ({ movies, showedMovies, showMoreMovies }) => {
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

const mapStateToProps = state => ({
  movies: state.films,
  showedMovies: state.showedMovies
});

const mapDispatchToProps = dispatch => ({
  showMoreMovies() {
    dispatch(ActionCreator.showMoreMovies());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ShowMoreButton);
