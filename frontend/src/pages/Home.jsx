import React, {useState} from 'react';
import { useCookies }  from "react-cookie";
import { getAuth, onAuthStateChanged, signOut} from "firebase/auth";
import "../firebase.js"


function Home() {
    const [cookies, setCookie, removeCookie] = useCookies(["user"])

    let name = ""
    const auth = getAuth();
    const [user, setUser] = useState(null)

    onAuthStateChanged(auth, (user) => {
        if (user) setUser(user)
    })

    if (user) {
        name = <h1>Hi {user.displayName}</h1>
    } else {
        name = <h1>Uh oh. No name for you.</h1>
    }

    return (
        <div id="main">
            {name}

            <button onClick={() => {
                console.log(user)
            }}>Show User Cookie</button>

            <button onClick={() => {
                signOut(auth).then(() => alert("Successfully Logged Out"))
                removeCookie("user")
            }}>Log-out</button>
        </div>
    );
}

export default Home;