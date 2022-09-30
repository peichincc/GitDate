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
} from "firebase/firestore";
import styled from "styled-components";
import Calendar from "react-calendar";
import "./calendar.css";
import BranchesList from "./BranchList";

import firebaseapi from "../../utils/firebaseapi";

import { MergeBtn, LabelsButton } from "../../utils/StyledComponent";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";

import Alert from "../../components/modal/Alert";
import Loading from "../../components/Loading";

const ImgContainer = styled.img`
  overflow: hidden;
  z-index: -1;
  position: fixed;
  left: 1%;
  top: 15%;
  max-width: 900px;
`;
const ImgContainer2 = styled.img`
  overflow: hidden;
  z-index: -2;
  position: fixed;
  bottom: 2%;
  left: 25%;
`;

const CalendarContainer = styled.div`
  position: sticky;
  top: 3%;
  @media screen and (max-width: 1280px) {
    position: relative;
    top: 0;
  }
  /* ~~~ container styles ~~~ */
  max-width: 600px;
  margin: auto;
  margin-top: 0px;
  /* ~~~ navigation styles ~~~ */
  .react-calendar__navigation {
    display: flex;
    .react-calendar__navigation__label {
      font-weight: bold;
    }
    .react-calendar__navigation__arrow {
      flex-grow: 0.333;
    }
  }
  /* ~~~ label styles ~~~ */
  .react-calendar__month-view__weekdays {
    text-align: center;
  }
  /* ~~~ button styles ~~~ */
  button {
    cursor: pointer;
    margin: 3px;
    background: none;
    border: 0;
    border-radius: 3px;
    color: black;
    padding: 5px 0;
    &:hover {
      background-color: #e6e7e9;
    }
    &:active {
      background-color: #f6f8fa;
    }
  }
  /* ~~~ day grid styles ~~~ */
  .react-calendar__month-view__days {
    display: grid !important;
    grid-template-columns: 14.2% 14.2% 14.2% 14.2% 14.2% 14.2% 14.2%;
    .react-calendar__tile {
      max-width: initial !important;
    }
    .react-calendar__tile--range {
      border: 1px solid;
    }
  }
  /* ~~~ neighboring month & weekend styles ~~~ */
  .react-calendar__month-view__days__day--neighboringMonth {
    opacity: 0.7;
  }
  .react-calendar__month-view__days__day--weekend {
    color: #929396;
  }
  /* ~~~ other view styles ~~~ */
  .react-calendar__year-view__months,
  .react-calendar__decade-view__years,
  .react-calendar__century-view__decades {
    display: grid !important;
    grid-template-columns: 20% 20% 20% 20% 20%;
    &.react-calendar__year-view__months {
      grid-template-columns: 33.3% 33.3% 33.3%;
    }
    .react-calendar__tile {
      max-width: initial !important;
    }
  }
`;

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
const CalendarContainerIn = styled.div`
  border: 1px solid #d0d7de;
  border-radius: 6px;
  padding: 20px;
  background-color: white;
  margin-top: 10px;
`;
const BranchesContainer = styled.div`
  margin-top: 20px;
  width: 60%;
  @media screen and (max-width: 661px) {
    width: 100%;
    padding-left: 20px;
    padding-right: 20px;
  }
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
const StatusBtn = styled(LabelsButton)`
  background-color: #e4e669;
  color: black;
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

const BranchAll = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [ButtonPop, setButtonPop] = useState(false);
  const userData = useSelector((state) => state) as any;
  const [getUser, setGetUser] = useState<any>("");
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
  const [upcomingBranch, setUpcomingBranch] = useState<DocumentData>();
  const [expiredBranch, setExpiredBranch] = useState<DocumentData>();

  useEffect(() => {
    // Check log in
    const userId = userData.user.user_id;
    if (userId) {
      setGetUser(userId);
    }
    console.log(userId);
    const branchesRef = collection(db, "Branches");
    firebaseapi.readAllBranches(branchesRef).then(async (res) => {
      if (res) {
        // console.log(res);
        // get all the branch date
        let dateTemp = [] as any;
        res.forEach((doc: any) => {
          // console.log(doc.date);
          dateTemp.push(doc.date);
        });
        const dates = new Set(dateTemp);
        setDateDocs(dates);
        //
        setDocs(res);
        setAllbranch(res);
        setIsLoading(false);
        setBranchType("All");
        // get inperson
        let temp = [] as any;
        const q = query(
          collection(db, "Branches"),
          where("type", "==", "Inperson")
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
          where("type", "==", "Online")
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
          where("type", "==", "Mixed")
        );
        const querySnapshotMixed = await getDocs(qMixed);
        querySnapshotMixed.forEach((doc) => {
          tempMixed.push(doc.data());
        });
        setMixedBranch(tempMixed);
        // get upcoming
        let tempUpcoming = [] as any;
        const qUpcoming = query(
          collection(db, "Branches"),
          where("status", "==", "Upcoming")
        );
        const querySnapshotUpcoming = await getDocs(qUpcoming);
        querySnapshotUpcoming.forEach((doc) => {
          tempUpcoming.push(doc.data());
        });
        setUpcomingBranch(tempUpcoming);
        // get expired
        let tempExpired = [] as any;
        const qExpired = query(
          collection(db, "Branches"),
          where("status", "==", "Expired")
        );
        const querySnapshotExpired = await getDocs(qExpired);
        querySnapshotExpired.forEach((doc) => {
          tempExpired.push(doc.data());
        });
        setExpiredBranch(tempExpired);
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
  const upcomingBranches = () => {
    setBranchType("Upcoming");
    setDocs(upcomingBranch);
  };
  const expiredBranches = () => {
    setBranchType("Expired");
    setDocs(expiredBranch);
  };

  const dateClick = async (date: any) => {
    // console.log(date);
    const dateAssigned =
      date.getFullYear() +
      "-" +
      ("0" + (date.getMonth() + 1)).slice(-2) +
      "-" +
      ("0" + date.getDate()).slice(-2);
    // console.log(dateAssigned);
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

  const CreateHandler = () => {
    if (!getUser) {
      setButtonPop(true);
      // setTimeout(() => {
      //   navigate("/signin");
      // }, 3000);
      // alert("Please sign in!");
      // navigate("/signin");
      return;
    }
    navigate("/createbranch");
  };

  var moment = require("moment");
  const mark = new Set([
    "2022-09-27",
    "2022-09-28",
    "2022-10-06",
    "2022-10-11",
    "2022-10-27",
    "2022-11-07",
    "2022-12-02",
  ]);
  const tileClassName = ({ date }: any) => {
    // console.log(moment(date).format("YYYY-MM-DD"));
    if (dateDocs?.has(moment(date).format("YYYY-MM-DD"))) {
      return "highlight";
    }
    return null;
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
          <ImgContainer src="https://secure.meetupstatic.com/next/images/blobs/yellow-blob.svg" />
          <ImgContainer2 src="https://secure.meetupstatic.com/next/images/blobs/red-blob.svg" />
          <CalendarContainer>
            <h1>Select date to see branches</h1>
            <CalendarContainerIn id="branchCalendar">
              <Calendar
                onChange={setDate}
                value={date}
                // defaultValue={date}
                onClickDay={dateClick}
                tileClassName={tileClassName}
                // tileDisabled={({ date }) => date.getDay() === 0}
              />
            </CalendarContainerIn>
          </CalendarContainer>
          <BranchesContainer>
            <ReminderBox>
              <ReminderBoxText>
                <AttentionIcon>
                  <FontAwesomeIcon icon={faTriangleExclamation} />
                </AttentionIcon>
                Branches are activities around the world.
              </ReminderBoxText>
              <ReminderBoxTextSmall>
                You can select the activity type and date to check details!
              </ReminderBoxTextSmall>
            </ReminderBox>
            <FilterContainer>
              <Filters>
                <FilterText id="branchesFilter">Filters</FilterText>
                <FilterButtons>
                  <StatusBtn onClick={allBranches}>All</StatusBtn>
                  <StatusBtn onClick={upcomingBranches}>Upcoming</StatusBtn>
                  <StatusBtn onClick={expiredBranches}>Expired</StatusBtn>
                  <TypeBtn onClick={inpersonBranches}>In Person</TypeBtn>
                  <TypeBtn onClick={onlineBranches}>Online</TypeBtn>
                  <TypeBtn onClick={mixedBranches}>Mixed</TypeBtn>
                </FilterButtons>
              </Filters>
              <MergeBtn onClick={CreateHandler} id="createBranch">
                New branch
              </MergeBtn>
            </FilterContainer>
            {isLoading && <Loading />}
            {docs && <BranchesList docs={docs} branchType={branchType} />}
          </BranchesContainer>
        </Container>
      </Wrapper>
    </>
  );
};

export default BranchAll;
function moment(date: Date) {
  throw new Error("Function not implemented.");
}
