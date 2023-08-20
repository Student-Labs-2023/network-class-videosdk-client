import React from 'react';
import styled from 'styled-components';
import { useUserData } from '../../../helpers/useUserData';

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    width: 100%;
    padding-bottom: 20px;
    border-bottom: 0.5px solid #d5dee8;
`

const Header = () => {
    const user = useUserData();

    function openMySettings() {}

    function openChannelSettings() {}

  return (
    <Container>
        <button onClick={openMySettings} style={{ color: "#175EF1" }}>Мои настройки</button>
        {user.role === 'owner' ? <button onClick={openChannelSettings} style={{ color: "#175EF1" }}>Настройки класса</button> : null}
        {user.role === 'admin' ? <button onClick={openChannelSettings} style={{ color: "#175EF1" }}>Настройки класса</button> : null}
    </Container>
  )
}

export default Header