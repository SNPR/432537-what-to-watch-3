import * as React from "react";
import * as renderer from "react-test-renderer";
import SignIn from "./sign-in";
import { MemoryRouter } from "react-router-dom";
import { AxiosPromise } from "axios";

it(`SignIn component render correctly`, () => {
  const tree = renderer
    .create(
      <MemoryRouter>
        <SignIn
          onSubmit={({ login, password }) =>
            new Promise(() => {}) as AxiosPromise
          }
          goBack={() => {}}
          onError={() => {}}
          authErrorMessage="err"
        />
      </MemoryRouter>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
