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

const BranchAll = () => {
  let navigate = useNavigate();
  const db = getFirestore();
  const [docs, setDocs] = useState([]);

  useEffect(() => {
    // unsubscribe();
    const branchesRef = collection(db, "Branches");
    firebaseapi.readAllBranches(branchesRef).then((res) => {
      if (res) {
        setDocs(res);
      }
    });
  }, []);

  return (
    <>
      <Wrapper>
        <h1>Display all branches here.</h1>
        {docs.map((blog: any) => (
          <>
            <h2>Branch title: {blog.title}</h2>
            <button
              onClick={() => {
                navigate("/branch/" + blog.branch_id);
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

export default BranchAll;
