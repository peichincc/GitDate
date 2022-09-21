import React, { Component } from "react";
import Joyride from "react-joyride";
import styled from "styled-components";

const TooltipBody = styled.div`
  background-color: #daa588;
  min-width: 290px;
  max-width: 420px;
  padding-bottom: 3rem;
`;

const TooltipContent = styled.div`
  color: #fff;
  padding: 20px;
`;

const TooltipTitle = styled.h2`
  color: #fff;
  padding: 20px;
  margin: 0;
`;

const TooltipFooter = styled.div`
  background-color: #f56960;
  display: flex;
  justify-content: flex-end;
  margin-top: 1rem;

  * + * {
    margin-left: 0.5rem;
  }
`;

const Button = styled.button`
  background-color: #e11b0e;
  color: #fff;
`;

const Tooltip = ({
  continuous,
  backProps,
  closeProps,
  index,
  primaryProps,
  setTooltipRef,
  step,
}: any) => (
  <TooltipBody ref={setTooltipRef}>
    {step.title && <TooltipTitle>{step.title}</TooltipTitle>}
    {step.content && <TooltipContent>{step.content}</TooltipContent>}
    <TooltipFooter>
      {index > 0 && <Button {...backProps}>back</Button>}
      {continuous && <Button {...primaryProps}>next</Button>}
      {!continuous && <Button {...closeProps}>close</Button>}
    </TooltipFooter>
  </TooltipBody>
);

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
              <h2>Let's start the tour!</h2>
              <button style={{ backgroundColor: "#000", color: "#fff" }}>
                Add a new step
              </button>
            </div>
          ),
          disableBeacon: true,
        },
        {
          target: ".second-step",
          content: "This another awesome feature!",
        },
      ],
      locale: {
        back: "Kembali",
        exit: "Saya Mengerti",
        skip: "Tutup",
        next: "Selanjutnya",
      },
    };
  }

  handleClickStart = (e: any) => {
    e.preventDefault();

    this.setState({
      run: true,
    });
  };

  render() {
    const { steps, run, locale } = this.state as any;
    return (
      <div className="App">
        <div className="btn second-step" onClick={this.handleClickStart}>
          React Joyride test
        </div>
        <Joyride
          continuous
          disableCloseOnEsc
          showSkipButton
          disableOverlayClose
          // disableBeacon
          locale={locale}
          steps={steps}
          run={run}
          styles={{
            options: {
              zIndex: 10000,
              backgroundColor: "blue",
            },
          }}
        />
      </div>
    );
  }
}
