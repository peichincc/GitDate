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

const Wrapper = styled.div`
  display: flex;
  max-width: 1376px;
  margin: 0 auto;
  margin-bottom: 100px;
`;
const CalendarContainer = styled.div`
  width: 30%;
  margin-right: 20px;
`;
const BranchesContainer = styled.div`
  width: 60%;
`;

const BranchAll = () => {
  const [date, setDate] = useState(new Date());
  let navigate = useNavigate();
  const db = getFirestore();
  const [docs, setDocs] = useState([]);
  const [dateDocs, setDateDocs] = useState<DocumentData>();

  useEffect(() => {
    const branchesRef = collection(db, "Branches");
    firebaseapi.readAllBranches(branchesRef).then((res) => {
      if (res) {
        setDocs(res);
      }
    });
  }, []);

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
        <CalendarContainer>
          Calendar here
          <h1 className="text-center">React Calendar</h1>
          <div className="calendar-container">
            <Calendar
              onChange={setDate}
              value={date}
              defaultValue={date}
              onClickDay={dateClick}
            />
          </div>
          <p className="text-center">
            <span className="bold">Selected Date:</span> {date.toDateString()}
          </p>
        </CalendarContainer>

        <BranchesContainer>
          <h1>Display all branches here.</h1>
          {docs && <BranchesList docs={docs} />}
        </BranchesContainer>
      </Wrapper>
    </>
  );
};

export default BranchAll;
