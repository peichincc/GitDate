import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import { getFirestore, doc, updateDoc, collection } from "firebase/firestore";
import { auth } from "../../utils/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const Wrapper = styled.div`
  display: block;
  max-width: 1376px;
  margin: 0 auto;
  margin-bottom: 100px;
`;
const Container = styled.div`
  margin-top: 50px;
  display: flex;
`;
const LeftContainer = styled.div`
  flex-grow: 1;
`;
const RightContainer = styled.div`
  flex-grow: 1;
  border: 1px solid #202637;
  border-radius: 6px;
  padding: 20px;
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

const Profile = () => {
  let navigate = useNavigate();
  const [getUser, setGetUser] = useState("");
  const [imageUpload, setImageUpload] = useState(null);
  const [imageURL, setImageURL] = useState("");
  const db = getFirestore();
  const storage = getStorage();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        var uid = user.uid;
        setGetUser(uid);
      }
    });
  }, []);

  // 使用者更新資訊
  type ListData = {
    lastname: string;
    firstname: string;
    age: number | undefined;
    gender: string;
    githublink: string;
    details: string;
    gender_interested: string;
    // inerested_gender: [];
    main_photo: string;
    wish_relationship: string;
    friend_list: [];
    friend_request: [];
    friend_sent_request: [];
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
    { label: "Githublink", key: "githublink" },
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
    githublink: "",
    details: "",
    gender_interested: "",
    main_photo: "",
    wish_relationship: "",
    friend_list: [],
    friend_request: [],
    friend_sent_request: [],
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
  // 上傳照片
  const uploadImage = async () => {
    if (imageUpload == null) return;
    const imageRef = ref(storage, `users/${getUser}.jpg`);
    await uploadBytes(imageRef, imageUpload).then(() => {
      alert("uploaded!");
    });
    const downloadUrl = await getDownloadURL(imageRef);
    setImageURL(downloadUrl);
  };
  // 更新資料庫
  const updateDB = async () => {
    const userRef = doc(collection(db, "Users"), `${getUser}`);
    await updateDoc(userRef, { ...recipient, main_photo: imageURL });
    alert("updated!");
  };

  return (
    <>
      <Wrapper>
        <Container>
          <LeftContainer>
            <h1>
              Welcome to GitDate
              <br />
              We are glad that you are here
            </h1>
          </LeftContainer>
          <RightContainer>
            <h1>Edit profile</h1>
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
              <button onClick={updateDB}>Update Profile</button>
            </div>
          </RightContainer>
        </Container>
      </Wrapper>
    </>
  );
};

export default Profile;
