import React from 'react';
import styled from 'styled-components';
import { sideBarModes } from '../../../../utils/common';
import { useMeetingAppContext } from '../../../../MeetingAppContextDef';

const Button = styled.button`
    position: absolute;
    top: 21px;
    right: 0; 
    z-index: 100;

    display: flex;
    width: 48px;
    height: 48px;
    justify-content: center;
    align-items: center;

    border-radius: 10px 0px 0px 10px;
    background: #F90;

    box-shadow: 0px 0px 2px 0px #C5CCD5;
`

export const ShowParticipants = () => {
    const { sideBarMode, setSideBarMode } = useMeetingAppContext();

  return (
    <Button         
        onClick={() => {
            setSideBarMode((s) =>
                s === sideBarModes.PARTICIPANTS ? null : sideBarModes.PARTICIPANTS
            );
        }}
    >
        <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 34 34" fill="none">
            <path d="M11 18C13.2091 18 15 16.2091 15 14C15 11.7909 13.2091 10 11 10C8.79086 10 7 11.7909 7 14C7 16.2091 8.79086 18 11 18Z" stroke="white" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M6 23C6 20.2 8.2 18 11 18C13.8 18 16 20.2 16 23" stroke="white" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M23 23C25.2091 23 27 21.2091 27 19C27 16.7909 25.2091 15 23 15C20.7909 15 19 16.7909 19 19C19 21.2091 20.7909 23 23 23Z" stroke="white" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M18 28C18 25.2 20.2 23 23 23C25.8 23 28 25.2 28 28" stroke="white" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M20 12C21.6569 12 23 10.6569 23 9C23 7.34315 21.6569 6 20 6C18.3431 6 17 7.34315 17 9C17 10.6569 18.3431 12 20 12Z" stroke="white" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
    </Button>
  )
}
