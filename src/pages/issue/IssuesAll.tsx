import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import styled from "styled-components";

import firebaseapi from "../../utils/firebaseapi";

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

  // const unsubscribe = async () => {
  //   const querySnapshot = await getDocs(collection(db, "Issues"));
  //   const document = [] as any;
  //   querySnapshot.forEach((doc) => {
  //     document.push(doc.data());
  //     // document.push({
  //     //   ...doc.data(),
  //     //   id: doc.id,
  //     // });
  //   });
  //   console.log(document);
  //   setDocs(document);
  // };

  useEffect(() => {
    // unsubscribe();
    const issuesRef = collection(db, "Issues");
    firebaseapi.readAllIssues(issuesRef).then((res) => {
      if (res) {
        setDocs(res);
      }
    });
  }, []);

  return (
    <>
      <Wrapper>
        <h1>Display all issues here.</h1>
        {docs.map((blog: any) => (
          <>
            <h2>Blog title: {blog.title}</h2>
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
