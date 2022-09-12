import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import firebaseapi from "../../utils/firebaseapi";
import {
  doc,
  getFirestore,
  updateDoc,
  arrayUnion,
  QueryDocumentSnapshot,
  collection,
  DocumentData,
  onSnapshot,
} from "firebase/firestore";

import { ShowMap } from "../../components/map/ShowMap";
import Participants from "./Participants";

const Wrapper = styled.div`
  display: block;
  max-width: 1376px;
  margin: 0 auto;
  margin-bottom: 100px;
`;

const MapContainer = styled.div`
  width: 400px;
  height: 200px;
`;

const ParticipantsContainer = styled.div`
  border: 1px solid black;
  width: 400px;
  height: 200px;
`;

const CheckOutBtn = styled.button`
  margin: 20px;
  color: white;
  background-color: black;
  padding: 5px 16px;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  cursor: pointer;
  border: 1px solid;
  border-radius: 6px;
`;

const Branch = () => {
  const db = getFirestore();
  let navigate = useNavigate();
  const userData = useSelector((state) => state) as any;
  const { id } = useParams<any>();
  const [getUser, setGetUser] = useState("");
  const [getUserName, setGetUserName] = useState("");
  const [getAuthor, setGetAuthor] = useState("");
  const [getAuthorID, setGetAuthorID] = useState("");
  const [branchData, setBranchData] = useState<DocumentData>();
  const [newT, setNewT] = useState("");
  const [center, setCenter] = useState();
  const [newList, setNewList] = useState([]);
  const [openParticipants, setOpenParticipants] = useState(false);
  const [participantsList, setParticipantsList] = useState<any>();

  useEffect(() => {
    const userId = userData.user.user_id;
    const userName = userData.user.user_name;
    console.log(userId);
    console.log(userName);
    if (userId && userName) {
      setGetUser(userId);
      setGetUserName(userName);
    }
    firebaseapi.readBranchData(id).then((res) => {
      if (res) {
        console.log(res);
        const newT = new Date(res.posted_at.seconds * 1000).toString();
        setNewT(newT);
        setBranchData(res);
        setCenter(res.location);
      }
      firebaseapi.searchUserName(res?.hosted_by).then((res) => {
        if (res) {
          console.log(res["firstname"]);
          setGetAuthor(res["firstname"]);
          setGetAuthorID(res["user_id"]);
        }
      });
    });
  }, [openParticipants, participantsList]);

  const attendActivity = async () => {
    const userRef = doc(collection(db, "Users"), getUser);
    const branchRef = doc(collection(db, "Branches"), id);
    await updateDoc(userRef, {
      activity_attend: arrayUnion(id),
    });
    console.log(`${getUserName} attended this activity!`);
    await updateDoc(branchRef, {
      participants: arrayUnion(getUser),
      // participants: arrayUnion({ user_id: getUser, user_name: getUserName }),
    });
    await getParticipants();
  };

  const getParticipants = async () => {
    const branchRef = doc(collection(db, "Branches"), id);
    onSnapshot(branchRef, async (doc) => {
      console.log("Current data: ", doc.data());
      if (doc.exists()) {
        console.log(doc.data().participants);
        const newArr = [] as any;
        for (let i = 0; i < doc.data().participants.length; i++) {
          await firebaseapi
            .searchUserName(doc.data().participants[i])
            .then((res) => {
              console.log(res);
              if (res) {
                console.log(res["firstname"]);
                console.log(res["main_photo"]);
                const tempObj = {
                  name: res["firstname"],
                  photo: res["main_photo"],
                };
                newArr.push(tempObj);
              }
            });
        }
        // Promise.all(promises).then((res) => console.log(res));
        console.log(newArr);
        setParticipantsList(newArr);
      }
    });
  };

  const handleChange = async () => {
    await getParticipants();
    setOpenParticipants(true);
  };

  const deleteBranch = async (id: string | undefined) => {
    await firebaseapi.deleteBranch(id);
    navigate("/");
  };

  return (
    <>
      <Wrapper>
        Display branch here <p>branch id: {id}</p>
        {branchData && (
          <>
            <div>
              <br />
              <img src={branchData.main_image} alt="main_photo" />
              <p>Type:</p>
              {branchData.type}
              <h2>Title:</h2>
              {branchData.title}
              <p>Content:</p>
              {branchData.content}
              <p>Branch status:</p>
              {branchData.status}
              <p>Date:</p>
              {branchData.date} - {branchData.time}
              <p>Location: </p>
              {branchData.address}
              <MapContainer>
                <ShowMap center={center} />
              </MapContainer>
              <p>Posted by:</p>
              Author name: {getAuthor}
              <button
                onClick={() => {
                  navigate("/readme/" + branchData.hosted_by);
                }}
              >
                Readme
              </button>
              <p>Posted at:</p>
              {newT}
            </div>
            <br />
            <button onClick={handleChange}>Open the participants area</button>
            <ParticipantsContainer>
              {openParticipants && participantsList && (
                <Participants participantsList={participantsList} />
              )}
            </ParticipantsContainer>
          </>
        )}
        <br />
        <CheckOutBtn onClick={attendActivity}>git checkout</CheckOutBtn>
        <h2>Area for author</h2>
        <button
          onClick={() => {
            deleteBranch(id);
          }}
        >
          Delete this branch
        </button>
      </Wrapper>
    </>
  );
};

export default Branch;
