import React, { useState } from "react";
import styled from "styled-components";
import back from "../../icons/arrow-left.svg";
import backActive from "../../icons/arrow-left-active.svg";
import { useNavigate } from "react-router-dom";

const Container = styled.a`
  margin-bottom: 40px;
  display: inline-flex;
  height: 44px;
  justify-content: center;
  align-items: center;
  gap: 10px;

  &:hover,
  &:active {
    cursor: pointer;
    div {
      color: #175ef1;
    }
  }
`;

const Icon = styled.img`
  width: 26px;
  height: 26px;
`;

const Text = styled.div`
  color: #7e8a98;
  font-family: "Noto Sans";
  font-size: 18px;
  font-weight: 400;
  padding-bottom: 2px;
`;

export const BackButton = () => {
  const nav = useNavigate();
  const [hover, setHover] = useState(false);

  return (
    <Container
      onClick={() => nav(-1)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <Icon src={hover ? backActive : back} />
      <Text>назад</Text>
    </Container>
  );
};
