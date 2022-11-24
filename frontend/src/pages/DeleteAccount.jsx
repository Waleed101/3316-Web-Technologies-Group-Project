import { React, useState } from 'react';
import { useCookies } from 'react-cookie';
import { BrowserRouter, Route, Link } from "react-router-dom";
import { getAuth, deleteUser, onAuthStateChanged } from "firebase/auth";



let url = require("../setup/api.setup.js")


function DeleteAccount() {
    const auth = getAuth();
    const [user, setUser] = useState(null)

    
    onAuthStateChanged(auth, (user) => {
        if (user) setUser(user)
    })

    console.log(user)

    const submit = (event) => {
        event.preventDefault();

        console.log(url + `api/secure/delete/${user.email}`)
        fetch(url + `api/secure/delete/${user.email}`, {
            method: "DELETE",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
            .then(res => {
                    if(!res.message) {
                        alert(`Error: ${res.message}`)
                    } else {
                        alert(res.message)
                    }
                })

        deleteUser(user).then(() => {
            // User deleted.
            }).catch((error) => {
            // An error ocurred
            // ...
            alert(error)
            });
        
    }


    if (user) {
        return (
            <button onClick={submit}>Delete Account</button>
        )
    } else {
        return (<li>
            <h1>Please login first.</h1>
            <Link to="/">Home</Link>
        </li>)
    }
}
export default DeleteAccount;