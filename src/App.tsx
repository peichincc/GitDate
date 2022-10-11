import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import { db } from "../src/utils/firebase";
import {
  doc,
  query,
  collection,
  onSnapshot,
  orderBy,
  DocumentData,
} from "firebase/firestore";
import { auth } from "../src/utils/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { setUserData } from "../src/actions/index";
import firebaseapi from "../src/utils/firebaseapi";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Slider from "./components/Slider";
import ScrollToTop from "./components/ScrollToTop";
import Notification from "./components/modal/Notification";
import NewMsg from "./components/modal/NewMsg";

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
  const [showNotification, setShowNotification] = useState(false);
  const [newMsgNotification, setNewMsgNotification] = useState(false);
  const [arrayLength, setArrayLength] = useState(0);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        firebaseapi.searchUserName(uid).then((result) => {
          if (result) {
            dispatch(
              setUserData(
                result["user_id"],
                result["firstname"],
                result["main_photo"]
              )
            );
            getFriend(result["user_id"]);
            getChatUpdate(result["user_id"]);
          }
        });
      }
    });
  }, []);

  const getFriend = (id: string) => {
    onSnapshot(doc(collection(db, "Users"), id), (doc) => {
      if (doc.exists()) {
        setArrayLength(doc.data().friend_request.length);
        setShowNotification(false);
        if (doc.data().friend_request.length > arrayLength) {
          setShowNotification(true);
        }
      }
    });
  };

  const getChatUpdate = (id: string) => {
    firebaseapi.readUserData(id).then((result) => {
      if (result) {
        result["friend_list"].forEach((doc: DocumentData) => {
          onSnapshot(
            query(
              collection(db, "Chatrooms", doc.chat_id, "messages"),
              orderBy("timestamp", "asc")
            ),
            (querySnapshot) => {
              const messages = querySnapshot.docs.map((x) => ({
                id: x.id,
                ...x.data(),
              }));
              messages.forEach((details: DocumentData) => {
                const timeDiff = Date.now() - details.timestamp.seconds * 1000;
                if (timeDiff < 10000) {
                  setNewMsgNotification(true);
                }
              });
            }
          );
        });
      }
    });
  };

  return (
    <>
      <GlobalStyle />
      <Header />
      {newMsgNotification && <NewMsg />}
      <Outlet />
      {showNotification && <Notification />}
      <Slider />
      <ScrollToTop />
      <Footer />
    </>
  );
}

export default App;
