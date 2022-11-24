import { React, useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { Link, useNavigate } from "react-router-dom";
import { signInWithGoogle } from "../firebase.js";
import { useAuthState } from "react-firebase-hooks/auth";
import GoogleLogin from "./GoogleLogin"
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

let url = require("../setup/api.setup.js")
const auth = getAuth();

function Login() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [cookies, setCookie, removeCookie] = useCookies(["user"])

    

    const submit = (event) => {
        event.preventDefault();

        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            console.log(user)
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorMessage)
        });

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
                console.log(res)
                    if(res.message) {
                        alert(`Error: ${res.message}`)
                    } else {
                        setCookie("user", res, { path: "/" })
                        alert(`Successfully logged in with email ${email}`)
                    }
                })
    }

//   const navigate = useNavigate();
//   useEffect(() => {
//     if (loading) {
//       // maybe trigger a loading screen
//       return;
//     }
//     if (user) navigate("/");
//   }, [user, loading]);

    return (
        <div>
        <form onSubmit={submit}>
            <label> Email:
                <input
                    type = "email"
                    value = {email}
                    onChange = {(e) => setEmail(e.target.value)}
                />
            </label>
            <label> Password:
                <input
                    type = "password"
                    value = {password}
                    onChange = {(e) => setPassword(e.target.value)}
                />
            </label>
            <input type = "submit" />
        </form>
        <GoogleLogin />
    </div>
        
    );
}

export default Login;