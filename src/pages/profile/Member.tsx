import React, { useEffect, useState } from "react";
import styled from "styled-components";
import PR from "./pr_icon.png";
import { useNavigate } from "react-router-dom";
import {
  getFirestore,
  doc,
  collection,
  onSnapshot,
  query,
  where,
  getDocs,
  DocumentData,
} from "firebase/firestore";
import firebaseapi from "../../utils/firebaseapi";
import { useSelector, useDispatch } from "react-redux";

import PostedIssues from "../../components/user/PostedIssues";
import AttendedBranches from "../../components/user/AttendedBranches";
import HostedBranches from "../../components/user/HostedBranches";
import FriendRequest from "../../components/user/FriendRequest";
import ChatList from "../../components/user/ChatList";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBook,
  faCodePullRequest,
  faBookBookmark,
  faPenToSquare,
  faCodeBranch,
  faListUl,
} from "@fortawesome/free-solid-svg-icons";

import { Button } from "../../utils/StyledComponent";

const IconContainer = styled.div`
  width: 16px;
  height: 16px;
  background-image: url(${PR});
  background-size: contain;
`;

const Wrapper = styled.div`
  display: block;
  max-width: 1376px;
  margin: 0 auto;
`;
const UpperContainer = styled.div`
  height: 48px;
  width: 100%;
  border-bottom: 1px solid #d0d7de;
`;
const MainContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
const LayoutContainer = styled.div`
  padding-right: 32px;
  padding-left: 32px;
  display: flex;
  width: 100%;
`;
const SidebarLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-grow: 1;
`;
const MainLayout = styled.div`
  max-width: 900px;
  flex-grow: 5;
`;
const NavWord = styled.div`
  padding-left: 5px;
`;
const NavContainer = styled.div`
  margin-top: 48px;
  padding-left: 400px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 20px;
`;
const NavTab = styled.button`
  display: flex;
  align-items: center;
  border: 0;
  background-color: white;
  font-size: 16px;
  cursor: pointer;
  &:hover {
    background-color: rgb(246, 248, 250);
    border-radius: 6px;
    /* padding: 5px; */
    padding-top: 5px;
    padding-bottom: 5px;
  }
`;

const PhotoContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 10px;
  width: 200px;
  height: 200px;
`;
const PhotoContainerImg = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
`;
const UserName = styled.div`
  padding-top: 16px;
  padding-bottom: 16px;
`;
const EditBtn = styled.button`
  color: #24292f;
  background-color: #f6f8fa;
  padding: 5px 16px;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  white-space: nowrap;
  vertical-align: middle;
  cursor: pointer;
  border: 1px solid;
  border-radius: 6px;
  &:hover {
    border-color: #d0d7de;
  }
`;

//Readme part
const Container = styled.div`
  width: 100%;
  margin-top: 20px;
  margin-right: 50px;
  border: 1px solid #d0d7de;
  border-radius: 6px;
  height: auto;
`;
const InsideContainder = styled.div`
  display: flex;
  margin-top: 20px;
  flex-direction: column;
  height: auto;
`;
const BoxHeader = styled.div`
  padding: 16px;
  background-color: #f6f8fa;
  border-color: #d0d7de;
  border-style: solid;
  border-width: 1px;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
  margin: -1px -1px 0;
  display: flex;
  align-items: center;
`;
const FormTextRead = styled.div`
  line-height: 19px;
  font-size: 16px;
  color: #3f3a3a;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  padding: 5px;
  margin-bottom: 10px;
`;
const DataCard = styled.div`
  font-weight: 600;
  font-size: 14px;
  border-radius: 8px;
  /* background-color: rgb(246, 248, 250); */
  padding: 5px;
  margin-right: 10px;
  margin-left: 5px;
  width: 130px;
  text-align: left;
`;

const TextArea = styled.div`
  max-width: 400px;
`;

const MemberBtn = styled(Button)`
  width: 120px;
  margin-bottom: 20px;
`;

const Member = () => {
  let navigate = useNavigate();
  const db = getFirestore();
  const userInfo = useSelector((state) => state) as any;
  const [getUser, setGetUser] = useState("");
  const [userData, setUserData] = useState<any>(null);
  const [memberOverview, setMemberOverview] = useState(true);
  const [openIssue, setOpenIssue] = useState(false);
  const [postedIssues, setPostedIssues] = useState<DocumentData>();
  const [hostedBranches, setHostedBranches] = useState<DocumentData>();
  const [attendedBranches, setAttendedBranches] = useState<DocumentData>();
  const [openBranches, setOpenBranches] = useState(false);
  const [getInvitationList, setGetInvitationList] = useState<any>();
  const [openFriend, setOpenFriend] = useState(false);
  const [openRepo, setOpenRepo] = useState(false);

  useEffect(() => {
    const userId = userInfo.user.user_id;
    console.log(userId);
    setGetUser(userId);
    getFriend(userId);
    searchIssues(userId);
    searchHostedBranches(userId);
    searchAttenedBranches(userId);
    firebaseapi.readUserData(userId).then((res) => {
      if (res) {
        setUserData(res);
      }
    });
  }, []);

  // 讀取好友邀請(讀DB中的friend_request -> get ID -> Search name -> Display name)
  const getFriend = (id: string) => {
    onSnapshot(doc(collection(db, "Users"), id), (doc) => {
      if (doc.exists()) {
        setGetInvitationList(doc.data().friend_request);
        // console.log(doc.data().friend_request);
      }
    });
  };

  // 搜尋使用者發過的文
  const searchIssues = async (userId: string) => {
    let temp = [] as any;
    const q = query(collection(db, "Issues"), where("posted_by", "==", userId));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log(doc.data());
      temp.push(doc.data());
    });
    setPostedIssues(temp);
  };

  // 搜尋使用者的活動
  const searchHostedBranches = async (userId: string) => {
    let temp = [] as any;
    const q = query(
      collection(db, "Branches"),
      where("hosted_by", "==", userId)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log(doc.data());
      temp.push(doc.data());
    });
    setHostedBranches(temp);
  };
  const searchAttenedBranches = async (userId: string) => {
    onSnapshot(doc(collection(db, "Users"), userId), async (doc) => {
      if (doc.exists()) {
        console.log(doc.data().activity_attend);
        const newArr = [] as any;
        for (let i = 0; i < doc.data().activity_attend.length; i++) {
          await firebaseapi
            .readBranchData(doc.data().activity_attend[i])
            .then((res) => {
              console.log(res);
              if (res) {
                console.log(res["title"]);
                console.log(res["main_image"]);
                const tempObj = {
                  id: res["branch_id"],
                  title: res["title"],
                  photo: res["main_image"],
                };
                newArr.push(tempObj);
              }
            });
        }
        // Promise.all(promises).then((res) => console.log(res));
        console.log(newArr);
        setAttendedBranches(newArr);
      }
    });
  };

  return (
    <>
      <Wrapper>
        <UpperContainer>
          <NavContainer>
            <NavTab
              onClick={() => {
                setMemberOverview(true);
                setOpenFriend(false);
                setOpenIssue(false);
                setOpenBranches(false);
                setOpenRepo(false);
              }}
            >
              <FontAwesomeIcon icon={faBook} /> <NavWord>Overview</NavWord>
            </NavTab>
            <NavTab
              onClick={() => {
                setOpenFriend(true);
                setMemberOverview(false);
                setOpenIssue(false);
                setOpenBranches(false);
                setOpenRepo(false);
              }}
            >
              <FontAwesomeIcon icon={faCodePullRequest} />
              <NavWord>Pull requests</NavWord>
            </NavTab>
            <NavTab
              onClick={() => {
                setOpenRepo(true);
                setOpenIssue(false);
                setOpenBranches(false);
                setMemberOverview(false);
                setOpenFriend(false);
              }}
            >
              <FontAwesomeIcon icon={faBookBookmark} />
              <NavWord> Repositories</NavWord>
            </NavTab>
            <NavTab
              onClick={() => {
                setOpenIssue(true);
                setOpenBranches(false);
                setMemberOverview(false);
                setOpenFriend(false);
                setOpenRepo(false);
              }}
            >
              <FontAwesomeIcon icon={faPenToSquare} />
              <NavWord> Issues</NavWord>
            </NavTab>
            <NavTab
              onClick={() => {
                setOpenBranches(true);
                setOpenIssue(false);
                setMemberOverview(false);
                setOpenFriend(false);
                setOpenRepo(false);
              }}
            >
              <FontAwesomeIcon icon={faCodeBranch} />
              <NavWord> Branches </NavWord>
            </NavTab>
          </NavContainer>
        </UpperContainer>
        <MainContainer>
          <LayoutContainer>
            <SidebarLayout>
              {userData && (
                <>
                  <PhotoContainer>
                    <PhotoContainerImg
                      src={userData.main_photo}
                      alt="main_photo"
                    />
                  </PhotoContainer>
                  <UserName>
                    {userData.firstname} {userData.lastname}
                  </UserName>
                  <MemberBtn onClick={() => navigate("/profile")}>
                    Edit Profile
                  </MemberBtn>
                  <MemberBtn onClick={() => navigate("/readme/" + getUser)}>
                    README.md
                  </MemberBtn>
                </>
              )}
            </SidebarLayout>
            <MainLayout>
              {userData && memberOverview && (
                <>
                  <Container>
                    <BoxHeader>
                      <FontAwesomeIcon icon={faListUl} />
                      <NavWord>README.md</NavWord>
                    </BoxHeader>
                    <InsideContainder>
                      <FormTextRead>
                        <DataCard> Name </DataCard>
                        {userData.firstname} {userData.lastname}
                      </FormTextRead>
                      <FormTextRead>
                        <DataCard> Occupation </DataCard>
                        {userData.occupation}
                      </FormTextRead>
                      <FormTextRead>
                        <DataCard>Age</DataCard> {userData.age}
                      </FormTextRead>
                      <FormTextRead>
                        <DataCard> Gender </DataCard> {userData.gender}
                      </FormTextRead>
                      <FormTextRead>
                        <DataCard> Interested in </DataCard>
                        {userData.gender_interested}
                      </FormTextRead>
                      <FormTextRead>
                        <DataCard> Wish relationship </DataCard>
                        {userData.wish_relationship}
                      </FormTextRead>
                      <FormTextRead>
                        <DataCard> GithubLink</DataCard>
                        <a
                          href={userData.githublink}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {userData.githublink}
                        </a>
                      </FormTextRead>
                      <FormTextRead>
                        <DataCard> Details</DataCard>
                        <TextArea>{userData.details}</TextArea>
                      </FormTextRead>
                    </InsideContainder>
                  </Container>
                </>
              )}
              {openFriend && (
                <FriendRequest getInvitationList={getInvitationList} />
              )}
              {openRepo && <ChatList />}
              {openIssue && postedIssues && (
                <PostedIssues postedIssues={postedIssues} />
              )}
              {openBranches && hostedBranches && (
                <>
                  <HostedBranches hostedBranches={hostedBranches} />
                  <AttendedBranches attendedBranches={attendedBranches} />
                </>
              )}
            </MainLayout>
          </LayoutContainer>
        </MainContainer>
      </Wrapper>
    </>
  );
};

export default Member;
