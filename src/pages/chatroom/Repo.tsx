import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useSelector } from "react-redux";
import firebaseapi from "../../utils/firebaseapi";
import "./terminal.css";
import Chatroom from "./Chatroom";
import Alert from "../../components/modal/Alert";
import Loading from "../../components/Loading";
import defaultAvatar from "../../assets/images/defaultAvatar.png";
import { RootState } from "../..";
import { DocumentData } from "firebase/firestore";

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
  @media screen and (max-width: 992px) {
    padding: 20px;
  }
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
  display: flex;
  align-items: center;
  padding: 10px;
  @media screen and (max-width: 1280px) {
    justify-content: center;
  }
`;
const NameCardPhotoContainer = styled.div``;
const NameCardPhoto = styled.img`
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 50%;
  background-color: white;
  @media screen and (max-width: 992px) {
    width: 30px;
    height: 30px;
  }
`;
const NameCardName = styled.div`
  font-size: 20px;
  font-weight: 600;
  color: white;
  margin-left: 20px;
  width: 200px;
  word-break: break-all;
  word-wrap: break-word;
  @media screen and (max-width: 1280px) {
    display: none;
  }
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
  @media screen and (max-width: 1280px) {
    display: block;
  }
  &:hover {
    color: #ff69b4;
  }
`;

const Repo = () => {
  let navigate = useNavigate();
  const userData = useSelector((state: RootState) => state);
  const [isLoading, setIsLoading] = useState(true);
  const [ButtonPop, setButtonPop] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const [getUser, setGetUser] = useState("");
  const [getUserName, setGetUserName] = useState("");
  const [getUserPhoto, setGetUserPhoto] = useState("");
  const [friendList, setFriendList] = useState<DocumentData>();
  const [openChatroom, setOpenChatroom] = useState(false);
  const [chatroomId, setChatroomId] = useState<string>("");
  const [chaterName, setChaterName] = useState("");
  const [chaterID, setChaterID] = useState("");

  useEffect(() => {
    const userId = userData.user.user_id;
    const userName = userData.user.user_name;
    const userPhoto = userData.user.user_photo;
    if (!userId) {
      setAlertMsg("Please sign in!");
      setButtonPop(true);
      setTimeout(() => {
        navigate("/");
      }, 1000);
      return;
    }
    if (userId && userName) {
      setGetUser(userId);
      setGetUserName(userName);
      setGetUserPhoto(userPhoto);
      firebaseapi.readUserData(userId).then((result) => {
        if (result) {
          setFriendList(result["friend_list"]);
          setIsLoading(false);
        }
      });
    }
  }, []);

  return (
    <>
      <Container>
        <Alert
          trigger={ButtonPop}
          setButtonPop={setButtonPop}
          alertMsg={alertMsg}
        />
        <TerminalContainer>
          <FakeMenu>
            <FakeButtonsClose />
            <FakeButtonsMinimize />
            <FakeButtonsZoom />
          </FakeMenu>
          <FakeScreen>
            <Sidebar>
              <NameCard>
                <NameCardPhotoContainer>
                  {getUser ? (
                    <NameCardPhoto src={getUserPhoto} id="repoSidebar" />
                  ) : (
                    <NameCardPhoto src={defaultAvatar} />
                  )}
                </NameCardPhotoContainer>
                <NameCardName>{getUserName}</NameCardName>
              </NameCard>
              {isLoading ? (
                <Loading />
              ) : (
                <>
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
                        >
                          <NameCardPhotoContainer>
                            <NameCardPhoto src={friend["user_photo"]} />
                          </NameCardPhotoContainer>
                          <NameCardName>{friend["user_name"]}</NameCardName>
                        </MsgList>
                      );
                    })}
                </>
              )}
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
                  </ChatNameCard>
                  <Chatroom chatroomId={chatroomId} />
                </>
              ) : (
                <LineContainer>
                  <p className="paragraph line1">
                    &#91;&nbsp;&ldquo;Sending pull request,&rdquo;
                    <span className="cursor1">_</span>
                  </p>
                  <p className="paragraph line2">
                    &nbsp;&nbsp;&ldquo;Merging pull request,&rdquo;
                    <span className="cursor2">_</span>
                  </p>
                  <p className="paragraph line3">
                    &nbsp;&nbsp;&ldquo;Let's open a repo!&rdquo;&nbsp;&#93;
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
