import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import {
  getFirestore,
  doc,
  serverTimestamp,
  collection,
} from "firebase/firestore";

import firebaseapi from "../../utils/firebaseapi";

import TestCreateIssue from "./TestTipTap";
import TiptapEditor from "../../components/editor/Editor";

const Wrapper = styled.div`
  display: block;
  max-width: 1376px;
  margin: 0 auto;
`;

const MainLayout = styled.div`
  margin-top: 100px;
  margin-left: 200px;
`;
const PostWraper = styled.div``;
const AvatarBlock = styled.span``;
const PostBox = styled.div`
  position: relative;
  background: #f6f8fa;
  border-radius: 0.4em;
  width: 100%;
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

interface Data {
  name: string;
  order: number;
}

const CreateIssue = () => {
  const [editorHtmlContent, setEditorHtmlContent] = React.useState("");
  const userData = useSelector((state) => state) as any;
  const db = getFirestore();
  let navigate = useNavigate();
  const [imageUpload, setImageUpload] = useState<any>(null);
  const [fileSrc, setFileSrc] = useState<any>(null);
  // Select Photo and preview
  const hiddenFileInput = useRef<any>(null);
  const handleClick = () => {
    hiddenFileInput.current.click();
  };
  const handleUploadFile = (e: any) => {
    if (!e.target.files[0]) return;
    var reader = new FileReader();
    reader.onload = function () {
      setFileSrc(reader.result);
    };
    reader?.readAsDataURL(e?.target?.files[0]);
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
  const tagRef = useRef<HTMLInputElement>(null);
  const [tags, setTags] = useState<string[]>([]);
  const addTag = () => {
    if (!tagRef.current) return;
    let currentTags = [...tags];
    currentTags.push(tagRef.current.value);
    setTags(currentTags);
  };
  const removeTag = (e: React.MouseEvent<HTMLElement>) => {
    if (!tagRef.current) return;
    let currentTags = [...tags];
    let button = e.target as HTMLDivElement;
    let newTags = currentTags.filter((tag) => tag !== button.parentElement!.id);
    setTags(newTags);
  };

  const [getUser, setGetUser] = useState<any>("");
  useEffect(() => {
    const userId = userData.user.user_id;
    console.log(userId);
    if (userId) setGetUser(userId);
  }, []);

  const recipient = {
    category: category,
    title: title,
    content: editorHtmlContent,
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
        <MainLayout>
          <PostWraper>
            <AvatarBlock></AvatarBlock>
            <PostBox>
              <h1>To create an issue</h1>
            </PostBox>
          </PostWraper>
        </MainLayout>
        <hr></hr>
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
        {/* <textarea onChange={getContent}></textarea> */}
        <TiptapEditor setEditorHtmlContent={setEditorHtmlContent} />
        <br />
        <p>Tags</p>
        {tags &&
          tags.map((tag) => {
            return (
              <div key={tag} id={tag}>
                <div>{tag}</div>
                <button onClick={(e) => removeTag(e)}>x</button>
              </div>
            );
          })}
        <input
          type="text"
          ref={tagRef}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              addTag();
            }
          }}
        ></input>
        <br />
        <br />
        <h2>Upload Main image</h2>
        <button onClick={handleClick}>git add</button>
        <input
          type="file"
          ref={hiddenFileInput}
          onChange={handleUploadFile}
          style={{ display: "none" }}
        ></input>
        <p>Preview photo:</p>
        {fileSrc && <img src={fileSrc} alt="main_image" />}
        <br />
        <button onClick={postIssue}>git commit</button>
      </Wrapper>
    </>
  );
};

export default CreateIssue;
