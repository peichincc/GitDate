import React, { useEffect, useState } from "react";
import styled from "styled-components";

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
  top: 30vh;
  left: calc(50% - 250px);
  z-index: 101;
  animation: slide-down 500ms ease-out forwards;
  position: fixed;

  @keyframes slide-down {
    from {
      opacity: 0;
      transform: translateY(-10rem);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const CheatSheet = (props: any) => {
  const { trigger, setButtonPop } = props;
  return trigger ? (
    <>
      <Back>
        <ModalBx>
          git instruction here
          <br />
          <button onClick={() => setButtonPop(false)}>Close</button>
        </ModalBx>
      </Back>
    </>
  ) : null;
};

export default CheatSheet;
