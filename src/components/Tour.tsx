import React, { Component } from "react";
import Joyride, { CallBackProps, STATUS, Step } from "react-joyride";
import styled from "styled-components";

const TourBtn = styled.button`
  font-size: 16px;
  border: none;
  background: none;
  cursor: pointer;
  :hover {
    text-decoration: underline;
  }
`;

function logGroup(type: string, data: any) {
  console.groupCollapsed(type);
  console.log(data);
  console.groupEnd();
}

export class Tour extends Component {
  constructor(props: any) {
    super(props);
    this.state = {
      run: false,
      steps: [
        {
          target: "#step1",
          content: (
            <div>
              <h2>Welcome to GitDate</h2>
              <h3>We are glad that you are here!</h3>
            </div>
          ),
          disableBeacon: true,
        },
        {
          target: "#issues",
          content: "Issues for you to post anything you want to share!",
        },
        {
          target: "#branches",
          content: "Branches for you to host and attend activities!",
        },
        {
          target: "#repo",
          content: "Repositories for you to chat with other GitDaters!",
        },
        {
          target: "#docs",
          content: "If you have questions, you can always find answers here!",
        },
      ],
    };
  }

  handleClickStart = (e: any) => {
    e.preventDefault();
    this.setState({
      run: true,
    });
  };

  handleJoyrideCallback = (data: CallBackProps) => {
    const { status, type } = data;
    const finishedStatuses: string[] = [STATUS.FINISHED, STATUS.SKIPPED];

    if (finishedStatuses.includes(status)) {
      this.setState({ run: false });
    }

    logGroup(type, data);
  };

  render() {
    const { steps, run } = this.state as any;
    return (
      <div className="App">
        <div>
          New to GitDate?
          <br />
          <TourBtn className="btn second-step" onClick={this.handleClickStart}>
            <strong>Click</strong>
          </TourBtn>
          to see the user guide
        </div>
        <Joyride
          callback={this.handleJoyrideCallback}
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
            },
          }}
        />
      </div>
    );
  }
}
