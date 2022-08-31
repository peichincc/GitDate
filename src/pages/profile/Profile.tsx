import React, { useEffect } from "react";
import styled from "styled-components";

// import firebase from "../../utils/firebase";
import { initializeApp } from "firebase/app";
import { getFirestore, getDocs, collection } from "firebase/firestore";

const Wrapper = styled.div`
  display: block;
  max-width: 1376px;
  margin: 0 auto;
`;

const Profile = () => {
  // const firebaseConfig = {
  //   apiKey: "AIzaSyCWUzuq_-Y83KTKEpicxofIFb7isMyq-sE",
  //   authDomain: "gitdate-ec8a6.firebaseapp.com",
  //   projectId: "gitdate-ec8a6",
  //   storageBucket: "gitdate-ec8a6.appspot.com",
  //   messagingSenderId: "879193846506",
  //   appId: "1:879193846506:web:e433e0479a915cf9b11d93",
  //   measurementId: "G-RH7X04NJ9S",
  // };

  // const app = initializeApp(firebaseConfig);
  // const db = getFirestore(app);

  // const readData = async () => {
  //   const querySnapshot = await getDocs(collection(db, "Users"));
  //   querySnapshot.forEach((doc) => {
  //     console.table(doc.data());
  //   });
  // };

  // useEffect(() => {
  //   readData();
  // }, []);

  return (
    <>
      <Wrapper>test</Wrapper>
    </>
  );
};

export default Profile;
