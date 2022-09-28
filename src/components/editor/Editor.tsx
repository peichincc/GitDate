import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import styled from "styled-components";

import MenuBar from "./MenuBar";
import React from "react";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const OuterEditor = styled.div`
  display: flex;
  flex-direction: column;
  width: 700px;
  background: #f6f8fa;
  border-radius: 8px;
  @media screen and (max-width: 1140px) {
    width: 100%;
  }
`;

const StyledEditorContent = styled(EditorContent)`
  .ProseMirror {
    border: solid 1px #979797;
    border-radius: 6px;
    height: 165px;
    width: 650px;
    max-height: 165px;
    padding: 10px;
    overflow-y: auto;
    background-color: white;
    @media screen and (max-width: 1140px) {
      width: auto;
    }
  }
`;

type TiptapProps = { content?: string; setEditorHtmlContent?: any };

const TiptapEditor = ({
  content = "",
  setEditorHtmlContent = "",
}: TiptapProps) => {
  // const [editorHtmlContent, setEditorHtmlContent] = React.useState(
  //   content.trim()
  // );
  const editor = useEditor({
    extensions: [StarterKit],
    content: "",
    onUpdate: ({ editor }) => {
      setEditorHtmlContent(editor.getHTML());
    },
  });

  return (
    <Container>
      <OuterEditor>
        <MenuBar editor={editor} />
        <StyledEditorContent editor={editor} />
        {/* <div>{editorHtmlContent}</div> */}
      </OuterEditor>
    </Container>
  );
};

export default TiptapEditor;
