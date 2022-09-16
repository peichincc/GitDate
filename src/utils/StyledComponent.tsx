import React from "react";
import styled from "styled-components";

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
    background-color: #f8ad9d;
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
