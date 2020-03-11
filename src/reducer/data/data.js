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
  ADD_MOVIE_TO_MY_LIST: `ADD_MOVIE_TO_MY_LIST`,
  REMOVE_MOVIE_FROM_MY_LIST: `REMOVE_MOVIE_FROM_MY_LIST`,
  GET_MY_MOVIES_LIST: `GET_MY_MOVIES_LIST`
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
      dispatch(ActionCreator.addMovieToMyList(response.data));
    });
  },
  removeMovieFromMyList: (movieId) => (dispatch, getState, api) => {
    return api.post(`/favorite/${movieId}/0`).then((response) => {
      dispatch(ActionCreator.removeMovieFromMyList(response.data));
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
  addMovieToMyList: (id = 0) => ({
    type: ActionType.ADD_MOVIE_TO_MY_LIST,
    payload: id
  }),
  removeMovieFromMyList: (id = 0) => ({
    type: ActionType.REMOVE_MOVIE_FROM_MY_LIST,
    payload: id
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
  }

  return state;
};

export {reducer, ActionType, ActionCreator, Operation};
