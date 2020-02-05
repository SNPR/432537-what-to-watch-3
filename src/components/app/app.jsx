import React from "react";
import Main from "../main/main.jsx";

const App = (props) => {
  // eslint-disable-next-line react/prop-types
  const {name, genre, releaseYear} = props;

  return <Main name={name} genre={genre} releaseYear={releaseYear} />;
};

export default App;
