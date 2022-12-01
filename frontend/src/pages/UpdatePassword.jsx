import { React, useState } from 'react';
import { useCookies } from 'react-cookie';
import { BrowserRouter, Route, Link } from "react-router-dom";
import { getAuth, updatePassword, onAuthStateChanged } from "firebase/auth";



let url = require("../setup/api.setup.js")


function UpdatePassword() {
    const auth = getAuth();
    const [user, setUser] = useState(null)

    onAuthStateChanged(auth, (user) => {
        if (user) setUser(user)
    })

    console.log(user)

    const [newPassword, setPassword] = useState("")
    const [cookies, setCookie, removeCookie] = useCookies(["user"])

    let loggedInMessage = ""

    if (user) {
        loggedInMessage = <h1>Update password for: {user.email}</h1>
    } else {
        loggedInMessage = <h1>Please login first.</h1>
        return (<li>
            {loggedInMessage}
            <Link to="/">Home</Link>
        </li>)
    }


    const submit = (event) => {
        event.preventDefault();

        updatePassword(user, newPassword).then(() => {
            // Update successful.   
          }).catch((error) => {
            console.log(error)
            return
          });

        let body = JSON.stringify({
                    "newPassword": newPassword,
                    "token" : cookies["user"].token
                })
        
        console.log(url + `api/secure/updatepass/${cookies["user"].email}`)
        fetch(url + `api/secure/updatepass/${cookies["user"].email}`, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: body
        })
        .then(res => res.json())
            .then(res => {
                    if(!res.message) {
                        alert(`Error: ${res.message}`)
                    } else {
                        alert(res.message)
                    }
                })
    }

    

    return (
        <form onSubmit={submit}>
            
            <label> {loggedInMessage}
                <input
                    type = "password"
                    value = {newPassword}
                    onChange = {(e) => setPassword(e.target.value)}
                />
            </label>
            <input type = "submit" />
        </form>
    );
}

export default UpdatePassword;