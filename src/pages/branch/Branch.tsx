import React, { useEffect, useState, useRef } from "react";
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

import {
  AuthorBtn,
  PostTitle,
  PostSubTitle,
  LebalsText,
  PostImgContainer,
  MergeBtn,
  PostContentText,
} from "../../utils/StyledComponent";

const Wrapper = styled.div`
  display: block;
  /* max-width: 1376px; */
  margin: 0 auto;
  margin-bottom: 100px;
`;
const TopContainer = styled.div`
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
  padding-left: 1.25rem;
  padding-right: 1.25rem;
  width: 100%;
  border-bottom-width: 1px;
  border-color: #d0d7de;
`;
const TopContentContainer = styled.div`
  max-width: 1120px;
  margin-left: auto;
  margin-right: auto;
`;
const MainContainer = styled.div`
  width: 100%;
  padding-left: 1.25rem;
  padding-right: 1.25rem;
  padding-bottom: 1.5rem;
  border-top-width: 1px;
  background-color: #f6f8fa;
`;
const LeftContent = styled.div`
  width: 660px;
`;
const RightContent = styled.div`
  margin-top: 20px;
`;
const MainContentContainer = styled.div`
  max-width: 1120px;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-direction: row;
  width: 100%;
  @media screen and (max-width: 992px) {
    flex-direction: column;
  }
`;
const BranchImgBox = styled(PostImgContainer)`
  margin-left: 0;
`;
const BranchImgBoxImg = styled.img`
  width: 100%;
  height: 100%;
`;
const BranchSubTitle = styled.div`
  text-align: left;
  font-weight: 600;
  font-size: 1.25rem;
  line-height: 1.75rem;
  padding-bottom: 4px;
`;
const BranchConent = styled(PostContentText)`
  margin-left: 0;
  margin-top: 0;
`;
const ParticipantsContainer = styled.div`
  margin-top: 40px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
`;
const CardContainer = styled.div`
  padding: 1.5rem;
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  background-color: white;
  margin-bottom: 20px;
  margin-right: 20px;
`;

const MapContainer = styled.div`
  width: 400px;
  height: 200px;
`;

const CheckOutBtn = styled(MergeBtn)`
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

const ParticipantsBtn = styled.button`
  border: none;
  background: none;
  cursor: pointer;
  text-align: left;
  font-weight: 600;
  font-size: 1.25rem;
  line-height: 1.75rem;
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
                console.log(res["user_id"]);
                // console.log(res["firstname"]);
                // console.log(res["main_photo"]);
                const tempObj = {
                  id: res["user_id"],
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
        {branchData && (
          <>
            <TopContainer>
              <TopContentContainer>
                <PostSubTitle>
                  {branchData.date} · {branchData.time}
                </PostSubTitle>
                <PostTitle>{branchData.title}</PostTitle>
                <LebalsText>
                  Posted by
                  <AuthorBtn
                    onClick={() => {
                      navigate("/readme/" + branchData.hosted_by);
                    }}
                  >
                    {getAuthor}{" "}
                  </AuthorBtn>
                  at{"  "}
                  {newT}
                </LebalsText>
              </TopContentContainer>
            </TopContainer>
            <MainContainer>
              <MainContentContainer>
                <LeftContent>
                  <BranchImgBox>
                    <BranchImgBoxImg
                      src={branchData.main_image}
                      alt="main_photo"
                    />
                  </BranchImgBox>
                  <BranchSubTitle>Details</BranchSubTitle>
                  <BranchConent>
                    <div
                      dangerouslySetInnerHTML={{ __html: branchData.content }}
                    ></div>
                  </BranchConent>
                  <CardContainer>
                    <PostContentText>
                      Click to attend this activity!
                    </PostContentText>
                    <CheckOutBtn onClick={attendActivity}>
                      git checkout
                    </CheckOutBtn>
                  </CardContainer>
                </LeftContent>
                <RightContent>
                  <CardContainer>
                    <BranchSubTitle>Type:</BranchSubTitle>
                    {branchData.type}
                  </CardContainer>
                  <CardContainer>
                    <BranchSubTitle>Branch status:</BranchSubTitle>
                    {branchData.status}
                  </CardContainer>
                  <CardContainer>
                    <BranchSubTitle>Date:</BranchSubTitle>
                    {branchData.date} · {branchData.time}
                  </CardContainer>
                  <CardContainer>
                    <BranchSubTitle>Location: </BranchSubTitle>
                    {branchData.address}
                    <MapContainer>
                      <ShowMap center={center} />
                    </MapContainer>
                  </CardContainer>
                  <ParticipantsContainer>
                    <ParticipantsBtn onClick={handleChange}>
                      Click to see the participants!
                    </ParticipantsBtn>
                    {openParticipants && participantsList && (
                      <Participants participantsList={participantsList} />
                    )}
                  </ParticipantsContainer>
                </RightContent>
              </MainContentContainer>
            </MainContainer>
          </>
        )}
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
