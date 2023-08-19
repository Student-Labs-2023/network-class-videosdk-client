import React from 'react';
import styled from 'styled-components';
import { useMeeting } from "@videosdk.live/react-sdk";
import { useRoomData } from '../../helpers/useRoomData';

const Container = styled.div`
  display: flex;
  width: 100%;
  max-width: 1320px;
  height: 57px;
  align-items: center;
  margin: 16px auto 11px;
`;

const Info = styled.div`
  display: grid;
  grid-template-columns: repeat(2, max-content);
  gap: 0 14px;
  align-items: center;
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
  const { participants } = useMeeting();
  const room = useRoomData();

  return (
    <Container>
        <Info>
            <Title>{room.title}</Title>
            <div></div>
            <Paragraph>{participants?.size} участников</Paragraph>
        </Info>
    </Container>
  )
}

export default TopBar;
