import React, { useState } from "react";
import styled from "styled-components";
import Tooltip from "./Tooltip";

let Path = styled.path``;

let Button = styled.button`
  transition: all 0.3s ease;
  &:hover path {
    stroke: #175ef1;
  }
`;

export const CopyLink = () => {
  const [tooltipActive, setTooltipActive] = useState(false);

  function copyLink() {
    setTooltipActive(true);
    Path = styled.path`
      stroke: #175ef1;
    `;
    setTimeout(() => {
      setTooltipActive(false);
      Path = styled.path`
        stroke: #7e8a98;
      `;
    }, 1500);
  }

  return (
    <Tooltip active={tooltipActive} message="Ссылка скопирована!">
      <Button onClick={copyLink}>
        <svg
          width="18"
          height="26"
          viewBox="0 0 18 26"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g
            id="align-back-1--back-design-layer-layers-pile-stack-arrange-square"
            clipPath="url(#clip0_202_644)"
          >
            <g id="align-back-1--back-design-layer-layers-pile-stack-arrange-square_2">
              <Path
                id="Vector"
                d="M12.8571 0.928711H1.92857C1.21849 0.928711 0.642857 1.76018 0.642857 2.78585V18.5716C0.642857 19.5973 1.21849 20.4287 1.92857 20.4287H12.8571C13.5672 20.4287 14.1429 19.5973 14.1429 18.5716V2.78585C14.1429 1.76018 13.5672 0.928711 12.8571 0.928711Z"
                stroke="#7E8A98"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <Path
                id="Vector_2"
                d="M17.3571 6.5V23.2143C17.3571 23.7068 17.2216 24.1793 16.9806 24.5275C16.7395 24.8757 16.4124 25.0714 16.0714 25.0714H4.5"
                stroke="#7E8A98"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
          </g>
          <defs>
            <clipPath id="clip0_202_644">
              <rect width="18" height="26" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </Button>
    </Tooltip>
  );
};
