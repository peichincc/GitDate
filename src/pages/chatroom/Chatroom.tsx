import React, { useEffect, useState, useRef, useLayoutEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import firebaseapi from "../../utils/firebaseapi";
import "./chatroom.css";

import { useSelector, useDispatch } from "react-redux";

import {
  addDoc,
  collection,
  serverTimestamp,
  query,
  getFirestore,
  onSnapshot,
  orderBy,
} from "firebase/firestore";

const ChatContainer = styled.div`
  display: flex;
  width: 100%;
  height: 80vh;
  flex-direction: column;
  padding: 16px;
  flex-grow: 1;
  overflow: hidden;
  color: white;
`;

const MsgContainer = styled.div`
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
`;
const MsgInput = styled.input`
  width: 100%;
  display: inline;
  font-size: 20px;
  padding: 10px 10px;
  border-radius: 30px;
  outline: none;
  border: none;
  background: #bbb;
  color: black;
`;
const MsgBtn = styled.button`
  margin-left: 10px;
  margin-right: 10px;
  border: none;
  background: none;
  color: white;
  font-size: 20px;
  cursor: pointer;
  &:hover {
    color: #ff69b4;
  }
`;

const Chatroom = ({ chatroomId }: any) => {
  const userData = useSelector((state) => state) as any;
  const db = getFirestore();
  // const { id } = useParams<any>();
  const [messages, setMessages] = useState<any>([]);

  //
  const containerRef = useRef<any>(null);
  useLayoutEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  });

  const getMessages = (id: any) => {
    return onSnapshot(
      query(
        collection(db, "Chatrooms", id, "messages"),
        orderBy("timestamp", "asc")
      ),
      (querySnapshot) => {
        const messages = querySnapshot.docs.map((x) => ({
          id: x.id,
          ...x.data(),
        }));
        console.log(messages);
        setMessages(messages);
      }
    );
  };

  useEffect(() => {
    console.log(chatroomId);
    firebaseapi.readChatData(chatroomId).then((res) => {
      if (res) {
        console.log(res);
        getMessages(chatroomId);
      }
    });
  }, [chatroomId]);

  // test send msg function
  const [value, setValue] = useState<any>("");
  const user = userData.user;

  const sendMessage = async (id: any, user: any, text: string) => {
    try {
      await addDoc(collection(db, "Chatrooms", id, "messages"), {
        sender_id: user.user_id,
        sender_name: user.user_name,
        timestamp: serverTimestamp(),
        text: text.trim(),
      });
    } catch (error) {
      console.error(error);
    }
  };
  const handleChange = (event: any) => {
    setValue(event.target.value);
  };
  const handleSubmit = (event: any) => {
    event.preventDefault();
    sendMessage(chatroomId, user, value);
    setValue("");
  };

  return (
    <>
      <ChatContainer>
        <div className="message-list-container" ref={containerRef}>
          <ul className="message-list">
            {messages.map((x: any) => (
              <Message
                key={x.id}
                message={x}
                isOwnMessage={x.sender_id === user.user_id}
              />
            ))}
          </ul>
        </div>
        <form onSubmit={handleSubmit} className="message-input-container">
          <MsgContainer>
            <MsgInput
              type="text"
              placeholder="Enter your message"
              value={value}
              onChange={handleChange}
              className="message-input"
              required
              minLength={1}
            />
            <MsgBtn type="submit" disabled={value < 1} className="send-message">
              Send
            </MsgBtn>
          </MsgContainer>
        </form>
      </ChatContainer>
    </>
  );
};

function Message({ message, isOwnMessage }: any) {
  const { sender_name, text } = message;
  return (
    <li className={["message", isOwnMessage && "own-message"].join(" ")}>
      <h4 className="sender">{isOwnMessage ? "You" : sender_name}</h4>
      <div>{text}</div>
    </li>
  );
}

export default Chatroom;
