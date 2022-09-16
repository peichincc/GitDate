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

const Wrapper = styled.div`
  display: block;
  max-width: 1376px;
  margin: 0 auto;
`;
const MainLayout = styled.div`
  margin-top: 100px;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  padding: 20px;
`;
const TabWraper = styled.div`
  width: 80%;
  display: flex;
  justify-content: flex-end;
  margin-bottom: -1px;
`;
const TabButton = styled.button`
  border-radius: 6px 6px 0 0;
  border-bottom: 0;
  border: 1px solid transparent;
  padding: 16px 16px;
  font-size: 26px;
  line-height: 23px;
  background: #f6f8fa;
  margin-right: 10px;
  width: 150px;
  cursor: pointer;
  &:hover {
    background-color: #f8ad9d;
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
  width: 80%;
  height: auto;
  /* border: 1px solid #d0d7de; */
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
    /* border: 1px solid black;
    position: absolute;
    top: 11px;
    right: 100%;
    left: -8px;
    display: block;
    width: 8px;
    height: 16px;
    pointer-events: none;
    content: " ";
    clip-path: polygon(0 50%, 100% 0, 100% 100%); */
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
`;

const CreateBranch = () => {
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
    status: "upcoming",
    hosted_by: getUser,
    posted_at: serverTimestamp(),
  };

  // upload photo w/ doc id, get photo URL, then setDoc
  // then update user db while hosting an activity
  const createBranch = async () => {
    const newBranchRef = doc(collection(db, "Branches"));
    const userRef = doc(db, "Users", getUser);
    await firebaseapi
      .createBranch(imageUpload, newBranchRef, recipient)
      .then(() => {
        navigate("/");
        updateDoc(userRef, {
          activity_hosted: arrayUnion(newBranchRef.id),
        });
        console.log(`${getUser} hosted this activity!`);
      });
  };

  return (
    <>
      <Wrapper>
        <MainLayout>
          <h1>To Create...</h1>
          <TabWraper>
            <TabButton>Issue</TabButton>
            <TabButton>Branch</TabButton>
          </TabWraper>
          <PostWraper>
            <AvatarBlock>
              <AvatarUser>
                <AvatarUserImg src={defaultAvatar} />
              </AvatarUser>
            </AvatarBlock>
            <PostBox>
              <FormGroup>
                <FormLabel>Type</FormLabel>
                <FormSelect onChange={getType}>
                  <option value="0">Please Select your brnach type</option>
                  <option value="online">Online</option>
                  <option value="inperson">In Person</option>
                  <option value="mixed">Mixed</option>
                </FormSelect>
              </FormGroup>
              <FormGroup>
                <FormLabel>Title</FormLabel>
                <FormControl onChange={getTitle}></FormControl>
              </FormGroup>
              <FormGroup>
                <FormLabel>Time</FormLabel>
                <FormControl type="date" onChange={getDate} />
                <FormControl type="time" onChange={getTime} />
                {/* <input type="datetime-local" onChange={getTime} /> */}
              </FormGroup>
              <FormGroup>
                <FormLabel>Location</FormLabel>
                <MapContainer>
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
                  <Button onClick={handleClick}>git add</Button>
                </PreviewPhotoContainer>
              </FormGroup>
              <SubmitWrapper>
                <p></p>
                <MergeBtn onClick={createBranch}>git branch</MergeBtn>
              </SubmitWrapper>
            </PostBox>
          </PostWraper>
        </MainLayout>
      </Wrapper>
    </>
  );
};

export default CreateBranch;
