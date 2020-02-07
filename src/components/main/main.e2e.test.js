import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Main from "./main.jsx";

Enzyme.configure({
  adapter: new Adapter()
});

const Movie = {
  NAME: `Psycho`,
  GENRE: `Horror`,
  RELEASE_YEAR: 1960
};

const MOVIES = [
  `Schindler's List`,
  `Forrest Gump`,
  `The Lord of the Rings: The Return of the King`
];

it(`Should welcome button be pressed`, () => {
  const movieTitleClickHandler = jest.fn();

  const main = shallow(
      <Main
        name={Movie.NAME}
        genre={Movie.GENRE}
        releaseYear={Movie.RELEASE_YEAR}
        movies={MOVIES}
        onMovieTitleClick={movieTitleClickHandler}
      />
  );

  const movieTitle = main.find(`a.small-movie-card__link`).first();

  movieTitle.props().onClick();

  expect(movieTitleClickHandler.mock.calls.length).toBe(1);
});
