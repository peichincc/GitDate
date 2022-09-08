import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import firebaseapi from "../../utils/firebaseapi";
import {
  doc,
  setDoc,
  collection,
  serverTimestamp,
  query,
  where,
  getDoc,
  getDocs,
  getFirestore,
  deleteDoc,
  updateDoc,
  arrayUnion,
  onSnapshot,
} from "firebase/firestore";
import { useSelector, useDispatch } from "react-redux";

const Wrapper = styled.div`
  display: block;
  max-width: 1376px;
  margin: 0 auto;
  margin-bottom: 100px;
`;

const ChatList = () => {
  const userData = useSelector((state) => state) as any;
  let navigate = useNavigate();
  const db = getFirestore();
  const [getUser, setGetUser] = useState("");
  const [friendList, setFriendList] = useState<any>();
  const [chatRoomId, setChatRoomId] = useState([]);

  useEffect(() => {
    const userId = userData.user.user_id;
    console.log(userId);
    if (userId) {
      setGetUser(userId);
      firebaseapi.readUserData(userId).then((result) => {
        if (result) {
          console.log(result["friend_list"]);
          setFriendList(result["friend_list"]);
          let chatRoomArr = [] as any;
          result["friend_list"].map((tmp: any) => {
            console.log(tmp?.chat_id);
            chatRoomArr.push(tmp?.chat_id);
            return chatRoomArr;
          });
          console.log(chatRoomArr);
          setChatRoomId(chatRoomArr);
        }
      });
    }
  }, []);

  return (
    <>
      <Wrapper>
        <p>Here to display all merged: Friend_list and open repo (chatroom)</p>
        <h1>Friend list</h1>
        {friendList &&
          friendList.map((friend: any) => {
            return (
              <div>
                {friend["user_name"]} - {friend["user_id"]} - Chatroom:
                {friend["chat_id"]}
              </div>
            );
          })}
        <h1>Repo (Chatroom list)</h1>
        {chatRoomId &&
          chatRoomId.map((chatroom: any) => {
            return (
              <div>
                <button
                  onClick={() => {
                    navigate("/chatroom/" + chatroom);
                  }}
                >
                  To Chatroom
                </button>
              </div>
            );
          })}
      </Wrapper>
    </>
  );
};

export default ChatList;
