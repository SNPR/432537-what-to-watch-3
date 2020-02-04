import React from "react";
import Main from "../main/main.jsx";

const App = (props) => {
  // eslint-disable-next-line react/prop-types
  const {name, genre, releaseYear, posterUrl} = props;

  return (
    <Main
      name={name}
      genre={genre}
      releaseYear={releaseYear}
      posterUrl={posterUrl}
    />
  );
};

export default App;
