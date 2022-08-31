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
  // const readData = async () => {
  //   const querySnapshot = await getDocs(collection(db, "Users"));
  //   querySnapshot.forEach((doc) => {
  //     console.table(doc.data());
  //   });
  // };

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

  // 把使用者放進db
  const pushtodb = async () => {
    await setDoc(doc(db, "Users", `${getUser}`), {
      name: "penny",
    });
  };

  // 使用者更新資訊
  type ListData = {
    user_id: number;
    last_name: string;
    first_name: string;
    age: number;
    gender: string;
    email: string;
    githublink: string;
    details: string;
    inerested_gender: string;
    // inerested_gender: [];
    main_photo: string;
    relationship: string;
    wish_relationship: string;
  };

  const [isRadio, setIsRadio] = useState("");
  const handleChange = (e: any) => {
    console.log(e.currentTarget.value);
    setIsRadio(e.currentTarget.value);
  };

  const [recipient, setRecipient] = useState<ListData>({
    user_id: getUser,
    last_name: "",
    first_name: "",
    age: 20,
    gender: "",
    email: "",
    githublink: "",
    details: "",
    inerested_gender: "",
    main_photo: "",
    relationship: "",
    wish_relationship: "",
  });

  // 讀取使用者資料

  return (
    <>
      <Wrapper>
        <button onClick={pushtodb}>Set user</button>
        <Block>
          <div>
            <p>first name</p>
            <input></input>
            <p>last name</p>
            <input></input>
            <p>age</p>
            <input></input>
            <p>gender</p>
            <input type="radio" value="male" name="gender"></input>Male
            <input type="radio" value="female" name="gender"></input>Female
            {/* <input type="radio" value="nb" name="gender"></input>Non-binary
            <input type="radio" value="trans" name="gender"></input>Transgender
            <input type="radio" value="intersex" name="gender"></input>Intersex */}
            <input type="radio" value="not_to_say" name="gender"></input>Prefer
            not to say
            <p>interested gender</p>
            <input
              type="radio"
              value="male"
              name="gender_interested"
              onChange={handleChange}
            ></input>
            Male
            <input
              type="radio"
              value="female"
              name="gender_interested"
              onChange={handleChange}
            ></input>
            Female
            <p>email</p>
            <input></input>
            <p>details</p>
            <textarea></textarea>
          </div>
          <input
            type="file"
            onChange={(e: any) => {
              setImageUpload(e.target.files[0]);
            }}
          ></input>
          <button onClick={uploadImage}>Upload</button>
          {imageURL && <img src={imageURL} alt="profile" />}
        </Block>
      </Wrapper>
    </>
  );
};

export default Profile;
