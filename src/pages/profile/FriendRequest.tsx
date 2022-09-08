import React, { useEffect, useState } from "react";
import styled from "styled-components";
import firebaseapi from "../../utils/firebaseapi";
import {
  doc,
  setDoc,
  addDoc,
  getFirestore,
  collection,
  updateDoc,
  arrayUnion,
  serverTimestamp,
} from "firebase/firestore";
import { useSelector, useDispatch } from "react-redux";

interface Props {
  sentInvitationList: [];
  getInvitationList: [];
}

const Friend = ({ sentInvitationList, getInvitationList }: Props) => {
  const userData = useSelector((state) => state) as any;
  const db = getFirestore();
  const [getUser, setGetUser] = useState("");
  const [getUserName, setGetUserName] = useState("");

  useEffect(() => {
    const userId = userData.user.user_id;
    const userName = userData.user.user_name;
    console.log(userId);
    console.log(userName);
    if (userId && userName) {
      setGetUser(userId);
      setGetUserName(userName);
    }
  }, []);

  const merge = async (e: any) => {
    console.log(getUser);
    console.log(getUserName);
    console.log(e.target.value);
    const index = e.target.value;
    const newArr = getInvitationList.splice(index, 1) as any;
    console.log(newArr); // 被切出來的[obj]
    console.log(getInvitationList); // 留下來的[obj]
    const otherUserID = newArr[0]["user_id"];
    console.log(otherUserID);
    // 更新自己的DB
    const userRef = doc(db, "Users", getUser);
    await updateDoc(userRef, {
      friend_request: getInvitationList,
    });
    console.log("更新了自己的DB: friend_request: getInvitationList");
    // 打開repo (setDoc in Chatrooms collection)
    const newChatRef = doc(collection(db, "Chatrooms"));
    await setDoc(newChatRef, {
      chat_id: newChatRef.id,
      users: [otherUserID, getUser],
    });
    await addDoc(collection(db, "Chatrooms", newChatRef.id, "messages"), {
      sender_id: getUser,
      sender_name: getUserName,
      text: "test",
      timestamp: serverTimestamp(),
    });
    // 把名單, repo ID都丟進Friend_list (自己的)
    // const newdata = { ...newArr, chat_id: newChatRef.id };
    newArr[0].chat_id = newChatRef.id;
    await updateDoc(userRef, {
      friend_list: arrayUnion(newArr[0]),
    });
    console.log("更新了自己的DB: friend_list");
    // 丟進Friend_list (對方的)
    const userRef2 = doc(db, "Users", otherUserID);
    await updateDoc(userRef2, {
      friend_list: arrayUnion({
        user_id: getUser,
        user_name: getUserName,
        chat_id: newChatRef.id,
      }),
    });
    console.log("更新了自己的DB: friend_list");
  };

  const close = async (e: any) => {
    console.log(e.target.value);
    const index = e.target.value;
    const newArr = getInvitationList.splice(index, 1);
    console.log(newArr); // 被切出來的[obj]
    console.log(getInvitationList); // 留下來的[obj]
    // 更新自己的DB
    const userRef = doc(db, "Users", getUser);
    await updateDoc(userRef, {
      friend_request: getInvitationList,
    });
    console.log("更新了自己的DB: friend_request: getInvitationList");
  };

  return (
    <>
      <p>Recieved request:</p>
      {getInvitationList &&
        getInvitationList.map((anObjectMapped, index) => {
          return (
            <div>
              <p key={`${anObjectMapped["user_name"]}`}>
                {anObjectMapped["user_name"]} - {anObjectMapped["user_id"]}
              </p>
              <button value={index} onClick={merge}>
                Merge
              </button>
              <button value={index} onClick={close}>
                Close
              </button>
            </div>
          );
        })}
      <p>Sent request: (pending)</p>
      {sentInvitationList &&
        sentInvitationList.map((anObjectMapped, index) => {
          return (
            <div>
              <p key={`${anObjectMapped["user_name"]}`}>
                {anObjectMapped["user_name"]} - {anObjectMapped["user_id"]}
              </p>
            </div>
          );
        })}
    </>
  );
};

export default Friend;
