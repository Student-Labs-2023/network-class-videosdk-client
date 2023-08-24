import React from "react";
import logoutIcon from "../../icons/logout.svg";
import { styled } from "styled-components";

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

export const LogoutButton = () => {
  //   const { logout } = useAuth0();

  //   function logoutFunc(event) {
  //     event.preventDefault();
  //     logout({ logoutParams: { returnTo: window.location.origin } });
  //   }

  return (
    <Container>
      <img src={logoutIcon} alt="Выйти" />
      <button>
        <Paragraph>Выйти</Paragraph>
      </button>
    </Container>
  );
};
