import { React, useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { 
    Button, 
    Input,
    InputGroup,
    InputRightElement,
    FormLabel,
    useToast
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
    const toast = useToast()
    const [cookies, setCookie, removeCookie] = useCookies(["user"])


    const submit = (event) => {
        event.preventDefault();
            
        // console.log(url + `api/admin/setAdmin/${email}`)
        fetch(url + `api/admin/setAdmin/${email}`, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': cookies["user"].token
            },
        })
        .then(res => res.json())
            .then(res => {
                    if(!res.message) {  
                        toast({
                            title: `Failed to Grant Admin Access`,
                            description: res.message,
                            status: 'error',
                            duration: 10000,
                            isClosable: true,
                        })
                    } else {
                        toast({
                            title: `${email} now has Admin Access`,
                            description: res.message,
                            status: 'success',
                            duration: 5000,
                            isClosable: true,
                        })
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