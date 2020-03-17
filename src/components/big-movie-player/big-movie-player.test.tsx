import * as React from "react";
import * as renderer from "react-test-renderer";
import {BigMoviePlayer} from "./big-movie-player";
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

it(`Should render BigMoviePlayer component`, () => {
  const tree = renderer
    .create(
        <BigMoviePlayer
          movie={films[0]}
          autoPlay={false}
          muted={true}
          isPlaying={false}
          elapsedTime={`1h 5m`}
          playbackProgress={`100`}
          onPlayButtonClick={noop}
          onFullscreenButtonClick={noop}
          onExitButtonClick={noop}
          onLoadedMetadata={noop}
          onTimeUpdate={noop}
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
