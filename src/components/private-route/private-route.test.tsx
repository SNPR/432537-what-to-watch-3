import * as React from "react";
import * as renderer from "react-test-renderer";
import {PrivateRoute} from "./private-route";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";
import {MemoryRouter} from "react-router-dom";
import {AuthorizationStatus} from "../../reducer/user/user";
import {AppRoute} from "../../utils/constants";

it(`Should render PrivateRoute component`, () => {
  const mockStore = configureStore([]);

  const store = mockStore();

  const tree = renderer
    .create(
        <Provider store={store}>
          <MemoryRouter>
            <PrivateRoute
              render={() => HTMLElement as React.ReactNode}
              path={AppRoute.ROOT}
              exact
              authorizationStatus={AuthorizationStatus.NO_AUTH}
            />
          </MemoryRouter>
        </Provider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
