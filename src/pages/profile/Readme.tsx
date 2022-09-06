import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc, getFirestore, collection } from "firebase/firestore";
import styled from "styled-components";

const Wrapper = styled.div`
  display: block;
  max-width: 1376px;
  margin: 0 auto;
`;

const Readme = () => {
  const db = getFirestore();
  const { id } = useParams<any>();
  type ListData = {
    lastname: string;
    firstname: string;
    age: number | undefined;
    gender: string;
    githublink: string;
    details: string;
    gender_interested: string;
    // inerested_gender: [];
    main_photo: string;
    wish_relationship: string;
  };
  const [userData, setUserData] = useState<ListData | null>(null);

  // 讀取使用者資料
  const readData = async (id: any) => {
    const docRef = doc(collection(db, "Users"), id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      const userDataFromDB = docSnap.data() as ListData;
      setUserData(userDataFromDB);
    } else {
      console.log("No such document!");
    }
  };

  useEffect(() => {
    readData(id);
    // console.log(userData);
  }, []);

  return (
    <>
      <Wrapper>
        <p>this page is member public page</p>
        <p>id: {id}</p>
        {userData && (
          <div>
            <br />
            <p>the pulic readme: data from db</p>
            <img src={userData.main_photo} alt="main_photo" />
            <p>Name:</p>
            {userData.firstname}
            {userData.lastname}
            <p>Age:</p>
            {userData.age}
            <p>Gender:</p>
            {userData.gender}
            <p>Interested in:</p>
            {userData.gender_interested}
            <p>GithubLink:</p>
            {userData.githublink}
            <p>Details:</p>
            {userData.details}
          </div>
        )}
      </Wrapper>
    </>
  );
};

export default Readme;
