import React from "react";
import renderer from "react-test-renderer";
import {ShowMoreButton} from "./show-more-button.jsx";

const SHOWED_MOVIES_DEFAULT = 8;

it(`Should render SimilarMovies component`, () => {
  const tree = renderer
    .create(
        <ShowMoreButton
          movies={[]}
          showedMovies={SHOWED_MOVIES_DEFAULT}
          showMoreMovies={() => {}}
        />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
