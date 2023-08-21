import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
    display: flex;
    height: 44px;
    padding: 10px;
    justify-content: center;
    align-items: center;
    gap: 4px;
    border-radius: 8px;
    border: 1px solid #F90;
    background: #FFF;

    color: #F90;
    font-family: Noto Sans;
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    transition: all .3s ease-in-out;

    &:hover {
      background: #FCEFDC;
    }
`

const SubmitButton = ({ type, onClick, children }) => {
  return (
    <Button type={type} onClick={onClick}>{children}</Button>
  )
}

export default SubmitButton;
