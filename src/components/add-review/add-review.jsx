import React, {PureComponent, createRef} from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {getSelectedMovie} from "../../reducer/state/selectors.js";
import {Operation} from "../../reducer/data/data";
import {Link} from "react-router-dom";
import {AppRoute} from "../../utils/constants.js";
import history from "../../history.js";
import {ActionCreator} from "../../reducer/state/state.js";
import {MIN_REVIEW_LENGTH, MAX_REVIEW_LENGTH} from "../../utils/constants.js";

class AddReview extends PureComponent {
  constructor(props) {
    super(props);

    this.submitFormRef = createRef();
    this.commentRef = createRef();
    this.sendCommentButtonRef = createRef();

    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleFormDisability = this.toggleFormDisability.bind(this);
  }

  componentDidMount() {
    this.props.changeSelectedMovieId(this.props.id);
  }

  toggleFormDisability() {
    this.commentRef.current.disabled = !this.commentRef.current.disabled;
    this.sendCommentButtonRef.current.disabled = !this.sendCommentButtonRef
      .current.disabled;
  }

  handleSubmit(evt) {
    const {onSubmit} = this.props;
    evt.preventDefault();
    this.toggleFormDisability();

    onSubmit(
        {
          movieId: this.props.movie.id,
          rating: this.submitFormRef.current.rating.value,
          comment: this.commentRef.current.value
        },
        () => {
          this.toggleFormDisability();
          history.goBack();
        },
        () => {
          this.toggleFormDisability();
        }
    );
  }

  render() {
    const {movie, isFormInvalid, onReviewTextChange} = this.props;
    return movie ? (
      <>
        <section className="movie-card movie-card--full">
          <div className="movie-card__header">
            <div className="movie-card__bg">
              <img src={movie.bigPosterUrl} alt={movie.name} />
            </div>

            <h1 className="visually-hidden">WTW</h1>

            <header className="page-header">
              <div className="logo">
                <Link to={AppRoute.ROOT} className="logo__link">
                  <span className="logo__letter logo__letter--1">W</span>
                  <span className="logo__letter logo__letter--2">T</span>
                  <span className="logo__letter logo__letter--3">W</span>
                </Link>
              </div>

              <nav className="breadcrumbs">
                <ul className="breadcrumbs__list">
                  <li className="breadcrumbs__item">
                    <a href="movie-page.html" className="breadcrumbs__link">
                      {movie.name}
                    </a>
                  </li>
                  <li className="breadcrumbs__item">
                    <a className="breadcrumbs__link">Add review</a>
                  </li>
                </ul>
              </nav>

              <div className="user-block">
                <div className="user-block__avatar">
                  <Link to={AppRoute.MY_LIST}>
                    <img
                      src="/img/avatar.jpg"
                      alt="User avatar"
                      width="63"
                      height="63"
                    />
                  </Link>
                </div>
              </div>
            </header>

            <div className="movie-card__poster movie-card__poster--small">
              <img
                src={movie.posterUrl}
                alt={movie.name}
                width="218"
                height="327"
              />
            </div>
          </div>

          <div className="add-review">
            <form
              action="#"
              className="add-review__form"
              onSubmit={this.handleSubmit}
              ref={this.submitFormRef}
            >
              <div className="rating">
                <div className="rating__stars">
                  <input
                    className="rating__input"
                    id="star-1"
                    type="radio"
                    name="rating"
                    value="1"
                  />
                  <label className="rating__label" htmlFor="star-1">
                    Rating 1
                  </label>

                  <input
                    className="rating__input"
                    id="star-2"
                    type="radio"
                    name="rating"
                    value="2"
                  />
                  <label className="rating__label" htmlFor="star-2">
                    Rating 2
                  </label>

                  <input
                    className="rating__input"
                    id="star-3"
                    type="radio"
                    name="rating"
                    value="3"
                    defaultChecked
                  />
                  <label className="rating__label" htmlFor="star-3">
                    Rating 3
                  </label>

                  <input
                    className="rating__input"
                    id="star-4"
                    type="radio"
                    name="rating"
                    value="4"
                  />
                  <label className="rating__label" htmlFor="star-4">
                    Rating 4
                  </label>

                  <input
                    className="rating__input"
                    id="star-5"
                    type="radio"
                    name="rating"
                    value="5"
                  />
                  <label className="rating__label" htmlFor="star-5">
                    Rating 5
                  </label>
                </div>
              </div>

              <div className="add-review__text">
                <textarea
                  className="add-review__textarea"
                  name="review-text"
                  id="review-text"
                  placeholder="Review text"
                  ref={this.commentRef}
                  minLength={MIN_REVIEW_LENGTH}
                  maxLength={MAX_REVIEW_LENGTH}
                  onChange={onReviewTextChange}
                />
                <div className="add-review__submit">
                  <button
                    className="add-review__btn"
                    type="submit"
                    ref={this.sendCommentButtonRef}
                    disabled={isFormInvalid}
                  >
                    Post
                  </button>
                </div>
              </div>
            </form>
          </div>
        </section>
      </>
    ) : (
      <h1>Loading...</h1>
    );
  }
}

const mapStateToProps = (state) => ({
  movie: getSelectedMovie(state)
});

const mapDispatchToProps = (dispatch) => ({
  onSubmit(commentData, onSuccess, onError) {
    dispatch(Operation.addComment(commentData, onSuccess, onError));
  },
  changeSelectedMovieId(id) {
    dispatch(ActionCreator.changeSelectedMovieId(id));
  }
});

AddReview.propTypes = {
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
  }),
  onSubmit: PropTypes.func.isRequired,
  changeSelectedMovieId: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  isFormInvalid: PropTypes.bool.isRequired,
  onReviewTextChange: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(AddReview);
