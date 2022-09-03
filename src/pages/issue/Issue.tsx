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
} from "firebase/firestore";
import styled from "styled-components";

const Wrapper = styled.div`
  display: block;
  max-width: 1376px;
  margin: 0 auto;
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
  const [newT, setNewT] = useState<any>("");
  const [getUser, setGetUser] = useState("");

  // 讀取使用者資料
  const readData = async (id: any) => {
    const docRef = doc(db, "Issues", id);
    await getDoc(docRef).then((doc) => {
      if (doc.exists()) {
        const userDataFromDB = doc.data() as ListData;
        setUserData(userDataFromDB);
        if (userDataFromDB) {
          console.log("hi");
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
              console.log(doc.data().lastname);
              setGetUser(doc.data().lastname);
            });
          };
          searchUser();
        }
      } else {
        console.log("No such document!");
      }
    });
  };

  useEffect(() => {
    readData(id);
    // console.log(userData);
  }, []);

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
            Author name: {getUser}
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
      </Wrapper>
    </>
  );
};

export default Issue;
