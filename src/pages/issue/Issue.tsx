import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  doc,
  getFirestore,
  updateDoc,
  arrayUnion,
  QueryDocumentSnapshot,
  collection,
  DocumentData,
} from "firebase/firestore";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import firebaseapi from "../../utils/firebaseapi";

import defaultAvatar from "../../utils/DefaultAvatar.png";
import {
  LebalsText,
  PostImgContainer,
  PostTitle,
  PostSubTitle,
  PostContentText,
  PostWraper,
  PostBox,
  AvatarBlock,
  AvatarUser,
  AvatarUserImg,
  LabelsButton,
  LebalContentText,
  LebalsContainer,
  AuthorBtn,
  MergeBtn,
  PostImgBoxImg,
  StatusOpen,
} from "../../utils/StyledComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCodeMerge,
  faCodePullRequest,
  faMugSaucer,
} from "@fortawesome/free-solid-svg-icons";

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
`;
const LeftContainer = styled.div`
  width: 80%;
`;
const RightContainer = styled.div`
  width: 20%;
  padding-left: 20px;
`;
const IssueSubTitle = styled.div`
  padding-top: 5px;
  display: flex;
  align-items: center;
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
  /* border: 1px solid #d0d7de; */
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

const Issue = () => {
  const userData = useSelector((state) => state) as any;
  let navigate = useNavigate();
  const db = getFirestore();
  const { id } = useParams<any>();
  type ListData = {
    category: string;
    main_image: string;
    title: string;
    content: string;
    status: string;
    posted_by: string;
    posted_at: any;
    tags: [];
  };
  const [issueData, setIssueData] = useState<DocumentData>();
  // const [userData, setUserData] = useState<ListData | null>(null);
  const [newT, setNewT] = useState("");
  const [getUser, setGetUser] = useState("");
  const [getUserName, setGetUserName] = useState("");
  const [getUserPhoto, setGetUserPhoto] = useState("");
  const [getAuthor, setGetAuthor] = useState("");
  const [getAuthorID, setGetAuthorID] = useState("");

  // 讀取使用者資料
  // const readData = async (id: string | undefined) => {
  //   const docRef = doc(collection(db, "Issues"), id);
  //   await getDoc(docRef).then((doc) => {
  //     if (doc.exists()) {
  //       const userDataFromDB = doc.data() as ListData;
  //       setUserData(userDataFromDB);
  //       if (userDataFromDB) {
  //         const newT = new Date(
  //           userDataFromDB.posted_at.seconds * 1000
  //         ).toString();
  //         setNewT(newT);
  //         const searchUser = async () => {
  //           const userRef = collection(db, "Users");
  //           const q = query(
  //             userRef,
  //             where("user_id", "==", userDataFromDB.posted_by)
  //           );
  //           const querySnapshot = await getDocs(q);
  //           querySnapshot.forEach((doc) => {
  //             // console.log(doc.data().firstname);
  //             setGetAuthor(doc.data().firstname);
  //             // console.log(doc.data().user_id);
  //             setGetAuthorID(doc.data().user_id);
  //           });
  //         };
  //         searchUser();
  //       }
  //     } else {
  //       console.log("No such document!");
  //     }
  //   });
  // };

  const changeIssueStatus = () => {
    const issueRef = collection(db, "Issues");
    const updateRef = doc(issueRef, `${id}`);
    updateDoc(updateRef, {
      status: "Closed",
    });
    alert("Successfully closed this issue!");
  };

  const deleteIssue = async (id: string | undefined) => {
    await firebaseapi.deleteIssue(id);
    navigate("/");
    // await deleteDoc(doc(collection(db, "Issues"), id))
    //   .then(() => {
    //     alert("Delete successful!");
    //   })
    //   .catch((error) => {
    //     console.error("Error removing document: ", error);
    //   });
  };

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
    firebaseapi.readIssueData(id).then((res) => {
      if (res) {
        console.log(res);
        const newT = new Date(res.posted_at.seconds * 1000).toString();
        setNewT(newT);
        setIssueData(res);
      }
      firebaseapi.searchUserName(res?.posted_by).then((res) => {
        if (res) {
          console.log(res["firstname"]);
          setGetAuthor(res["firstname"]);
          setGetAuthorID(res["user_id"]);
        }
      });
    });
  }, []);

  const sendRequest = async () => {
    // console.log(`User:${getAuthorID}`);
    const userRef = doc(db, "Users", getAuthorID);
    await updateDoc(userRef, {
      friend_request: arrayUnion({
        user_id: getUser,
        user_name: getUserName,
        user_photo: getUserPhoto,
      }),
    });
    alert("Sent pull request successful!");
    console.log(`Invitation Sent to ${getAuthor}`);
    // const userRef2 = doc(db, "Users", getUser);
    // await updateDoc(userRef2, {
    //   friend_sent_request: arrayUnion({
    //     user_id: getAuthorID,
    //     user_name: getAuthor,
    //   }),
    // });
  };

  return (
    <>
      <Wrapper>
        {issueData && (
          <div>
            <Container>
              <TopContainer>
                <PostTitle>{issueData.title}</PostTitle>
                <IssueSubTitle>
                  <StatusOpen>
                    <FontAwesomeIcon icon={faCodePullRequest} />
                    <StatusWord>{issueData.status}</StatusWord>
                  </StatusOpen>
                  <AuthorContainer>
                    <PostSubTitle>
                      <AuthorBtn
                        onClick={() => {
                          navigate("/readme/" + issueData.posted_by);
                        }}
                      >
                        {getAuthor}
                      </AuthorBtn>
                      posted this issue at:{"  "}
                      {newT}
                    </PostSubTitle>
                  </AuthorContainer>
                </IssueSubTitle>
              </TopContainer>
              <MainContainer>
                <LeftContainer>
                  <PostWraper>
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
                  </PostWraper>
                  <PRContainer>
                    <PostWraper>
                      <AvatarBlock>
                        <MergeIcon>
                          <FontAwesomeIcon icon={faCodeMerge} />
                        </MergeIcon>
                      </AvatarBlock>
                      <PRPostBox>
                        <PRBox>
                          <PostContentText>
                            Start chatting by making this pull request to{" "}
                            {getAuthor}
                            <FontAwesomeIcon icon={faMugSaucer} />
                          </PostContentText>
                          <PRbtn onClick={sendRequest}>
                            Create Pull Request
                          </PRbtn>
                        </PRBox>
                      </PRPostBox>
                    </PostWraper>
                  </PRContainer>
                </LeftContainer>
                <RightContainer>
                  <LebalsContainer>
                    <LebalsText>Category</LebalsText>
                    <LebalContentText>{issueData.category}</LebalContentText>
                  </LebalsContainer>
                  <LebalsContainer>
                    <LebalsText>Tags</LebalsText>
                    {issueData.tags.map((tag: any) => (
                      <>
                        <LabelsButton>{tag}</LabelsButton>
                      </>
                    ))}
                  </LebalsContainer>
                </RightContainer>
              </MainContainer>
            </Container>
          </div>
        )}
        {/* <br />
        <h2>Area for author</h2>
        <button onClick={changeIssueStatus}>Close this issue</button>
        <br />
        <button
          onClick={() => {
            deleteIssue(id);
          }}
        >
          Delete this issue
        </button> */}
      </Wrapper>
    </>
  );
};

export default Issue;
