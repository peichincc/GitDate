import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getFirestore,
  doc,
  serverTimestamp,
  collection,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import firebaseapi from "../../utils/firebaseapi";

import TiptapEditor from "../../components/editor/Editor";
import defaultAvatar from "../../utils/DefaultAvatar.png";
import {
  Button,
  MergeBtn,
  AvatarUser,
  AvatarUserImg,
  FormControl,
  FormGroup,
  FormLabel,
  FormSelect,
  FormSelectOptions,
  UploadPreview,
  UploadPreviewImg,
  UploadCardStyled,
} from "../../utils/StyledComponent";
import MapHome from "../../components/map";

import Alert from "../../components/modal/Alert";

const Wrapper = styled.div`
  display: block;
  max-width: 980px;
  margin: 0 auto;
`;

const CreateTitle = styled.div`
  font-size: 28px;
  @media screen and (max-width: 600px) {
    font-size: 14px;
  }
`;
const MainLayout = styled.div`
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  /* margin: 0 auto; */
  padding: 20px;
`;
const TabWraper = styled.div`
  margin-left: 70px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: -1px;
  @media screen and (max-width: 1093px) {
    margin-left: 30px;
  }
`;
const TabsContainer = styled.div`
  margin-right: 70px;
  @media screen and (max-width: 1093px) {
    margin-right: 30px;
  }
`;
const TabChoseBtn = styled.button`
  border-radius: 6px 6px 0 0;
  border-bottom: 0;
  border: 1px solid transparent;
  padding: 10px 10px;
  font-size: 16px;
  line-height: 23px;
  background: #f6f8fa;
  margin-right: 10px;
  width: 150px;
  cursor: pointer;
  @media screen and (max-width: 600px) {
    width: 75px;
  }
`;
const TabButton = styled.button`
  border-radius: 6px 6px 0 0;
  border-bottom: 0;
  border: 1px solid transparent;
  padding: 10px 10px;
  font-size: 16px;
  line-height: 23px;
  background: #e6e7e9;
  margin-right: 10px;
  width: 150px;
  cursor: pointer;
  @media screen and (max-width: 600px) {
    width: 75px;
  }
  &:hover {
    color: white;
    background-color: #e6e7e9;
  }
`;
const PostWraper = styled.div`
  display: flex;
`;
const AvatarBlock = styled.div`
  width: auto;
  margin-right: 25px;
`;
const PostBox = styled.div`
  padding: 20px;
  position: relative;
  background: #f6f8fa;
  border-radius: 0.4em;
  width: 100%;
  height: auto;
  position: relative;
  &:before {
    content: "";
    position: absolute;
    left: 0;
    top: 30px;
    width: 0;
    height: 0;
    border: 20px solid transparent;
    border-right-color: #f6f8fa;
    border-left: 0;
    margin-top: -20px;
    margin-left: -20px;
  }
`;
const PreviewPhotoContainer = styled.div`
  padding-top: 20px;
  padding-bottom: 20px;
  display: flex;
  flex-direction: column;
`;
const SubmitWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const MapContainer = styled.div`
  width: 400px;
  height: 200px;
  margin-bottom: 30px;
  margin-top: 50px;
`;

const GitAddBtn = styled(Button)`
  width: 100px;
`;

const DateFormControl = styled(FormControl)`
  width: 150px;
`;

const FormCheckInput = styled.input`
  margin-right: 10px;
  width: 15px;
  height: 16px;
`;
const FormCheck = styled.div`
  margin-left: 8px;
  display: flex;
  align-items: center;
`;

interface Data {
  name: string;
  value: string;
}

const CreateBranch = () => {
  const [isSending, setIsSending] = useState(false);
  const [ButtonPop, setButtonPop] = useState(false);
  const [editorHtmlContent, setEditorHtmlContent] = React.useState("");
  const hiddenFileInput = useRef<any>(null);
  const db = getFirestore();
  let navigate = useNavigate();
  const userData = useSelector((state) => state) as any;
  const [getUser, setGetUser] = useState<any>("");
  const [imageUpload, setImageUpload] = useState<any>(null);
  const [fileSrc, setFileSrc] = useState<any>(null);
  const handleClick = () => {
    hiddenFileInput.current.click();
  };

  const TypeList: Data[] = [
    {
      value: "Online",
      name: "Online",
    },
    {
      value: "Inperson",
      name: "Inperson",
    },
    {
      value: "Mixed",
      name: "Mixed",
    },
  ];

  useEffect(() => {
    const userId = userData.user.user_id;
    if (userId) {
      setGetUser(userId);
    }
    console.log(userId);
  }, []);

  const handleUploadFile = (e: any) => {
    if (!e.target.files[0]) return;
    var reader = new FileReader();
    reader.onload = function () {
      setFileSrc(reader.result);
    };
    reader?.readAsDataURL(e?.target?.files[0]);
    setImageUpload(e.target.files[0]);
  };

  const [type, setType] = useState("");
  const getType = (e: any) => {
    setType(e.target.value);
  };
  const [title, setTitle] = useState("");
  const getTitle = (e: any) => {
    setTitle(e.target.value);
  };
  const [content, setContent] = useState("");
  const getContent = (e: any) => {
    setContent(e.target.value);
  };
  const [date, setDate] = useState("");
  const getDate = (e: any) => {
    setDate(e.target.value);
  };
  const [time, setTime] = useState("");
  const getTime = (e: any) => {
    setTime(e.target.value);
  };
  const [location, setLocation] = useState();
  const [formatAddress, setFormatAddress] = useState("");
  const getLocation = (e: any) => {
    setLocation(e.target.value);
  };

  const recipient = {
    type: type,
    title: title,
    content: editorHtmlContent,
    date: date,
    time: time,
    location: location,
    address: formatAddress,
    status: "Upcoming",
    hosted_by: getUser,
    posted_at: serverTimestamp(),
  };

  const [alertMsg, setAlertMsg] = useState("");

  // upload photo w/ doc id, get photo URL, then setDoc
  // then update user db while hosting an activity
  const createBranch = async () => {
    setIsSending(true);
    if (!type) {
      setAlertMsg("Please select the branch type");
      setButtonPop(true);
      return;
    }
    if (!title) {
      setAlertMsg("Please fill the title");
      setButtonPop(true);
      return;
    }
    if (!date) {
      setAlertMsg("Please select the date");
      setButtonPop(true);
      return;
    }
    if (!time) {
      setAlertMsg("Please select the time");
      setButtonPop(true);
      return;
    }
    if (!location) {
      setAlertMsg("Please select the location");
      setButtonPop(true);
      return;
    }
    if (!fileSrc) {
      setAlertMsg("Please select photo");
      setButtonPop(true);
      return;
    }
    if (!editorHtmlContent) {
      setAlertMsg("Please fill in the activity description");
      setButtonPop(true);
      return;
    }
    const newBranchRef = doc(collection(db, "Branches"));
    const userRef = doc(db, "Users", getUser);
    await firebaseapi
      .createBranch(imageUpload, newBranchRef, recipient)
      .then(() => {
        updateDoc(userRef, {
          activity_hosted: arrayUnion(newBranchRef.id),
        });
        // firebaseapi.addBranchLocations(newBranchRef.id, title, location);
        const LocationsRef = collection(db, "Location");
        const docRef = doc(LocationsRef, "c4ttDiHr8UCyB0OMOtwA");
        const locationInfo = {
          id: newBranchRef.id,
          name: title,
          position: location,
        };
        updateDoc(docRef, { markers: arrayUnion(locationInfo) });
        console.log(`${getUser} hosted this activity!`);
        setIsSending(false);
        setAlertMsg("You hosted an activity successfully!");
        setButtonPop(true);
        setTimeout(() => {
          navigate("/branches");
        }, 1000);
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
        <MainLayout>
          <TabWraper>
            <CreateTitle>To Create...</CreateTitle>
            <TabsContainer>
              <TabButton
                onClick={() => {
                  navigate("/createissue");
                }}
              >
                Issue
              </TabButton>
              <TabChoseBtn>Branch</TabChoseBtn>
            </TabsContainer>
          </TabWraper>
          <PostWraper>
            <AvatarBlock>
              <AvatarUser>
                <AvatarUserImg src={defaultAvatar} />
              </AvatarUser>
            </AvatarBlock>
            <PostBox>
              <FormGroup>
                <FormLabel>Category</FormLabel>
                {TypeList.map(({ name, value }, index) => {
                  return (
                    <FormCheck key={index}>
                      <FormCheckInput
                        name="type"
                        type="radio"
                        id={`custom-checkbox-${index}`}
                        value={name}
                        onChange={getType}
                      />
                      {name}
                    </FormCheck>
                  );
                })}
              </FormGroup>
              {/* <FormGroup>
                <FormLabel>Type</FormLabel>
                <FormSelect onChange={getType}>
                  <option value="0">Please Select your brnach type</option>
                  <option value="Online">Online</option>
                  <option value="Inperson">In Person</option>
                  <option value="Mixed">Mixed</option>
                </FormSelect>
              </FormGroup> */}
              <FormGroup>
                <FormLabel>Title</FormLabel>
                <FormControl onChange={getTitle}></FormControl>
              </FormGroup>
              <FormGroup>
                <FormLabel>Time</FormLabel>
                <DateFormControl
                  type="date"
                  onChange={getDate}
                  min={new Date().toISOString().split("T")[0]}
                />
                <DateFormControl type="time" onChange={getTime} />
                {/* <input type="datetime-local" onChange={getTime} /> */}
              </FormGroup>
              <FormGroup>
                <FormLabel>Location</FormLabel>
                <MapContainer id="mapInput">
                  <MapHome
                    setLocation={setLocation}
                    setFormatAddress={setFormatAddress}
                  />
                </MapContainer>
              </FormGroup>
              <FormGroup>
                <FormLabel>Activity Description</FormLabel>
                <TiptapEditor setEditorHtmlContent={setEditorHtmlContent} />
                {/* <textarea onChange={getContent}></textarea> */}
              </FormGroup>
              <FormGroup>
                <FormLabel>Image</FormLabel>
                <PreviewPhotoContainer>
                  <input
                    type="file"
                    ref={hiddenFileInput}
                    onChange={handleUploadFile}
                    style={{ display: "none" }}
                  ></input>
                  {fileSrc && (
                    <>
                      <p>Preview photo:</p>
                      <UploadCardStyled>
                        <UploadPreview>
                          <UploadPreviewImg src={fileSrc} alt="main_image" />
                        </UploadPreview>
                      </UploadCardStyled>
                    </>
                  )}
                  <GitAddBtn onClick={handleClick}>git add</GitAddBtn>
                </PreviewPhotoContainer>
              </FormGroup>
              <SubmitWrapper>
                <p></p>
                <MergeBtn
                  id="branchesBtn"
                  disabled={isSending}
                  onClick={createBranch}
                >
                  git branch
                </MergeBtn>
              </SubmitWrapper>
            </PostBox>
          </PostWraper>
        </MainLayout>
      </Wrapper>
    </>
  );
};

export default CreateBranch;
