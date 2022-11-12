import React from 'react';
import { useCookies }  from "react-cookie";

function Home() {
    const [cookies, setCookie, removeCookie] = useCookies(["user"])

    return (
        <div id="main">
            <button onClick={() => {
                alert(`User cookie is ${JSON.stringify(cookies["user"])}`)
            }}>Show User Cookie</button>

            <button onClick={() => {
                removeCookie("user")
                console.log("Removed user cookie.")
            }}>Remove User Cookie</button>
        </div>
    );
}

export default Home;