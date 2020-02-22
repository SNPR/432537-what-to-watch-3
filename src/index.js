import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app/app.jsx";
import films from "./mocks/films";
import {createStore} from "redux";
import {Provider} from "react-redux";
import {reducer} from "./reducer.js";

const Movie = {
  NAME: `The Grand Budapest Hotel`,
  GENRE: `Drama`,
  RELEASE_YEAR: 2014
};

const store = createStore(reducer);

ReactDOM.render(
    <Provider store={store}>
      <App
        name={Movie.NAME}
        genre={Movie.GENRE}
        releaseYear={Movie.RELEASE_YEAR}
        movies={films}
      />
    </Provider>,
    document.querySelector(`#root`)
);
