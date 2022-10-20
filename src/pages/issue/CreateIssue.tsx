import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { db } from "../../utils/firebase";
import { doc, serverTimestamp, collection } from "firebase/firestore";
import firebaseapi from "../../utils/firebaseapi";
import TiptapEditor from "../../components/editor/Editor";
import defaultAvatar from "../../assets/images/githubAvatar.png";
import {
  Button,
  MergeBtn,
  AvatarUser,
  AvatarUserImg,
  FormControl,
  FormGroup,
  FormLabel,
  UploadPreview,
  UploadPreviewImg,
  UploadCardStyled,
  TagButton,
} from "../../utils/styledComponent";
import Alert from "../../components/modal/Alert";
import { FormRecipient } from "../../utils/interface";
import { RootState } from "../..";

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
  padding: 20px;
`;
const TabWrapper = styled.div`
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
const PostWrapper = styled.div`
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
  }
`;
const TagInputWrapper = styled.div``;
const TagsWrapper = styled.div`
  display: flex;
  margin-bottom: 10px;
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
  let navigate = useNavigate();
  const userData = useSelector((state: RootState) => state);
  const [isSending, setIsSending] = useState(false);
  const [ButtonPop, setButtonPop] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const [editorHtmlContent, setEditorHtmlContent] = useState("");
  const [imageUpload, setImageUpload] = useState<any>(null);
  const [fileSrc, setFileSrc] = useState<any>(null);

  const hiddenFileInput = useRef<HTMLInputElement | null>(null);
  const handleClick = () => {
    hiddenFileInput.current?.click();
  };
  const handleUploadFile = (e: any) => {
    if (!e.target.files[0]) return;
    const reader = new FileReader();
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
  const getCategory = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setCategory(e.target.value);
  };
  const [title, setTitle] = useState("");
  const getTitle = (e: { target: { value: React.SetStateAction<string> } }) => {
    setTitle(e.target.value);
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

  const [getUser, setGetUser] = useState("");
  useEffect(() => {
    const userId = userData.user.user_id;
    if (userId) setGetUser(userId);
  }, []);

  const recipient: FormRecipient = {
    category: category,
    title: title,
    content: editorHtmlContent,
    tags: tags,
    status: "Open",
    posted_by: getUser,
    posted_at: serverTimestamp(),
  };

  const postIssue = async () => {
    setIsSending(true);
    if (!category) {
      setAlertMsg("Please select the issue category");
      setButtonPop(true);
      setIsSending(false);
      return;
    }
    if (!title) {
      setAlertMsg("Please fill the title");
      setButtonPop(true);
      setIsSending(false);
      return;
    }
    if (!fileSrc) {
      setAlertMsg("Please select photo");
      setButtonPop(true);
      setIsSending(false);
      return;
    }
    if (!editorHtmlContent) {
      setAlertMsg("Please fill in the content");
      setButtonPop(true);
      setIsSending(false);
      return;
    }
    const newIssueRef = doc(collection(db, "Issues"));
    await firebaseapi
      .postIssue(imageUpload, newIssueRef, recipient)
      .then(() => {
        setIsSending(false);
        setAlertMsg("Committed successfully!");
        setButtonPop(true);
        setTimeout(() => {
          navigate("/issues");
        }, 1000);
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
          <TabWrapper>
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
          </TabWrapper>
          <PostWrapper>
            <AvatarBlock>
              <AvatarUser>
                <AvatarUserImg src={defaultAvatar} />
              </AvatarUser>
            </AvatarBlock>
            <PostBox>
              <FormGroup id="issueCategory">
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
              <FormGroup>
                <FormLabel>Title</FormLabel>
                <FormControl onChange={getTitle}></FormControl>
              </FormGroup>
              <FormGroup id="issueContent">
                <FormLabel>Content</FormLabel>
                {/* <textarea onChange={getContent}></textarea> */}
                <TiptapEditor setEditorHtmlContent={setEditorHtmlContent} />
              </FormGroup>
              <FormGroup id="issueImage">
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
              <FormGroup id="issueTags">
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
                <MergeBtn
                  disabled={isSending}
                  onClick={postIssue}
                  id="issuesBtn"
                >
                  git push
                </MergeBtn>
              </SubmitWrapper>
            </PostBox>
          </PostWrapper>
        </MainLayout>
      </Wrapper>
    </>
  );
};

export default CreateIssue;
