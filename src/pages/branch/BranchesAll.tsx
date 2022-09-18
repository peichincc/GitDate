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
import Calendar from "react-calendar";
import "./calendar.css";
import BranchesList from "./BranchList";

import firebaseapi from "../../utils/firebaseapi";

import { MergeBtn, Button, LabelsButton } from "../../utils/StyledComponent";

const Wrapper = styled.div`
  display: flex;
  max-width: 1376px;
  margin: 0 auto;
  margin-bottom: 100px;
`;
const Container = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  margin-top: 40px;
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  @media screen and (max-width: 1280px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;
const CalendarContainer = styled.div`
  width: 30%;
  margin-right: 20px;
`;
const CalendarContainerIn = styled.div`
  border: 1px solid #d0d7de;
  border-radius: 6px;
  padding: 20px;
`;
const BranchesContainer = styled.div`
  margin-top: 20px;
  width: 60%;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
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

const TypeBtn = styled(LabelsButton)`
  background-color: #453d38;
`;

const BranchAll = () => {
  const [date, setDate] = useState(new Date());
  let navigate = useNavigate();
  const db = getFirestore();
  const [docs, setDocs] = useState<DocumentData>();
  const [dateDocs, setDateDocs] = useState<DocumentData>();
  const [allBranch, setAllbranch] = useState<DocumentData>();
  const [branchType, setBranchType] = useState("");
  const [inpersonBranch, setInpersonBranch] = useState<DocumentData>();
  const [onlineBranch, setOnlineBranch] = useState<DocumentData>();
  const [mixedBranch, setMixedBranch] = useState<DocumentData>();

  useEffect(() => {
    const branchesRef = collection(db, "Branches");
    firebaseapi.readAllBranches(branchesRef).then(async (res) => {
      if (res) {
        setDocs(res);
        setAllbranch(res);
        setBranchType("All");
        // get inperson
        let temp = [] as any;
        const q = query(
          collection(db, "Branches"),
          where("type", "==", "inperson")
        );
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          temp.push(doc.data());
        });
        setInpersonBranch(temp);
        // get online
        let tempOnline = [] as any;
        const qOnline = query(
          collection(db, "Branches"),
          where("type", "==", "online")
        );
        const querySnapshotOnline = await getDocs(qOnline);
        querySnapshotOnline.forEach((doc) => {
          tempOnline.push(doc.data());
        });
        setOnlineBranch(tempOnline);
        // get mixed
        let tempMixed = [] as any;
        const qMixed = query(
          collection(db, "Branches"),
          where("type", "==", "mixed")
        );
        const querySnapshotMixed = await getDocs(qMixed);
        querySnapshotMixed.forEach((doc) => {
          tempMixed.push(doc.data());
        });
        setMixedBranch(tempMixed);
      }
    });
  }, []);

  const allBranches = () => {
    setBranchType("All");
    setDocs(allBranch);
  };
  const inpersonBranches = () => {
    setBranchType("Inperson");
    setDocs(inpersonBranch);
  };
  const onlineBranches = () => {
    setBranchType("Online");
    setDocs(onlineBranch);
  };
  const mixedBranches = () => {
    setBranchType("Mixed");
    setDocs(mixedBranch);
  };

  const dateClick = async (date: any) => {
    // console.log(date);
    const dateAssigned =
      date.getFullYear() +
      "-" +
      ("0" + (date.getMonth() + 1)).slice(-2) +
      "-" +
      ("0" + date.getDate()).slice(-2);
    console.log(dateAssigned);
    // console.log(date.toISOString().split("T")[0]);
    // const dateAssigned = date.toISOString().split("T")[0];
    let temp = [] as any;
    const q = query(
      collection(db, "Branches"),
      where("date", "==", dateAssigned)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      temp.push(doc.data());
    });
    setDocs(temp);
  };

  return (
    <>
      <Wrapper>
        <Container>
          <CalendarContainer>
            <h1>Select date to see branches</h1>
            <CalendarContainerIn>
              <Calendar
                onChange={setDate}
                value={date}
                defaultValue={date}
                onClickDay={dateClick}
              />
            </CalendarContainerIn>
            {/* <p className="text-center">
              <span className="bold">Selected Date:</span> {date.toDateString()}
            </p> */}
          </CalendarContainer>
          <BranchesContainer>
            <FilterContainer>
              <Filters>
                <FilterText>Filters</FilterText>
                <FilterButtons>
                  <TypeBtn onClick={allBranches}>All</TypeBtn>
                  <TypeBtn onClick={inpersonBranches}>In Person</TypeBtn>
                  <TypeBtn onClick={onlineBranches}>Online</TypeBtn>
                  <TypeBtn onClick={mixedBranches}>Mixed</TypeBtn>
                </FilterButtons>
              </Filters>
              <MergeBtn
                onClick={() => {
                  navigate("/createbranch");
                }}
              >
                New branch
              </MergeBtn>
            </FilterContainer>
            {docs && <BranchesList docs={docs} branchType={branchType} />}
          </BranchesContainer>
        </Container>
      </Wrapper>
    </>
  );
};

export default BranchAll;
