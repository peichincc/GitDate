import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import {
  ModalHeader,
  ModalContent,
  ModalContentsWrapper,
  CloseBtnWrapper,
  Button,
} from "../../utils/styledComponent";

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
const ModelExplanation = styled(ModalContent)`
  width: auto;
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 10px;
  text-align: center;
  justify-content: center;
`;

const Alert = (props: {
  trigger: boolean;
  setButtonPop: (arg0: boolean) => void;
  alertMsg: string;
}) => {
  const { trigger, setButtonPop, alertMsg } = props;
  return trigger ? (
    <>
      <Back>
        <ModalBx>
          <ModalContents>
            <ModalHeader>
              <h2>
                <FontAwesomeIcon icon={faTriangleExclamation} />
              </h2>
            </ModalHeader>
            <ModalContentsWrapper>
              <ModelExplanation>{alertMsg}</ModelExplanation>
              <CloseBtnWrapper>
                <Button
                  onClick={() => {
                    setButtonPop(false);
                  }}
                >
                  Close
                </Button>
              </CloseBtnWrapper>
            </ModalContentsWrapper>
          </ModalContents>
        </ModalBx>
      </Back>
    </>
  ) : null;
};

export default Alert;
