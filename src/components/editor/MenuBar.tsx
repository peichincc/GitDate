import styled from "styled-components";
import { useCallback, useState } from "react";
import React from "react";
import { Button } from "../../utils/StyledComponent";

const Container = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  border-radius: 4px;
  padding: 5px;
  margin-bottom: 10px;
  border-radius: 6px;
`;
const ButtonGroup = styled.div``;
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

const MenuBar = ({ editor }: any) => {
  if (!editor) {
    return null;
  }

  return (
    <>
      <Container>
        <ButtonGroup>
          <Button onClick={() => editor.chain().focus().toggleBold().run()}>
            Bold
          </Button>
          <Button onClick={() => editor.chain().focus().toggleItalic().run()}>
            Italic
          </Button>
          <Button
            onClick={() => editor.chain().focus().toggleUnderline().run()}
          >
            Underline
          </Button>
          <Button onClick={() => editor.chain().focus().toggleStrike().run()}>
            Strike
          </Button>
        </ButtonGroup>
        <Divider />
        <ButtonGroup>
          <Button onClick={() => editor.commands.undo()}>Undo</Button>
          <Button onClick={() => editor.commands.redo()}>Redo</Button>
        </ButtonGroup>
      </Container>
    </>
  );
};

export default MenuBar;
