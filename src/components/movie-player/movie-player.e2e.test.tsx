import * as React from "react";
import {configure, shallow} from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import MoviePlayer from "./movie-player";
import {Movie} from "../../types";

configure({
  adapter: new Adapter()
});

const movie: Movie = {
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
};

it(`Should play video on click`, () => {
  const handleClick = jest.fn();

  const moviePlayer = shallow(
      <MoviePlayer
        movie={movie}
        muted={true}
        autoPlay={false}
        onPlayButtonClick={handleClick}
        videoRef={React.createRef()}
      />
  );

  moviePlayer.simulate(`click`);

  expect(handleClick).toHaveBeenCalledTimes(1);
});
