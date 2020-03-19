import {
  extend,
  formatReviewDate,
  normalizeMovieData,
  normalizeMoviesData
} from "../../utils/utils";
import Namespace from "../namespace";

const initialState = {
  promoFilm: {},
  films: [],
  currentFilmComments: []
};

const ActionType = {
  GET_MOVIES: `GET_MOVIES`,
  GET_PROMO_MOVIE: `GET_PROMO_MOVIE`,
  GET_COMMENTS: `GET_COMMENTS`,
  ADD_MOVIE_TO_MY_LIST: `ADD_MOVIE_TO_MY_LIST`,
  REMOVE_MOVIE_FROM_MY_LIST: `REMOVE_MOVIE_FROM_MY_LIST`,
  GET_MY_MOVIES_LIST: `GET_MY_MOVIES_LIST`
};

const Operation = {
  getMovies: () => (dispatch, getState, api) => {
    return api.get(`/films`).then((response) => {
      const normalizedMovies = normalizeMoviesData(response.data);

      dispatch(ActionCreator.getMovies(normalizedMovies));
    });
  },
  getPromoMovie: () => (dispatch, getState, api) => {
    return api.get(`/films/promo`).then((response) => {
      dispatch(ActionCreator.getPromoMovie(normalizeMovieData(response.data)));
    });
  },
  getComments: (movieId) => (dispatch, getState, api) => {
    return api.get(`/comments/${movieId}`).then((response) => {
      dispatch(ActionCreator.getComments(response.data.map(formatReviewDate)));
    });
  },
  addComment: (commentData, onSuccess, onError) => (
      dispatch,
      getState,
      api
  ) => {
    return api
      .post(`/comments/${commentData.movieId}`, {
        rating: commentData.rating,
        comment: commentData.comment
      })
      .then(() => {
        dispatch(Operation.getComments(commentData.movieId));
        onSuccess();
      })
      .catch(() => {
        onError();
      });
  },
  addMovieToMyList: (movieId) => (dispatch, getState, api) => {
    return api.post(`/favorite/${movieId}/1`).then((response) => {
      const movie = normalizeMovieData(response.data);
      const state = getState();

      if (state[Namespace.DATA].promoFilm.id === movie.id) {
        dispatch(ActionCreator.getPromoMovie(movie));
      }

      dispatch(ActionCreator.addMovieToMyList(movie));
    });
  },
  removeMovieFromMyList: (movieId) => (dispatch, getState, api) => {
    return api.post(`/favorite/${movieId}/0`).then((response) => {
      const movie = normalizeMovieData(response.data);
      const state = getState();

      if (state[Namespace.DATA].promoFilm.id === movie.id) {
        dispatch(ActionCreator.getPromoMovie(movie));
      }

      dispatch(ActionCreator.removeMovieFromMyList(movie));
    });
  },
  getMyMoviesList: () => (dispatch, getState, api) => {
    return api.get(`/favorite`).then((response) => {
      dispatch(ActionCreator.getMyMoviesList(response.data));
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
  }),
  addMovieToMyList: (movie = {}) => ({
    type: ActionType.ADD_MOVIE_TO_MY_LIST,
    payload: movie
  }),
  removeMovieFromMyList: (movie = {}) => ({
    type: ActionType.REMOVE_MOVIE_FROM_MY_LIST,
    payload: movie
  }),
  getMyMoviesList: () => ({
    type: ActionType.GET_MY_MOVIES_LIST,
    payload: null
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
    case ActionType.ADD_MOVIE_TO_MY_LIST:
      return extend(state, {
        films: [
          ...state.films.filter((movie) => movie.id !== action.payload.id),
          action.payload
        ]
      });
    case ActionType.REMOVE_MOVIE_FROM_MY_LIST:
      return extend(state, {
        films: [
          ...state.films.filter((movie) => movie.id !== action.payload.id),
          action.payload
        ]
      });
  }

  return state;
};

export {reducer, ActionType, ActionCreator, Operation};
