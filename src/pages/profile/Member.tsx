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
  width: 90%;
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
  display: grid;
  width: 100%;
`;
const SidebarLayout = styled.div`
  display: flex;
  flex-direction: column;
  grid-column: 1;
  align-items: center;
`;
const MainLayout = styled.div`
  grid-column: 3 / span 10;
  max-width: 900px;
`;
const NavContainer = styled.div`
  margin-top: 48px;
  padding-left: 296px;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;
const NavTab = styled.button`
  display: flex;
  align-items: center;
  border: 0;
  background-color: white;
  font-size: 16px;
  cursor: pointer;
  &:hover {
    background-color: #d0d7de;
    border-radius: 6px;
    padding: 5px;
  }
`;

const PhotoContainer = styled.div`
  padding: 10px;
  width: 100%;
  max-width: 260px;
  height: 260px;
`;
const PhotoContainerImg = styled.img`
  max-width: 100%;
  max-height: 100%;
  border-radius: 50%;
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

const OverviewContainer = styled.div`
  margin-top: 20px;
`;
const OverViewNav = styled.div`
  display: flex;
`;
const OverViewCardContainer = styled.div`
  display: flex;
  flex-wrap: wrap-reverse;
`;
const OverViewCard = styled.div`
  border-color: #d0d7de;
  border-style: solid;
  border-width: 1px;
  border-radius: 6px;
`;

//Readme part
const Container = styled.div`
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
  padding-left: 20px;
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
  border-radius: 8px;
  background-color: #edede9;
  padding: 5px;
  margin-right: 10px;
  width: 120px;
  text-align: center;
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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-book"
                viewBox="0 0 16 16"
              >
                <path d="M1 2.828c.885-.37 2.154-.769 3.388-.893 1.33-.134 2.458.063 3.112.752v9.746c-.935-.53-2.12-.603-3.213-.493-1.18.12-2.37.461-3.287.811V2.828zm7.5-.141c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492V2.687zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783z" />
              </svg>
              - Overview
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
              <IconContainer />- Pull requests
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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-box"
                viewBox="0 0 16 16"
              >
                <path d="M8.186 1.113a.5.5 0 0 0-.372 0L1.846 3.5 8 5.961 14.154 3.5 8.186 1.113zM15 4.239l-6.5 2.6v7.922l6.5-2.6V4.24zM7.5 14.762V6.838L1 4.239v7.923l6.5 2.6zM7.443.184a1.5 1.5 0 0 1 1.114 0l7.129 2.852A.5.5 0 0 1 16 3.5v8.662a1 1 0 0 1-.629.928l-7.185 2.874a.5.5 0 0 1-.372 0L.63 13.09a1 1 0 0 1-.63-.928V3.5a.5.5 0 0 1 .314-.464L7.443.184z" />
              </svg>
              - Repositories
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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-pencil-square"
                viewBox="0 0 16 16"
              >
                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                <path
                  fill-rule="evenodd"
                  d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                />
              </svg>
              - Issues
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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-universal-access"
                viewBox="0 0 16 16"
              >
                <path d="M9.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0ZM6 5.5l-4.535-.442A.531.531 0 0 1 1.531 4H14.47a.531.531 0 0 1 .066 1.058L10 5.5V9l.452 6.42a.535.535 0 0 1-1.053.174L8.243 9.97c-.064-.252-.422-.252-.486 0l-1.156 5.624a.535.535 0 0 1-1.053-.174L6 9V5.5Z" />
              </svg>
              - Branches
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
                  <EditBtn onClick={() => navigate("/profile")}>
                    Edit Profile
                  </EditBtn>
                </>
              )}
            </SidebarLayout>
            <MainLayout>
              {userData && memberOverview && (
                <>
                  <OverviewContainer>
                    <Container>
                      <BoxHeader>≡ README.md</BoxHeader>
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
                          {userData.details}
                        </FormTextRead>
                      </InsideContainder>
                    </Container>
                  </OverviewContainer>
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
