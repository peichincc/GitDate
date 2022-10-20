import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { DocumentData } from "firebase/firestore";
import styled from "styled-components";
import firebaseapi from "../../utils/firebaseapi";
import IssuesList from "./IssuesList";
import { MergeBtn, LabelsButton } from "../../utils/styledComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import Alert from "../../components/modal/Alert";
import Loading from "../../components/Loading";
import { RootState } from "../..";

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
  @media screen and (max-width: 980px) {
    width: 100%;
    padding-left: 20px;
    padding-right: 20px;
  }
`;
const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
const MainContainer = styled.div``;
const Filters = styled.div`
  width: 100%;
  margin-right: 10px;
  height: auto;
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
  @media screen and (max-width: 770px) {
    padding: 5px;
  }
`;
const StatusButton = styled(LabelsButton)`
  @media screen and (max-width: 770px) {
    margin: 2px;
  }
`;
const CategoryButton = styled(LabelsButton)`
  background-color: #d87613;
  @media screen and (max-width: 770px) {
    margin: 2px;
  }
`;
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
  let navigate = useNavigate();
  const userData = useSelector((state: RootState) => state);
  const [isLoading, setIsLoading] = useState(true);
  const [ButtonPop, setButtonPop] = useState(false);
  const [getUser, setGetUser] = useState("");
  const [docs, setDocs] = useState<DocumentData>();
  const [issuesStatus, setIssuesStatus] = useState("");
  const [allIssue, setAllIssue] = useState<DocumentData>();
  const [openIssue, setOpenIssue] = useState<DocumentData>();
  const [closedIssue, setClosedIssue] = useState<DocumentData>();
  const [dateIssue, setDateIssue] = useState<DocumentData>();
  const [hangOutIssue, setHangOutIssue] = useState<DocumentData>();
  const [networkingIssue, setNetworkingIssue] = useState<DocumentData>();

  useEffect(() => {
    const userId = userData.user.user_id;
    if (userId) {
      setGetUser(userId);
    }
    firebaseapi.readAllIssues().then((res) => {
      if (res) {
        setDocs(res);
        setAllIssue(res);
        setIsLoading(false);
        setIssuesStatus("All");
        firebaseapi.getIssues("status", "Open").then((res) => {
          setOpenIssue(res);
        });
        firebaseapi.getIssues("status", "Closed").then((res) => {
          setClosedIssue(res);
        });
        firebaseapi.getIssues("category", "Date").then((res) => {
          setDateIssue(res);
        });
        firebaseapi.getIssues("category", "Hang Out").then((res) => {
          setHangOutIssue(res);
        });
        firebaseapi.getIssues("category", "Networking").then((res) => {
          setNetworkingIssue(res);
        });
      }
    });
  }, []);

  const allIssues = () => {
    setIssuesStatus("All");
    setDocs(allIssue);
  };
  const searchOpenIssues = () => {
    setIssuesStatus("Open");
    setDocs(openIssue);
  };
  const searchClosedIssues = () => {
    setIssuesStatus("Closed");
    setDocs(closedIssue);
  };

  const dateIssues = () => {
    setIssuesStatus("Date");
    setDocs(dateIssue);
  };
  const hangOutIssues = () => {
    setIssuesStatus("Hang Out");
    setDocs(hangOutIssue);
  };
  const networkingIssues = () => {
    setIssuesStatus("Networking");
    setDocs(networkingIssue);
  };

  const createHandler = () => {
    if (!getUser) {
      setButtonPop(true);
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
                <StatusButton onClick={allIssues}>All</StatusButton>
                <StatusButton onClick={searchOpenIssues}>
                  Status Open
                </StatusButton>
                <StatusButton onClick={searchClosedIssues}>
                  Status Close
                </StatusButton>
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
            <MergeBtn onClick={createHandler} id="createIssue">
              New issue
            </MergeBtn>
          </FilterContainer>
          <MainContainer>
            {isLoading && <Loading />}
            {docs && <IssuesList issuesStatus={issuesStatus} docs={docs} />}
          </MainContainer>
        </Container>
      </Wrapper>
    </>
  );
};

export default IssueAll;
