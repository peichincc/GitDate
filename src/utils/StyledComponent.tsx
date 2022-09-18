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
    background-color: #ff69b4;
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
`;
export const AvatarUserImg = styled.img`
  max-width: 100%;
  max-height: 100%;
  border-radius: 50%;
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
export const ContentContainer = styled.div`
  padding: 20px;
`;
export const BlogList = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid #d0d7de;
  padding-top: 10px;
  padding-bottom: 10px;
  justify-content: space-between;
  &:hover {
    background-color: #f6f8fa;
  }
`;
export const GithubPostTitle = styled.div`
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
