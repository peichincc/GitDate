import React, { useEffect } from "react";
import { Gitgraph, templateExtend, TemplateName } from "@gitgraph/react";
import { GitgraphCore } from "@gitgraph/core";

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
  const featc = gitgraph.branch("feat/newbranch");
  featc.commit("attend branch!");
  develop.merge(featc);
}

function SourceTree({ sourceTreeStatus }: any) {
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
        font: "normal 10pt Arial",
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
