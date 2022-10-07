import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { db } from "../../utils/firebase";
import firebaseapi from "../../utils/firebaseapi";
import {
  doc,
  updateDoc,
  arrayUnion,
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
  DeleteBtn,
  GoBackWrapper,
  Button,
} from "../../utils/styledComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import Alert from "../../components/modal/Alert";
import Confirm from "../../components/modal/Confirm";
import Loading from "../../components/Loading";
import AlertWtihCTA from "../../components/modal/AlertWithCTA";
import { RootState } from "../..";

const Wrapper = styled.div`
  display: block;
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
  @media screen and (max-width: 660px) {
    width: 100%;
  }
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
  @media screen and (max-width: 770px) {
    max-width: 250px;
    max-height: 200px;
  }
`;
const BranchImgBoxImg = styled.img`
  max-width: 500px;
  max-height: 400px;
  @media screen and (max-width: 770px) {
    width: 250px;
    height: 200px;
  }
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
  @media screen and (max-width: 660px) {
    width: 100%;
  }
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
const DeleteWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-right: 20px;
`;

const Branch = () => {
  const { id } = useParams();
  let navigate = useNavigate();
  const branchRef = doc(collection(db, "Branches"), id);
  const userData = useSelector((state: RootState) => state);
  const [isLoading, setIsLoading] = useState(true);
  const [ButtonPop, setButtonPop] = useState(false);
  const [alertWtihCTAPop, setAlertWtihCTAPop] = useState(false);
  const [confirmPop, setConfirmPop] = useState(false);
  const [confirmMsg, setConfirmMsg] = useState("");
  const [alertMsg, setAlertMsg] = useState("");
  const [getAuthor, setGetAuthor] = useState("");
  const [getAuthorID, setGetAuthorID] = useState("");
  const [branchData, setBranchData] = useState<DocumentData>();
  const [newT, setNewT] = useState("");
  const [openParticipants, setOpenParticipants] = useState(false);
  const [participantsList, setParticipantsList] = useState([]);
  const [isAuthor, setIsAuthor] = useState(false);
  const [isExpired, setIsExpired] = useState(true);
  const [hostedList, setHostedList] = useState([]);
  const userId = userData.user.user_id;
  const userName = userData.user.user_name;

  useEffect(() => {
    firebaseapi.readBranchData(id).then((res) => {
      if (res) {
        const today = new Date();
        const date =
          today.getFullYear() +
          "-" +
          (today.getMonth() + 1) +
          "-" +
          today.getDate();
        const date1 = new Date(res.date);
        const date2 = new Date(date);
        if (date1 > date2) {
          setIsExpired(false);
        }
        if (date1 < date2) {
          updateDoc(branchRef, {
            status: "Expired",
          });
        }
        const newT = new Date(res.posted_at.seconds * 1000).toString();
        setNewT(newT);
        setBranchData(res);
      }
      firebaseapi.searchUserName(res?.hosted_by).then((res) => {
        if (res) {
          setHostedList(res["activity_hosted"]);
          setGetAuthor(res["firstname"]);
          setGetAuthorID(res["user_id"]);
          setTimeout(() => {
            setIsLoading(false);
          }, 1000);
          if (res["user_id"] === userId) {
            setIsAuthor(true);
          }
        }
      });
    });
  }, [openParticipants, participantsList]);

  const attendActivity = () => {
    if (!userId) {
      setButtonPop(true);
      setAlertMsg("Please sign in!");
      return;
    }
    if (!userName) {
      setAlertMsg("You haven't completed your README, let's write it here");
      setAlertWtihCTAPop(true);
      return;
    }
    setConfirmMsg("Do you want to attend this activity?");
    setConfirmPop(true);
  };
  const clickToConfirm = (isConfirm: boolean) => {
    if (isConfirm) {
      confirmAttendActivity();
    }
    setConfirmPop(false);
  };
  const confirmAttendActivity = async () => {
    const userRef = doc(collection(db, "Users"), userId);
    const branchRef = doc(collection(db, "Branches"), id);
    await updateDoc(userRef, {
      activity_attend: arrayUnion(id),
    });
    await updateDoc(branchRef, {
      participants: arrayUnion(userId),
    });
    await getParticipants();
    setButtonPop(true);
    setAlertMsg("Attended successful💃");
  };
  const getParticipants = () => {
    const branchRef = doc(collection(db, "Branches"), id);
    onSnapshot(branchRef, (doc) => {
      if (doc.exists()) {
        const newArr = [] as any;
        for (let i = 0; i < doc.data().participants.length; i++) {
          firebaseapi.searchUserName(doc.data().participants[i]).then((res) => {
            if (res) {
              const tempObj = {
                id: res["user_id"],
                name: res["firstname"],
                photo: res["main_photo"],
              };
              newArr.push(tempObj);
            }
          });
        }
        setParticipantsList(newArr);
      }
    });
  };

  const handleChange = () => {
    getParticipants();
    setOpenParticipants(true);
  };

  const deleteBranch = async (id: string | undefined) => {
    let newHostedList = hostedList.filter(function (e) {
      return e !== id;
    });
    const userRef = doc(db, "Users", getAuthorID);
    await updateDoc(userRef, {
      activity_hosted: newHostedList,
    });
    updateLocationMarkers();
    await firebaseapi.deleteBranch(id);
    setAlertMsg("Successfully delete this branch!");
    setButtonPop(true);
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  const updateLocationMarkers = () => {
    firebaseapi.readBranchLocations().then((res) => {
      const ob_array = res?.markers;
      const my_array = [id];
      const new_array = ob_array.filter(
        (O: { id: string | undefined }) => !my_array.includes(O.id)
      );
      const LocationsRef = collection(db, "Location");
      const docRef = doc(LocationsRef, "branches");
      updateDoc(docRef, { markers: new_array });
    });
  };

  return (
    <>
      <Wrapper>
        <Alert
          trigger={ButtonPop}
          setButtonPop={setButtonPop}
          alertMsg={alertMsg}
        />
        <AlertWtihCTA
          trigger={alertWtihCTAPop}
          setAlertWtihCTAPop={setAlertWtihCTAPop}
          alertMsg={alertMsg}
        />
        <Confirm
          trigger={confirmPop}
          clickToConfirm={clickToConfirm}
          confirmMsg={confirmMsg}
        />
        {isLoading ? (
          <Loading />
        ) : (
          <>
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
                        id="branchAuthor"
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
                          dangerouslySetInnerHTML={{
                            __html: branchData.content,
                          }}
                        ></div>
                      </BranchConent>
                      {!isAuthor && (
                        <>
                          <CardContainer>
                            {isExpired ? (
                              <>
                                <PostContentText>
                                  This branch is already closed.
                                  <br />
                                  Come earlier next time 💃
                                </PostContentText>
                              </>
                            ) : (
                              <>
                                <PostContentText>
                                  Click to attend this activity{" "}
                                  <FontAwesomeIcon icon={faCheck} />
                                </PostContentText>
                                <CheckOutBtn
                                  id="checkoutBtn"
                                  onClick={attendActivity}
                                >
                                  git checkout
                                </CheckOutBtn>
                              </>
                            )}
                          </CardContainer>
                        </>
                      )}
                      {isAuthor && (
                        <>
                          <DeleteWrapper>
                            <DeleteBtn
                              onClick={() => {
                                deleteBranch(id);
                              }}
                            >
                              Delete this branch
                            </DeleteBtn>
                          </DeleteWrapper>
                        </>
                      )}
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
                          <ShowMap center={branchData.location} />
                        </MapContainer>
                      </CardContainer>
                      <ParticipantsContainer>
                        <ParticipantsBtn
                          onClick={handleChange}
                          id="branchParticipants"
                        >
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
          </>
        )}
        <GoBackWrapper>
          <Button onClick={() => navigate("/branches")}>Go back</Button>
        </GoBackWrapper>
      </Wrapper>
    </>
  );
};

export default Branch;
