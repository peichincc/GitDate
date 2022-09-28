import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import { auth } from "../src/utils/firebase";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { useSelector, useDispatch } from "react-redux";
import { setUserData, signin } from "../src/actions/index";
import firebaseapi from "../src/utils/firebaseapi";

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
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state) as any;
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        var uid = user.uid;
        firebaseapi.searchUserName(uid).then((result) => {
          if (result) {
            console.log(result);
            console.log(result["firstname"]);
            dispatch(
              setUserData(
                result["user_id"],
                result["firstname"],
                result["main_photo"]
              )
            );
            console.log(userInfo);
          }
        });
      }
    });
  }, []);

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
