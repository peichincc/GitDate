import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import styled from "styled-components";

import MenuBar from "./MenuBar";
import React from "react";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 50px;
`;

const OuterEditor = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px;
  width: 600px;
  background: #f4f6f7;
  border-radius: 8px;
`;

const StyledEditorContent = styled(EditorContent)`
  .ProseMirror {
    /* border: solid 1px black; */
    height: 165px;
    width: 560px;
    max-height: 165px;
    padding: 10px;
    overflow-y: auto;
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
    extensions: [StarterKit, Underline],
    content: "<p>Type your story...</p>",
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
