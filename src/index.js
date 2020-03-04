import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app/app.jsx";
import {createStore, applyMiddleware} from "redux";
import {Provider} from "react-redux";
import {reducer} from "./reducer.js";
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";
import {createAPI} from "./api.js";
import {Operation} from "./reducer.js";

const api = createAPI();

const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(thunk.withExtraArgument(api)))
);

store.dispatch(Operation.getMovies());
store.dispatch(Operation.getPromoMovie());

ReactDOM.render(
    <Provider store={store}>
      <App getComments={(movieId) => store.dispatch(Operation.getComments(movieId))} />
    </Provider>,
    document.querySelector(`#root`)
);
