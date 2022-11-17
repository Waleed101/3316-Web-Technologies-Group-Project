import { React, useState } from 'react';
import { useCookies } from 'react-cookie';
import { 
    Button, 
    Input,
    InputGroup,
    InputRightElement,
    FormLabel
 } from '@chakra-ui/react'

let url = require("../setup/api.setup.js")

function Login() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [cookies, setCookie, removeCookie] = useCookies(["user"])

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
    );
}

export default Login;