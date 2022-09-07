import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  doc,
  getDoc,
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import styled from "styled-components";

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
  const [userData, setUserData] = useState<any>(null);
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
    const userId = window.localStorage.getItem("userId");
    const userName = window.localStorage.getItem("userName");
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
        setUserData(res);
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
    const userRef2 = doc(db, "Users", getUser);
    await updateDoc(userRef2, {
      friend_sent_request: arrayUnion({
        user_id: getAuthorID,
        user_name: getAuthor,
      }),
    });
  };

  return (
    <>
      <Wrapper>
        <p>this page is issue page</p>
        <p>issue id: {id}</p>
        {userData && (
          <div>
            <br />
            <img src={userData.main_image} alt="main_photo" />
            <p>Category:</p>
            {userData.category}
            <h2>Title:</h2>
            {userData.title}
            <p>Content:</p>
            {userData.content}
            <p>Issue status:</p>
            {userData.status}
            <p>Posted by:</p>
            Author name: {getAuthor}
            <button
              onClick={() => {
                navigate("/readme/" + userData.posted_by);
              }}
            >
              Readme
            </button>
            <p>Posted at:</p>
            {newT}
            <p>Tags:</p>
            {userData.tags.map((tag: any) => (
              <>
                <p>{tag}</p>
              </>
            ))}
          </div>
        )}
        <br />
        <PRbtn onClick={sendRequest}>Create Pull Request</PRbtn>
        <h2>Area for author</h2>
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
