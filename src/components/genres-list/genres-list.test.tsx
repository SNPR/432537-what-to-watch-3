import * as React from "react";
import * as renderer from "react-test-renderer";
import {GenresList} from "./genres-list";
import {ALL_GENRES, SHOWED_MOVIES_DEFAULT} from "../../utils/constants";
import {Movie} from "../../types";
import {ActionType} from "../../reducer/state/state";
import {noop} from "../../utils/utils";

const films: Movie[] = [
  {
    name: `MovieName`,
    posterUrl: `https://url.com`,
    previewUrl: `https://url.com`,
    bigPosterUrl: `https://url.com`,
    backgroundColor: `blue`,
    description: `Descrtiption`,
    rating: 9,
    votes: 3452,
    director: `Director`,
    starring: [`Artist 1`, `Artist 2`],
    runTime: `2h 30m`,
    genre: `Action`,
    releaseYear: 1995,
    id: 1,
    isFavorite: false,
    videoUrl: `https://url.com`,
    trailerUrl: `https://url.com`
  }
];

it(`Should render GenresList component`, () => {
  const tree = renderer
    .create(
        <GenresList
          movies={films}
          genre={ALL_GENRES}
          changeGenre={() => ({
            type: ActionType.CHANGE_GENRE,
            payload: ALL_GENRES
          })}
          onMovieCardClick={noop}
          showedMovies={SHOWED_MOVIES_DEFAULT}
          resetShowedMoviesAmount={() => ({
            type: ActionType.RESET_SHOWED_MOVIES_AMOUNT,
            payload: null
          })}
          filteredMovies={films}
        />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
