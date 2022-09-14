import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc, getFirestore, collection } from "firebase/firestore";
import styled from "styled-components";
import firebaseapi from "../../utils/firebaseapi";

const Wrapper = styled.div`
  display: block;
  max-width: 1376px;
  margin: 0 auto;
`;
const Container = styled.div`
  margin-top: 50px;
  display: flex;
  height: 80vh;
`;
const LeftContainer = styled.div`
  margin-left: 20px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const PhotoContainer = styled.div`
  padding: 10px;
  width: 100%;
  max-width: 200px;
  height: 200px;
`;
const PhotoContainerImg = styled.img`
  max-width: 100%;
  max-height: 100%;
  border-radius: 50%;
`;
const RightContainer = styled.div`
  margin-left: 20px;
  flex-grow: 4;
`;

const FormText = styled.div`
  line-height: 19px;
  font-size: 16px;
  color: #3f3a3a;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  padding: 5px;
  margin-bottom: 10px;
`;
const DataCard = styled.div`
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
        <Container>
          {userData && (
            <>
              <LeftContainer>
                <PhotoContainer>
                  <PhotoContainerImg
                    src={userData.main_photo}
                    alt="main_photo"
                  />
                </PhotoContainer>
              </LeftContainer>
              <RightContainer>
                <FormText>
                  <DataCard> Name </DataCard>
                  {userData.firstname} {userData.lastname}
                </FormText>
                <FormText>
                  <DataCard>Age</DataCard> {userData.age}
                </FormText>
                <FormText>
                  <DataCard> Gender </DataCard> {userData.gender}
                </FormText>
                <FormText>
                  <DataCard> Interested in </DataCard>
                  {userData.gender_interested}
                </FormText>
                <FormText>
                  <DataCard> GithubLink</DataCard>
                  <a
                    href={userData.githublink}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {userData.githublink}
                  </a>
                </FormText>
                <FormText>
                  <DataCard> Details</DataCard>
                  {userData.details}
                </FormText>
              </RightContainer>
            </>
          )}
        </Container>
      </Wrapper>
    </>
  );
};

export default Readme;
