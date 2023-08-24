import React from "react";
import { styled } from "styled-components";
import settingsIcon from "../../icons/setting-mini.svg";

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  gap: 8px;
  align-items: center;
  color: inherit;
`;

const Paragraph = styled.div`
  font-family: "Noto Sans";
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;

  color: black;
`;

export const EnterProfileButton = () => {
  function enterProfile() {
    window.location.href = `${process.env.REACT_APP_NETWORKCLASS_URL}profile`;
  }

  return (
    <Container onClick={enterProfile}>
      <img src={settingsIcon} alt="Настройки" />
      <Paragraph>Настройки профиля</Paragraph>
    </Container>
  );
};
