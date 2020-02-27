import React from "react";
import renderer from "react-test-renderer";
import BigMoviePlayer from "./big-movie-player.jsx";

const films = [
  {
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
  }
];

it(`Should render BigMoviePlayer component`, () => {
  const tree = renderer
    .create(
        <BigMoviePlayer
          movie={films[0]}
          autoPlay={false}
          muted={true}
          isPlaying={false}
          getElapsedTime={() => {}}
          getPlaybackProgress={() => {}}
          onPlayButtonClick={() => {}}
          onFullscreenButtonClick={() => {}}
          onExitButtonClick={() => {}}
          videoRef={React.createRef()}
        />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
