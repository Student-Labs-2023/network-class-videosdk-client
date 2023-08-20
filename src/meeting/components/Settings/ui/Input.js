import React from 'react';
import styled from 'styled-components';

const Container = styled.input`
  display: flex;
  width: 100%;
  min-height: 54px;
  padding: 4px 0px 4px 16px;
  align-items: center;
  border-radius: 10px;
  background: #fff;
  border: 1.5px solid #175EF1;
  margin-bottom: 10px;
  color: #000;
  font-family: "Noto Sans", sans-serif;
  font-size: 20px;
  font-weight: 400;
  line-height: 24px;
  letter-spacing: 0.5px;
`;

const Title = styled.label`
  position: absolute;
  top: -9px;
  left: 14px;
  color: var(--blue, #175ef1);
  background: white;
  padding: 0 5px;
  font-family: var(--font);
  font-size: 18px;
  font-weight: 400;
  line-height: 16px;
  letter-spacing: 0.4px;
`;

const Input = ({ type, placeholder, value, onChange,  }) => {
  return (
    <div style={{ position: "relative", marginTop: "8px" }}>
        <Title>Имя в классе</Title>
        <Container type={type} placeholder={placeholder} value={value} onChange={onChange}/>
    </div>
  )
}

export default Input;
