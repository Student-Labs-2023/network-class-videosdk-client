import { useState, useEffect } from 'react';

export function useUsers() {
    const [users, setUsers] = useState([]);
    const roomId = localStorage.getItem("roomId");

    function getUsers() {
        fetch(`https://network-class-server.ru/user_channels/${roomId}/users/`, {
            method : 'GET',
            headers: {
              'Content-type': 'application/json',
            },
          })
          .then(response => response.text())
          .then(response => {
              response = JSON.parse(response);
              setUsers(response);
          })
    }

    useEffect(() => {
        getUsers();
    }, [])

    return users;
}