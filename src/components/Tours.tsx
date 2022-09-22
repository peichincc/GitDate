import React, { Component } from "react";
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

function logGroup(type: string, data: any) {
  console.groupCollapsed(type);
  console.log(data);
  console.groupEnd();
}

export class Tours extends Component {
  constructor(props: any) {
    super(props);
    this.state = {
      run: false,
      steps: [
        {
          target: "body",
          content: "In every page you could click Docs to see the tutorials",
          disableBeacon: true,
        },
        {
          target: "#issuesFilter",
          content: "You can filter issues by status and category",
        },
        {
          target: "#createIssue",
          content:
            "Here to create your issues (no need to be an issue, just anything you want to share)",
        },
        {
          target: "#issuesToggle",
          content: "Here you can change the style of issues",
        },
        {
          target: "#issueClick",
          content: "Now let's browse these amazing posts!",
        },
        {
          target: "#issuesBtn",
          content: "Here to create new issues!",
        },
        {
          target: "#PRbtn",
          content:
            "You could send this pull request to the author to ask for chatting",
        },
        {
          target: "#branchesFilter",
          content: "You can filter branches by activity types",
        },
        {
          target: "#branchCalendar",
          content:
            "You can click the date to see whether there is any activity",
        },
        {
          target: "#checkoutBtn",
          content: "You can checkout to this branch to attend this activity",
        },
        {
          target: "#branchParticipants",
          content: "To see other people who attend this activity",
        },
        {
          target: "#editProfile",
          content: "You could change your Readme (Public profile) info here",
        },
        {
          target: "#seeReadme",
          content: "Here is your public Readme page!",
        },
        {
          target: "#overview",
          content: "You could see your info here",
        },
        {
          target: "#pullrequests",
          content: "You could see who sent you pull requests",
        },
        {
          target: "#repositories",
          content: "Here are your friend list and chatrooms",
        },
        {
          target: "#issuesMember",
          content: "Here are all the issues you created",
        },
        {
          target: "#branchesMember",
          content: "Here are all activities you attended and hosted",
        },
        {
          target: "#mergeBtn",
          content:
            "You could merge this pull request and open a repository (chatroom) with another GitDater!",
        },
        {
          target: "#repoSidebar",
          content:
            "Here are all your friends in GitDate, let's chat with them!",
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
        <div className="btn second-step" onClick={this.handleClickStart}>
          Docs
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
              arrowColor: "#edede9",
              backgroundColor: "#edede9",
              // overlayColor: "rgba(79, 26, 0, 0.4)",
              primaryColor: "#ff69b4",
              textColor: "#3f3a3a",
            },
          }}
        />
      </div>
    );
  }
}
