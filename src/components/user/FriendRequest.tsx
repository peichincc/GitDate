import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
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
import { useSelector } from "react-redux";
import { BoxHeader } from "../../pages/profile/Profile";
import pr from "../../assets/icons/pr_icon.png";
import merge from "../../assets/icons/merge.png";
import close from "../../assets/icons/close.png";
import Alert from "../../components/modal/Alert";

import { RootState } from "../..";

const PR = styled.div`
  width: 16px;
  height: 16px;
  background-image: url(${pr});
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
  @media screen and (max-width: 550px) {
    flex-direction: column;
  }
`;

const NameContainer = styled.div`
  display: flex;
  align-items: center;
`;
const BtnContainer = styled.div`
  display: flex;
`;
const MergeBtn = styled.button`
  margin-right: 5px;
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
const CloseBtn = styled.button`
  padding: 5px 16px;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  cursor: pointer;
  border: 1px solid rgba(27, 31, 36, 0.15);
  background-color: #d62828;
  color: white;
  border-radius: 6px;
  width: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  :hover {
    background-color: #e63946;
  }
`;
const ClickBtn = styled.button`
  border: 1px solid transparent;
  border-radius: 2em;
  cursor: pointer;
  margin-left: 5px;
`;

// interface Props {
//   getInvitationList: [{ uesr_name: string; user_id: string }];
// }

const FriendRequest = ({ getInvitationList }: any) => {
  const [ButtonPop, setButtonPop] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  let navigate = useNavigate();
  const userData = useSelector((state: RootState) => state);
  const db = getFirestore();
  const [getUser, setGetUser] = useState("");
  const [getUserName, setGetUserName] = useState("");
  const [getUserPhoto, setGetUserPhoto] = useState("");

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
    }
  }, []);

  const merge = async (e: any) => {
    const index = e.target.value;
    const newArr = getInvitationList.splice(index, 1);
    const otherUserID = newArr[0]["user_id"];
    // 更新自己的DB
    const userRef = doc(db, "Users", getUser);
    await updateDoc(userRef, {
      friend_request: getInvitationList,
    });
    // 打開repo (setDoc in Chatrooms collection)
    const newChatRef = doc(collection(db, "Chatrooms"));
    await setDoc(newChatRef, {
      chat_id: newChatRef.id,
      users: [otherUserID, getUser],
    });
    await addDoc(collection(db, "Chatrooms", newChatRef.id, "messages"), {
      sender_id: getUser,
      sender_name: getUserName,
      timestamp: serverTimestamp(),
    });
    // 把名單, repo ID都丟進Friend_list (自己的)
    newArr[0].chat_id = newChatRef.id;
    await updateDoc(userRef, {
      friend_list: arrayUnion(newArr[0]),
    });
    // 丟進Friend_list (對方的)
    const userRef2 = doc(db, "Users", otherUserID);
    await updateDoc(userRef2, {
      friend_list: arrayUnion({
        user_id: getUser,
        user_name: getUserName,
        user_photo: getUserPhoto,
        chat_id: newChatRef.id,
      }),
    });
    setButtonPop(true);
    setAlertMsg("You've open a repo!");
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
    setButtonPop(true);
    setAlertMsg("You've closed a pull request");
  };

  return (
    <>
      <Container>
        <Alert
          trigger={ButtonPop}
          setButtonPop={setButtonPop}
          alertMsg={alertMsg}
        />
        <BoxHeader>Pull requests</BoxHeader>
        <ContentContainer>
          {getInvitationList &&
            getInvitationList.map((otherUser: any, index: number) => {
              return (
                <ListContainer>
                  <NameContainer>
                    <PR />
                    <p key={`${otherUser["user_name"]}`}>
                      {otherUser["user_name"]}
                    </p>
                    <ClickBtn
                      onClick={() => {
                        navigate("/readme/" + otherUser["user_id"]);
                      }}
                    >
                      README
                    </ClickBtn>
                  </NameContainer>
                  <BtnContainer>
                    <MergeBtn value={index} onClick={merge}>
                      Merge
                    </MergeBtn>
                    <CloseBtn value={index} onClick={close}>
                      Close
                    </CloseBtn>
                  </BtnContainer>
                </ListContainer>
              );
            })}
        </ContentContainer>
      </Container>
    </>
  );
};

export default FriendRequest;
