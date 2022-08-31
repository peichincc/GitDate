import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { getFirestore, getDocs, collection } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const Wrapper = styled.div`
  display: block;
  max-width: 1376px;
  margin: 0 auto;
`;

const Profile = () => {
  const [imageUpload, setImageUpload] = useState(null);
  const [imageURL, setImageURL] = useState("");
  const db = getFirestore();
  const readData = async () => {
    const querySnapshot = await getDocs(collection(db, "Users"));
    querySnapshot.forEach((doc) => {
      console.table(doc.data());
    });
  };

  const storage = getStorage();

  const uploadImage = async () => {
    if (imageUpload == null) return;
    const imageRef = ref(storage, `test.jpg`);
    await uploadBytes(imageRef, imageUpload).then(() => {
      alert("uploaded!");
    });
    const downloadUrl = await getDownloadURL(imageRef);
    setImageURL(downloadUrl);
  };

  return (
    <>
      <Wrapper>
        <input
          type="file"
          onChange={(e: any) => {
            setImageUpload(e.target.files[0]);
          }}
        ></input>
        <button onClick={uploadImage}>Upload</button>
        {imageURL && <img src={imageURL} alt="photo" />}
      </Wrapper>
    </>
  );
};

export default Profile;
