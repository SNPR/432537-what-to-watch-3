import * as React from "react";
import {configure, shallow} from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import withActiveMovieCard from "./with-active-movie-card";
import {Movie} from "../../types";
import {noop} from "../../utils/utils";

configure({adapter: new Adapter()});

const MockComponent = () => <div />;
const MockComponentWrapped = withActiveMovieCard(MockComponent);

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

it(`Should change selected movie ID on mouseover/mouseout`, () => {
  const wrapper = shallow(
      <MockComponentWrapped movies={films} onMovieCardClick={noop} />
  );

  expect(wrapper.props().selectedMovieId).toEqual(null);

  wrapper.props().onMovieCardMouseOver(0);
  expect(wrapper.props().selectedMovieId).toEqual(0);

  wrapper.props().onMovieCardMouseOut();
  expect(wrapper.props().selectedMovieId).toEqual(null);
});
