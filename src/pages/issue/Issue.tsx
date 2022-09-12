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

const Wrapper = styled.div`
  display: block;
  max-width: 1376px;
  margin: 0 auto;
  margin-bottom: 100px;
`;
const PRbtn = styled.button`
  margin: 20px;
  color: white;
  background-color: #2da44e;
  padding: 5px 16px;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  cursor: pointer;
  border: 1px solid;
  border-radius: 6px;
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
      status: "closed",
    });
    alert("Successfully closed this issue!");
  };

  const deleteIssue = async (id: string | undefined) => {
    await firebaseapi.deleteIssue(id);
    navigate("/");
  };

  useEffect(() => {
    const userId = userData.user.user_id;
    const userName = userData.user.user_name;
    console.log(userId);
    console.log(userName);
    if (userId && userName) {
      setGetUser(userId);
      setGetUserName(userName);
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
      friend_request: arrayUnion({ user_id: getUser, user_name: getUserName }),
    });
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
        <p>this page is issue page</p>
        <p>issue id: {id}</p>
        {issueData && (
          <div>
            <br />
            <img src={issueData.main_image} alt="main_photo" />
            <p>Category:</p>
            {issueData.category}
            <h2>Title:</h2>
            {issueData.title}
            <p>Content:</p>
            {issueData.content}
            <p>Issue status:</p>
            {issueData.status}
            <p>Posted by:</p>
            Author name: {getAuthor}
            <button
              onClick={() => {
                navigate("/readme/" + issueData.posted_by);
              }}
            >
              Readme
            </button>
            <p>Posted at:</p>
            {newT}
            <p>Tags:</p>
            {issueData.tags.map((tag: any) => (
              <>
                <p>{tag}</p>
              </>
            ))}
          </div>
        )}
        <br />
        <PRbtn onClick={sendRequest}>Create Pull Request</PRbtn>
        <h2>Area for author</h2>
        <button onClick={changeIssueStatus}>Close this issue</button>
        <br />
        <button
          onClick={() => {
            deleteIssue(id);
          }}
        >
          Delete this issue
        </button>
      </Wrapper>
    </>
  );
};

export default Issue;
