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
const FormGroup = styled.div``;
const FormLabel = styled.div``;
const FormCheck = styled.div``;
const FormCheckInput = styled.input``;
const FormCheckLabel = styled.label``;
const FormText = styled.textarea`
  resize: none;
`;
const FormControl = styled.input``;

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
      user_id: `${getUser}`,
    });
  };

  // 使用者更新資訊
  type ListData = {
    lastname: string;
    firstname: string;
    age: number | undefined;
    gender: string;
    email: string;
    githublink: string;
    details: string;
    gender_interested: string;
    // inerested_gender: [];
    main_photo: string;
    relationship: string;
    wish_relationship: string;
  };

  const uploadFormGroups = [
    { label: "First Name", key: "firstname" },
    { label: "Last Name", key: "lastname" },
    { label: "Age", key: "age" },
    {
      label: "Gender",
      key: "gender",
      options: [
        { label: "Male", value: "male" },
        { label: "Female", value: "female" },
        { label: "Prefer not to say", value: "not_to_say" },
      ],
    },
    {
      label: "Interested Gender",
      key: "gender_interested",
      options: [
        { label: "Male", value: "interested_male" },
        { label: "Female", value: "interested_female" },
        { label: "Prefer not to say", value: "interested_not_to_say" },
      ],
    },
    { label: "Email", key: "email" },
    {
      label: "Wish relationship",
      key: "wish_relationship",
      options: [
        { label: "Date", value: "date" },
        { label: "BFF", value: "bff" },
      ],
    },
    { label: "Details", key: "details", textarea: true },
  ];
  const [recipient, setRecipient] = useState<ListData>({
    lastname: "",
    firstname: "",
    age: undefined,
    gender: "",
    email: "",
    githublink: "",
    details: "",
    gender_interested: "",
    main_photo: "",
    relationship: "",
    wish_relationship: "",
  });
  const uploadFormInputCheck = (
    label: string,
    key: string,
    textarea: boolean | undefined,
    options: any
  ) => {
    if (options) {
      return (options as unknown as any[]).map((option) => (
        <FormCheck key={option.value}>
          <FormCheckInput
            type="radio"
            checked={recipient[key as keyof typeof recipient] === option.value}
            onChange={(e) => {
              if (e.target.checked)
                setRecipient({ ...recipient, [key]: option.value });
            }}
          />
          <FormCheckLabel>{option.label}</FormCheckLabel>
        </FormCheck>
      ));
    } else if (textarea) {
      return (
        <FormText
          value={recipient[key as keyof typeof recipient]}
          onChange={(e) =>
            setRecipient({ ...recipient, [key]: e.target.value })
          }
        />
      );
    } else {
      return (
        <FormControl
          value={recipient[key as keyof typeof recipient]}
          onChange={(e) =>
            setRecipient({ ...recipient, [key]: e.target.value })
          }
        />
      );
    }
  };

  // 讀取使用者資料

  return (
    <>
      <Wrapper>
        <button onClick={pushtodb}>Set user</button>
        <Block>
          <div>
            {uploadFormGroups.map(({ label, key, textarea, options }) => (
              <FormGroup key={key}>
                <FormLabel>{label}</FormLabel>
                {uploadFormInputCheck(label, key, textarea, options)}
              </FormGroup>
            ))}
          </div>
          <input
            type="file"
            onChange={(e: any) => {
              setImageUpload(e.target.files[0]);
            }}
          ></input>
          <button onClick={uploadImage}>Upload image</button>
          {imageURL && <img src={imageURL} alt="profile" />}
          <div>
            <button>Update Profile</button>
          </div>
        </Block>
      </Wrapper>
    </>
  );
};

export default Profile;
