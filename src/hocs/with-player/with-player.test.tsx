import * as React from "react";
import * as renderer  from "react-test-renderer";
import withPlayer from "./with-player";

const movie = {
  name: `Movie name`,
  posterUrl: `https://poster-url.com`,
  bigPosterUrl: `https://image-url.com/1.jpg`,
  trailerUrl: `https://image-url.com/1.mp4`,
  director: `Director Name`,
  starring: [`Actor 1`, `Actor 2`, `Actor 3`],
  runTime: `1h 00m`,
  genre: `Movie Genre`,
  releaseYear: 2000,
  rating: 8.9,
  votes: 4235,
  description: `Movie description`,
  reviews: [
    {
      rating: 9,
      date: `November 10, 2019`,
      author: `Dmitriy`,
      text: `Review text`
    }
  ]
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
          onExitButtonClick={() => {}}
          id={0}
        />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
