import * as React from "react";
import * as renderer from "react-test-renderer";
import withPlayer from "./with-player";
import {Movie} from "../../types";
import {noop} from "../../utils/utils";

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

const MockComponent = () => <div></div>;
const MockComponentWrapped = withPlayer(MockComponent);

it(`withPlayer is rendered correctly`, () => {
  const tree = renderer
    .create(
        <MockComponentWrapped
          movie={movie}
          muted={true}
          autoPlay={false}
          onExitButtonClick={noop}
          id={0}
        />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
