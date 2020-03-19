import * as React from "react";
import * as ReactDOM from "react-dom";
import App from "./components/app/app";
import {applyMiddleware, createStore} from "redux";
import {Provider} from "react-redux";
import reducer from "./reducer/reducer";
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";
import {createAPI} from "./api";
import {Operation as DataOperation} from "./reducer/data/data";
import {
  ActionCreator,
  AuthorizationStatus,
  Operation as UserOperation
} from "./reducer/user/user";

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
