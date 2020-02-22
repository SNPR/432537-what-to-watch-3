import {reducer, ActionCreator, ActionType} from "./reducer.js";
import {ALL_GENRES} from "./utils/constants";
import films from "./mocks/films";

const initialState = {
  genre: ALL_GENRES,
  films
};

it(`Reducer without additional parameters should return initial state`, () => {
  expect(reducer(undefined, {})).toEqual(initialState);
});

it(`Reducer should change genre`, () => {
  expect(
      reducer(
          {genre: ALL_GENRES},
          {
            type: ActionType.CHANGE_GENRE,
            payload: `Action`
          }
      )
  ).toEqual({
    genre: `Action`
  });

  expect(
      reducer(
          {genre: ALL_GENRES},
          {
            type: ActionType.CHANGE_GENRE,
            payload: `Crime`
          }
      )
  ).toEqual({genre: `Crime`});
});

it(`Reducer should filter movies by genre`, () => {
  expect(
      reducer(
          {films},
          {
            type: ActionType.FILTER_MOVIES_BY_GENRE,
            payload: `Drama`
          }
      )
  ).toEqual({
    films: [
      {
        name: `The Shawshank Redemption`,
        posterUrl: `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkmMH-bEDUS2TmK8amBqgIMgrfzN1_mImChPuMrunA1XjNTSKm`,
        bigPosterUrl: `https://s.yimg.com/uu/api/res/1.2/gHxCDbiivyHYCbyHSE7dDw--~B/aD0xODAwO3c9MjcwMDtzbT0xO2FwcGlkPXl0YWNoeW9u/https://media.zenfs.com/en/entertainment_weekly_785/18f5f9b6612fac1508035825df45fd0e`,
        trailerUrl: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
        director: `Frank Darabont`,
        starring: [
          `Tim Robbins`,
          `Morgan Freeman`,
          `Bob Gunton`,
          `William Sadler`,
          `Clancy Brown`,
          `Gil Bellows`,
          `James Whitmore`
        ],
        runTime: `2h 22m`,
        genre: `Drama`,
        releaseYear: 1994,
        rating: 9.3,
        votes: 123,
        description: `Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.`,
        reviews: [
          {
            rating: 9,
            date: `December 15, 2019`,
            author: `John Doe`,
            text: `This is an awesome movie! You should watch it!`
          },
          {
            rating: 9,
            date: `December 15, 2019`,
            author: `John Doe`,
            text: `This is an awesome movie! You should watch it!`
          },
          {
            rating: 9,
            date: `December 15, 2019`,
            author: `John Doe`,
            text: `This is an awesome movie! You should watch it!`
          }
        ]
      },
      {
        name: `Saving Private Ryan`,
        posterUrl: `https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcR0lDhR_dXAKTm9wysp3nWu6kP0V5skJBVbCNC_Q8urAWcr4iF_`,
        bigPosterUrl: `https://cropper.watch.aetnd.com/cdn.watch.aetnd.com/sites/2/2018/06/Saving-Private-Ryan-494551565.jpg`,
        trailerUrl: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
        director: `Steven Spielberg`,
        starring: [`Tom Hanks`, `Edward Burns`, `Matt Damon`, `Tom Sizemore`],
        runTime: `2h 49m`,
        genre: `Drama`,
        releaseYear: 1998,
        rating: 8.6,
        votes: 4536,
        description: `Following the Normandy Landings, a group of U.S. soldiers go behind enemy lines to retrieve a paratrooper whose brothers have been killed in action.`,
        reviews: [
          {
            rating: 9,
            date: `December 15, 2019`,
            author: `John Doe`,
            text: `This is an awesome movie! You should watch it!`
          },
          {
            rating: 9,
            date: `December 15, 2019`,
            author: `John Doe`,
            text: `This is an awesome movie! You should watch it!`
          },
          {
            rating: 9,
            date: `December 15, 2019`,
            author: `John Doe`,
            text: `This is an awesome movie! You should watch it!`
          }
        ]
      }
    ]
  });

  expect(
      reducer(
          {genre: ALL_GENRES},
          {
            type: ActionType.CHANGE_GENRE,
            payload: `Crime`
          }
      )
  ).toEqual({genre: `Crime`});
});

describe(`Action creators work correctly`, () => {
  it(`Action creator for genre changing returns correct action`, () => {
    expect(ActionCreator.changeGenre(`Action`)).toEqual({
      type: ActionType.CHANGE_GENRE,
      payload: `Action`
    });
  });

  it(`Action creator for movies filtering returns correct action`, () => {
    expect(ActionCreator.filterMoviesByGenre(`Horror`)).toEqual({
      type: ActionType.FILTER_MOVIES_BY_GENRE,
      payload: `Horror`
    });
  });

  it(`Action creator for genre changing returns default genre if no genre provided`, () => {
    expect(ActionCreator.changeGenre()).toEqual({
      type: ActionType.CHANGE_GENRE,
      payload: ALL_GENRES
    });
  });

  it(`Action creator for  movies filtering returns default genre if no genre provided`, () => {
    expect(ActionCreator.filterMoviesByGenre()).toEqual({
      type: ActionType.FILTER_MOVIES_BY_GENRE,
      payload: ALL_GENRES
    });
  });


});
