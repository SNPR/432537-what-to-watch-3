import * as React from "react";
import {configure, mount} from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import MoviesList from "./movies-list";
import {Movie} from "../../types";
import {noop} from "../../utils/utils";

configure({
  adapter: new Adapter()
});

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

it(`Should pass data to handler on click`, () => {
  const movieCardClickHandler = jest.fn();

  const moviesList = mount(
      <MoviesList
        movies={films}
        onMovieCardClick={movieCardClickHandler}
        onMovieCardMouseOver={noop}
        onMovieCardMouseOut={noop}
        isPlaying={false}
        selectedMovieId={1}
      />
  );

  const movieCard = moviesList
    .find(`article.small-movie-card.catalog__movies-card`)
    .first();

  movieCard.simulate(`click`);

  expect(movieCardClickHandler.mock.calls.length).toBe(1);
  expect(movieCardClickHandler.mock.calls[0][0]).toBe(1);
});
