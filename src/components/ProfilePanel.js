import React, { useState } from "react";
import styled from "styled-components";
import Select from "../components/buttons/Select";
import { LogoutButton } from "./buttons/LogoutButton";
import avatarIcon from "../icons/camera.svg";
import selectIcon from "../icons/select.svg";
import { EnterProfileButton } from "./buttons/EnterProfileButton";

const Container = styled.div`
  position: relative;
  display: flex;
  width: 279px;
  height: 44px;
  align-items: center;
  gap: 15px;

  &:hover {
    cursor: pointer;
  }
`;

const Paragraph = styled.div`
  font-family: "Noto Sans";
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;

  color: black;
`;

const Avatar = styled.img`
  width: 44px;
  height: 44px;
  border-radius: 10px;
`;

const Text = styled.div`
  display: flex;
  align-items: center;
  width: 180px;
  height: 44px;
  overflow: hidden;
  &:after {
    position: absolute;
    top: 0;
    right: 44px;
    height: 100%;
    width: 50px;
    background: linear-gradient(90deg, transparent 0, #fff 100%);
    content: "";
  }
`;

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 34px;
  height: 34px;
`;

const SelectLink = styled.div`
  color: inherit;

  &:hover {
    cursor: pointer;
  }
`;

const Divider = styled.div`
  margin: 10px 0;
  width: 100%;
  height: 0.5px;
  background: #d5dee8;
`;

const ProfilePanel = () => {
  const [selectActive, setSelectActive] = useState(false);
  // const { user, isAuthenticated } = useAuth0();

  function changeSelectVisibility() {
    setSelectActive(!selectActive);
  }

  return (
    <Container onClick={changeSelectVisibility}>
      <Avatar src={avatarIcon} alt="avatar" />
      <Text>
        {/* {isAuthenticated ? (
          <Paragraph>{user?.name}</Paragraph>
        ) : (
          <Paragraph>Loading...</Paragraph>
        )} */}
        <Paragraph>Loading...</Paragraph>
      </Text>
      <Button>
        <img src={selectIcon} alt="меню" />
      </Button>

      <Select active={selectActive}>
        <SelectLink>
          <EnterProfileButton />
        </SelectLink>
        <Divider></Divider>
        <SelectLink>
          <LogoutButton />
        </SelectLink>
      </Select>
    </Container>
  );
};

export default ProfilePanel;
