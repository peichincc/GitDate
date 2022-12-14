import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { db } from "../../utils/firebase";
import {
  doc,
  serverTimestamp,
  collection,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import firebaseapi from "../../utils/firebaseapi";
import TiptapEditor from "../../components/editor/Editor";
import defaultAvatar from "../../assets/images/githubAvatar.png";
import {
  Button,
  MergeBtn,
  AvatarUser,
  AvatarUserImg,
  FormControl,
  FormGroup,
  FormLabel,
  UploadPreview,
  UploadPreviewImg,
  UploadCardStyled,
} from "../../utils/styledComponent";
import MapHome from "../../components/map";
import Alert from "../../components/modal/Alert";
import { FormRecipient } from "../../utils/interface";
import { RootState } from "../..";

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
  padding: 20px;
`;
const TabWrapper = styled.div`
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
const PostWrapper = styled.div`
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

interface LocationType {
  lat: number;
  lng: number;
}

const CreateBranch = () => {
  let navigate = useNavigate();
  const [isSending, setIsSending] = useState(false);
  const [ButtonPop, setButtonPop] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const [editorHtmlContent, setEditorHtmlContent] = useState("");
  const hiddenFileInput = useRef<HTMLInputElement | null>(null);
  const userData = useSelector((state: RootState) => state);
  const [getUser, setGetUser] = useState("");
  const [imageUpload, setImageUpload] = useState<File>();
  const [fileSrc, setFileSrc] = useState<string>();

  const handleClick = () => {
    hiddenFileInput.current?.click();
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
  }, []);

  const handleUploadFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const reader = new FileReader();
    reader.onload = function () {
      if (!reader.result) return;
      if (typeof reader.result === "string") {
        setFileSrc(reader.result);
      }
    };
    reader?.readAsDataURL(e?.target?.files[0]);
    setImageUpload(e.target.files[0]);
  };

  const [type, setType] = useState("");
  const getType = (e: React.ChangeEvent<HTMLInputElement>) => {
    setType(e.target.value);
  };
  const [title, setTitle] = useState("");
  const getTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const [date, setDate] = useState("");
  const getDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value);
  };
  const [time, setTime] = useState("");
  const getTime = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTime(e.target.value);
  };
  const [location, setLocation] = useState<LocationType>();
  const [formatAddress, setFormatAddress] = useState("");

  const recipient: FormRecipient = {
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

  const createBranch = () => {
    setIsSending(true);
    if (!type) {
      setAlertMsg("Please select the branch type");
      setButtonPop(true);
      setIsSending(false);
      return;
    }
    if (!title) {
      setAlertMsg("Please fill the title");
      setButtonPop(true);
      setIsSending(false);
      return;
    }
    if (!date) {
      setIsSending(false);
      setAlertMsg("Please select the date");
      setButtonPop(true);
      return;
    }
    if (!time) {
      setIsSending(false);
      setAlertMsg("Please select the time");
      setButtonPop(true);
      return;
    }
    if (!location) {
      setIsSending(false);
      setAlertMsg("Please select the location");
      setButtonPop(true);
      return;
    }
    if (!fileSrc) {
      setIsSending(false);
      setAlertMsg("Please select photo");
      setButtonPop(true);
      return;
    }
    if (!editorHtmlContent) {
      setIsSending(false);
      setAlertMsg("Please fill in the activity description");
      setButtonPop(true);
      return;
    }
    const newBranchRef = doc(collection(db, "Branches"));
    const userRef = doc(db, "Users", getUser);
    firebaseapi.createBranch(imageUpload, newBranchRef, recipient).then(() => {
      updateDoc(userRef, {
        activity_hosted: arrayUnion(newBranchRef.id),
      });
      const LocationsRef = collection(db, "Location");
      const docRef = doc(LocationsRef, "branches");
      const locationInfo = {
        id: newBranchRef.id,
        name: title,
        position: location,
      };
      updateDoc(docRef, { markers: arrayUnion(locationInfo) });
      setIsSending(false);
      setAlertMsg(
        "You hosted an activity successfully! Redirect to Branches after 3 seconds."
      );
      setButtonPop(true);
      setTimeout(() => {
        navigate("/branches");
      }, 3000);
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
          <TabWrapper>
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
          </TabWrapper>
          <PostWrapper>
            <AvatarBlock>
              <AvatarUser>
                <AvatarUserImg src={defaultAvatar} />
              </AvatarUser>
            </AvatarBlock>
            <PostBox>
              <FormGroup id="branchType">
                <FormLabel>Category</FormLabel>
                {TypeList.map(({ name }, index) => {
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
              <FormGroup id="branchContent">
                <FormLabel>Activity Description</FormLabel>
                <TiptapEditor setEditorHtmlContent={setEditorHtmlContent} />
              </FormGroup>
              <FormGroup id="branchImage">
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
          </PostWrapper>
        </MainLayout>
      </Wrapper>
    </>
  );
};

export default CreateBranch;
