import React, { useState } from "react";
import styled from "styled-components";
import ArrowLeftIcon from "../../icons/JoinCallPage/ArrowLeftIcon";
import ArrowLeftIconActive from "../../icons/JoinCallPage/ArrowLeftIconActive";
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
      {hover ? <ArrowLeftIconActive /> : <ArrowLeftIcon />}
      <Text>назад</Text>
    </Container>
  );
};
