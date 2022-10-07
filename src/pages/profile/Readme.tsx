import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import firebaseapi from "../../utils/firebaseapi";
import { db } from "../../utils/firebase";
import {
  doc,
  collection,
  onSnapshot,
  query,
  where,
  getDocs,
  DocumentData,
  getDoc,
} from "firebase/firestore";
import PostedIssues from "../../components/user/PostedIssues";
import HostedBranches from "../../components/user/HostedBranches";
import AttendedBranches from "../../components/user/AttendedBranches";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faListUl } from "@fortawesome/free-solid-svg-icons";
import { BoxHeader } from "./Profile";
import {
  GoBackWrapper,
  Button,
  GithubLink,
  NavWord,
} from "../../utils/styledComponent";
import SourceTree from "./Graph";
import Loading from "../../components/Loading";
import ToggleOn from "../../assets/images/toggleOn.svg";
import ToggleOff from "../../assets/images/toggleOff.svg";

const Wrapper = styled.div`
  width: 90%;
  display: block;
  max-width: 1216px;
  margin: 0 auto;
`;
const Container = styled.div`
  width: 100%;
  margin-top: 20px;
  border: 1px solid #d0d7de;
  border-radius: 6px;
  height: auto;
`;
const InsideContainder = styled.div`
  height: auto;
  display: flex;
  margin-top: 20px;
  @media screen and (max-width: 770px) {
    flex-direction: column;
  }
`;
const LeftContainer = styled.div`
  margin-left: 20px;
  margin-bottom: 20px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 30%;
  @media screen and (max-width: 770px) {
    width: 100%;
  }
`;
export const PhotoContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 10px;
  width: 200px;
  height: 200px;
`;
export const PhotoContainerImg = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
`;
const RightContainer = styled.div`
  margin-left: 20px;
  flex-grow: 4;
  margin-top: 20px;
  margin-bottom: 20px;
  width: 70%;
  @media screen and (max-width: 770px) {
    width: 100%;
  }
`;
const NameCard = styled.div`
  padding-top: 8px;
`;
const ToggleOnBtn = styled(Button)`
  display: flex;
  align-items: center;
  margin-top: 20px;
  justify-content: space-evenly;
  width: 150px;
  padding: 2px;
  @media screen and (max-width: 500px) {
    display: none;
  }
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
  width: 120px;
  text-align: center;
`;

const Readme = () => {
  const { id } = useParams();
  let navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState<DocumentData>();
  const [postedIssues, setPostedIssues] = useState<DocumentData>();
  const [hostedBranches, setHostedBranches] = useState<DocumentData>();
  const [attendedBranches, setAttendedBranches] = useState<DocumentData>();
  const [sourceTreeStatus, setSourceTreeStatus] = useState(0);
  const [ButtonPop, setButtonPop] = useState(false);

  useEffect(() => {
    firebaseapi.readUserData(id).then((res) => {
      if (res) {
        if (res.firstname) {
          setSourceTreeStatus(1);
        }
        if (res["activity_hosted"]) {
          if (res["activity_hosted"].length > 0) {
            setSourceTreeStatus(3);
          }
        }
        if (res["activity_attend"]) {
          if (res["activity_attend"].length > 0) {
            setSourceTreeStatus(4);
          }
        }
        if (res["activity_attend"] && res["activity_hosted"]) {
          if (
            res["activity_attend"].length > 0 &&
            res["activity_hosted"].length > 0
          ) {
            setSourceTreeStatus(5);
          }
        }
        setUserData(res);
        searchIssues(res.user_id);
        searchHostedBranches(res.user_id);
        searchAttenedBranches(res.user_id);
        setIsLoading(false);
      }
    });
  }, [id]);

  const searchIssues = async (userId: string) => {
    const temp: DocumentData[] = [];
    const q = query(collection(db, "Issues"), where("posted_by", "==", userId));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      temp.push(doc.data());
    });
    setPostedIssues(temp);
  };
  const searchHostedBranches = async (userId: string) => {
    const temp: DocumentData[] = [];
    const q = query(
      collection(db, "Branches"),
      where("hosted_by", "==", userId)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      temp.push(doc.data());
    });
    setHostedBranches(temp);
  };
  const searchAttenedBranches = (userId: string) => {
    onSnapshot(doc(collection(db, "Users"), userId), async (branchDoc) => {
      if (branchDoc.exists()) {
        const newArr = [];
        for (let i = 0; i < branchDoc.data().activity_attend.length; i++) {
          const branchesRef = collection(db, "Branches");
          const branchid = branchDoc.data().activity_attend[i];
          const docRef = doc(branchesRef, branchid);
          const promise = (await getDoc(docRef)).data();
          newArr.push(promise);
        }
        const allNewArr = await Promise.all(newArr);
        setAttendedBranches(allNewArr);
      }
    });
  };

  return (
    <>
      <Wrapper>
        {ButtonPop && (
          <SourceTree
            setButtonPop={setButtonPop}
            sourceTreeStatus={sourceTreeStatus}
          />
        )}
        {isLoading ? (
          <Loading />
        ) : (
          <>
            {userData && (
              <>
                <Container>
                  <BoxHeader>
                    <FontAwesomeIcon icon={faListUl} />{" "}
                    <NavWord>README.md</NavWord>
                  </BoxHeader>
                  <InsideContainder id="readme">
                    <LeftContainer>
                      <PhotoContainer>
                        <PhotoContainerImg
                          src={userData.main_photo}
                          alt="main_photo"
                        />
                      </PhotoContainer>
                      <NameCard>
                        <b>
                          {userData.firstname} {userData.lastname}
                        </b>
                      </NameCard>
                      <NameCard>{userData.occupation}</NameCard>
                      <ToggleOnBtn
                        id="sourcetree"
                        onClick={() => {
                          setButtonPop((pre) => !pre);
                        }}
                      >
                        git graph
                        {ButtonPop ? (
                          <img src={ToggleOn} alt="ToggleBtn" />
                        ) : (
                          <img src={ToggleOff} alt="ToggleBtn" />
                        )}
                      </ToggleOnBtn>
                    </LeftContainer>
                    <RightContainer>
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
                        <DataCard> Wish relationship </DataCard>
                        {userData.wish_relationship}
                      </FormTextRead>
                      <FormTextRead>
                        <DataCard> GithubLink</DataCard>
                        <a
                          href={userData.githublink}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <GithubLink>{userData.githublink}</GithubLink>
                        </a>
                      </FormTextRead>
                      <FormTextRead>
                        <DataCard> Details</DataCard>
                        {userData.details}
                      </FormTextRead>
                    </RightContainer>
                  </InsideContainder>
                </Container>
                {postedIssues && <PostedIssues postedIssues={postedIssues} />}
                {hostedBranches && (
                  <>
                    <HostedBranches hostedBranches={hostedBranches} />
                    <AttendedBranches attendedBranches={attendedBranches} />
                  </>
                )}
              </>
            )}
          </>
        )}
        <GoBackWrapper>
          <Button onClick={() => navigate(-1)}>Go back</Button>
        </GoBackWrapper>
      </Wrapper>
    </>
  );
};

export default Readme;
