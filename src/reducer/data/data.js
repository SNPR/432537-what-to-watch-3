import {extend} from "../../utils/utils.js";
import {normalizeMovieData, normalizeMoviesData} from "../../utils/utils.js";

const initialState = {
  promoFilm: {},
  films: [],
  currentFilmComments: []
};

const ActionType = {
  GET_MOVIES: `GET_MOVIES`,
  GET_PROMO_MOVIE: `GET_PROMO_MOVIE`,
  GET_COMMENTS: `GET_COMMENTS`,
};

const Operation = {
  getMovies: () => (dispatch, getState, api) => {
    return api.get(`/films`).then((response) => {
      dispatch(ActionCreator.getMovies(normalizeMoviesData(response.data)));
    });
  },
  getPromoMovie: () => (dispatch, getState, api) => {
    return api.get(`/films/promo`).then((response) => {
      dispatch(ActionCreator.getPromoMovie(normalizeMovieData(response.data)));
    });
  },
  getComments: (movieId) => (dispatch, getState, api) => {
    return api.get(`/comments/${movieId}`).then((response) => {
      dispatch(ActionCreator.getComments(response.data));
    });
  },
  addComment: (commentData) => (dispatch, getState, api) => {
    return api
      .post(`/comments/${commentData.movieId}`, {
        rating: commentData.rating,
        comment: commentData.comment
      })
      .then(() => {
        dispatch(Operation.getComments(commentData.movieId));
      });
  }
};

const ActionCreator = {
  getMovies: (movies) => ({
    type: ActionType.GET_MOVIES,
    payload: movies
  }),
  getPromoMovie: (movie) => ({
    type: ActionType.GET_PROMO_MOVIE,
    payload: movie
  }),
  getComments: (comments) => ({
    type: ActionType.GET_COMMENTS,
    payload: comments
  })
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.GET_MOVIES:
      return extend(state, {
        films: action.payload
      });
    case ActionType.GET_PROMO_MOVIE:
      return extend(state, {
        promoFilm: action.payload
      });
    case ActionType.GET_COMMENTS:
      return extend(state, {
        currentFilmComments: action.payload
      });
  }

  return state;
};

export {reducer, ActionType, ActionCreator, Operation};
