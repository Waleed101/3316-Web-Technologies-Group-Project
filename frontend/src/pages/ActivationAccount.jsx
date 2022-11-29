import { React, useState } from 'react';
import { useCookies } from 'react-cookie';
import { BrowserRouter, Route, Link } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import {
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    FormLabel,
    Input,
    Stack,
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    Textarea,
    Switch,
    InputGroup
  } from '@chakra-ui/react'

let url = require("../setup/api.setup.js")


function ActivationAccount() {
    const [email, setEmail] = useState("")

    const submit = (event) => {
        event.preventDefault();
            
        console.log(url + `api/secure/activation/${email}`)
        fetch(url + `api/secure/activation/${email}`, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({"status": document.getElementById("isActivated").checked ? 1 : 2})
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
                Enter Email to Activate/Deactivate:
            </FormLabel>
            <Input
                pr='4.5rem'
                type='email'
                placeholder='Enter email'
                onChange = {(e) => setEmail(e.target.value)}
            />
        </InputGroup>
        <Stack align='center' direction='row'>
                            <FormLabel> Activated: </FormLabel>
                                <Switch size="md" id="isActivated"/> 
        </Stack>
        <Button type = "submit" width="full">
            Submit
        </Button>
    </form>
    )
    
}
export default ActivationAccount;