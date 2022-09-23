import styled from "styled-components";
import { useCallback, useState } from "react";
import React from "react";
import { Button } from "../../utils/StyledComponent";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBold,
  faItalic,
  faList,
  faRotateRight,
  faRotateLeft,
} from "@fortawesome/free-solid-svg-icons";

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
            <FontAwesomeIcon icon={faBold} />
          </Button>
          <Button onClick={() => editor.chain().focus().toggleItalic().run()}>
            <FontAwesomeIcon icon={faItalic} />
          </Button>
          <Button
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={editor.isActive("orderedList") ? "is-active" : ""}
          >
            <FontAwesomeIcon icon={faList} />
          </Button>
          <Button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
            className={
              editor.isActive("heading", { level: 1 }) ? "is-active" : ""
            }
          >
            h1
          </Button>
          <Button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            className={
              editor.isActive("heading", { level: 2 }) ? "is-active" : ""
            }
          >
            h2
          </Button>
          <Button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 3 }).run()
            }
            className={
              editor.isActive("heading", { level: 3 }) ? "is-active" : ""
            }
          >
            h3
          </Button>
        </ButtonGroup>
        <Divider />
        <ButtonGroup>
          <Button onClick={() => editor.commands.undo()}>
            <FontAwesomeIcon icon={faRotateLeft} />
          </Button>
          <Button onClick={() => editor.commands.redo()}>
            <FontAwesomeIcon icon={faRotateRight} />
          </Button>
        </ButtonGroup>
      </Container>
    </>
  );
};

export default MenuBar;
