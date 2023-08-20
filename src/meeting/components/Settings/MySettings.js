import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Input from './ui/Input';
import { useUserData } from '../../../helpers/useUserData';

const Container = styled.div`
    margin: 30px 0;
`

const MySettings = () => {
    const [name, setName] = useState('');
    const user = useUserData();

    useEffect(() => {
        setName(user.full_name);
      }, [user])
  return (
    <Container>
        <Input type='text' value={name} onChange={(e) => setName(e.target.value)}/>
    </Container>
  )
}

export default MySettings