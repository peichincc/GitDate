import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCodePullRequest } from "@fortawesome/free-solid-svg-icons";
import {
  ModalHeader,
  ModalContent,
  ModalContentsWrapper,
  CloseBtnWrapper,
  Button,
  MergeBtn,
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
const ModalExplaination = styled(ModalContent)`
  width: auto;
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 10px;
  text-align: center;
  justify-content: center;
`;
const CTABtn = styled(MergeBtn)`
  width: 110px;
`;
const CancelBtn = styled(Button)`
  width: 110px;
`;

const FriendAlert = (props: {
  trigger: boolean;
  setAlertWtihCTAPop: (arg0: boolean) => void;
  alertMsg: string;
}) => {
  let navigate = useNavigate();
  const { trigger, setAlertWtihCTAPop, alertMsg } = props;
  return trigger ? (
    <>
      <Back>
        <ModalBx>
          <ModalContents>
            <ModalHeader>
              <h2>
                <FontAwesomeIcon icon={faCodePullRequest} />
              </h2>
            </ModalHeader>
            <ModalContentsWrapper>
              <ModalExplaination>{alertMsg}</ModalExplaination>
              <CloseBtnWrapper>
                <CTABtn
                  onClick={() => {
                    navigate("/member");
                    setAlertWtihCTAPop(false);
                  }}
                >
                  To Member
                </CTABtn>
                <CancelBtn
                  onClick={() => {
                    setAlertWtihCTAPop(false);
                  }}
                >
                  Maybe Later
                </CancelBtn>
              </CloseBtnWrapper>
            </ModalContentsWrapper>
          </ModalContents>
        </ModalBx>
      </Back>
    </>
  ) : null;
};

export default FriendAlert;
