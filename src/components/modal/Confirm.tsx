import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboardQuestion } from "@fortawesome/free-solid-svg-icons";
import {
  ModalHeader,
  ModalContent,
  ModalContentsWrapper,
  CloseBtnWrapper,
  MergeBtn,
  CloseBtn,
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
  width: 300px;
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
    }
    to {
      opacity: 1;
    }
  }
`;
const ModalContents = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const ModalExplaination = styled(ModalContent)`
  width: auto;
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 10px;
  text-align: center;
  justify-content: center;
`;

const Confirm = (props: any) => {
  const { trigger, confirmMsg, clickToConfirm } = props;

  return trigger ? (
    <>
      <Back>
        <ModalBx>
          <ModalContents>
            <ModalHeader>
              <h2>
                <FontAwesomeIcon icon={faClipboardQuestion} />
              </h2>
            </ModalHeader>
            <ModalContentsWrapper>
              <ModalExplaination>{confirmMsg}</ModalExplaination>
              <CloseBtnWrapper>
                <MergeBtn
                  onClick={() => {
                    clickToConfirm(true);
                  }}
                >
                  Confirm
                </MergeBtn>
                <CloseBtn
                  onClick={() => {
                    clickToConfirm(false);
                  }}
                >
                  Cancel
                </CloseBtn>
              </CloseBtnWrapper>
            </ModalContentsWrapper>
          </ModalContents>
        </ModalBx>
      </Back>
    </>
  ) : null;
};

export default Confirm;
