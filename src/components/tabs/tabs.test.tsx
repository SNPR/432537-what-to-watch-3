import * as React from "react";
import * as renderer from "react-test-renderer";
import Tabs from "./tabs";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import Namespace from "../../reducer/namespace";
import {Tab} from "../../utils/constants";
import {noop} from "../../utils/utils";
import {Movie} from "../../types";

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
  runTime: `133`,
  genre: `Action`,
  releaseYear: 1995,
  id: 1,
  isFavorite: false,
  videoUrl: `https://url.com`,
  trailerUrl: `https://url.com`
};

it(`Should render Tabs component`, () => {
  const mockStore = configureStore([]);

  const store = mockStore({
    [Namespace.DATA]: {
      promoFilm: movie
    }
  });

  const tree = renderer
    .create(
        <Provider store={store}>
          <Tabs
            movie={movie}
            getActiveClass={noop}
            setActiveTab={noop}
            selectedTab={Tab.Name.DETAILS}
          />
        </Provider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
