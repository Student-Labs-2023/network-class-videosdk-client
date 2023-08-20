import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import SwitchButton from './ui/switchButton/SwitchButton';
import { useRoomData } from '../../../helpers/useRoomData';

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

    useEffect(() => {
        setShareSelected(room.screenshare_for);
        setCamSelected(room.webcam_for);
        setMicSelected(room.micro_for);
        setRecordSelected(room.screenrecord_for);
    }, [room])

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
