import React, { useEffect, useState } from "react";
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

import MapHome from "../../components/map";

const Wrapper = styled.div`
  display: block;
  max-width: 1376px;
  margin: 0 auto;
`;
const MapContainer = styled.div`
  width: 400px;
  height: 200px;
`;

const CreateBranch = () => {
  const db = getFirestore();
  let navigate = useNavigate();
  const userData = useSelector((state) => state) as any;
  const [getUser, setGetUser] = useState<any>("");
  const [imageUpload, setImageUpload] = useState<any>(null);
  const [fileSrc, setFileSrc] = useState<any>(null);

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
  const getTime = (e: any) => {
    setDate(e.target.value);
  };
  const [location, setLocation] = useState();
  const [formatAddress, setFormatAddress] = useState("");
  const getLocation = (e: any) => {
    setLocation(e.target.value);
  };

  const recipient = {
    type: type,
    title: title,
    content: content,
    date: date,
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
        New branch here
        <h1>To create a branch</h1>
        <p>Type</p>
        <select onChange={getType}>
          <option value="0">Please Select your brnach type</option>
          <option value="online">Online</option>
          <option value="inperson">In Person</option>
          <option value="mixed">Mixed</option>
        </select>
        <br />
        <p>Title</p>
        <input onChange={getTitle}></input>
        <br />
        <p>Activity Description</p>
        <textarea onChange={getContent}></textarea>
        <br />
        <p>Time</p>
        <input type="datetime-local" onChange={getTime} />
        <br />
        <p>Location</p>
        <MapContainer>
          <MapHome
            setLocation={setLocation}
            setFormatAddress={setFormatAddress}
          />
        </MapContainer>
        <br />
        <h2>Upload image</h2>
        <input type="file" onChange={handleUploadFile}></input>
        <p>Preview photo:</p>
        {fileSrc && <img src={fileSrc} alt="main_image" />}
        <br />
        <button onClick={createBranch}>git branch</button>
      </Wrapper>
    </>
  );
};

export default CreateBranch;
