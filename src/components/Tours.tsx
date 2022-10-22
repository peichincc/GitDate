import React, { useEffect, useState } from "react";
import Joyride, { CallBackProps, STATUS, Step } from "react-joyride";
import styled from "styled-components";

interface State {
  run: boolean;
  steps: Step[];
}

const MobileTourWrapper = styled.div`
  @media screen and (max-width: 770px) {
    display: none;
  }
`;

export const stepType = {
  all: [
    {
      target: "body",
      content: "In every page you could always click Docs to see tutorials",
      disableBeacon: true,
    },
    {
      target: "#searchUser",
      content: "You can also search other users by their names here",
    },
    {
      target: "#corner",
      content: "↙ Don't forget git cheat sheet here ↙",
    },
  ],
  issues: [
    {
      target: "#issuesFilter",
      content: "You can filter issues by status and category",
      disableBeacon: true,
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
  ],
  createissue: [
    {
      target: "#issueCategory",
      content: "You could choose different types for your issue",
      disableBeacon: true,
    },
    {
      target: "#issueContent",
      content: "You can style your issue whatever you like!",
    },
    {
      target: "#issueImage",
      content: "Don't forget to git add your amazing photo to your issue!",
    },
    {
      target: "#issueTags",
      content: "You could add tags to your issue",
    },
    {
      target: "#issuesBtn",
      content: "git push --your amazing post",
    },
  ],
  issue: [
    {
      target: "#issues_in",
      content: "Issues are posts created by other users",
      disableBeacon: true,
    },
    {
      target: "#issueAuthor",
      content: "You could see this issue's author README",
      disableBeacon: true,
    },
    {
      target: "#PRbtn",
      content:
        "You could send this pull request to the author to ask for chatting",
    },
  ],
  branches: [
    {
      target: "#branchesFilter",
      content: "You can filter branches by activity types",
      disableBeacon: true,
    },
    {
      target: "#branchCalendar",
      content: "You can click the date to see whether there is any activity",
    },
    {
      target: "#createBranch",
      content: "Wanna start something? Just do it!",
    },
  ],
  createbranch: [
    {
      target: "#branchType",
      content: "You could choose your activity type",
      disableBeacon: true,
    },
    {
      target: "#mapInput",
      content: "You could pin your activity location on the map!",
    },
    {
      target: "#branchContent",
      content: "You can write your activity description with styles",
    },
    {
      target: "#branchImage",
      content: "Don't forget to git add your amazing photo to your activity!",
    },
    {
      target: "#branchesBtn",
      content: "git branch --your awesome activity",
    },
  ],
  branch: [
    {
      target: "#branches_in",
      content: "Branches are activities created by other users",
      disableBeacon: true,
    },
    {
      target: "#branchAuthor",
      content: "You could see this branch's host README",
      disableBeacon: true,
    },
    {
      target: "#checkoutBtn",
      content: "You can checkout to this branch to attend this activity",
    },
    {
      target: "#branchParticipants",
      content: "To see other people who attend this activity",
    },
  ],
  member: [
    {
      target: "#overview",
      content: "You could see your info here",
      disableBeacon: true,
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
      target: "#editProfile",
      content: "You could change your Readme (Public profile) info here",
    },
    {
      target: "#seeReadme",
      content:
        "Here is your public Readme page, you can share this to your friends 🙌️ ",
    },
  ],
  repo: [
    {
      target: "#repoSidebar",
      content:
        "Once you have merged pull requests, you will see friend lists here and you can chat with them!",
      disableBeacon: true,
    },
  ],
  readme: [
    {
      target: "#readme",
      content: "You could see other users' readme here",
      disableBeacon: true,
    },
    {
      target: "#sourcetree",
      content:
        "The sourcetree represents what users have done in GitDate so far",
    },
  ],
};

export function Tours({ stepType, page }: { stepType: any; page?: string }) {
  const [{ run, steps }, setState] = useState<State>({
    run: false,
    steps: stepType,
  });

  useEffect(() => {
    const location = page?.substring(
      page.indexOf("/") - 1,
      page.lastIndexOf("/")
    );
    if (!localStorage.getItem("tutorial2PassedIssues")) {
      if (page === "/issues") {
        setState({
          run: true,
          steps: stepType.issues,
        });
        window.localStorage.setItem("tutorial2PassedIssues", "true");
      }
    }
    if (!localStorage.getItem("tutorial2PassedIssue")) {
      if (location === "/issue") {
        setState({
          run: true,
          steps: stepType.issue,
        });
        localStorage.setItem("tutorial2PassedIssue", "true");
      }
    }
    if (!localStorage.getItem("tutorial2PassedCreateIssue")) {
      if (page === "/createissue") {
        setState({
          run: true,
          steps: stepType.createissue,
        });
        window.localStorage.setItem("tutorial2PassedCreateIssue", "true");
      }
    }
    if (!localStorage.getItem("tutorial2PassedBranches")) {
      if (page === "/branches") {
        setState({
          run: true,
          steps: stepType.branches,
        });
        window.localStorage.setItem("tutorial2PassedBranches", "true");
      }
    }
    if (!localStorage.getItem("tutorial2PassedCreateBranch")) {
      if (page === "/createbranch") {
        setState({
          run: true,
          steps: stepType.createbranch,
        });
        window.localStorage.setItem("tutorial2PassedCreateBranch", "true");
      }
    }
    if (!localStorage.getItem("tutorial2PassedBranch")) {
      if (location === "/branch") {
        setState({
          run: true,
          steps: stepType.branch,
        });
        window.localStorage.setItem("tutorial2PassedBranch", "true");
      }
    }
    if (!localStorage.getItem("tutorial2PassedMember")) {
      if (page === "/member") {
        setState({
          run: true,
          steps: stepType.member,
        });
        window.localStorage.setItem("tutorial2PassedMember", "true");
      }
    }
    if (!localStorage.getItem("tutorial2PassedRepo")) {
      if (page === "/repo") {
        setState({
          run: true,
          steps: stepType.repo,
        });
        window.localStorage.setItem("tutorial2PassedRepo", "true");
      }
    }
    if (!localStorage.getItem("tutorial2PassedReadme")) {
      if (location === "/readme") {
        setState({
          run: true,
          steps: stepType.readme,
        });
        window.localStorage.setItem("tutorial2PassedReadme", "true");
      }
    }
  }, [page]);

  const handleClickStart = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    const location = page?.substring(
      page.indexOf("/") - 1,
      page.lastIndexOf("/")
    );
    if (page === "/") {
      setState({
        run: true,
        steps: stepType.all,
      });
    }
    if (page === "/issues") {
      setState({
        run: true,
        steps: stepType.issues,
      });
    }
    if (location === "/issue") {
      setState({
        run: true,
        steps: stepType.issue,
      });
    }
    if (page === "/createissue") {
      setState({
        run: true,
        steps: stepType.createissue,
      });
    }
    if (page === "/branches") {
      setState({
        run: true,
        steps: stepType.branches,
      });
    }
    if (page === "/createbranch") {
      setState({
        run: true,
        steps: stepType.createbranch,
      });
    }
    if (location === "/branch") {
      setState({
        run: true,
        steps: stepType.branch,
      });
    }
    if (page === "/member") {
      setState({
        run: true,
        steps: stepType.member,
      });
    }
    if (page === "/repo") {
      setState({
        run: true,
        steps: stepType.repo,
      });
    }
    if (location === "/readme") {
      setState({
        run: true,
        steps: stepType.readme,
      });
    }
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
      <div className="btn second-step" onClick={handleClickStart}>
        Docs
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
