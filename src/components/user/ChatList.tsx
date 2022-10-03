import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import firebaseapi from "../../utils/firebaseapi";
import { getFirestore } from "firebase/firestore";
import { useSelector, useDispatch } from "react-redux";

import { BoxHeader } from "../../pages/profile/Profile";

import merge from "../../assets/icons/merge.png";

const Merge = styled.div`
  width: 16px;
  height: 16px;
  background-image: url(${merge});
  background-size: contain;
  margin-right: 5px;
`;

const Container = styled.div`
  width: 100%;
  margin-top: 20px;
  margin-right: 50px;
  border: 1px solid #d0d7de;
  border-radius: 6px;
  height: auto;
`;
const ContentContainer = styled.div`
  padding: 20px;
`;
const ListContainer = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #d0d7de;
  padding-top: 10px;
  padding-bottom: 10px;
`;
const NameContainer = styled.div`
  display: flex;
  align-items: center;
`;
const ClickBtn = styled.button`
  border: 1px solid transparent;
  border-radius: 2em;
  cursor: pointer;
  margin-left: 5px;
`;
const RepoBtn = styled.button`
  padding: 5px 16px;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  cursor: pointer;
  border: 1px solid rgba(27, 31, 36, 0.15);
  background-color: #2da44e;
  color: white;
  border-radius: 6px;
  width: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  :hover {
    background-color: #216e39;
  }
`;

const ChatList = () => {
  const userData = useSelector((state) => state) as any;
  let navigate = useNavigate();
  const db = getFirestore();
  const [getUser, setGetUser] = useState("");
  const [friendList, setFriendList] = useState<any>();

  useEffect(() => {
    const userId = userData.user.user_id;
    console.log(userId);
    if (userId) {
      setGetUser(userId);
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
        <BoxHeader>Friend list</BoxHeader>
        <ContentContainer>
          {friendList &&
            friendList.map((friend: any) => {
              return (
                <ListContainer>
                  <NameContainer>
                    <Merge />
                    {friend["user_name"]}
                    <ClickBtn
                      onClick={() => {
                        navigate("/readme/" + friend["user_id"]);
                      }}
                    >
                      README
                    </ClickBtn>
                  </NameContainer>
                  <RepoBtn
                    onClick={() => {
                      navigate("/repo");
                    }}
                  >
                    To Chatroom
                  </RepoBtn>
                </ListContainer>
              );
            })}
        </ContentContainer>
      </Container>
    </>
  );
};

export default ChatList;
