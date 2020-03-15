import React from "react";
import renderer from "react-test-renderer";
import SignIn from "./sign-in";
import {MemoryRouter} from "react-router-dom";

it(`SignIn component render correctly`, () => {
  const tree = renderer
    .create(
        <MemoryRouter>
          <SignIn onSubmit={() => {}} />
        </MemoryRouter>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
