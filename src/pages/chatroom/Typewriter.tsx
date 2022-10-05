import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";

const Paragraph = styled.span`
  text-align: left;
  font-size: 1.25em;
  font-family: monospace;
  white-space: nowrap;
  overflow: hidden;
  /* width: 0; */
  &.line1 {
    color: #9cd9f0;
  }
  &.line2 {
    color: #cdee69;
  }
  &.line3 {
    color: #e09690;
  }
  &.line4 {
    color: #fff;
  }
`;
const Cursor1 = styled.div`
  color: #24292f;
`;
const Cursor2 = styled.div`
  color: #24292f;
`;
const Cursor3 = styled.div`
  color: #24292f;
`;
const Cursor4 = styled.span`
  -webkit-animation: blink 1s 0s infinite;
  -moz-animation: blink 1s 0s infinite;
  -o-animation: blink 1s 0s infinite;
  animation: blink 1s 0.5s infinite;
  @-webkit-keyframes blink {
    0% {
      opacity: 0;
    }
    40% {
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
    90% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }

  @-moz-keyframes blink {
    0% {
      opacity: 0;
    }
    40% {
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
    90% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }

  @-o-keyframes blink {
    0% {
      opacity: 0;
    }
    40% {
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
    90% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }

  @keyframes blink {
    0% {
      opacity: 0;
    }
    40% {
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
    90% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
`;

const Typewriter = () => {
  const first_text = "Sending pull request,";
  const second_text = "Merging pull request,";
  const third_text = "Let's open a repo!";

  const textState = ["istyping", "isdeleting"];
  const [typing1, setTyping1] = useState(textState[0]);
  const [typing2, setTyping2] = useState(textState[0]);
  const [typing3, setTyping3] = useState(textState[0]);
  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");
  const [text3, setText3] = useState("");

  function sleep(ms: any) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (typing1 === "istyping" && text1 !== first_text) {
        setText1(first_text.slice(0, text1.length + 1));
      } else if (text1 === first_text && typing1 === "istyping") {
        sleep(2000).then(() => {
          setTyping1(textState[1]);
        });
      } else if (
        (text1 === first_text && typing1 === "isdeleting") ||
        typing1 === "isdeleting"
      ) {
        setText1(first_text.slice(0, text1.length - 1));
        if (text1.length <= 2) {
          setTyping1(textState[0]);
        }
      }
    }, 100);

    return () => clearTimeout(timeout);
  }, [text1, typing1]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (typing2 === "istyping" && text2 !== second_text) {
        setText2(second_text.slice(0, text2.length + 1));
      } else if (text2 === second_text && typing2 === "istyping") {
        sleep(2000).then(() => {
          setTyping2(textState[1]);
        });
      } else if (
        (text2 === second_text && typing2 === "isdeleting") ||
        typing2 === "isdeleting"
      ) {
        setText2(second_text.slice(0, text2.length - 1));
        if (text2.length <= 2) {
          setTyping2(textState[0]);
        }
      }
    }, 250);

    return () => clearTimeout(timeout);
  }, [text2, typing2]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (typing3 === "istyping" && text3 !== third_text) {
        setText3(third_text.slice(0, text3.length + 1));
      } else if (text3 === third_text && typing3 === "istyping") {
        sleep(2000).then(() => {
          setTyping3(textState[1]);
        });
      } else if (
        (text3 === third_text && typing3 === "isdeleting") ||
        typing3 === "isdeleting"
      ) {
        setText3(third_text.slice(0, text3.length - 1));
        if (text3.length <= 2) {
          setTyping3(textState[0]);
        }
      }
    }, 300);

    return () => clearTimeout(timeout);
  }, [text3, typing3]);

  return (
    <>
      <Paragraph className="paragraph line1">
        {text1}
        <Cursor1>_</Cursor1>
      </Paragraph>
      <Paragraph className="paragraph line2">
        {text2}
        <Cursor2>_</Cursor2>
      </Paragraph>
      <Paragraph className="paragraph line3">
        {text3}
        <Cursor3>_</Cursor3>
      </Paragraph>
      <Paragraph className="paragraph line4">
        <br />
        Start chatting...
        <Cursor4>_</Cursor4>
      </Paragraph>
    </>
  );
};

export default Typewriter;
