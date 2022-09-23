import React, { Component, useState } from "react";
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

function logGroup(type: string, data: CallBackProps) {
  console.groupCollapsed(type);
  console.log(data);
  console.groupEnd();
}

interface Props {
  breakpoint: string;
}

interface State {
  run: boolean;
  steps: Step[];
}

export function Tours() {
  // const [tutorial2Passed, setTutorial2Passed] = useState(false);
  const [{ run, steps }, setState] = useState<State>({
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
        target: "#issueAuthor",
        content: "You could see this issue's author README",
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
        content: "You can click the date to see whether there is any activity",
      },
      {
        target: "#createBranch",
        content: "Wanna start something? Just do it!",
      },
      {
        target: "#mapInput",
        content: "You could pin your activity location on the map!",
      },
      {
        target: "#branchesBtn",
        content: "Here to create new branches!",
      },
      {
        target: "#branchAuthor",
        content: "You could see this branch's host README",
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
        content:
          "Here is your public Readme page, you can share this to your friends 🙌️ ",
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
        content: "Here are all your friends in GitDate, let's chat with them!",
      },
    ],
  });

  const handleClickStart = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();

    setState({
      run: true,
      steps,
    });
  };

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status, type } = data;
    const finishedStatuses: string[] = [STATUS.FINISHED, STATUS.SKIPPED];

    if (finishedStatuses.includes(status)) {
      setState({ run: false, steps });
    }

    logGroup(type, data);
  };

  return (
    <div className="App">
      <div className="btn second-step" onClick={handleClickStart}>
        Docs
      </div>
      <Joyride
        // callback={({ status }) => {
        //   if (
        //     ([STATUS.FINISHED, STATUS.SKIPPED] as string[]).includes(status)
        //   ) {
        //     window.localStorage.setItem("tutorial2Passed", "true");
        //     setTutorial2Passed(true);
        //   }
        // }}
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
            // overlayColor: "rgba(79, 26, 0, 0.4)",
            primaryColor: "#ff69b4",
            textColor: "#3f3a3a",
          },
        }}
      />
    </div>
  );
}

// export class Tours extends Component {
//   constructor(props: any) {
//     super(props);
//     this.state = {
//       run: false,
//       steps: [
//         {
//           target: "body",
//           content: "In every page you could click Docs to see the tutorials",
//           disableBeacon: true,
//         },
//         {
//           target: "#issuesFilter",
//           content: "You can filter issues by status and category",
//         },
//         {
//           target: "#createIssue",
//           content:
//             "Here to create your issues (no need to be an issue, just anything you want to share)",
//         },
//         {
//           target: "#issuesToggle",
//           content: "Here you can change the style of issues",
//         },
//         {
//           target: "#issueClick",
//           content: "Now let's browse these amazing posts!",
//         },
//         {
//           target: "#issuesBtn",
//           content: "Here to create new issues!",
//         },
//         {
//           target: "#issueAuthor",
//           content: "You could see this issue's author README",
//         },
//         {
//           target: "#PRbtn",
//           content:
//             "You could send this pull request to the author to ask for chatting",
//         },
//         {
//           target: "#branchesFilter",
//           content: "You can filter branches by activity types",
//         },
//         {
//           target: "#branchCalendar",
//           content:
//             "You can click the date to see whether there is any activity",
//         },
//         {
//           target: "#createBranch",
//           content: "Wanna start something? Just do it!",
//         },
//         {
//           target: "#mapInput",
//           content: "You could pin your activity location on the map!",
//         },
//         {
//           target: "#branchesBtn",
//           content: "Here to create new branches!",
//         },
//         {
//           target: "#branchAuthor",
//           content: "You could see this branch's host README",
//         },
//         {
//           target: "#checkoutBtn",
//           content: "You can checkout to this branch to attend this activity",
//         },
//         {
//           target: "#branchParticipants",
//           content: "To see other people who attend this activity",
//         },
//         {
//           target: "#editProfile",
//           content: "You could change your Readme (Public profile) info here",
//         },
//         {
//           target: "#seeReadme",
//           content:
//             "Here is your public Readme page, you can share this to your friends 🙌️ ",
//         },
//         {
//           target: "#overview",
//           content: "You could see your info here",
//         },
//         {
//           target: "#pullrequests",
//           content: "You could see who sent you pull requests",
//         },
//         {
//           target: "#repositories",
//           content: "Here are your friend list and chatrooms",
//         },
//         {
//           target: "#issuesMember",
//           content: "Here are all the issues you created",
//         },
//         {
//           target: "#branchesMember",
//           content: "Here are all activities you attended and hosted",
//         },
//         {
//           target: "#mergeBtn",
//           content:
//             "You could merge this pull request and open a repository (chatroom) with another GitDater!",
//         },
//         {
//           target: "#repoSidebar",
//           content:
//             "Here are all your friends in GitDate, let's chat with them!",
//         },
//       ],
//     };
//   }

//   handleClickStart = (e: React.MouseEvent<HTMLElement>) => {
//     e.preventDefault();
//     this.setState({
//       run: true,
//     });
//   };

//   handleJoyrideCallback = (data: CallBackProps) => {
//     const { status, type } = data;
//     const finishedStatuses: string[] = [STATUS.FINISHED, STATUS.SKIPPED];

//     if (finishedStatuses.includes(status)) {
//       this.setState({ run: false });
//     }

//     logGroup(type, data);
//   };

//   render() {
//     const { steps, run } = this.state as any;
//     return (
//       <div className="App">
//         <div className="btn second-step" onClick={this.handleClickStart}>
//           Docs
//         </div>
//         <Joyride
//           callback={this.handleJoyrideCallback}
//           continuous
//           hideCloseButton
//           run={run}
//           scrollToFirstStep
//           showProgress
//           showSkipButton
//           steps={steps}
//           styles={{
//             options: {
//               zIndex: 10000,
//               arrowColor: "#edede9",
//               backgroundColor: "#edede9",
//               // overlayColor: "rgba(79, 26, 0, 0.4)",
//               primaryColor: "#ff69b4",
//               textColor: "#3f3a3a",
//             },
//           }}
//         />
//       </div>
//     );
//   }
// }
