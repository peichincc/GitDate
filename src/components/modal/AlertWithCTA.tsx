import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";

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
  width: auto;
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 10px;
  text-align: center;
  justify-content: center;
`;

const AlertWtihCTA = (props: any) => {
  let navigate = useNavigate();
  const { trigger, setAlertWtihCTAPop, alertMsg } = props;
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
              <ModalExplaination>{alertMsg}</ModalExplaination>
              <CloseBtnWrapper>
                <Button
                  onClick={() => {
                    navigate("/profile");
                    setAlertWtihCTAPop(false);
                  }}
                >
                  To Write README
                </Button>
              </CloseBtnWrapper>
            </ModalContentsWrapper>
          </ModalContents>
        </ModalBx>
      </Back>
    </>
  ) : null;
};

export default AlertWtihCTA;
