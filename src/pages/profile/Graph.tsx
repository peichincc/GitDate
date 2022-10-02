import React, { useEffect } from "react";
import styled from "styled-components";
import { Gitgraph, templateExtend, TemplateName } from "@gitgraph/react";
import { GitgraphCore } from "@gitgraph/core";

import "./macOS.css";

// try popup effect
const ModalBx = styled.div`
  border: 1px solid #acacac;
  width: 500px;
  height: 560px;
  background-color: #fff;
  /* background-color: lightgray; */
  /* background: linear-gradient(#fff 50%, #f6f6f6 50%); */
  background-size: 100% 70px;
  top: 45%;
  left: 75%;
  transform: translate(-50%, -50%);
  z-index: 101;
  position: fixed;
  border-radius: 6px;
  box-shadow: 0px 0px 20px #acacac;
`;
const TreeContainer = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
`;
const TreeGraph = styled.div`
  position: absolute;
  bottom: 12px;
  left: 10px;
`;

const TextBox = styled.div`
  font-size: 24px;
  line-height: 50px;
  margin-bottom: 90px;
  margin-left: 20px;
  text-align: right;
  padding-right: 30px;
  background-color: #24292f;
  color: white;
`;

// basic graph if registered
function buildGraph0(gitgraph: any) {
  const master = gitgraph.branch("master");
  master.commit("git init");
}
// basic graph if write readme
function buildGraph1(gitgraph: any) {
  const master = gitgraph.branch("master");
  master.commit("git init");
  const develop = gitgraph.branch("develop");
  develop.commit("write readme");
  master.merge(develop);
}
// graph if posted issue
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
// graph if host branch
function buildGraph3(gitgraph: any) {
  const master = gitgraph.branch("master");
  master.commit("git init");
  const develop = gitgraph.branch("develop");
  develop.commit("write readme");
  master.merge(develop);
  const featb = gitgraph.branch("feat/branch");
  featb.commit("hosted branch!");
}
// graph if attend branch
function buildGraph4(gitgraph: any) {
  const master = gitgraph.branch("master");
  master.commit("git init");
  const develop = gitgraph.branch("develop");
  develop.commit("write readme");
  master.merge(develop);
  const featb = gitgraph.branch("feat/branch");
  featb.commit("attend branch!");
}
// graph if attend and host branch
function buildGraph5(gitgraph: any) {
  const master = gitgraph.branch("master");
  master.commit("git init");
  const develop = gitgraph.branch("develop");
  develop.commit("write readme");
  // master.merge(develop);
  const featb = gitgraph.branch("feat/branch");
  featb.commit("hosted branch!");
  develop.merge(featb);
  const featc = gitgraph.branch("feat/new");
  featc.commit("attend branch!");
  develop.merge(featc);
  master.merge(develop);
  master.tag("v1");
}

function SourceTree({ sourceTreeStatus, setButtonPop }: any) {
  const templateConfig = {
    branch: {
      lineWidth: 2,
      // spacing: 15,
      label: {
        display: false,
      },
      widthExtension: 10,
    },
    commit: {
      // spacing: 10,
      widthExtension: 50,
      dot: {
        size: 4,
        //   strokeWidth: 2,
      },
      tag: {
        font: "normal 10pt Arial",
        color: "yellow",
      },
      message: {
        // color: "black",
        displayBranch: false,
        displayHash: false,
        displayAuthor: false,
        font: "normal 14pt Arial",
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
  const graph = new GitgraphCore() as any;
  buildGraphs[currentGraph](graph.getUserApi());
  useEffect(() => setCurrentGraph(parseInt(sourceTreeStatus)), []);

  return (
    <ModalBx>
      <div className="titlebar">
        <div className="buttons">
          <div
            className="close"
            onClick={() => {
              setButtonPop(false);
            }}
          >
            <a className="closebutton" href="#">
              <span>
                <strong>x</strong>
              </span>
            </a>
          </div>
          <div className="minimize">
            <a className="minimizebutton" href="#">
              <span>
                <strong>&ndash;</strong>
              </span>
            </a>
          </div>
          <div className="zoom">
            <a className="zoombutton" href="#">
              <span>
                <strong>+</strong>
              </span>
            </a>
          </div>
        </div>
      </div>
      <TreeContainer>
        <TreeGraph>
          {currentGraph && currentGraph < 4 ? (
            <TextBox>Be an active GitDaters to grow your sourcetree👏</TextBox>
          ) : null}
          <Gitgraph
            options={{
              // orientation: Orientation.VerticalReverse,
              //author: "Rain120",
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
    // <ModalBx>
    //   <TreeContainer>
    //     <TreeGraph>
    //       {currentGraph && currentGraph < 4 ? (
    //         <TextBox>
    //           You have come so far, well done!
    //           <br />
    //           Be an active GitDaters to grow your sourcetree!
    //         </TextBox>
    //       ) : null}
    //       <Gitgraph
    //         options={{
    //           // orientation: Orientation.VerticalReverse,
    //           //author: "Rain120",
    //           template,
    //           reverseArrow: true,
    //         }}
    //         key={currentGraph}
    //       >
    //         {buildGraphs[currentGraph]}
    //       </Gitgraph>
    //     </TreeGraph>
    //   </TreeContainer>
    // </ModalBx>

    // {(gitgraph) => {
    //   const master = gitgraph.branch("master");
    //   master.commit("git init");
    //   const develop = gitgraph.branch("develop");
    //   develop.commit("write readme");
    //   master.merge(develop);
    //   const feata = gitgraph.branch("feat/issue");
    //   feata.commit("write issue");
    // }}
    // </Gitgraph>
    // <Gitgraph
    //   options={{
    //     author: " ",
    //   }}
    // >
    // {(gitgraph) => {
    //   // Simulate git commands with Gitgraph API.
    //   const master = gitgraph.branch("master");
    //   master.commit("Initial commit");
    //   const develop = master.branch("develop");
    //   develop.commit("Add TypeScript");
    //   const aFeature = develop.branch("a-feature");
    //   aFeature
    //     .commit("Make it work")
    //     .commit("Make it right")
    //     .commit("Make it fast");
    //   develop.merge(aFeature);
    //   develop.commit("Prepare v1");

    //   master.merge(develop).tag("v1.0.0");
    // }}
    // </Gitgraph>
  );
}

export default SourceTree;
