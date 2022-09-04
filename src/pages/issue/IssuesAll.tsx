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
} from "firebase/firestore";
import styled from "styled-components";

const Wrapper = styled.div`
  display: block;
  max-width: 1376px;
  margin: 0 auto;
  margin-bottom: 100px;
`;

const IssueAll = () => {
  let navigate = useNavigate();
  const db = getFirestore();
  const [docs, setDocs] = useState([]);

  // const getAllDocs = async () => {
  //   const querySnapshot = await getDocs(collection(db, "Issues"));
  //   querySnapshot.forEach((doc) => {
  //     // doc.data() is never undefined for query doc snapshots
  //     // console.log(doc.data());
  //   });
  // };

  // useEffect(() => {
  //   getAllDocs();
  // }, []);

  const unsubscribe = async () => {
    const querySnapshot = await getDocs(collection(db, "Issues"));
    const document = [] as any;
    querySnapshot.forEach((doc) => {
      document.push({
        ...doc.data(),
        id: doc.id,
      });
    });
    setDocs(document);
  };

  useEffect(() => {
    unsubscribe();
  }, []);

  return (
    <>
      <Wrapper>
        <p>Display all issues here.</p>
        {docs.map((blog: any) => (
          <>
            <p>Blog title:</p>
            {blog.title}
            <button
              onClick={() => {
                navigate("/issue/" + blog.issue_id);
              }}
            >
              Click to issue
            </button>
          </>
        ))}
      </Wrapper>
    </>
  );
};

export default IssueAll;
