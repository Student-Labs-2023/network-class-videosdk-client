import React from "react";
import styled from "styled-components";
import logo from "../icons/logo.svg";
import ProfilePanel from "./ProfilePanel.js";

const Container = styled.div`
  display: flex;
  min-width: 100%;
  height: 92px;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
  padding: 0 92px 0 80px;
  background-color: var(--white);
`;

const Left = styled.div`
  width: 225px;
  display: flex;
  justify-content: space-between;
`;

const Logo = styled.a`
  text-align: center;
  /* font-family: Kino; */
  font-size: 24px;
  font-style: normal;
  font-weight: 400;
  line-height: 1.8;

  color: #175ef1;
`;

const Image = styled.img`
  &:hover {
    cursor: pointer;
  }
`;

const Header = () => {
  function toLobby() {
    window.location.href = `${process.env.REACT_APP_NETWORKCLASS_URL}`;
  }

  return (
    <Container>
      <Left>
        <Image src={logo} alt="" onClick={toLobby} />
        <Logo href={`${process.env.REACT_APP_NETWORKCLASS_URL}`}>
          Сетевой класс
        </Logo>
      </Left>
      <ProfilePanel />
    </Container>
  );
};

export default Header;
