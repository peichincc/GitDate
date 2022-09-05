import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  doc,
  getDoc,
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";

interface Props {
  getInvitationList: [];
}

const Friend = ({ getInvitationList }: Props) => {
  const db = getFirestore();
  const [getAuthor, setGetAuthor] = useState();

  const getName = () => {
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
            console.log(doc.data().lastname);
            setGetAuthor(doc.data().lastname);
          });
        };
        searchUser();
      }
    }
  };
  getName();

  return (
    <>
      <p>Recieved request:</p>
      <p>Sent request:</p>
      {getInvitationList && <div>Sent invitation to {getAuthor}</div>}
    </>
  );
};

export default Friend;
