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

function AdminActivation() {
    const [email, setEmail] = useState("")

    const submit = (event) => {
        event.preventDefault();
            
        console.log(url + `api/admin/setAdmin/${email}`)
        fetch(url + `api/admin/setAdmin/${email}`, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
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
            <InputGroup size='md'>
                <FormLabel>
                    Enter Email to Set as Admin:
                </FormLabel>
                <Input
                    pr='4.5rem'
                    type='email'
                    placeholder='Enter email'
                    onChange = {(e) => setEmail(e.target.value)}
                />
            </InputGroup>
            <Button type = "submit" width="full">
                Submit
            </Button>
        </form>
    )
}
export default AdminActivation