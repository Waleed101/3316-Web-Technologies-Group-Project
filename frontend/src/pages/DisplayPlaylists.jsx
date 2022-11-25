import { React, useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import  { Navigate } from 'react-router-dom'
import  { useNavigate } from 'react-router-dom'
import { getAuth, onAuthStateChanged, signOut} from "firebase/auth";
import "../firebase.js"

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
    const navigate = useNavigate()
    const auth = getAuth();
    const [user, setUser] = useState(null)

    useEffect(() => {
onAuthStateChanged(auth, (user) => {
        if (user) {
            setUser(user)
        fetch(`${url}api/list?user=${user.email}`)
                .then(res => res.json())
                    .then(res => {
                        let temp = []

                        console.log(res)

                        res.forEach(row => {
                            temp.push(<Playlist vals={row}></Playlist>)
                        })

                        setPlaylists(temp)
                    })
            
            } else {
            console.log("Redirecting...")
            navigate('/login', { state: {redirectTo: '/playlists'} })
        }
    })
    }, [])
    

    const [playlists, setPlaylists] = useState([])

    const redirect = false

    


    return (<>{playlists}</>)
}

export default DisplayPlaylists;