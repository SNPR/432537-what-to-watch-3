import React from "react";
import Main from "../main/main.jsx";

// eslint-disable-next-line react/prop-types
const App = ({name, genre, releaseYear, movies}) => {
  return (
    <Main name={name} genre={genre} releaseYear={releaseYear} movies={movies} />
  );
};

export default App;
