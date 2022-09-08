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

const Wrapper = styled.div`
  display: block;
  max-width: 1376px;
  margin: 0 auto;
  margin-bottom: 100px;
`;

const ChatContainer = styled.div`
  display: flex;
  width: 800px;
  border: 1px solid black;
  flex-direction: column;
  padding: 16px;
  flex-grow: 1;
  overflow: hidden;
`;

const Chatroom = () => {
  const userData = useSelector((state) => state) as any;
  const db = getFirestore();
  const { id } = useParams<any>();
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
    console.log(id);
    firebaseapi.readChatData(id).then((res) => {
      if (res) {
        console.log(res);
        getMessages(id);
      }
    });
  }, []);

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
    sendMessage(id, user, value);
    setValue("");
  };

  return (
    <>
      <Wrapper>
        chatroom here
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
            <input
              type="text"
              placeholder="Enter a message"
              value={value}
              onChange={handleChange}
              className="message-input"
              required
              minLength={1}
            />
            <button type="submit" disabled={value < 1} className="send-message">
              Send
            </button>
          </form>
        </ChatContainer>
      </Wrapper>
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
