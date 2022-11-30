import { React, useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import  { Navigate } from 'react-router-dom'
import  { useNavigate } from 'react-router-dom'
import { getAuth, onAuthStateChanged, signOut} from "firebase/auth";
import "../firebase.js"

import { 
    Alert,
    AlertIcon,
    Link,
    Text,
 } from '@chakra-ui/react'

import Playlist from '../components/Playlist.jsx';

import {
} from '@chakra-ui/icons'

let url = require("../setup/api.setup.js")



function DisplayPublicPlaylists() {
    const navigate = useNavigate()
    const auth = getAuth();
    const [user, setUser] = useState(null)
    const [playlists, setPlaylists] = useState([])


        useEffect(() => {
            if (!user) {
            fetch(`${url}api/list/public/`)
            .then(res => res.json())
                .then(res => {
                    let temp = []

                    res.forEach(row => {
                        temp.push(<Playlist vals={row}></Playlist>)
                    })

                    setPlaylists(temp)
                })
            }
        }, [user])
    

// onAuthStateChanged(auth, (user) => {
//         if (user) {
//             setUser(user)
//             } else {
//             navigate('/login', { state: {redirectTo: '/public/playlists'} })
//         }
//     })
    


//     const redirect = false

    return (
        playlists == [] ?
            <>
                <Alert status='warning'>
                    <AlertIcon />
                    <Text>
                        Uh oh! Seems like you haven't created any Playlists yet. Navigate over to the <Link href="/search" color='teal.500'> Search</Link> page to get started.
                    </Text>
                </Alert>
            </>
        :
            <>{playlists}</>
        
    )
}

export default DisplayPublicPlaylists;