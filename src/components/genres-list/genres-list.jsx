import React from "react";
import {ALL_GENRES} from "../../utils/constants.js";

const GenresList = ({movies}) => {
  return (
    <ul className="catalog__genres-list">
      {
        new Set([
          ALL_GENRES,
          ...movies.map((movie) => (
            <li
              className="catalog__genres-item catalog__genres-item--active"
              key={movie.genre}
            >
              <a href="#" className="catalog__genres-link">
                {movie.genre}
              </a>
            </li>
          ))
        ])
      }
    </ul>
  );
};

export default GenresList;
