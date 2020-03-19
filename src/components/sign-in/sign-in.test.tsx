import * as React from "react";
import * as renderer from "react-test-renderer";
import SignIn from "./sign-in";
import {MemoryRouter} from "react-router-dom";
import {AxiosPromise} from "axios";
import {noop} from "../../utils/utils";

it(`SignIn component render correctly`, () => {
  const tree = renderer
    .create(
        <MemoryRouter>
          <SignIn
            onSubmit={() => new Promise(noop) as AxiosPromise}
            goBack={noop}
            onError={noop}
            authErrorMessage="err"
          />
        </MemoryRouter>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
