import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import SwitchButton from './ui/switchButton/SwitchButton';
import { useRoomData } from '../../../helpers/useRoomData';
import webcamState from './store/webcamState';
import screenshareState from './store/screenshareState';
import microState from './store/microState';
import recordState from './store/recordState';

const Container = styled.div`
    width: 520px; 
    padding: 10px 0 30px;
`

const SettingsItem = styled.div`
    padding-bottom: 20px;
`

const Title = styled.div`
  color: #000;
  font-family: "Noto Sans", sans-serif;
  font-size: 20px;
  font-weight: 600;
  line-height: normal;
  margin-top: 20px;
`;

const Setting = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 15px;
  margin-top: 20px;
`;

const SettingText = styled.div`
  color: var(--black, #000);
  font-family: var(--font);
  font-size: 16px;
  font-weight: 400;
  line-height: normal;
`;

const ChannelSettings = () => {
    const [shareSelected, setShareSelected] = useState(false);
    const [camSelected, setCamSelected] = useState(false);
    const [micSelected, setMicSelected] = useState(false);
    const [recordSelected, setRecordSelected] = useState(false);

    const room = useRoomData();

    console.log(room);

    // update data from server
    useEffect(() => {
        // screensharing
        if (room.screenshare_for === 'all') {
            setShareSelected(true);
        } else {
            setShareSelected(false);
        }

        // webcam
        if (room.webcam_for === 'all') {
            setCamSelected(true);
        } 
        if (room.webcam_for === 'owner') {
            setCamSelected(false);
        }

        // micro
        if (room.micro_for === 'all') {
            setMicSelected(true);
        } 
        if (room.micro_for === 'owner') {
            setMicSelected(false);
        }

        // record
        if (room.screenrecord_for === 'all') {
            setRecordSelected(true);
        } 
        if (room.screenrecord_for === 'owner') {
            setRecordSelected(false);
        }
    }, [room])
    // update data from server

    // update form state
    useEffect(() => {
        if (shareSelected) {
            screenshareState.changeForAll();
        } 
        if (!shareSelected) {
            screenshareState.changeForOwner();
        }
    }, [shareSelected]) 

    useEffect(() => {
        if (camSelected) {
            webcamState.changeForAll();
        } 
        if (!camSelected) {
            webcamState.changeForOwner();
        }
    }, [camSelected]) 

    useEffect(() => {
        if (micSelected) {
            microState.changeForAll();
        } 
        if (!micSelected) {
            microState.changeForOwner();
        }
    }, [micSelected]) 

    useEffect(() => {
        if (recordSelected) {
            recordState.changeForAll();
        } 
        if (!recordSelected) {
            recordState.changeForOwner();
        }
    }, [recordSelected]) 
    // update form state

    // console.log(camSelected);

  return (
    <Container>
        <SettingsItem>
            <Title>Демонстрация</Title>
            <Setting>
                <SettingText>
                Разрешить участникам видеть все демонстрации
                </SettingText>
                <SwitchButton selected={shareSelected} setSelected={setShareSelected} />
            </Setting>
            <Setting>
                <SettingText>
                Разрешить участникам выбирать вкладку для показа
                </SettingText>
                <SwitchButton selected={shareSelected} setSelected={setShareSelected} />
            </Setting>
        </SettingsItem>

        <SettingsItem>
            <Title>Камера</Title>
            <Setting>
                <SettingText>Разрешить участникам использовать камеру</SettingText>
                <SwitchButton selected={camSelected} setSelected={setCamSelected} />
            </Setting>
        </SettingsItem>

        <SettingsItem>
            <Title>Микрофон</Title>
            <Setting>
                <SettingText>
                Разрешить участникам использовать микрофон
                </SettingText>
                <SwitchButton selected={micSelected} setSelected={setMicSelected} />
            </Setting>
        </SettingsItem>

        <SettingsItem>
            <Title>Запись</Title>
            <Setting>
                <SettingText>Разрешить участникам записывать встречи</SettingText>
                <SwitchButton selected={recordSelected} setSelected={setRecordSelected} />
            </Setting> 
        </SettingsItem>
    </Container>
  )
}

export default ChannelSettings;
