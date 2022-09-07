import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import {
  getFirestore,
  doc,
  serverTimestamp,
  collection,
} from "firebase/firestore";

import firebaseapi from "../../utils/firebaseapi";

const Wrapper = styled.div`
  display: block;
  max-width: 1376px;
  margin: 0 auto;
`;

interface Data {
  name: string;
  order: number;
}

const CreateIssue = () => {
  const db = getFirestore();
  let navigate = useNavigate();
  const [imageUpload, setImageUpload] = useState<any>(null);
  const [fileSrc, setFileSrc] = useState<any>(null);
  const MyCheckBoxList: Data[] = [
    {
      order: 0,
      name: "Angular",
    },
    {
      order: 1,
      name: "React",
    },
    {
      order: 2,
      name: "Java",
    },
    {
      order: 4,
      name: "Python",
    },
    {
      order: 3,
      name: "JavaScript",
    },
  ];
  const handleUploadFile = (e: any) => {
    if (!e.target.files[0]) return;
    var reader = new FileReader();
    reader.onload = function () {
      setFileSrc(reader.result);
    };
    reader?.readAsDataURL(e?.target?.files[0]);
    // e.target.value = "";
    // setRecipientImage({ ...recipientImage, main_image: e.target.files });
    setImageUpload(e.target.files[0]);
  };

  const [category, setCategory] = useState("");
  const getCategory = (e: any) => {
    setCategory(e.target.value);
  };
  const [title, setTitle] = useState("");
  const getTitle = (e: any) => {
    setTitle(e.target.value);
  };
  const [content, setContent] = useState("");
  const getContent = (e: any) => {
    setContent(e.target.value);
  };
  const [tags, setTags] = useState<any>([]);
  const getTags = (e: any) => {
    // setTags([...tags, e.target.value]);
    if (e.target.checked) {
      setTags([...tags, e.target.value]);
    } else {
      setTags(
        tags.filter(function (val: any) {
          return val !== e.target.value;
        })
      );
    }
  };

  const [getUser, setGetUser] = useState<any>("");
  useEffect(() => {
    const userId = window.localStorage.getItem("userId");
    console.log(userId);
    if (userId) setGetUser(userId);
  }, []);

  const recipient = {
    category: category,
    title: title,
    content: content,
    tags: tags,
    status: "open",
    posted_by: getUser,
    posted_at: serverTimestamp(),
  };

  // upload photo w/ doc id, get photo URL, then setDoc
  const postIssue = async () => {
    const newIssueRef = doc(collection(db, "Issues"));
    await firebaseapi
      .postIssue(imageUpload, newIssueRef, recipient)
      .then(() => {
        navigate("/");
      });
  };

  return (
    <>
      <Wrapper>
        <h1>To create an issue</h1>
        <p>Category</p>
        <select onChange={getCategory}>
          <option value="0">Please Select your issue type</option>
          <option value="date">Date</option>
          <option value="hangout">Hang out</option>
          <option value="networking">Networking</option>
        </select>
        <br />
        <p>Title</p>
        <input onChange={getTitle}></input>
        <br />
        <p>Content</p>
        <textarea onChange={getContent}></textarea>
        <br />
        <p>Tags</p>
        <ul>
          {MyCheckBoxList.map(({ name, order }, index) => {
            return (
              <li key={index}>
                <input
                  type="checkbox"
                  id={`custom-checkbox-${index}`}
                  value={name}
                  onChange={getTags}
                />
                {name}
              </li>
            );
          })}
        </ul>
        <br />
        <h2>Upload Main image</h2>
        <input type="file" onChange={handleUploadFile}></input>
        <p>Preview photo:</p>
        {fileSrc && <img src={fileSrc} alt="main_image" />}
        <h2>More images: pending</h2>
        <button onClick={postIssue}>Post</button>
      </Wrapper>
    </>
  );
};

export default CreateIssue;
