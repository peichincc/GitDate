import React from "react";
import styled from "styled-components";

import {
  ModalHeader,
  ModalSubtitle,
  ModalContent,
  ModalWordWrapper,
  ModalContentsWrapper,
  CloseBtnWrapper,
  Button,
} from "../../utils/StyledComponent";

const Back = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 100;
  background-color: rgba(0, 0, 0, 0.7);
`;
const ModalBx = styled.div`
  background-color: white;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 101;
  animation: slide-down 500ms ease-out forwards;
  position: fixed;
  @keyframes slide-down {
    from {
      opacity: 0;
      /* transform: translateY(-10rem); */
    }
    to {
      opacity: 1;
      /* transform: translateY(0); */
    }
  }
`;
const ModalContents = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const ModalExplaination = styled(ModalContent)`
  width: 600px;
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 10px;
`;

const CheatSheet = (props: any) => {
  const { trigger, setButtonPop } = props;
  return trigger ? (
    <>
      <Back>
        <ModalBx>
          <ModalContents>
            <ModalHeader>
              <h2>GIT CHEAT SHEET</h2>
            </ModalHeader>
            <ModalContentsWrapper>
              <ModalExplaination>
                Git is a free and open source distributed version control system
                designed to handle everything from small to very large projects
                with speed and efficiency. <br />
                Here we tweak these git commands a bit ✨
              </ModalExplaination>
              <ModalWordWrapper>
                <ModalSubtitle>git add</ModalSubtitle>
                <ModalContent>To add image into posts </ModalContent>
              </ModalWordWrapper>
              <ModalWordWrapper>
                <ModalSubtitle>git commit</ModalSubtitle>
                <ModalContent>To create new posts</ModalContent>
              </ModalWordWrapper>
              <ModalWordWrapper>
                <ModalSubtitle>git branch</ModalSubtitle>
                <ModalContent>To create new activities</ModalContent>
              </ModalWordWrapper>
              <ModalWordWrapper>
                <ModalSubtitle>git checkout</ModalSubtitle>
                <ModalContent>To attend activities</ModalContent>
              </ModalWordWrapper>
              <ModalWordWrapper>
                <ModalSubtitle>Issues</ModalSubtitle>
                <ModalContent>Posts created by users</ModalContent>
              </ModalWordWrapper>
              <ModalWordWrapper>
                <ModalSubtitle>Branches</ModalSubtitle>
                <ModalContent>Activities created by users</ModalContent>
              </ModalWordWrapper>
              <ModalWordWrapper>
                <ModalSubtitle>Pull request</ModalSubtitle>
                <ModalContent>
                  Send Friend Invitation to other users
                </ModalContent>
              </ModalWordWrapper>
              <ModalWordWrapper>
                <ModalSubtitle>Merge</ModalSubtitle>
                <ModalContent>
                  Agree Friend Invitation from other users
                </ModalContent>
              </ModalWordWrapper>
              <ModalWordWrapper>
                <ModalSubtitle>Close</ModalSubtitle>
                <ModalContent>Reject Friend Invitation :(</ModalContent>
              </ModalWordWrapper>
              <ModalWordWrapper>
                <ModalSubtitle>Repo (Repository)</ModalSubtitle>
                <ModalContent>
                  Once Pull Request is merged, Chatroom (Repo) will open!
                </ModalContent>
              </ModalWordWrapper>
              <CloseBtnWrapper>
                <Button onClick={() => setButtonPop(false)}>Close</Button>
              </CloseBtnWrapper>
            </ModalContentsWrapper>
          </ModalContents>
        </ModalBx>
      </Back>
    </>
  ) : null;
};

export default CheatSheet;
