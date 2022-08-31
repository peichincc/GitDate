import React, { useEffect, useState } from "react";
import styled from "styled-components";

import {
  getFirestore,
  doc,
  setDoc,
  getDocs,
  collection,
} from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const Wrapper = styled.div`
  display: block;
  max-width: 1376px;
  margin: 0 auto;
`;

const Block = styled.div`
  margin-top: 50px;
`;

const Profile = () => {
  const [getUser, setGetUser] = useState<any>("");
  const [imageUpload, setImageUpload] = useState(null);
  const [imageURL, setImageURL] = useState("");
  const db = getFirestore();
  const readData = async () => {
    const querySnapshot = await getDocs(collection(db, "Users"));
    querySnapshot.forEach((doc) => {
      console.table(doc.data());
    });
  };

  useEffect(() => {
    const userId = window.localStorage.getItem("userId");
    console.log(userId);
    if (userId) setGetUser(userId);
  }, []);

  const storage = getStorage();
  const uploadImage = async () => {
    if (imageUpload == null) return;
    const imageRef = ref(storage, `${getUser}.jpg`);
    await uploadBytes(imageRef, imageUpload).then(() => {
      alert("uploaded!");
    });
    const downloadUrl = await getDownloadURL(imageRef);
    setImageURL(downloadUrl);
  };

  // 使用者寫入資料
  const pushtodb = async () => {
    await setDoc(doc(db, "Users", `${getUser}`), {
      name: "penny",
    });
  };
  // 使用者更新資訊

  // 讀取使用者資料

  return (
    <>
      <Wrapper>
        <button onClick={pushtodb}>Set user</button>
        <Block>
          <input
            type="file"
            onChange={(e: any) => {
              setImageUpload(e.target.files[0]);
            }}
          ></input>
          <button onClick={uploadImage}>Upload</button>
          {imageURL && <img src={imageURL} alt="photo" />}
        </Block>
      </Wrapper>
    </>
  );
};

export default Profile;
