import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
  DocumentData,
} from "firebase/firestore";
import styled from "styled-components";

import firebaseapi from "../../utils/firebaseapi";

import IssuesList from "./IssuesList";

const Wrapper = styled.div`
  display: block;
  max-width: 1376px;
  margin: 0 auto;
  margin-bottom: 100px;
`;

const IssueAll = () => {
  const db = getFirestore();
  const [docs, setDocs] = useState<DocumentData>();
  const [issuesStatus, setIssuesSatus] = useState("");
  const [allIssue, setAllIssue] = useState<DocumentData>();
  const [openIssue, setOpenIssue] = useState<DocumentData>();
  const [closedIssue, setClosedIssue] = useState<DocumentData>();

  useEffect(() => {
    // unsubscribe();
    const issuesRef = collection(db, "Issues");
    firebaseapi.readAllIssues(issuesRef).then(async (res) => {
      if (res) {
        setDocs(res);
        setAllIssue(res);
        setIssuesSatus("All");
        // get open issues
        let temp = [] as any;
        const q = query(
          collection(db, "Issues"),
          where("status", "==", "open")
        );
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          temp.push(doc.data());
        });
        setOpenIssue(temp);
        let temp2 = [] as any;
        const q2 = query(
          collection(db, "Issues"),
          where("status", "==", "closed")
        );
        const querySnapshot2 = await getDocs(q2);
        querySnapshot2.forEach((doc) => {
          temp2.push(doc.data());
        });
        setClosedIssue(temp2);
      }
    });
  }, []);

  const allIssues = () => {
    setDocs(allIssue);
  };

  const searchOpenIssues = () => {
    setIssuesSatus("Open");
    setDocs(openIssue);
  };

  const searchClosedIssues = () => {
    setIssuesSatus("Closed");
    setDocs(closedIssue);
    // const q = query(collection(db, "Issues"), where("status", "==", "closed"));
    // const querySnapshot = await getDocs(q);
    // querySnapshot.forEach((doc) => {
    //   // doc.data() is never undefined for query doc snapshots
    //   // console.log(doc.id, " => ", doc.data());
    //   if (doc.data()) {
    //     setDocs(doc.data());
    //     setIssuesSatus("Closed");
    //   }
    // });
  };

  return (
    <>
      <Wrapper>
        <button onClick={allIssues}>All</button>
        <button onClick={searchOpenIssues}>Status Open</button>
        <button onClick={searchClosedIssues}>Status Close</button>
        <br />
        {docs && <IssuesList issuesStatus={issuesStatus} docs={docs} />}
      </Wrapper>
    </>
  );
};

export default IssueAll;
