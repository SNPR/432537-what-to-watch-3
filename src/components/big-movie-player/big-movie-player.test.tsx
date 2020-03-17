import * as React from "react";
import * as renderer from "react-test-renderer";
import { BigMoviePlayer } from "./big-movie-player";
import { Movie } from "../../types";
import { ActionType } from "../../reducer/state/state";

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

it(`Should render BigMoviePlayer component`, () => {
  const tree = renderer
    .create(
      <BigMoviePlayer
        movie={films[0]}
        autoPlay={false}
        muted={true}
        isPlaying={false}
        getElapsedTime={() => "1h 5m"}
        getPlaybackProgress={() => "100"}
        onPlayButtonClick={() => {}}
        onFullscreenButtonClick={() => {}}
        onExitButtonClick={() => {}}
        onLoadedMetadata={() => {}}
        onTimeUpdate={() => {}}
        videoRef={React.createRef()}
        changeSelectedMovieId={() => ({
          type: ActionType.RESET_SHOWED_MOVIES_AMOUNT,
          payload: null
        })}
        id={0}
      />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
