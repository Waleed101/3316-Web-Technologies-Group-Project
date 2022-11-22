import { React, useState } from 'react';
import { useCookies } from 'react-cookie';
import  { Navigate } from 'react-router-dom'

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
 } from '@chakra-ui/react'

let url = require("../setup/api.setup.js")

function DisplayPlaylists() {

    const [cookies, setCookie, removeCookie] = useCookies(["user"])

    if (cookies["user"]) {
        if (cookies["user"].timeToExpire < Date.now()) {
            return <Navigate to='/login?rdr=playlists' />
        }
    } else {
        return <Navigate to='/login?rdr=playlists' />
    }

    return (
        <>

        </>
    );
}

export default DisplayPlaylists;