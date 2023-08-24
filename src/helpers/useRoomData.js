import { useState, useEffect } from 'react';
import activeUserSharing from '../meeting/components/Settings/store/activeUserSharing';

export function useRoomData() {
    const [roomData, setRoomData] = useState({});
    const roomId = localStorage.getItem("roomId");

    function getRoom() {
        fetch(`https://network-class-server.ru/channels/${roomId}`, {
            method : 'GET',
            headers: {
              'Content-type': 'application/json',
            },
          })
          .then(response => response.text())
          .then(response => {
              response = JSON.parse(response);
              setRoomData(response);
              activeUserSharing.on(response.presenter_id);
          })
    }

    useEffect(() => {
        getRoom();
    }, [])

    return roomData;
}