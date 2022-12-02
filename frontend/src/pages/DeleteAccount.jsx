import { React, useState } from 'react';
import { useCookies } from 'react-cookie';
import { BrowserRouter, Route, Link } from "react-router-dom";
import { getAuth, deleteUser, onAuthStateChanged } from "firebase/auth";

import {
    useToast,
} from '@chakra-ui/react'


let url = require("../setup/api.setup.js")


function DeleteAccount() {
    const auth = getAuth();
    const [user, setUser] = useState(null)

    const toast = useToast()

    
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
                        toast({
                            title: `Error Deleting Account`,
                            description: res.message,
                            status: 'error',
                            duration: 10000,
                            isClosable: true,
                        })
                    } else {
                        toast({
                            title: `Deleted Account.`,
                            description: "Account was deleted successfully.",
                            status: 'success',
                            duration: 5000,
                            isClosable: true,
                        })
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