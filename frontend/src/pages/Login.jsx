import { React, useState } from 'react';
import { useCookies } from 'react-cookie';

let url = require("../setup/api.setup.js")

function Login() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [cookies, setCookie, removeCookie] = useCookies(["user"])

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
                console.log(res)
                    if(res.message) {
                        alert(`Error: ${res.message}`)
                    } else {
                        setCookie("user", res, { path: "/" })
                        alert(`Successfully logged in with email ${email}`)
                    }
                })
    }

    return (
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
    );
}

export default Login;