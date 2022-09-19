import React, { useEffect, useState, useRef, useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import firebaseapi from "../../utils/firebaseapi";

import "./terminal.css";

import Chatroom from "./Chatroom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";

// Terminal Container
const TerminalContainer = styled.div`
  max-width: 1280px;
  width: 100%;
  margin: 0 auto;
`;
const FakeMenu = styled.div`
  width: 100%;
  box-sizing: border-box;
  height: 25px;
  background-color: #bbb;
  margin: 0 auto;
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
`;
const FakeButtonsClose = styled.div`
  height: 10px;
  width: 10px;
  border-radius: 50%;
  border: 1px solid #000;
  position: relative;
  top: 3px;
  left: 6px;
  background-color: #ff3b47;
  border-color: #9d252b;
  display: inline-block;
`;
const FakeButtonsMinimize = styled(FakeButtonsClose)`
  left: 11px;
  background-color: #ffc100;
  border-color: #9d802c;
`;
const FakeButtonsZoom = styled(FakeButtonsClose)`
  left: 16px;
  background-color: #00d742;
  border-color: #049931;
`;
const FakeScreen = styled.div`
  display: flex;
  background-color: #151515;
  box-sizing: border-box;
  width: 100%;
  margin: 0 auto;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
`;
const LineContainer = styled.div`
  padding: 20px;
`;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  padding: 50px;
  background-color: #24292f;
`;
const Sidebar = styled.div`
  background: #24292f;
  height: 100%;
  width: 15%;
`;
const Chat = styled.div`
  width: 100%;
`;

const NameCard = styled.div`
  height: 75px;
  padding: 10px;
  /* background: hsla(0, 0%, 100%, 0.3); */
  display: flex;
  align-items: center;
  border-top: 1px solid;
  /* border-right: 1px solid black; */
`;
const NameCardPhoto = styled.img`
  width: auto;
  height: 60px;
  border-radius: 50%;
  background-color: white;
`;
const NameCardName = styled.div`
  font-size: 20px;
  font-weight: 600;
  color: white;
  margin-left: 20px;
  width: 200px;
`;
const MsgList = styled(NameCard)`
  cursor: pointer;
  background: #151515;
  &:hover {
    background-color: #bbb;
  }
`;
const ChatNameCard = styled(NameCard)`
  background: none;
  justify-content: center;
`;
const ChatNameCardName = styled(NameCardName)`
  cursor: pointer;
  &:hover {
    color: #ff69b4;
  }
`;
// const EllipsisContainer = styled.div`
//   color: white;
//   padding-right: 20px;
//   cursor: pointer;
//   &:hover {
//     color: #ff69b4;
//   }
// `;

const Repo = () => {
  let navigate = useNavigate();
  const userData = useSelector((state) => state) as any;
  const [getUser, setGetUser] = useState("");
  const [getUserName, setGetUserName] = useState("");
  const [getUserPhoto, setGetUserPhoto] = useState("");
  const [friendList, setFriendList] = useState<any>();
  const [openChatroom, setOpenChatroom] = useState(false);
  const [chatroomId, setChatroomId] = useState("");
  const [chaterName, setChaterName] = useState("");
  const [chaterID, setChaterID] = useState("");

  useEffect(() => {
    const userId = userData.user.user_id;
    const userName = userData.user.user_name;
    const userPhoto = userData.user.user_photo;
    console.log(userId);
    console.log(userName);
    if (userId && userName) {
      setGetUser(userId);
      setGetUserName(userName);
      setGetUserPhoto(userPhoto);
      firebaseapi.readUserData(userId).then((result) => {
        if (result) {
          console.log(result["friend_list"]);
          setFriendList(result["friend_list"]);
        }
      });
    }
  }, []);

  return (
    <>
      <Container>
        <TerminalContainer>
          <FakeMenu>
            <FakeButtonsClose />
            <FakeButtonsMinimize />
            <FakeButtonsZoom />
          </FakeMenu>
          <FakeScreen>
            <Sidebar>
              <NameCard>
                <NameCardPhoto src={getUserPhoto} />
                <NameCardName>{getUserName}</NameCardName>
              </NameCard>
              {friendList &&
                friendList.map((friend: any) => {
                  return (
                    <MsgList
                      onClick={() => {
                        setOpenChatroom(true);
                        setChatroomId(friend["chat_id"]);
                        setChaterName(friend["user_name"]);
                        setChaterID(friend["user_id"]);
                      }}
                      // onClick={() => {
                      //   navigate("/chatroom/" + friend["chat_id"]);
                      // }}
                    >
                      <NameCardPhoto src={friend["user_photo"]} />
                      <NameCardName>{friend["user_name"]}</NameCardName>
                    </MsgList>
                  );
                })}
            </Sidebar>
            <Chat>
              {chatroomId && openChatroom ? (
                <>
                  <ChatNameCard>
                    <ChatNameCardName
                      onClick={() => {
                        navigate("/readme/" + chaterID);
                      }}
                    >
                      {chaterName}
                    </ChatNameCardName>
                    {/* <EllipsisContainer>
                      <FontAwesomeIcon icon={faEllipsisVertical} />
                    </EllipsisContainer> */}
                  </ChatNameCard>

                  <Chatroom chatroomId={chatroomId} />
                </>
              ) : (
                <LineContainer>
                  <p className="paragraph line1">
                    &#91;&nbsp;&ldquo;I'm a web developer.&rdquo;,
                    <span className="cursor1">_</span>
                  </p>
                  <p className="paragraph line2">
                    &nbsp;&nbsp;&ldquo;I'm a web designer.&rdquo;,
                    <span className="cursor2">_</span>
                  </p>
                  <p className="paragraph line3">
                    &nbsp;&nbsp;&ldquo;Let's work together!&rdquo;&nbsp;&#93;
                    <span className="cursor3">_</span>
                  </p>
                  <p className="paragraph line4">
                    <br />
                    Start chatting...
                    <span className="cursor4">_</span>
                  </p>
                </LineContainer>
              )}
            </Chat>
          </FakeScreen>
        </TerminalContainer>
      </Container>
    </>
  );
};

export default Repo;
