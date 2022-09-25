import React from "react";
import styled from "styled-components";

export const ActionButton = styled.button`
  font-size: 16px;
  margin-top: 20px;
  width: 200px;
  border: 1px solid #627597;
  border-radius: 6px;
  background: none;
  padding: 5px 12px;
  cursor: pointer;
  &:hover {
    background-color: #edede9;
  }
`;

export const Button = styled.button`
  margin-right: 4px;
  border-radius: 6px;
  border: 1px solid rgba(27, 31, 36, 0.15);
  font-family: inherit;
  font-weight: 600;
  line-height: 20px;
  white-space: nowrap;
  vertical-align: middle;
  cursor: pointer;
  text-align: center;
  padding: 5px 16px;
  font-size: 14px;
  color: rgb(36, 41, 47);
  background-color: rgb(246, 248, 250);
  box-shadow: rgb(27 31 36 / 4%) 0px 1px 0px,
    rgb(255 255 255 / 25%) 0px 1px 0px inset;
  &:hover {
    color: white;
    background-color: #e6e7e9;
  }
`;
export const MergeBtn = styled.button`
  margin-right: 5px;
  padding: 5px 16px;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  cursor: pointer;
  border: 1px solid rgba(27, 31, 36, 0.15);
  background-color: #2da44e;
  color: white;
  border-radius: 6px;
  width: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  :hover {
    background-color: #216e39;
  }
`;
export const CloseBtn = styled.button`
  padding: 5px 16px;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  cursor: pointer;
  border: 1px solid rgba(27, 31, 36, 0.15);
  background-color: #d62828;
  color: white;
  border-radius: 6px;
  width: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  :hover {
    background-color: #e63946;
  }
`;

export const PhotoContainer = styled.div`
  padding: 10px;
  width: 100%;
  max-width: 200px;
  height: 200px;
`;
export const PhotoContainerImg = styled.img`
  max-width: 100%;
  max-height: 100%;
  border-radius: 50%;
`;
export const AvatarUser = styled.div`
  width: 40px;
  height: 40px;
  margin-top: 10px;
  object-fit: cover;
  @media screen and (max-width: 600px) {
    display: none;
  }
`;
export const AvatarUserImg = styled.img`
  max-width: 100%;
  max-height: 100%;
  border-radius: 50%;
  @media screen and (max-width: 600px) {
    display: none;
  }
`;

export const FormGroup = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: no-wrap;
  margin-top: 10px;
  margin-bottom: 20px;
  width: 100%;
  /* max-width: 600px; */
`;
export const FormLabel = styled.div`
  width: 130px;
  line-height: 19px;
  font-size: 16px;
  color: #3f3a3a;
  display: block;
`;
export const FormControl = styled.input`
  width: 300px;
  /* width: ${(props) => props.theme.issues}; */
  height: 30px;
  border-radius: 8px;
  border: solid 1px #979797;
`;
// FormControl.defaultProps = { theme: { issues: "100%" } };
export const FormSelect = styled.select`
  width: 300px;
  height: 30px;
  border-radius: 8px;
  border: solid 1px #979797;
`;
export const FormSelectOptions = styled.option`
  border: solid 1px #979797;
`;

// customized select

// Photo Preview
export const UploadCardStyled = styled.label`
  margin-bottom: 5px;
  background-color: #fff;
  padding: 10px;
  width: 100%;
  max-width: 400px;
  height: 250px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.08);
  position: relative;
  cursor: pointer;
`;
export const UploadPreview = styled.div`
  max-width: 100%;
  max-height: 100%;
  text-align: center;
`;
export const UploadPreviewImg = styled.img`
  max-width: 100%;
  max-height: 100%;
`;

export const BoxHeader = styled.div`
  padding: 16px;
  background-color: #f6f8fa;
  border-color: #d0d7de;
  border-style: solid;
  border-width: 1px;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
  margin: -1px -1px 0;
  display: flex;
  align-items: center;
`;
export const Container = styled.div`
  width: 100%;
  margin-top: 20px;
  margin-right: 50px;
  border: 1px solid #d0d7de;
  border-radius: 6px;
  height: auto;
`;
export const ContentContainer = styled.div``;
export const BlogList = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid #d0d7de;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 20px;
  padding-right: 20px;
  justify-content: space-between;
  &:hover {
    background-color: #f6f8fa;
  }
  @media screen and (max-width: 450px) {
    flex-direction: column;
  }
`;
export const GithubPostTitle = styled.div`
  padding: 2px;
  font-size: 16px;
  font-weight: 600;
  color: #24292f;
  line-height: 1.5;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial,
    sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
`;
export const GithubSubTitle = styled.div`
  font-size: 12px;
  color: #24292f;
  line-height: 1.5;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial,
    sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
`;

export const LabelsButton = styled.button`
  padding: 0 10px;
  font-size: 12px;
  font-weight: 500;
  line-height: 22px;
  white-space: nowrap;
  border: 1px solid transparent;
  border-radius: 2em;
  color: white;
  background-color: #7057ff;
  margin-right: 2px;
  cursor: pointer;
`;

export const AvatarBlock = styled.div`
  width: auto;
  margin-right: 25px;
  @media screen and (max-width: 600px) {
    display: none;
  }
`;
export const PostWraper = styled.div`
  display: flex;
`;
export const PostBox = styled.div`
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

export const PostTitle = styled.div`
  font-weight: 400;
  line-height: 1.25;
  font-size: 32px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial,
    sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
`;
export const PostSubTitle = styled.div`
  color: #57606a;
  font-size: 14px;
  line-height: 1.5;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial,
    sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
`;
export const PostContentText = styled.div`
  margin: 20px;
  font-size: 14px;
  color: #24292f;
  line-height: 1.5;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial,
    sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
`;
export const PostImgContainer = styled.div`
  margin: 20px;
  @media screen and (max-width: 770px) {
    max-width: 250px;
    max-height: 200px;
  }
`;
export const PostImgBoxImg = styled.img`
  max-width: 500px;
  max-height: 400px;
  object-fit: cover;
  @media screen and (max-width: 770px) {
    width: 250px;
    height: 200px;
  }
`;
export const LebalsText = styled.div`
  font-size: 12px;
  color: #57606a;
  font-weight: 600;
  padding: 4px 0;
  margin-bottom: 4px;
`;
export const LebalContentText = styled.div`
  font-size: 12px;
  line-height: 1.5;
`;
export const LebalsContainer = styled.div`
  border-bottom: 1px solid #d0d7de;
  padding: 10px;
  @media screen and (max-width: 770px) {
    border-bottom: 0px;
  }
`;
export const AuthorBtn = styled.button`
  font-weight: 600;
  color: #57606a;
  border: none;
  background: none;
  cursor: pointer;
  :hover {
    text-decoration: underline;
  }
`;

export const StatusOpen = styled.div`
  display: flex;
  align-items: center;
  width: 80px;
  color: white;
  background-color: #2da44e;
  border-radius: 2em;
  padding: 5px 12px;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  text-align: center;
`;

export const NavWord = styled.div`
  padding-left: 5px;
`;

export const ClickBtn = styled.button`
  border: 1px solid transparent;
  border-radius: 2em;
  cursor: pointer;
  &:hover {
    color: white;
    background-color: #24292f;
  }
`;

export const TagButton = styled(LabelsButton)`
  cursor: default;
  background-color: #453d38;
  width: fit-content;
  margin: 3px;
`;

// Modal styling
export const ModalHeader = styled.div`
  background-color: #f6f8fa;
  width: auto;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const ModalContentsWrapper = styled.div`
  padding: 20px;
`;
export const ModalSubtitle = styled.div`
  color: #333;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial,
    sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
  font-size: 18px;
  line-height: 30px;
  font-weight: 600;
  width: 175px;
  @media screen and (max-width: 770px) {
    font-size: 14px;
  }
`;
export const ModalContent = styled.div`
  color: #333;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial,
    sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
  font-size: 16px;
  line-height: 30px;
  @media screen and (max-width: 770px) {
    font-size: 12px;
  }
`;
export const ModalWordWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 5px;
`;
export const CloseBtnWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

// Go back
export const GoBackWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

// Author btn
export const EditBtn = styled(Button)`
  font-size: 12px;
  line-height: 20px;
  padding: 3px 12px;
  margin-bottom: 5px;
`;
export const DeleteBtn = styled(EditBtn)`
  color: red;
  &:hover {
    color: white;
    background-color: #953800;
  }
`;
