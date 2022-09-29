import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import {
  doc,
  query,
  collection,
  where,
  onSnapshot,
  getFirestore,
} from "firebase/firestore";
import { auth } from "../src/utils/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useSelector, useDispatch } from "react-redux";
import { setUserData } from "../src/actions/index";
import firebaseapi from "../src/utils/firebaseapi";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Slider from "./components/Slider";
import ScrollToTop from "./components/ScrollToTop";
import Notification from "./components/modal/Notification";

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
  const db = getFirestore();
  const [showNotification, setShowNotification] = useState(false);
  const dispatch = useDispatch();
  const [getInvitationList, setGetInvitationList] = useState<any>();
  const [arrayLength, setArrayLength] = useState(0);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        var uid = user.uid;
        firebaseapi.searchUserName(uid).then((result) => {
          if (result) {
            dispatch(
              setUserData(
                result["user_id"],
                result["firstname"],
                result["main_photo"]
              )
            );
            // see friend requests difference
            getFriend(result["user_id"]);
            //
            // see chatroom update
            //
          }
        });
      }
    });
  }, []);

  const getFriend = (id: string) => {
    onSnapshot(doc(collection(db, "Users"), id), (doc) => {
      if (doc.exists()) {
        setGetInvitationList(doc.data().friend_request);
        // console.log(doc.data().friend_request);
        // To compare the friend request
        setArrayLength(doc.data().friend_request.length);
        setShowNotification(false);
        if (doc.data().friend_request.length > arrayLength) {
          setShowNotification(true);
        }
      }
    });
  };

  return (
    <>
      <GlobalStyle />
      <Header />
      <Outlet />
      {showNotification && <Notification />}
      <Slider />
      <ScrollToTop />
      <Footer />
    </>
  );
}

export default App;
