import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
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

import { MergeBtn, Button, LabelsButton } from "../../utils/StyledComponent";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";

import Alert from "../../components/modal/Alert";
import Loading from "../../components/Loading";

const Wrapper = styled.div`
  display: block;
  max-width: 1376px;
  margin: 0 auto;
  margin-bottom: 100px;
`;

const Container = styled.div`
  max-width: 980px;
  margin: 0 auto;
  margin-top: 40px;
`;
const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
const MainContainer = styled.div``;

const Filters = styled.div`
  width: 100%;
  margin-right: 10px;
  height: 35px;
  border-radius: 6px;
  background-color: #f6f8fa;
  border-color: #d0d7de;
  border-style: solid;
  border-width: 1px;
  display: flex;
  align-items: center;
  @media screen and (max-width: 661px) {
    height: auto;
  }
`;
const FilterText = styled.div`
  padding: 5px 16px;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  color: #24292f;
  border-right: 1px solid #d0d7de;
`;
const FilterButtons = styled.div`
  margin-left: 5px;
`;

const CategoryButton = styled(LabelsButton)`
  background-color: #d87613;
`;

// const LabelsButton = styled.button`
//   padding: 0 10px;
//   font-size: 12px;
//   font-weight: 500;
//   line-height: 22px;
//   white-space: nowrap;
//   border: 1px solid transparent;
//   border-radius: 2em;
//   color: white;
//   background-color: ${(props) => (props. ? "white" : "#99262a")};
//   /* background-color: #7057ff; */
//   margin-right: 2px;
//   cursor: pointer;
// `;

const ReminderBox = styled.div`
  color: #24292f;
  width: 100%;
  height: auto;
  background-color: #fff8c5;
  border: 1px solid rgba(212, 167, 44, 0.4);
  padding: 20px 16px;
  border-radius: 6px;
  margin-bottom: 16px;
`;
const ReminderBoxText = styled.div`
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 4px;
  display: flex;
  align-items: center;
`;
const ReminderBoxTextSmall = styled.div`
  font-size: 12px;
`;
const AttentionIcon = styled.div`
  color: #9a6700;
  margin-right: 4px;
`;

const IssueAll = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [ButtonPop, setButtonPop] = useState(false);
  const userData = useSelector((state) => state) as any;
  const [getUser, setGetUser] = useState<any>("");
  let navigate = useNavigate();
  const db = getFirestore();
  const [docs, setDocs] = useState<DocumentData>();
  const [issuesStatus, setIssuesSatus] = useState("");
  const [allIssue, setAllIssue] = useState<DocumentData>();
  const [openIssue, setOpenIssue] = useState<DocumentData>();
  const [closedIssue, setClosedIssue] = useState<DocumentData>();
  const [dateIssue, setDateIssue] = useState<DocumentData>();
  const [hangOutIssue, setHangOutIssue] = useState<DocumentData>();
  const [networkingIssue, setNetworkingIssue] = useState<DocumentData>();

  useEffect(() => {
    // Check log in
    const userId = userData.user.user_id;
    if (userId) {
      setGetUser(userId);
    }
    const issuesRef = collection(db, "Issues");
    firebaseapi.readAllIssues(issuesRef).then(async (res) => {
      if (res) {
        setDocs(res);
        setAllIssue(res);
        setIsLoading(false);
        setIssuesSatus("All");
        // get open issues
        let temp = [] as any;
        const q = query(
          collection(db, "Issues"),
          where("status", "==", "Open")
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
          where("status", "==", "Closed")
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
          where("category", "==", "Date")
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
          where("category", "==", "Hang Out")
        );
        const querySnapshotHangOut = await getDocs(qHangOut);
        querySnapshotHangOut.forEach((doc) => {
          tempHangOut.push(doc.data());
        });
        setHangOutIssue(tempHangOut);
        // get issues by category: Networking
        let tempNetworking = [] as any;
        const qNetworking = query(
          collection(db, "Issues"),
          where("category", "==", "Networking")
        );
        const querySnapshotNetworking = await getDocs(qNetworking);
        querySnapshotNetworking.forEach((doc) => {
          tempNetworking.push(doc.data());
        });
        setNetworkingIssue(tempNetworking);
      }
    });
  }, []);

  const allIssues = () => {
    setIssuesSatus("All");
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
    setDocs(hangOutIssue);
  };
  const networkingIssues = () => {
    setIssuesSatus("Networking");
    setDocs(networkingIssue);
  };

  const CreateHandler = () => {
    if (!getUser) {
      setButtonPop(true);
      setTimeout(() => {
        navigate("/signin");
      }, 3000);
      // alert("Please sign in!");
      // navigate("/signin");
      return;
    }
    navigate("/createissue");
  };

  return (
    <>
      <Wrapper>
        <Alert
          trigger={ButtonPop}
          setButtonPop={setButtonPop}
          alertMsg={"Please sign in!"}
        />
        <Container>
          <ReminderBox>
            <ReminderBoxText>
              <AttentionIcon>
                <FontAwesomeIcon icon={faTriangleExclamation} />
              </AttentionIcon>
              Issues are the posts created by our GitDaters.
            </ReminderBoxText>
            <ReminderBoxTextSmall>
              Feel free to browse and find the GitDaters your would like to chat
              with.
            </ReminderBoxTextSmall>
          </ReminderBox>
          <FilterContainer>
            <Filters>
              <FilterText id="issuesFilter">Filters</FilterText>
              <FilterButtons>
                <LabelsButton onClick={allIssues}>All</LabelsButton>
                <LabelsButton onClick={searchOpenIssues}>
                  Status Open
                </LabelsButton>
                <LabelsButton onClick={searchClosedIssues}>
                  Status Close
                </LabelsButton>
              </FilterButtons>
              <FilterButtons>
                <CategoryButton onClick={dateIssues}>Date</CategoryButton>
                <CategoryButton onClick={hangOutIssues}>
                  Hang out
                </CategoryButton>
                <CategoryButton onClick={networkingIssues}>
                  Networking
                </CategoryButton>
              </FilterButtons>
            </Filters>
            <MergeBtn onClick={CreateHandler} id="createIssue">
              New issue
            </MergeBtn>
          </FilterContainer>
          <MainContainer>
            {isLoading && <Loading />}
            {docs && <IssuesList issuesStatus={issuesStatus} docs={docs} />}
          </MainContainer>
        </Container>
        {/* Filter by Tags: (pending) */}
      </Wrapper>
    </>
  );
};

export default IssueAll;
