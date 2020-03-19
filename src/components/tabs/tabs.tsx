import * as React from "react";
import {getTextRating, formatMovieDuration} from "../../utils/utils";
import {connect} from "react-redux";
import {getComments} from "../../reducer/data/selectors";
import {Tab} from "../../utils/constants";
import {Movie} from "../../types";

type TabsProps = {
  movie: Movie;
  comments: {
    comment: string;
    date: string;
    id: number;
    rating: number;
    user: {
      id: number;
      name: string;
    };
  }[];
  getActiveClass: (tabName: string) => string;
  setActiveTab: (tabName: string) => void;
  selectedTab: string;
};

class Tabs extends React.PureComponent<TabsProps, {}> {
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
                    {formatMovieDuration(movie.runTime)}
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

const mapStateToProps = (state) => ({
  comments: getComments(state)
});

export default connect(mapStateToProps)(Tabs);
