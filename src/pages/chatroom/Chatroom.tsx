import React, { useEffect, useState, useRef, useLayoutEffect } from "react";
import styled from "styled-components";
import firebaseapi from "../../utils/firebaseapi";
import "./chatroom.css";
import { useSelector } from "react-redux";
import {
  addDoc,
  collection,
  serverTimestamp,
  query,
  getFirestore,
  onSnapshot,
  orderBy,
} from "firebase/firestore";
import Picker from "emoji-picker-react";
import useOnclickOutside from "react-cool-onclickoutside";

const ChatContainer = styled.div`
  display: flex;
  width: 100%;
  height: 70vh;
  flex-direction: column;
  padding: 16px;
  flex-grow: 1;
  overflow: hidden;
  color: white;
  position: relative;
`;

const MsgContainer = styled.div`
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-button {
    display: none;
  }
  &::-webkit-scrollbar-track-piece {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 4px;
    background-color: rgba(0, 0, 0, 0.4);
    border: 1px solid slategrey;
  }
  &::-webkit-scrollbar-track {
    box-shadow: transparent;
  }
`;
const MsgInput = styled.input`
  width: 190px;
  display: inline;
  font-size: 20px;
  outline: none;
  border: none;
  color: #bbb;
  background-color: rgba(0, 0, 0, 0.4);
  &:focus {
    width: 90%;
    transition: width 0.4s ease-in-out;
  }
`;
const InputContainer = styled.div`
  width: 100%;
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

const EmojiIcon = styled.div`
  margin-top: 6px;
  margin-left: 6px;
  width: 35px;
  height: 35px;
  cursor: pointer;
  font-size: 20px;
`;
const EmojiBx = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
`;

const Chatroom = ({ chatroomId }: any) => {
  const userData = useSelector((state) => state) as any;
  const db = getFirestore();
  const [messages, setMessages] = useState<any>([]);
  const [chosenEmoji, setChosenEmoji] = useState<any>();

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

  const onEmojiClick = (e: any, emojiObject: any) => {
    setValue((pre: any) => pre + emojiObject.emoji);
    setChosenEmoji(false);
  };
  const showEmoji = () => {
    setChosenEmoji((pre: any) => !pre);
  };

  const ref = useOnclickOutside(() => {
    setChosenEmoji(false);
  });

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
            <p>&#65310;</p>
            <InputContainer>
              <MsgInput
                type="text"
                placeholder="Enter your message"
                value={value}
                onChange={handleChange}
                required
                minLength={1}
              />
              <span className="cursor_plus">_</span>
            </InputContainer>
            <EmojiIcon onClick={showEmoji}>😃</EmojiIcon>
            {chosenEmoji && (
              <EmojiBx ref={ref}>
                <Picker onEmojiClick={onEmojiClick} />
              </EmojiBx>
            )}
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
