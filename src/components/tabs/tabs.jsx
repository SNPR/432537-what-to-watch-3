import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {getTextRating} from "../../utils/utils";
import {connect} from "react-redux";

const TabName = {
  OVERVIEW: `overview`,
  DETAILS: `details`,
  REVIEWS: `reviews`
};

class Tabs extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {selectedTab: TabName.OVERVIEW};
    this.getActiveClass = this.getActiveClass.bind(this);
  }

  getActiveClass(tabName) {
    return this.state.selectedTab === tabName ? `movie-nav__item--active` : ``;
  }


  render() {
    const {movie, comments} = this.props;
    const {selectedTab} = this.state;

    return (
      <div className="movie-card__desc">
        <nav className="movie-nav movie-card__nav">
          <ul className="movie-nav__list">
            <li
              className={`movie-nav__item ${this.getActiveClass(
                  TabName.OVERVIEW
              )}`}
            >
              <a
                className="movie-nav__link"
                onClick={() => this.setState({selectedTab: TabName.OVERVIEW})}
              >
                Overview
              </a>
            </li>
            <li
              className={`movie-nav__item ${this.getActiveClass(
                  TabName.DETAILS
              )}`}
            >
              <a
                className="movie-nav__link"
                onClick={() => this.setState({selectedTab: TabName.DETAILS})}
              >
                Details
              </a>
            </li>
            <li
              className={`movie-nav__item ${this.getActiveClass(
                  TabName.REVIEWS
              )}`}
            >
              <a
                className="movie-nav__link"
                onClick={() => this.setState({selectedTab: TabName.REVIEWS})}
              >
                Reviews
              </a>
            </li>
          </ul>
        </nav>

        {selectedTab === TabName.OVERVIEW && (
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

        {selectedTab === TabName.DETAILS && (
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

        {selectedTab === TabName.REVIEWS && (
          <>
            <div className="movie-card__reviews movie-card__row">
              <div className="movie-card__reviews-col">
                {comments.map((review, index) => (
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
};

const mapStateToProps = (state) => ({
  comments: state.currentFilmComments
});


export default connect(mapStateToProps)(Tabs);
