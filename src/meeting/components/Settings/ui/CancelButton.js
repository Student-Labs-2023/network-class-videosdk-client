import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
    color: #5F6A77;
    font-family: Noto Sans;
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
`

const CancelButton = ({ onClick, children }) => {
  return (
    <Button onClick={onClick}>{children}</Button>
  )
}

export default CancelButton;
