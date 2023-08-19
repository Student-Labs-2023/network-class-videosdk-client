import { useState, useEffect } from 'react';

export function useUserData() {
    const [user, setUser] = useState({});
    const email = localStorage.getItem("email");
    const roomId = localStorage.getItem("roomId");

    function getUser() {
        fetch(`https://network-class-server.ru/users/setting_user_channel/${email}?channel_id=${roomId}`, {
            method : 'GET',
            headers: {
              'Content-type': 'application/json',
            },
          })
          .then(response => response.text())
          .then(response => {
              response = JSON.parse(response);
              console.log(response);
              setUser(response);
          })
    }

    useEffect(() => {
        getUser();
    }, [])

    return user;
}