import React from 'react';
import styled from 'styled-components';
import { useUserData } from '../../../helpers/useUserData';
import settingsState from './store/settingsState';

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 42px;
    width: 100%;
    padding-bottom: 20px;
    border-bottom: 0.5px solid #d5dee8;
`

const TitleLink = styled.button`
  color: #5F6A77;
  font-family: "Noto Sans", sans-serif;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`

const Header = () => {
    const user = useUserData();

    function openMySettings() {
      settingsState.openMy();
    }

    function openChannelSettings() {
      settingsState.openChannel();
    }

  return (
    <Container>
        <TitleLink onClick={openMySettings} style={settingsState.state === 'my' ? { color: "#175EF1", fontWeight: 600 } : {}}>Мои настройки</TitleLink>
        {user.role === 'owner' ? <TitleLink onClick={openChannelSettings} style={settingsState.state === 'channel' ? { color: "#175EF1", fontWeight: 600 } : {}}>Настройки класса</TitleLink> : null}
    </Container>
  )
}

export default Header