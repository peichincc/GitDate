import styled from "styled-components";
import { useCallback, useState } from "react";
import BoldIcon from "./icons/bold.png";
import BoldWhiteIcon from "./icons/bold.png";
import ItalicIcon from "./icons/italic.png";
import ItalicWhiteIcon from "./icons/italic.png";
import UnderlineIcon from "./icons/underline.png";
import UnderlineWhiteIcon from "./icons/underline.png";
import RedoIcon from "./icons/redo.png";
import UndoIcon from "./icons/undo.png";
import React from "react";

const Container = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  border-radius: 4px;
  background-color: #fff;
  padding: 5px;
  margin-bottom: 10px;
`;
const StyledButton = styled.button`
  height: 24px;
  width: 24px;
  padding: 0;
  border: none;
  margin-right: 4px;
  background-color: #fff;
  &.is-active {
    background-color: #cacbd5;
    border-radius: 4px;
  }
`;
const FormatButtonsGroup = styled.div`
  :first-child {
    margin-left: 15px;
  }
`;
const Divider = styled.div`
  border-left: 1px solid #cacbd5;
  height: 24px;
  margin: 0 10px;
`;
const UndoRetoButtonsGroup = styled.div``;

const MenuBar = ({ editor }: any) => {
  if (!editor) {
    return null;
  }

  return (
    <>
      <Container>
        <FormatButtonsGroup>
          <StyledButton
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={editor.isActive("bold") ? "is-active" : ""}
          >
            <img
              src={editor.isActive("bold") ? BoldWhiteIcon : BoldIcon}
              alt="a"
            />
          </StyledButton>
          <StyledButton
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={editor.isActive("italic") ? "is-active" : ""}
          >
            <img
              src={editor.isActive("italic") ? ItalicWhiteIcon : ItalicIcon}
              alt="a"
            />
          </StyledButton>
          <StyledButton
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={editor.isActive("underline") ? "is-active" : ""}
          >
            <img
              src={
                editor.isActive("underline")
                  ? UnderlineWhiteIcon
                  : UnderlineIcon
              }
              alt="a"
            />
          </StyledButton>
        </FormatButtonsGroup>
        <Divider />
        <UndoRetoButtonsGroup>
          <StyledButton onClick={() => editor.commands.undo()}>
            <img src={UndoIcon} alt="a" />
          </StyledButton>
          <StyledButton onClick={() => editor.commands.redo()}>
            <img src={RedoIcon} alt="a" />
          </StyledButton>
        </UndoRetoButtonsGroup>
      </Container>
    </>
  );
};

export default MenuBar;
