import React, {useState} from 'react';
import { useCookies }  from "react-cookie";
import { getAuth, onAuthStateChanged, signOut} from "firebase/auth";
import "../firebase.js"


import { Button } from '@chakra-ui/react'

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
        <>
            {name}

            <Button onClick={() => {
                console.log(user)
            }}>Show User Cookie</Button>

            <Button onClick={() => {
                signOut(auth).then(() => alert("Successfully Logged Out"))
                removeCookie("user")
                console.log("Removed user cookie.")
            }}>Log-out</Button>
        </>
    );
}

export default Home;