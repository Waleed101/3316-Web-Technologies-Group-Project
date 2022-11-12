import { React, useState } from 'react';

let url = require("../setup/api.setup.js")

function Register() {

    const [email, setEmail] = useState("")
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")

    const submit = (event) => {
        event.preventDefault();

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
                console.log(res)
                    if(res.message) {
                        alert(`Error: ${res.message}`)
                    } else {
                        alert(`Successfully created account with email ${email}`)
                    }
                })
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