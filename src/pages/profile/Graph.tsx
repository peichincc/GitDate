import React, { useEffect } from "react";
import styled from "styled-components";
import { Gitgraph, templateExtend, TemplateName } from "@gitgraph/react";
import { GitgraphCore } from "@gitgraph/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";

const TitleBar = styled.div`
  background-color: #f3f1f3;
  color: #4d494d;
  font-size: 11pt;
  line-height: 20px;
  text-align: center;
  width: 100%;
  height: 20px;
  border-top: 1px solid #f3f1f3;
  border-bottom: 1px solid #b1aeb1;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -o-user-select: none;
  cursor: default;
`;
const Buttons = styled.div`
  padding-left: 8px;
  padding-top: 3px;
  float: left;
  line-height: 0px;
`;
const Close = styled.div`
  cursor: pointer;
  background: #ff5c5c;
  font-size: 9pt;
  width: 11px;
  line-height: 11px;
  height: 11px;
  border: 1px solid #e33e41;
  border-radius: 50%;
  display: inline-block;
`;
const Minimize = styled.div`
  background: #ffbd4c;
  font-size: 9pt;
  line-height: 11px;
  margin-left: 4px;
  width: 11px;
  height: 11px;
  border: 1px solid #e09e3e;
  border-radius: 50%;
  display: inline-block;
`;
const Zoom = styled.div`
  background: #00ca56;
  font-size: 9pt;
  line-height: 11px;
  margin-left: 6px;
  width: 11px;
  height: 11px;
  border: 1px solid #14ae46;
  border-radius: 50%;
  display: inline-block;
`;
const WindowTitle = styled.div``;
const ModalBx = styled.div`
  border: 1px solid #acacac;
  width: 500px;
  height: 560px;
  background-color: #fff;
  background-size: 100% 70px;
  top: 50%;
  left: 75%;
  transform: translate(-50%, -50%);
  z-index: 101;
  position: fixed;
  border-radius: 6px;
  box-shadow: 0px 0px 20px #acacac;
  @media screen and (max-width: 1024px) {
    top: 50%;
    left: 50%;
  }
  @media screen and (max-width: 500px) {
    display: none;
  }
`;
const TreeContainer = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
`;
const TreeGraph = styled.div`
  position: absolute;
  bottom: 20px;
  left: 10px;
`;
const TextBox = styled.div`
  font-size: 26px;
  line-height: 60px;
  margin-bottom: 90px;
  margin-left: 20px;
  text-align: right;
  padding-right: 30px;
  background-color: #24292f;
  color: white;
`;

// function buildGraph(statusCode, gitgraph){
//   if(statusCode ===0){
//      const master = gitgraph.branch("master");
//      master.commit("git init");
//   }
// }

function buildGraph0(gitgraph: any) {
  const master = gitgraph.branch("master");
  master.commit("git init");
}
function buildGraph1(gitgraph: any) {
  const master = gitgraph.branch("master");
  master.commit("git init");
  const develop = gitgraph.branch("develop");
  develop.commit("write readme");
  master.merge(develop);
}
function buildGraph2(gitgraph: any) {
  const master = gitgraph.branch("master");
  master.commit("git init");
  const develop = gitgraph.branch("develop");
  develop.commit("write readme");
  master.merge(develop);
  const feata = gitgraph.branch("feat/issue");
  feata.commit("write issue");
  master.merge(feata);
}
function buildGraph3(gitgraph: any) {
  const master = gitgraph.branch("master");
  master.commit("git init");
  const develop = gitgraph.branch("develop");
  develop.commit("write readme");
  master.merge(develop);
  const featb = gitgraph.branch("feat/branch");
  featb.commit("hosted branch!");
}
function buildGraph4(gitgraph: any) {
  const master = gitgraph.branch("master");
  master.commit("git init");
  const develop = gitgraph.branch("develop");
  develop.commit("write readme");
  master.merge(develop);
  const featb = gitgraph.branch("feat/branch");
  featb.commit("attended branch 💃");
}
function buildGraph5(gitgraph: any) {
  const master = gitgraph.branch("master");
  master.commit("git init");
  const develop = gitgraph.branch("develop");
  develop.commit("write readme");
  const featb = gitgraph.branch("feat/branch");
  const featc = gitgraph.branch("feat/new");
  featb.commit("hosted branch!");
  featc.commit("attended branch 💃");
  develop.merge(featb);
  develop.merge(featc);
  master.merge(develop).tag("v1 👏");
}

function SourceTree({
  sourceTreeStatus,
  setButtonPop,
}: {
  sourceTreeStatus: number;
  setButtonPop: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const templateConfig = {
    branch: {
      lineWidth: 2,
      label: {
        display: false,
      },
      widthExtension: 10,
    },
    commit: {
      widthExtension: 50,
      dot: {
        size: 4,
      },
      tag: {
        font: "normal 10pt Arial",
        color: "yellow",
      },
      message: {
        displayBranch: false,
        displayHash: false,
        displayAuthor: false,
        font: "normal 12pt Arial",
      },
    },
  };
  const template = templateExtend(TemplateName.Metro, templateConfig);

  const buildGraphs = [
    buildGraph0,
    buildGraph1,
    buildGraph2,
    buildGraph3,
    buildGraph4,
    buildGraph5,
  ];
  const [currentGraph, setCurrentGraph] = React.useState(0);
  const graph = new GitgraphCore();
  buildGraphs[currentGraph](graph.getUserApi());
  useEffect(() => setCurrentGraph(sourceTreeStatus), []);

  return (
    <ModalBx>
      <TitleBar>
        <Buttons>
          <Close
            onClick={() => {
              setButtonPop(false);
            }}
          ></Close>
          <Minimize></Minimize>
          <Zoom></Zoom>
        </Buttons>
        <WindowTitle>
          <FontAwesomeIcon icon={faLocationDot} /> git graph
        </WindowTitle>
      </TitleBar>
      <TreeContainer>
        <TreeGraph>
          {currentGraph && currentGraph < 5 ? (
            <TextBox>Be an active GitDaters to grow your sourcetree 👏</TextBox>
          ) : null}
          <Gitgraph
            options={{
              template,
              reverseArrow: true,
            }}
            key={currentGraph}
          >
            {buildGraphs[currentGraph]}
          </Gitgraph>
        </TreeGraph>
      </TreeContainer>
    </ModalBx>
  );
}

export default SourceTree;
