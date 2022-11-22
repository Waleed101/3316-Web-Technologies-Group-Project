import { React, useState, useEffect } from 'react';
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
import Playlist from '../components/Playlist.jsx';

let url = require("../setup/api.setup.js")

function DisplayPlaylists() {

    const [cookies, setCookie, removeCookie] = useCookies(["user"])

    const [playlists, setPlaylists] = useState([])


    useEffect(() => {

        fetch(`${url}api/list?user=${cookies['user'].email}`)
            .then(res => res.json())
                .then(res => {
                    let temp = []

                    console.log(res)

                    res.forEach(row => {
                        temp.push(<Playlist vals={row}></Playlist>)
                    })

                    setPlaylists(temp)
                })
    }, [])

    if (cookies["user"]) {
        if (cookies["user"].timeToExpire < Date.now()) {
            return <Navigate to='/login?rdr=playlists' />
        }
    } else {
        return <Navigate to='/login?rdr=playlists' />
    }

    return (
        <>
            {playlists}
        </>
    );
}

export default DisplayPlaylists;