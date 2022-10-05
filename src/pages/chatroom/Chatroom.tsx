import React, { useEffect, useState, useRef, useLayoutEffect } from "react";
import styled from "styled-components";
import firebaseapi from "../../utils/firebaseapi";
import { useSelector } from "react-redux";
import { db } from "../../utils/firebase";
import {
  addDoc,
  collection,
  serverTimestamp,
  query,
  onSnapshot,
  orderBy,
} from "firebase/firestore";
import Picker from "emoji-picker-react";
import useOnclickOutside from "react-cool-onclickoutside";
import { RootState } from "../..";

interface Props {
  ownMessage: boolean;
}

const MsgListContainer = styled.div`
  margin-bottom: 16px;
  flex: 1;
  overflow: scroll;
`;
const MsgList = styled.ul`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0;
`;
const MessageLine = styled.li<Props>`
  color: ${(props) => (props.ownMessage ? "white" : "black")};
  padding: 8px 16px;
  margin-bottom: 8px;
  background: ${(props) => (props.ownMessage ? "#0088ff" : "#d9e0e8")};
  border-radius: 5px;
  text-align: ${(props) => (props.ownMessage ? "right" : "left")};
  align-self: ${(props) => (props.ownMessage ? "flex-end" : null)};
`;
const Sender = styled.h4`
  margin-bottom: 8px;
`;
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
const CursorPlus = styled.span`
  -webkit-animation: blink 1s 0s infinite;
  -moz-animation: blink 1s 0s infinite;
  -o-animation: blink 1s 0s infinite;
  animation: blink 1s 0.5s infinite;
  @keyframes blink {
    0% {
      opacity: 0;
    }
    40% {
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
    90% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
`;

const Chatroom = (props: { chatroomId: string }) => {
  const { chatroomId } = props;
  const userData = useSelector((state: RootState) => state);
  const [messages, setMessages] = useState<any>([]);
  const [chosenEmoji, setChosenEmoji] = useState<boolean>();
  const [value, setValue] = useState("");
  const user = userData.user;

  const containerRef = useRef<HTMLDivElement | null>(null);
  useLayoutEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  });

  const getMessages = (id: string) => {
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
    firebaseapi.readChatData(chatroomId).then((res) => {
      if (res) {
        console.log(res);
        getMessages(chatroomId);
      }
    });
  }, [chatroomId]);

  const sendMessage = async (
    id: string,
    user: { user_id: string; user_name: string },
    text: string
  ) => {
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
  const handleChange = (event: { target: { value: string } }) => {
    setValue(event.target.value);
  };
  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    sendMessage(chatroomId, user, value);
    setValue("");
  };
  const onEmojiClick = (e: any, emojiObject: { emoji: string }) => {
    setValue((pre) => pre + emojiObject.emoji);
    setChosenEmoji(false);
  };
  const showEmoji = () => {
    setChosenEmoji((pre) => !pre);
  };
  const ref = useOnclickOutside(() => {
    setChosenEmoji(false);
  });

  return (
    <>
      <ChatContainer>
        <MsgListContainer ref={containerRef}>
          <MsgList>
            {messages.map((msg: { id: string; sender_id: string }) => (
              <Message
                key={msg.id}
                message={msg}
                isOwnMessage={msg.sender_id === user.user_id}
              />
            ))}
          </MsgList>
        </MsgListContainer>
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
              <CursorPlus>_</CursorPlus>
            </InputContainer>
            <EmojiIcon onClick={showEmoji}>😃</EmojiIcon>
            {chosenEmoji && (
              <EmojiBx ref={ref}>
                <Picker onEmojiClick={onEmojiClick} />
              </EmojiBx>
            )}
            <MsgBtn type="submit" className="send-message">
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
    <MessageLine ownMessage={isOwnMessage}>
      <Sender>{isOwnMessage ? "You" : sender_name}</Sender>
      <div>{text}</div>
    </MessageLine>
  );
}

export default Chatroom;
