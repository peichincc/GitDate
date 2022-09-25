import React from "react";
import { Outlet } from "react-router-dom";
import { createGlobalStyle } from "styled-components";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Slider from "./components/Slider";
import ScrollToTop from "./components/ScrollToTop";

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin:0;
    text-decoration: none;
  }
  ul {
  list-style-type: none;
}
a {
    all: unset;
}

  body {
    font-family: "Segoe UI", Helvetica, Arial,
    sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
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
      <Slider />
      <ScrollToTop />
      <Footer />
    </>
  );
}

export default App;
