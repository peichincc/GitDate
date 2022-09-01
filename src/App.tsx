import React from "react";
import { Outlet } from "react-router-dom";
import { createGlobalStyle } from "styled-components";

import Header from "./components/Header";

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin:0;
    text-decoration: none;
  }
  ul {
  list-style-type: none;
}

  body {
    font-family: sans-serif;
  }

  #root {
  }
`;

function App() {
  return (
    <>
      <GlobalStyle />
      <Header />
      <Outlet />
    </>
  );
}

export default App;
