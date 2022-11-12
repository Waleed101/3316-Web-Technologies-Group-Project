import React from 'react';
import { useCookies }  from "react-cookie";

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
        <div id="main">
            {name}

            <button onClick={() => {
                alert(`User cookie is ${JSON.stringify(cookies["user"])}`)
            }}>Show User Cookie</button>

            <button onClick={() => {
                removeCookie("user")
                console.log("Removed user cookie.")
            }}>Log-out</button>
        </div>
    );
}

export default Home;