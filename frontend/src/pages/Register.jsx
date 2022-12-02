import { React, useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { useCookies }  from "react-cookie";

let url = require("../setup/api.setup.js")

const auth = getAuth();

function Register() {

    const [email, setEmail] = useState("")
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [cookies, setCookie, removeCookie] = useCookies(["user"])

    const submit = (event) => {
        event.preventDefault();
        console.log("t")
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            console.log("m")    
            // Signed in 
            const user = userCredential.user;
            updateProfile(auth.currentUser, {
                displayName: name 
            })
            console.log(user)
            let body = JSON.stringify({
                "email": email,
                "name": name,
                "password": password
            })
    
    fetch(url + "api/auth/register/", {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: body
    })
    .then(res => res.json())
        .then(res => {
                if(res.message) {
                    alert(`Error: ${res.message}`)
                } else {
                    alert(`Successfully created account with email ${email}`)
                }
            })
            sendEmailVerification(user);
            auth.signOut();
            alert("Email verification sent!")
            
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(error)
            return
            // ..
        });

       
        // alert(`Hi ${name}. Your email and password is ${email} and ${password}`)
    }

    return (
        <form onSubmit={submit}>
            <label> Name:
                <input
                    type = "text"
                    value = {name}
                    onChange = {(e) => setName(e.target.value)}
                />
            </label>
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
    );
}

export default Register;