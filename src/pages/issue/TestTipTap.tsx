import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

const Wrapper = styled.div`
  display: block;
  max-width: 1376px;
  margin: 0 auto;
`;

const TestCreateIssue = () => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: "<p>Hello World!</p>",
  });
  return (
    <>
      <Wrapper>
        <EditorContent editor={editor} />
      </Wrapper>
    </>
  );
};

export default TestCreateIssue;
