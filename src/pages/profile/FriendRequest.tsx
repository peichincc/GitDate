import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";

interface Props {
  sentInvitationList: [];
  getInvitationList: [];
}

const Friend = ({ sentInvitationList, getInvitationList }: Props) => {
  const db = getFirestore();
  const [getAuthor, setGetAuthor] = useState();
  const [getAuthor2, setGetAuthor2] = useState();

  const getName = () => {
    if (sentInvitationList) {
      for (let i = 0; i < sentInvitationList.length; i++) {
        console.log(sentInvitationList[i]);
        const searchUser = async () => {
          const userRef = collection(db, "Users");
          const q = query(
            userRef,
            where("user_id", "==", sentInvitationList[i])
          );
          const querySnapshot = await getDocs(q);
          querySnapshot.forEach((doc) => {
            console.log(doc.data().firstname);
            setGetAuthor(doc.data().firstname);
          });
        };
        searchUser();
      }
    }
  };
  getName();

  const getName2 = () => {
    if (getInvitationList) {
      for (let i = 0; i < getInvitationList.length; i++) {
        console.log(getInvitationList[i]);
        const searchUser = async () => {
          const userRef = collection(db, "Users");
          const q = query(
            userRef,
            where("user_id", "==", getInvitationList[i])
          );
          const querySnapshot = await getDocs(q);
          querySnapshot.forEach((doc) => {
            console.log(doc.data().firstname);
            setGetAuthor2(doc.data().firstname);
          });
        };
        searchUser();
      }
    }
  };
  getName2();

  return (
    <>
      <p>Recieved request:</p>
      {getInvitationList && (
        <div>
          Recieved invitation from {getAuthor2}
          <button>Merge</button>
          <button>Close</button>
        </div>
      )}
      <p>Sent request:</p>
      {sentInvitationList && <div>Sent invitation to {getAuthor}</div>}
    </>
  );
};

export default Friend;
