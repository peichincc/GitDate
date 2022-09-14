import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc, getFirestore, collection } from "firebase/firestore";
import styled from "styled-components";
import firebaseapi from "../../utils/firebaseapi";

import { BoxHeader } from "./Profile";

const Wrapper = styled.div`
  display: block;
  max-width: 1376px;
  margin: 0 auto;
`;
const Container = styled.div`
  margin-top: 20px;
  margin-right: 50px;
  border: 1px solid #d0d7de;
  border-radius: 6px;
  height: 50vh;
`;
const InsideContainder = styled.div`
  display: flex;
  margin-top: 20px;
`;
const LeftContainer = styled.div`
  margin-left: 20px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export const PhotoContainer = styled.div`
  padding: 10px;
  width: 100%;
  max-width: 200px;
  height: 200px;
`;
export const PhotoContainerImg = styled.img`
  max-width: 100%;
  max-height: 100%;
  border-radius: 50%;
`;
const RightContainer = styled.div`
  margin-left: 20px;
  flex-grow: 4;
`;

export const FormTextRead = styled.div`
  line-height: 19px;
  font-size: 16px;
  color: #3f3a3a;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  padding: 5px;
  margin-bottom: 10px;
`;
export const DataCard = styled.div`
  border-radius: 8px;
  background-color: #edede9;
  padding: 5px;
  margin-right: 10px;
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
    main_photo: string;
    wish_relationship: string;
  };
  // const [userData, setUserData] = useState<ListData | null>(null);
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    // readData(id);
    // console.log(userData);
    firebaseapi.readUserData(id).then((res) => {
      if (res) {
        setUserData(res);
      }
    });
  }, []);

  return (
    <>
      <Wrapper>
        {userData && (
          <>
            <Container>
              <BoxHeader>≡ README.md</BoxHeader>
              <InsideContainder>
                <LeftContainer>
                  <PhotoContainer>
                    <PhotoContainerImg
                      src={userData.main_photo}
                      alt="main_photo"
                    />
                  </PhotoContainer>
                </LeftContainer>
                <RightContainer>
                  <FormTextRead>
                    <DataCard> Name </DataCard>
                    {userData.firstname} {userData.lastname}
                  </FormTextRead>
                  <FormTextRead>
                    <DataCard>Age</DataCard> {userData.age}
                  </FormTextRead>
                  <FormTextRead>
                    <DataCard> Gender </DataCard> {userData.gender}
                  </FormTextRead>
                  <FormTextRead>
                    <DataCard> Interested in </DataCard>
                    {userData.gender_interested}
                  </FormTextRead>
                  <FormTextRead>
                    <DataCard> GithubLink</DataCard>
                    <a
                      href={userData.githublink}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {userData.githublink}
                    </a>
                  </FormTextRead>
                  <FormTextRead>
                    <DataCard> Details</DataCard>
                    {userData.details}
                  </FormTextRead>
                </RightContainer>
              </InsideContainder>
            </Container>
          </>
        )}
      </Wrapper>
    </>
  );
};

export default Readme;
