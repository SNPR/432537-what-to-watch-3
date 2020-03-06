import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app/app.jsx";
import {createStore, applyMiddleware} from "redux";
import {Provider} from "react-redux";
import reducer from "./reducer/reducer.js";
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";
import {createAPI} from "./api.js";
import {Operation as DataOperation} from "./reducer/data/data.js";

const api = createAPI();

const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(thunk.withExtraArgument(api)))
);

store.dispatch(DataOperation.getMovies());
store.dispatch(DataOperation.getPromoMovie());

ReactDOM.render(
    <Provider store={store}>
      <App
        getComments={(movieId) =>
          store.dispatch(DataOperation.getComments(movieId))
        }
      />
    </Provider>,
    document.querySelector(`#root`)
);
