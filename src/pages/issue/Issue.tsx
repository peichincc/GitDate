import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../../utils/firebase";
import {
  doc,
  updateDoc,
  arrayUnion,
  collection,
  DocumentData,
} from "firebase/firestore";
import styled from "styled-components";
import { useSelector } from "react-redux";
import firebaseapi from "../../utils/firebaseapi";
import defaultAvatar from "../../assets/images/githubAvatar.png";
import {
  GoBackWrapper,
  Button,
  LabelsText,
  PostImgContainer,
  PostTitle,
  PostSubTitle,
  PostContentText,
  PostWrapper,
  PostBox,
  AvatarBlock,
  AvatarUser,
  AvatarUserImg,
  LabelContentText,
  LabelsContainer,
  AuthorBtn,
  MergeBtn,
  PostImgBoxImg,
  StatusOpen,
  TagButton,
  EditBtn,
  DeleteBtn,
} from "../../utils/styledComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCodeMerge,
  faCodePullRequest,
  faMugSaucer,
  faCircleCheck,
} from "@fortawesome/free-solid-svg-icons";
import Alert from "../../components/modal/Alert";
import Confirm from "../../components/modal/Confirm";
import Loading from "../../components/Loading";
import AlertWithCTA from "../../components/modal/AlertWithCTA";
import { RootState } from "../..";

const Wrapper = styled.div`
  display: block;
  max-width: 1376px;
  margin: 0 auto;
  margin-bottom: 100px;
`;
const Container = styled.div`
  max-width: 1216px;
  width: 100%;
  margin: 0 auto;
  padding-top: 24px;
  @media screen and (max-width: 1216px) {
    width: 100%;
    padding-left: 20px;
    padding-right: 20px;
  }
`;
const TopContainer = styled.div`
  border-bottom: 1px solid #d0d7de;
  padding-bottom: 20px;
  margin-bottom: 16px;
`;
const MainContainer = styled.div`
  display: flex;
  width: 100%;
  padding-top: 8px;
  @media screen and (max-width: 770px) {
    flex-direction: column-reverse;
  }
`;
const LeftContainer = styled.div`
  width: 80%;
  @media screen and (max-width: 770px) {
    width: 100%;
  }
`;
const RightContainer = styled.div`
  width: 20%;
  padding-left: 20px;
  @media screen and (max-width: 770px) {
    display: flex;
    width: 100%;
  }
`;
const IssueSubTitle = styled.div`
  padding-top: 5px;
  display: flex;
  align-items: center;
  @media screen and (max-width: 770px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;
const AuthorContainer = styled.div``;
const ContentContainer = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
`;
const PRContainer = styled.div`
  margin-top: 20px;
`;
const PRPostBox = styled.div`
  padding: 20px;
  position: relative;
  background: #f8f8f9;
  border-radius: 0.4em;
  width: 100%;
  height: auto;
  position: relative;
  &:before {
    content: "";
    position: absolute;
    left: 0;
    top: 30px;
    width: 0;
    height: 0;
    border: 20px solid transparent;
    border-right-color: #f8f8f9;
    border-left: 0;
    margin-top: -20px;
    margin-left: -20px;
  }
`;
const PRBox = styled.div``;
const MergeIcon = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  border-radius: 6px;
  color: white;
  background-color: #2da44e;
  border: 1px solid transparent;
  font-size: 24px;
`;
const PRbtn = styled(MergeBtn)`
  width: 180px;
  margin-left: 20px;
`;
const StatusWord = styled.div`
  margin-left: 5px;
`;
const CloseStatus = styled(StatusOpen)`
  width: fit-content;
  background-color: #8250df;
`;
const TagsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const Issue = () => {
  const { id } = useParams();
  let navigate = useNavigate();
  const userData = useSelector((state: RootState) => state);
  const [isLoading, setIsLoading] = useState(true);
  const [ButtonPop, setButtonPop] = useState(false);
  const [alertWithCTAPop, setAlertWithCTAPop] = useState(false);
  const [confirmPop, setConfirmPop] = useState(false);
  const [confirmMsg, setConfirmMsg] = useState("");
  const [alertMsg, setAlertMsg] = useState("");
  const [issueData, setIssueData] = useState<DocumentData>();
  const [getAuthor, setGetAuthor] = useState("");
  const [getAuthorID, setGetAuthorID] = useState("");
  const [isAuthor, setIsAuthor] = useState(false);
  const [issueOpen, setIssueOpen] = useState(true);
  const [authorFriends, setAuthorFriends] = useState([]);
  const userId = userData.user.user_id;
  const userName = userData.user.user_name;
  const userPhoto = userData.user.user_photo;

  const changeIssueStatus = () => {
    const issueRef = collection(db, "Issues");
    const updateRef = doc(issueRef, `${id}`);
    updateDoc(updateRef, {
      status: "Closed",
    });
    setAlertMsg("Successfully closed this issue!");
    setButtonPop(true);
  };

  const deleteIssueHandler = (id: string | undefined) => {
    firebaseapi.deleteIssue(id);
    setAlertMsg("Successfully delete this issue!");
    setButtonPop(true);
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  useEffect(() => {
    firebaseapi.readIssueData(id).then((res) => {
      if (res) {
        setIssueData(res);
        if (res.status === "Open") {
          setIssueOpen(true);
        } else {
          setIssueOpen(false);
        }
      }
      firebaseapi.searchUserName(res?.posted_by).then((res) => {
        if (res) {
          setGetAuthor(res["firstname"]);
          setGetAuthorID(res["user_id"]);
          setAuthorFriends(res["friend_list"]);
          setTimeout(() => {
            setIsLoading(false);
          }, 1000);
          if (res["user_id"] === userId) {
            setIsAuthor(true);
          }
        }
      });
    });
  }, []);

  const sendRequest = () => {
    if (!userId) {
      setAlertMsg("Please sign in!");
      setButtonPop(true);
      return;
    }
    if (!userName) {
      setAlertMsg("You haven't completed your README, let's write it here");
      setAlertWithCTAPop(true);
      return;
    }
    setConfirmMsg("Do you want to send this pull request?");
    setConfirmPop(true);
  };
  const clickToConfirm = (isConfirm: boolean) => {
    if (isConfirm) {
      confirmSendRequest();
    }
    setConfirmPop(false);
  };
  const confirmSendRequest = async () => {
    if (authorFriends.some((e: { user_id: string }) => e.user_id === userId)) {
      setButtonPop(true);
      setAlertMsg("You've already merged 😉");
      return;
    }
    const userRef = doc(db, "Users", getAuthorID);
    await updateDoc(userRef, {
      friend_request: arrayUnion({
        user_id: userId,
        user_name: userName,
        user_photo: userPhoto,
      }),
    });
    setButtonPop(true);
    setAlertMsg("Sent pull request successful!");
  };

  return (
    <>
      <Wrapper>
        <Alert
          trigger={ButtonPop}
          setButtonPop={setButtonPop}
          alertMsg={alertMsg}
        />
        <AlertWithCTA
          trigger={alertWithCTAPop}
          setAlertWithCTAPop={setAlertWithCTAPop}
          alertMsg={alertMsg}
        />
        <Confirm
          trigger={confirmPop}
          clickToConfirm={clickToConfirm}
          confirmMsg={confirmMsg}
        />
        {isLoading ? (
          <>
            <Loading />
          </>
        ) : (
          <>
            {issueData && (
              <div>
                <Container>
                  <TopContainer>
                    <PostTitle>{issueData.title}</PostTitle>
                    <IssueSubTitle>
                      {issueOpen ? (
                        <StatusOpen>
                          <FontAwesomeIcon icon={faCodePullRequest} />
                          <StatusWord>{issueData.status}</StatusWord>
                        </StatusOpen>
                      ) : (
                        <CloseStatus>
                          <FontAwesomeIcon icon={faCircleCheck} />
                          <StatusWord> {issueData.status}</StatusWord>
                        </CloseStatus>
                      )}
                      <AuthorContainer>
                        <PostSubTitle>
                          <AuthorBtn
                            id="issueAuthor"
                            onClick={() => {
                              navigate("/readme/" + issueData.posted_by);
                            }}
                          >
                            {getAuthor}
                          </AuthorBtn>
                          posted this issue at:{"  "}
                          {new Date(
                            issueData.posted_at.seconds * 1000
                          ).toString()}
                        </PostSubTitle>
                      </AuthorContainer>
                    </IssueSubTitle>
                  </TopContainer>
                  <MainContainer>
                    <LeftContainer>
                      <PostWrapper>
                        <AvatarBlock>
                          <AvatarUser>
                            <AvatarUserImg src={defaultAvatar} />
                          </AvatarUser>
                        </AvatarBlock>
                        <PostBox>
                          <ContentContainer>
                            <PostImgContainer>
                              <PostImgBoxImg
                                src={issueData.main_image}
                                alt="main_photo"
                              />
                            </PostImgContainer>
                            <PostContentText>
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: issueData.content,
                                }}
                              ></div>
                            </PostContentText>
                          </ContentContainer>
                        </PostBox>
                      </PostWrapper>
                      {!isAuthor && (
                        <>
                          <PRContainer>
                            <PostWrapper>
                              <AvatarBlock>
                                <MergeIcon>
                                  <FontAwesomeIcon icon={faCodeMerge} />
                                </MergeIcon>
                              </AvatarBlock>
                              {issueOpen ? (
                                <PRPostBox>
                                  <PRBox>
                                    <PostContentText>
                                      Start chatting by making this pull request
                                      to {getAuthor}
                                      <FontAwesomeIcon icon={faMugSaucer} />
                                    </PostContentText>
                                    <PRbtn id="PRbtn" onClick={sendRequest}>
                                      Create Pull Request
                                    </PRbtn>
                                  </PRBox>
                                </PRPostBox>
                              ) : (
                                <PRPostBox>
                                  <PRBox>
                                    <PostContentText>
                                      This issue is already closed.
                                    </PostContentText>
                                  </PRBox>
                                </PRPostBox>
                              )}
                            </PostWrapper>
                          </PRContainer>
                        </>
                      )}
                    </LeftContainer>
                    <RightContainer>
                      <LabelsContainer>
                        <LabelsText>Category</LabelsText>
                        <LabelContentText>
                          {issueData.category}
                        </LabelContentText>
                      </LabelsContainer>
                      <LabelsContainer>
                        <LabelsText>Tags</LabelsText>
                        <TagsWrapper>
                          {issueData.tags.map((tag: string) => (
                            <>
                              <TagButton key={Math.random()}>{tag}</TagButton>
                            </>
                          ))}
                        </TagsWrapper>
                      </LabelsContainer>
                      {isAuthor && (
                        <>
                          <LabelsContainer>
                            <LabelsText>Area for author</LabelsText>
                            <LabelContentText>
                              <EditBtn onClick={changeIssueStatus}>
                                Close issue
                              </EditBtn>
                              <DeleteBtn
                                onClick={() => {
                                  deleteIssueHandler(id);
                                }}
                              >
                                Delete issue
                              </DeleteBtn>
                            </LabelContentText>
                          </LabelsContainer>
                        </>
                      )}
                    </RightContainer>
                  </MainContainer>
                </Container>
              </div>
            )}
          </>
        )}
        <GoBackWrapper>
          <Button onClick={() => navigate("/issues")}>Go back</Button>
        </GoBackWrapper>
      </Wrapper>
    </>
  );
};

export default Issue;
