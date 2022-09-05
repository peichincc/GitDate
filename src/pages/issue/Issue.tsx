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
  const [userData, setUserData] = useState<ListData | null>(null);
  const [newT, setNewT] = useState("");
  const [getUser, setGetUser] = useState<any>("");
  const [getAuthor, setGetAuthor] = useState("");
  const [getAuthorID, setGetAuthorID] = useState("");

  // 讀取使用者資料
  const readData = async (id: string | undefined) => {
    const docRef = doc(collection(db, "Issues"), id);
    await getDoc(docRef).then((doc) => {
      if (doc.exists()) {
        const userDataFromDB = doc.data() as ListData;
        setUserData(userDataFromDB);
        if (userDataFromDB) {
          const newT = new Date(
            userDataFromDB.posted_at.seconds * 1000
          ).toString();
          setNewT(newT);
          const searchUser = async () => {
            const userRef = collection(db, "Users");
            const q = query(
              userRef,
              where("user_id", "==", userDataFromDB.posted_by)
            );
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
              // console.log(doc.data().lastname);
              setGetAuthor(doc.data().lastname);
              // console.log(doc.data().user_id);
              setGetAuthorID(doc.data().user_id);
            });
          };
          searchUser();
        }
      } else {
        console.log("No such document!");
      }
    });
  };

  const deleteIssue = async (id: string | undefined) => {
    await deleteDoc(doc(collection(db, "Issues"), id))
      .then(() => {
        alert("Delete successful!");
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      });
  };

  useEffect(() => {
    const userId = window.localStorage.getItem("userId");
    console.log(userId);
    if (userId) setGetUser(userId);
    readData(id);
    // console.log(id);
    // console.log(getAuthorID);
    // console.log(userData);
  }, []);

  const sendRequest = async () => {
    // console.log(`User:${getAuthorID}`);
    const userRef = doc(db, "Users", getAuthorID);
    await updateDoc(userRef, {
      friend_request: arrayUnion(getUser),
    });
    console.log(`Invitation Sent to ${getAuthor}`);
    const userRef2 = doc(db, "Users", getUser);
    await updateDoc(userRef2, {
      friend_sent_request: arrayUnion(getAuthorID),
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
            {userData.tags.map((tag) => (
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
