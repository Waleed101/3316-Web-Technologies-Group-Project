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
import { getAuth, signInWithEmailAndPassword, sendEmailVerification, signOut } from "firebase/auth";
let url = require("../setup/api.setup.js")
const auth = getAuth();


function Login() {

    const [email, setEmail] = useState("")
    // const [user, setUser] = useState(null)
    const [password, setPassword] = useState("")
    const [tempEmail, setTempEmail] = useState("")
    const [tempPassword, setTempPassword] = useState("")
    const [cookies, setCookie, removeCookie] = useCookies(["user"])
    const { state } = useLocation() 
    const navigate = useNavigate()
    const [resendBtn, setResendBtn] = useState("")


    const route = new URLSearchParams(useLocation().search).get("rdr")
    console.log(route)

    const [show, setShow] = useState(false)
    const handleClick = () => setShow(!show)  
    const resend = () => {
        console.log(tempEmail, tempPassword)
        signInWithEmailAndPassword(auth, tempEmail, tempPassword)
        .then((userCredential) => {
            const user = userCredential.user
            alert(user.emailVerified)
        sendEmailVerification(user)
        alert("Email verification link sent!")
        auth.signOut()
        })
    }
    const submit = (event) => {
        event.preventDefault();

        if (!email && !password) {
            alert("Please enter an email and password")
        } else if (!email){
            alert("Please enter an email")
        } else if (!password) {
            alert("Please enter a password")
        }

        if (!(email && password))
            return
            
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
                console.log(res)
                signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user
            alert(user.emailVerified)

            if (user.emailVerified) {
            // Signed in 
                console.log(userCredential.user)
                
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
            } else {
                console.log(email,password)
                setTempEmail(email)
                setTempPassword(password)
                auth.signOut()
                alert("Please verify your email before attempting to log in")
                setResendBtn(<Button onClick={resend}>Resend Email Verification Link</Button>)
                console.log(tempEmail)
            }
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorMessage)
        });

        // DELETE ONCE YOU UNCOMMENT EMAIL VERIFICATION
                    
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
        {resendBtn}
    </div>
        
    );
}

export default Login;