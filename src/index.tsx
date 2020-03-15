import * as React from "react";
import * as ReactDOM from "react-dom";
import App from "./components/app/app";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import reducer from "./reducer/reducer.js";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { createAPI } from "./api.js";
import { Operation as DataOperation } from "./reducer/data/data.js";
import {
  Operation as UserOperation,
  ActionCreator,
  AuthorizationStatus
} from "./reducer/user/user.js";

const onUnauthorized = () => {
  store.dispatch(
    ActionCreator.requireAuthorization(AuthorizationStatus.NO_AUTH)
  );
};

const api = createAPI(onUnauthorized);

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunk.withExtraArgument(api)))
);

store.dispatch(DataOperation.getMovies());
store.dispatch(DataOperation.getPromoMovie());
store.dispatch(UserOperation.checkAuth());

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector(`#root`)
);
