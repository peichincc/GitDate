import React, { useState, useEffect } from "react";
import Joyride, { CallBackProps, STATUS, Step } from "react-joyride";
import styled from "styled-components";

const TourBtn = styled.button`
  font-size: 16px;
  border: none;
  background: none;
  cursor: pointer;
  :hover {
    color: #ff69b4;
    text-decoration: underline;
  }
`;

interface State {
  run: boolean;
  steps: Step[];
}

export function Tour() {
  const [{ run, steps }, setState] = useState<State>({
    run: false,
    steps: [
      {
        target: "body",
        content: (
          <div>
            <h3>Welcome to GitDate</h3>
            <h3>We are glad that you are here!</h3>
          </div>
        ),
        disableBeacon: true,
      },
      {
        target: "#issues",
        content:
          "Issues for you to post anything you want to share and connect with people!",
      },
      {
        target: "#branches",
        content: "Branches for you to host and attend all kinds of activities!",
      },
      {
        target: "#corner",
        content: "You could find our git cheat sheet here anytime you need!",
      },
      {
        target: "#repo",
        content: "Repositories for you to chat with other GitDaters!",
      },
      {
        target: "#signup",
        content: "Let's start your adventure in GitDate!",
      },
      {
        target: "#docs",
        content:
          "If you have any questions, you can always find answers from this tutorial here!",
      },
    ],
  });

  useEffect(() => {
    if (!localStorage.getItem("tutorial2Passed")) {
      setState({
        run: true,
        steps,
      });
      window.localStorage.setItem("tutorial2Passed", "true");
    }
  }, []);

  const handleClickStart = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    setState({
      run: true,
      steps,
    });
  };

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status } = data;
    const finishedStatuses: string[] = [STATUS.FINISHED, STATUS.SKIPPED];
    if (finishedStatuses.includes(status)) {
      setState({ run: false, steps });
    }
  };

  return (
    <div className="App">
      <div>
        New to GitDate?
        <br />
        <TourBtn className="btn second-step" onClick={handleClickStart}>
          <strong>Click</strong>
        </TourBtn>
        to see the user guide
      </div>
      <Joyride
        callback={handleJoyrideCallback}
        continuous
        hideCloseButton
        run={run}
        scrollToFirstStep
        showProgress
        showSkipButton
        steps={steps}
        styles={{
          options: {
            zIndex: 10000,
            arrowColor: "#edede9",
            backgroundColor: "#edede9",
            primaryColor: "#ff69b4",
            textColor: "#3f3a3a",
          },
        }}
      />
    </div>
  );
}
