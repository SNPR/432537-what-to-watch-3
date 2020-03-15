import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {getTextRating} from "../../utils/utils";
import {connect} from "react-redux";
import {getComments} from "../../reducer/data/selectors.js";
import {Tab} from "../../utils/constants.js";

class Tabs extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      movie,
      comments,
      getActiveClass,
      setActiveTab,
      selectedTab
    } = this.props;

    return (
      <div className="movie-card__desc">
        <nav className="movie-nav movie-card__nav">
          <ul className="movie-nav__list">
            <li
              className={`movie-nav__item ${getActiveClass(Tab.Name.OVERVIEW)}`}
            >
              <a
                className="movie-nav__link"
                onClick={() => setActiveTab(Tab.Name.OVERVIEW)}
              >
                Overview
              </a>
            </li>
            <li
              className={`movie-nav__item ${getActiveClass(Tab.Name.DETAILS)}`}
            >
              <a
                className="movie-nav__link"
                onClick={() => setActiveTab(Tab.Name.DETAILS)}
              >
                Details
              </a>
            </li>
            <li
              className={`movie-nav__item ${getActiveClass(Tab.Name.REVIEWS)}`}
            >
              <a
                className="movie-nav__link"
                onClick={() => setActiveTab(Tab.Name.REVIEWS)}
              >
                Reviews
              </a>
            </li>
          </ul>
        </nav>

        {selectedTab === Tab.Name.OVERVIEW && (
          <>
            <div className="movie-rating">
              <div className="movie-rating__score">{movie.rating}</div>
              <p className="movie-rating__meta">
                <span className="movie-rating__level">
                  {getTextRating(movie.rating)}
                </span>
                <span className="movie-rating__count">
                  {movie.votes} ratings
                </span>
              </p>
            </div>

            <div className="movie-card__text">
              <p>{movie.description}</p>

              <p className="movie-card__director">
                <strong>Director: {movie.director}</strong>
              </p>

              <p className="movie-card__starring">
                <strong>
                  Starring: {`${movie.starring.join(`, `)} and other`}
                </strong>
              </p>
            </div>
          </>
        )}

        {selectedTab === Tab.Name.DETAILS && (
          <>
            <div className="movie-card__text movie-card__row">
              <div className="movie-card__text-col">
                <p className="movie-card__details-item">
                  <strong className="movie-card__details-name">Director</strong>
                  <span className="movie-card__details-value">
                    {movie.director}
                  </span>
                </p>
                <p className="movie-card__details-item">
                  <strong className="movie-card__details-name">Starring</strong>
                  <span className="movie-card__details-value">
                    {movie.starring.map((actor, index) => (
                      <React.Fragment key={actor + index}>
                        {actor} <br />
                      </React.Fragment>
                    ))}
                  </span>
                </p>
              </div>

              <div className="movie-card__text-col">
                <p className="movie-card__details-item">
                  <strong className="movie-card__details-name">Run Time</strong>
                  <span className="movie-card__details-value">
                    {movie.runTime}
                  </span>
                </p>
                <p className="movie-card__details-item">
                  <strong className="movie-card__details-name">Genre</strong>
                  <span className="movie-card__details-value">
                    {movie.genre}
                  </span>
                </p>
                <p className="movie-card__details-item">
                  <strong className="movie-card__details-name">Released</strong>
                  <span className="movie-card__details-value">
                    {movie.releaseYear}
                  </span>
                </p>
              </div>
            </div>
          </>
        )}

        {selectedTab === Tab.Name.REVIEWS && (
          <>
            <div className="movie-card__reviews movie-card__row">
              <div className="movie-card__reviews-col">
                {comments.map((review) => (
                  <div className="review" key={review.id}>
                    <blockquote className="review__quote">
                      <p className="review__text">{review.comment}</p>

                      <footer className="review__details">
                        <cite className="review__author">
                          {review.user.name}
                        </cite>
                        <time className="review__date" dateTime={review.date}>
                          {review.date}
                        </time>
                      </footer>
                    </blockquote>

                    <div className="review__rating">{review.rating}</div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    );
  }
}

Tabs.propTypes = {
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
  comments: PropTypes.arrayOf(
      PropTypes.shape({
        comment: PropTypes.string,
        date: PropTypes.string,
        id: PropTypes.number,
        rating: PropTypes.number,
        user: PropTypes.shape({
          id: PropTypes.number,
          name: PropTypes.string
        })
      })
  ),
  getActiveClass: PropTypes.func.isRequired,
  setActiveTab: PropTypes.func.isRequired,
  selectedTab: PropTypes.string.isRequired
};

const mapStateToProps = (state) => ({
  comments: getComments(state)
});

export default connect(mapStateToProps)(Tabs);
