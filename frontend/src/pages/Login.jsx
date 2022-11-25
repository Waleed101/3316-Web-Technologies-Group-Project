import { React, useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { 
    Button, 
    Input,
    InputGroup,
    InputRightElement,
    FormLabel
 } from '@chakra-ui/react'

import { Navigate, useLocation } from 'react-router-dom';
import { Link, useNavigate } from "react-router-dom";
import { signInWithGoogle } from "../firebase.js";
import { useAuthState } from "react-firebase-hooks/auth";
import GoogleLogin from "../components/GoogleLogin"
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";

let url = require("../setup/api.setup.js")
const auth = getAuth();


function Login() {

    const [email, setEmail] = useState("")
    const [user, setUser] = useState(null)
    const [password, setPassword] = useState("")
    const [cookies, setCookie, removeCookie] = useCookies(["user"])
    const { state } = useLocation() 
    const navigate = useNavigate()


    const route = new URLSearchParams(useLocation().search).get("rdr")
    console.log(route)

    const [show, setShow] = useState(false)
    const handleClick = () => setShow(!show)  

    const submit = (event) => {
        event.preventDefault();

        

        let body = JSON.stringify({
                    "email": email,
                    "password": password
                })
        
        fetch(url + "api/auth/", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: body
        })
        .then(res => res.json())
            .then(res => {
                if (res.status == 2) {
                    alert("Account is deactivated, please contact site administrator.")
                    return
                }
                signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            user = userCredential.user
            console.log(user)
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorMessage)
        });
                    if(res.message) {
                        alert(`Error: ${res.message}`)
                    } else {
                        setCookie("user", res, { path: "/" })

                        alert(`Successfully logged in with email ${email}`)
                        console.log(state)
                        if(state) {
                            navigate(state.redirectTo)
                        }                        
                    }
                })
    }
    return (
    <div>
        <form onSubmit={submit}>
            <InputGroup size='md'>
                <FormLabel>
                    Enter Email:
                </FormLabel>
                <Input
                    pr='4.5rem'
                    type='email'
                    placeholder='Enter email'
                    onChange = {(e) => setEmail(e.target.value)}
                />
            </InputGroup>
            <InputGroup size='md'>
                <FormLabel>
                    Enter Password:
                </FormLabel>
                <Input
                    pr='4.5rem'
                    type={show ? 'text' : 'password'}
                    placeholder='Enter password'
                    onChange = {(e) => setPassword(e.target.value)}
                />
                <InputRightElement width='4.5rem'>
                    <Button h='1.75rem' size='sm' onClick={handleClick}>
                    {show ? 'Hide' : 'Show'}
                    </Button>
                </InputRightElement>
            </InputGroup>
            <Button type = "submit" width="full">
                Submit
            </Button>
        </form>
        <GoogleLogin vals={state}/>
    </div>
        
    );
}

export default Login;