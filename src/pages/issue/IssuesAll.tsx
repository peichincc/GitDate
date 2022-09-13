import React, { useEffect, useState } from "react";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
  DocumentData,
  orderBy,
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
  const [dateIssue, setDateIssue] = useState<DocumentData>();

  useEffect(() => {
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
        // get closed issues
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
        // get issues by category: Date
        let tempDate = [] as any;
        const qDate = query(
          collection(db, "Issues"),
          where("category", "==", "date")
        );
        const querySnapshotDate = await getDocs(qDate);
        querySnapshotDate.forEach((doc) => {
          tempDate.push(doc.data());
        });
        setDateIssue(tempDate);
        // get issues by category: Hang out
        let tempHangOut = [] as any;
        const qHangOut = query(
          collection(db, "Issues"),
          where("category", "==", "hangout")
        );
        const querySnapshotHangOut = await getDocs(qHangOut);
        querySnapshotHangOut.forEach((doc) => {
          tempHangOut.push(doc.data());
        });
        setDateIssue(tempHangOut);
        // get issues by category: Networking
        let tempNetworking = [] as any;
        const qNetworking = query(
          collection(db, "Issues"),
          where("category", "==", "networking")
        );
        const querySnapshotNetworking = await getDocs(qNetworking);
        querySnapshotNetworking.forEach((doc) => {
          tempNetworking.push(doc.data());
        });
        setDateIssue(tempNetworking);
      }
    });
  }, []);

  const allIssues = () => {
    setIssuesSatus("ALL");
    setDocs(allIssue);
  };
  const searchOpenIssues = () => {
    setIssuesSatus("Open");
    setDocs(openIssue);
  };
  const searchClosedIssues = () => {
    setIssuesSatus("Closed");
    setDocs(closedIssue);
  };

  const dateIssues = () => {
    setIssuesSatus("Date");
    setDocs(dateIssue);
  };
  const hangOutIssues = () => {
    setIssuesSatus("Hang Out");
    setDocs(dateIssue);
  };
  const networkingIssues = () => {
    setIssuesSatus("Networking");
    setDocs(dateIssue);
  };

  return (
    <>
      <Wrapper>
        Filter by Status:
        <button onClick={allIssues}>All</button>
        <button onClick={searchOpenIssues}>Status Open</button>
        <button onClick={searchClosedIssues}>Status Close</button>
        <br />
        Filter by Category:
        <button onClick={dateIssues}>Date</button>
        <button onClick={hangOutIssues}>Hang out</button>
        <button onClick={networkingIssues}>Networking</button>
        <br />
        Filter by Tags: (pending)
        {docs && <IssuesList issuesStatus={issuesStatus} docs={docs} />}
      </Wrapper>
    </>
  );
};

export default IssueAll;
