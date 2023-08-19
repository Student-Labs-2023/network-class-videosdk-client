import { useState, useEffect } from 'react';

export function useUserData() {
    const [user, setUser] = useState({});
    const email = localStorage.getItem("email");

    function getUser() {
        fetch(`https://network-class-server.ru/users/${email}`, {
            method : 'GET',
            headers: {
              'Content-type': 'application/json',
            },
          })
          .then(response => response.text())
          .then(response => {
              response = JSON.parse(response);
              setUser(response);
          })
    }

    useEffect(() => {
        getUser();
    }, [])

    return user;
}