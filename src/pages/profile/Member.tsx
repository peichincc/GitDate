import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { db } from "../../utils/firebase";
import {
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
import { setUserData, signin } from "../../actions";
import { auth } from "../../utils/firebase";
import { signOut } from "firebase/auth";
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
import { Button, GithubLink } from "../../utils/styledComponent";
import Loading from "../../components/Loading";
import { SubmitBtn } from "./Signup";
import Alert from "../../components/modal/Alert";
import { RootState } from "../..";

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
  @media screen and (max-width: 770px) {
    flex-direction: column;
  }
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
  @media screen and (max-width: 1376px) {
    padding-left: 0;
  }
  @media screen and (max-width: 550px) {
    flex-wrap: wrap;
  }
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
const Container = styled.div`
  width: 100%;
  margin-top: 20px;
  margin-right: 50px;
  border: 1px solid #d0d7de;
  border-radius: 6px;
  height: auto;
`;
const InsideContainer = styled.div`
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
const ReadmeBtn = styled(MemberBtn)`
  width: 120px;
  margin-bottom: 20px;
  color: white;
  background-color: #24292f;
`;
const SignOutBtn = styled(SubmitBtn)`
  margin-top: 0;
  width: 120px;
`;

const Member = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const userInfo = useSelector((state: RootState) => state);
  const [ButtonPop, setButtonPop] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [logInUserData, setLoginUserData] = useState<DocumentData>();
  const [memberOverview, setMemberOverview] = useState(true);
  const [openIssue, setOpenIssue] = useState(false);
  const [postedIssues, setPostedIssues] = useState<DocumentData>();
  const [hostedBranches, setHostedBranches] = useState<DocumentData>();
  const [attendedBranches, setAttendedBranches] = useState<DocumentData>();
  const [openBranches, setOpenBranches] = useState(false);
  const [getInvitationList, setGetInvitationList] = useState([]);
  const [openFriend, setOpenFriend] = useState(false);
  const [openRepo, setOpenRepo] = useState(false);
  const userId = userInfo.user.user_id;

  useEffect(() => {
    if (!userId) {
      navigate("/");
      return;
    }
    searchIssues(userId);
    searchHostedBranches(userId);
    searchAttendedBranches(userId);
    firebaseapi.readUserData(userId).then((res) => {
      if (res) {
        setLoginUserData(res);
        setIsLoading(false);
        setGetInvitationList(res.friend_request);
      }
    });
  }, []);

  const searchIssues = async (userId: string) => {
    const temp: DocumentData[] = [];
    const q = query(collection(db, "Issues"), where("posted_by", "==", userId));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      temp.push(doc.data());
    });
    setPostedIssues(temp);
  };
  const searchHostedBranches = async (userId: string) => {
    const temp: DocumentData[] = [];
    const q = query(
      collection(db, "Branches"),
      where("hosted_by", "==", userId)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      temp.push(doc.data());
    });
    setHostedBranches(temp);
  };
  const searchAttendedBranches = (userId: string) => {
    onSnapshot(doc(collection(db, "Users"), userId), async (doc) => {
      if (doc.exists()) {
        const newArr: React.SetStateAction<DocumentData | undefined> = [];
        if (doc.data().activity_attend) {
          for (let i = 0; i < doc.data().activity_attend.length; i++) {
            firebaseapi
              .readBranchData(doc.data().activity_attend[i])
              .then((res) => {
                if (res) {
                  const tempObj = {
                    id: res["branch_id"],
                    title: res["title"],
                    photo: res["main_image"],
                  };
                  newArr.push(tempObj);
                }
              });
          }
        }
        setAttendedBranches(newArr);
      }
    });
  };

  const signout = () => {
    signOut(auth)
      .then(() => {
        dispatch(signin());
        dispatch(setUserData("", "", ""));
        setButtonPop(true);
        setAlertMsg("Sign out Successfully!");
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Wrapper>
        <Alert
          trigger={ButtonPop}
          setButtonPop={setButtonPop}
          alertMsg={alertMsg}
        />
        <UpperContainer>
          <NavContainer>
            <NavTab
              id="overview"
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
              id="pullrequests"
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
              id="repositories"
              onClick={() => {
                setOpenRepo(true);
                setOpenIssue(false);
                setOpenBranches(false);
                setMemberOverview(false);
                setOpenFriend(false);
              }}
            >
              <FontAwesomeIcon icon={faBookBookmark} />
              <NavWord>Repositories</NavWord>
            </NavTab>
            <NavTab
              id="issuesMember"
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
              id="branchesMember"
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
              {isLoading && <Loading />}
              {logInUserData && (
                <>
                  <PhotoContainer>
                    <PhotoContainerImg
                      src={logInUserData.main_photo}
                      alt="main_photo"
                    />
                  </PhotoContainer>
                  <UserName>
                    {logInUserData.firstname} {logInUserData.lastname}
                  </UserName>
                  <MemberBtn
                    id="editProfile"
                    onClick={() => navigate("/profile")}
                  >
                    Edit Profile
                  </MemberBtn>
                  <ReadmeBtn
                    id="seeReadme"
                    onClick={() => navigate("/readme/" + userId)}
                  >
                    README.md
                  </ReadmeBtn>
                  <SignOutBtn onClick={signout}>Sign out</SignOutBtn>
                </>
              )}
            </SidebarLayout>
            <MainLayout>
              {logInUserData && memberOverview && (
                <>
                  <Container>
                    <BoxHeader>
                      <FontAwesomeIcon icon={faListUl} />
                      <NavWord>README.md</NavWord>
                    </BoxHeader>
                    <InsideContainer>
                      <FormTextRead>
                        <DataCard> Name </DataCard>
                        {logInUserData.firstname} {logInUserData.lastname}
                      </FormTextRead>
                      <FormTextRead>
                        <DataCard> Occupation </DataCard>
                        {logInUserData.occupation}
                      </FormTextRead>
                      <FormTextRead>
                        <DataCard>Age</DataCard> {logInUserData.age}
                      </FormTextRead>
                      <FormTextRead>
                        <DataCard> Gender </DataCard> {logInUserData.gender}
                      </FormTextRead>
                      <FormTextRead>
                        <DataCard> Interested in </DataCard>
                        {logInUserData.gender_interested}
                      </FormTextRead>
                      <FormTextRead>
                        <DataCard> Wish relationship </DataCard>
                        {logInUserData.wish_relationship}
                      </FormTextRead>
                      <FormTextRead>
                        <DataCard> GithubLink</DataCard>
                        <a
                          href={logInUserData.githublink}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <GithubLink>{logInUserData.githublink}</GithubLink>
                        </a>
                      </FormTextRead>
                      <FormTextRead>
                        <DataCard> Details</DataCard>
                        <TextArea>{logInUserData.details}</TextArea>
                      </FormTextRead>
                    </InsideContainer>
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
