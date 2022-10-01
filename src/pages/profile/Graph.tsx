import React from "react";
import { Gitgraph, templateExtend, TemplateName } from "@gitgraph/react";
import { GitgraphCore } from "@gitgraph/core";

function SourceTree() {
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
        // font: "normal 14pt Arial",
      },
    },
  };
  const template = templateExtend(TemplateName.Metro, templateConfig);
  return (
    <Gitgraph
      options={{
        // orientation: Orientation.VerticalReverse,
        // author: "Rain120",
        template,
        reverseArrow: true,
      }}
    >
      {(gitgraph) => {
        const master = gitgraph.branch("master");
        master.commit("git init");
        const develop = gitgraph.branch("develop");
        develop.commit("write readme");
        master.merge(develop);
        const feata = gitgraph.branch("feat/issue");
        feata.commit("write issue");
      }}
    </Gitgraph>
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
