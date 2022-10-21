import styled from "styled-components";
import React from "react";
import { Button } from "../../utils/styledComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBold,
  faItalic,
  faList,
  faRotateRight,
  faRotateLeft,
  faGripLines,
} from "@fortawesome/free-solid-svg-icons";
import { Editor } from "@tiptap/core";

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
const Divider = styled.div`
  border-left: 1px solid #cacbd5;
  height: 24px;
  margin: 0 10px;
`;

interface MenuProps {
  editor: Editor | null;
}

const MenuBar = ({ editor }: MenuProps) => {
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
            onClick={() => editor.chain().focus().setHorizontalRule().run()}
          >
            <FontAwesomeIcon icon={faGripLines} />
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
