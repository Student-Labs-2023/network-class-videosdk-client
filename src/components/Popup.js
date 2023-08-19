import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(213, 222, 232, 0.40);
`

const Content = styled.div`
  padding: 30px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 8px;
  background: #fff;
  box-shadow: 0px 0px 2px 0px #c5ccd5;
`

const Popup = ({ active, setActive, children }) => {

  return active ? (
    <Container onClick={() => setActive(false)}>
        <Content onClick={e => e.stopPropagation()}>
            {children}
        </Content>
    </Container>
  ) : null
}

export default Popup;
