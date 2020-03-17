import * as React from "react";
import * as renderer from "react-test-renderer";
import Tabs from "./tabs";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import Namespace from "../../reducer/namespace";
import { Tab } from "../../utils/constants";

const movie = {
  name: `Movie name`,
  posterUrl: `https://poster-url.com`,
  bigPosterUrl: `https://image-url.com/1.jpg`,
  trailerUrl: `https://video-url.com/1.mp4`,
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
          getActiveClass={() => {}}
          setActiveTab={() => {}}
          selectedTab={Tab.Name.DETAILS}
        />
      </Provider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
