import React from "react";
import styled from "styled-components";

const Container = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  z-index: 1;

  padding: 20px 16px 16px;
  border-radius: 10px;
  background: white;
  box-shadow: 5px 5px 10px 0px #d5dee8;
  transition: all 0.3s ease;

  &:hover {
    cursor: default;
  }
`;

const Content = styled.div``;

const Select = ({ children, active }) => {
  return (
    <Container
      style={
        active
          ? { opacity: 1, visibility: "visible" }
          : { opacity: 0, visibility: "hidden" }
      }
    >
      <Content>{children}</Content>
    </Container>
  );
};

export default Select;
