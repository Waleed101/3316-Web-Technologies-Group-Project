import React from 'react';
import { useCookies }  from "react-cookie";

import { Button } from '@chakra-ui/react'

function Home() {
    const [cookies, setCookie, removeCookie] = useCookies(["user"])

    let name = ""

    if (cookies["user"]) {
        if (cookies["user"].timeToExpire < Date.now()) {
            name = <h1>Uh oh. No name for you.</h1>
            alert("Cookie is expired.")
        } else {
            name = <h1>Hi {cookies["user"].name}</h1>
        }
    } else {
        name = <h1>Uh oh. No name for you.</h1>
        alert("Cookie is expired.")
    }

    return (
        <>
            {name}

            <Button onClick={() => {
                alert(`User cookie is ${JSON.stringify(cookies["user"])}`)
            }}>Show User Cookie</Button>

            <Button onClick={() => {
                removeCookie("user")
                console.log("Removed user cookie.")
            }}>Log-out</Button>
        </>
    );
}

export default Home;