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
  TagButton,
} from "../../utils/StyledComponent";

import Alert from "../../components/modal/Alert";

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
  /* margin: 0 auto; */
  padding: 20px;
`;
const TabWraper = styled.div`
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

const TagInputWrapper = styled.div``;
const TagsWrapper = styled.div`
  display: flex;
  margin-bottom: 10px;
`;
const Tag = styled.div`
  border-radius: 6px;
  border: 1px solid rgba(27, 31, 36, 0.15);
  padding: 5px 16px;
`;
const Tags = styled.div`
  margin-right: 4px;
  display: flex;
`;
const TagBtn = styled.button`
  border: 0;
  background: none;
  cursor: pointer;
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

const TagFormControl = styled(FormControl)`
  width: 100px;
  margin-right: 5px;
`;

const GitAddBtn = styled(Button)`
  width: 100px;
`;

const FormCheckInput = styled.input`
  /* margin-left: 5px; */
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

const CreateIssue = () => {
  const [ButtonPop, setButtonPop] = useState(false);
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

  const CategoryList: Data[] = [
    {
      value: "Date",
      name: "Date",
    },
    {
      value: "Hang Out",
      name: "Hang Out",
    },
    {
      value: "Networking",
      name: "Networking",
    },
  ];

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
    tagRef.current.value = "";
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
    status: "Open",
    posted_by: getUser,
    posted_at: serverTimestamp(),
  };

  const [alertMsg, setAlertMsg] = useState("");

  // upload photo w/ doc id, get photo URL, then setDoc
  const postIssue = async () => {
    if (!category) {
      setAlertMsg("Please select the issue category");
      setButtonPop(true);
      return;
    }
    if (!title) {
      setAlertMsg("Please fill the title");
      setButtonPop(true);
      return;
    }
    if (!fileSrc) {
      setAlertMsg("Please select photo");
      setButtonPop(true);
      return;
    }
    const newIssueRef = doc(collection(db, "Issues"));
    await firebaseapi
      .postIssue(imageUpload, newIssueRef, recipient)
      .then(() => {
        setAlertMsg("Commited successfully!");
        setButtonPop(true);
        setTimeout(() => {
          navigate("/issues");
        }, 1000);
        // navigate("/");
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
          <TabWraper>
            <CreateTitle>To Create...</CreateTitle>
            <TabsContainer>
              <TabChoseBtn>Issue</TabChoseBtn>
              <TabButton
                onClick={() => {
                  navigate("/createbranch");
                }}
              >
                Branch
              </TabButton>
            </TabsContainer>
          </TabWraper>
          <PostWraper>
            <AvatarBlock>
              <AvatarUser>
                <AvatarUserImg src={defaultAvatar} />
              </AvatarUser>
            </AvatarBlock>
            <PostBox>
              <FormGroup>
                <FormLabel>Category</FormLabel>
                {CategoryList.map(({ name, value }, index) => {
                  return (
                    <FormCheck key={index}>
                      <FormCheckInput
                        name="category"
                        type="radio"
                        id={`custom-checkbox-${index}`}
                        value={name}
                        onChange={getCategory}
                        required
                      />
                      {name}
                    </FormCheck>
                  );
                })}
              </FormGroup>
              {/* <FormGroup>
                  <FormLabel>Category</FormLabel>
                  <FormSelect onChange={getCategory}>
                    <FormSelectOptions value="0">
                      Please Select your issue type
                    </FormSelectOptions>
                    <FormSelectOptions value="Date">Date</FormSelectOptions>
                    <FormSelectOptions value="Hang Out">
                      Hang out
                    </FormSelectOptions>
                    <FormSelectOptions value="Networking">
                      Networking
                    </FormSelectOptions>
                  </FormSelect>
                </FormGroup> */}
              <FormGroup>
                <FormLabel>Title</FormLabel>
                <FormControl onChange={getTitle}></FormControl>
              </FormGroup>
              <FormGroup>
                <FormLabel>Content</FormLabel>
                {/* <textarea onChange={getContent}></textarea> */}
                <TiptapEditor setEditorHtmlContent={setEditorHtmlContent} />
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
                  <GitAddBtn onClick={handleClick}>git add</GitAddBtn>
                </PreviewPhotoContainer>
              </FormGroup>
              <FormGroup>
                <FormLabel>Tags</FormLabel>
                <TagInputWrapper>
                  <TagsWrapper>
                    {tags &&
                      tags.map((tag) => {
                        return (
                          <Tags key={tag} id={tag}>
                            <TagButton> {tag}</TagButton>
                            <TagBtn onClick={(e) => removeTag(e)}>x</TagBtn>
                          </Tags>
                        );
                      })}
                  </TagsWrapper>
                  <TagFormControl
                    type="text"
                    ref={tagRef}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        addTag();
                      }
                    }}
                  ></TagFormControl>
                  <TagBtn onClick={addTag}>+</TagBtn>
                </TagInputWrapper>
              </FormGroup>
              <SubmitWrapper>
                <p></p>
                <MergeBtn onClick={postIssue} id="issuesBtn">
                  Commit new issue
                </MergeBtn>
              </SubmitWrapper>
            </PostBox>
          </PostWraper>
        </MainLayout>
      </Wrapper>
    </>
  );
};

export default CreateIssue;
