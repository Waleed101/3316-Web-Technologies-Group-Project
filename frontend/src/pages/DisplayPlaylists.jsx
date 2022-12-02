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
    Spinner,
 } from '@chakra-ui/react'
import Playlist from '../components/Playlist.jsx';

let url = require("../setup/api.setup.js")



function DisplayPlaylists() {
    const navigate = useNavigate()
    const auth = getAuth();
    const [user, setUser] = useState(null)
    const [playlists, setPlaylists] = useState([<Spinner />])
    const [cookies, setCookie, removeCookie] = useCookies(["user"])

    useEffect(() => {
        console.log("Requesting...")
        getPlaylistData()
    }, [user])

    const getPlaylistData = () => {
        if (user) {
            console.log("User.")
            fetch(`${url}api/secure/list?user=${user.email}`, { 
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': cookies["user"].token
                },
            })
            .then(res => res.json())
                .then(res => {
                    let temp = []

                    console.log(res)
                    res.forEach(row => {
                        temp.push(<Playlist vals={row} refreshPlaylist={getPlaylistData}></Playlist>)
                    })

                    setPlaylists(temp)
                })
        }
    }
    

onAuthStateChanged(auth, (user) => {
        if (user) {
            setUser(user)
        // fetch(`${url}api/secure/list?user=${user.email}`, {
        //     headers: {
        //         'Accept': 'application/json',
        //         'Content-Type': 'application/json',
        //         'Authorization': cookies["user"].token
        //     },
        // }).then(res => res.json())
        //         .then(res => {
        //             let temp = []

        //             console.log(res)

        //             res.forEach(row => {
        //                 temp.push(<Playlist vals={row}></Playlist>)
        //             })

        //             setPlaylists(temp)
        //         })
            
            } else {
            console.log("Redirecting...")
            navigate('/login', { state: {redirectTo: '/playlists'} })
        }
    })
    


    const redirect = false

    


    return (<>{playlists}</>)
}

export default DisplayPlaylists;