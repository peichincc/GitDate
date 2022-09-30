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
  orderBy,
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
  const db = getFirestore();
  const [showNotification, setShowNotification] = useState(false);
  const [newMsgNotification, setNewMsgNotification] = useState(false);
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
            getChatUpdate(result["user_id"]);
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

  const getChatUpdate = (id: string) => {
    firebaseapi.readUserData(id).then((result) => {
      if (result) {
        // console.log(result["friend_list"]);
        result["friend_list"].forEach((doc: any) => {
          // console.log(doc.chat_id);
          // const q = query(
          //   collection(db, "Chatrooms", doc.chat_id, "messages")
          //   // where("sender_id", "==", id)
          // );
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
              console.log(messages);
              messages.forEach((details: any) => {
                // const MsgT = new Date(details.timestamp * 1000).toString();
                // console.log(MsgT);
                // const NowT = new Date(Date.now() * 1000).toString();
                // console.log(NowT);
                // console.log(details.timestamp.seconds * 1000);
                // console.log(Date.now());
                const timeDiff = Date.now() - details.timestamp.seconds * 1000;
                // console.log(timeDiff);
                if (timeDiff < 10000) {
                  setNewMsgNotification(true);
                }
              });
            }
          );
          // const unsubscribe = onSnapshot(q, (snapshot) => {
          //   snapshot.docChanges().forEach((change) => {
          //     console.log(change.doc.data());
          //     // setNewMsgNotification(false);
          //     if (change.type === "added") {
          //       // setNewMsgNotification(true);
          //     }
          //     // setNewMsgNotification(false);
          //   });
          // });
          // unsubscribe();
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
