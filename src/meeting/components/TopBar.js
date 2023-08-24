import React from "react";
import styled from "styled-components";
import { useMeeting } from "@videosdk.live/react-sdk";
import { useRoomData } from "../../helpers/useRoomData";
import { CopyLink } from "../../components/buttons/CopyLink";

const Container = styled.div`
  display: flex;
  width: 100%;
  flex: 0 0;
  align-items: center;
  padding: 16px 87px 11px 60px;
`;

const Info = styled.div`
  display: grid;
  grid-template-columns: repeat(2, max-content);
  gap: 0 14px;
  align-items: center;
  margin-right: -8px;
`;

const Title = styled.h1`
  /* font-family: var(--font); */
  font-size: 24px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const Paragraph = styled.p`
  /* font-family: var(--font); */
  font-size: 14px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
`;

const styleSwitch = {
  width: "84px",
  height: "48px",
  borderRadius: "35px",
};

const TopBar = () => {
  const { participants, meetingId } = useMeeting();
  const room = useRoomData();

  return (
    <Container>
      <Info>
        <Title>{room.title}</Title>
        <div></div>
        <Paragraph>{participants?.size} участников</Paragraph>
      </Info>
      <button
        onClick={() => navigator.clipboard.writeText(meetingId)}
        style={{
          width: "34px",
          height: "34px",
          position: "relative",
          top: "-5px",
        }}
      >
        <CopyLink />
      </button>
    </Container>
  );
};

export default TopBar;
