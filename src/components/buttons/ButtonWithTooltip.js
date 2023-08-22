import React, { useRef, useState } from "react";
import { createPopper } from "@popperjs/core";
import { styled } from "styled-components";
import { Constants } from "@videosdk.live/react-sdk";

const ButtonWithTooltipLayout = styled.button`
  display: flex;
  width: 46px;
  height: 46px;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0px 0px 2px 0px #c5ccd5;
`;

export const ButtonWithTooltip = ({
  onClick,
  onState,
  OnIcon,
  OffIcon,
  mic,
  meetingMode,
}) => {
  const [tooltipShow, setTooltipShow] = useState(false);
  const btnRef = useRef();
  const tooltipRef = useRef();

  const openTooltip = () => {
    createPopper(btnRef.current, tooltipRef.current, {
      placement: "top",
    });
    setTooltipShow(true);
  };
  const closeTooltip = () => {
    setTooltipShow(false);
  };

  return (
    <>
      <div>
        <ButtonWithTooltipLayout
          ref={btnRef}
          onMouseEnter={openTooltip}
          onMouseLeave={closeTooltip}
          onClick={onClick}
          disabled={meetingMode === Constants.modes.VIEWER}
        >
          {onState ? (
            <OnIcon fillcolor={onState ? "#050A0E" : "#F95A39"} />
          ) : (
            <OffIcon fillcolor={onState ? "#050A0E" : "#F95A39"} />
          )}
        </ButtonWithTooltipLayout>
      </div>
      <div
        style={{ zIndex: 999 }}
        className={`${
          tooltipShow ? "" : "hidden"
        } overflow-hidden flex flex-col items-center justify-center pb-1.5`}
        ref={tooltipRef}
      >
        <div className={"rounded-md p-1.5 bg-black "}>
          <p className="text-base text-white ">
            {onState
              ? `Turn off ${mic ? "mic" : "webcam"}`
              : `Turn on ${mic ? "mic" : "webcam"}`}
          </p>
        </div>
      </div>
    </>
  );
};
