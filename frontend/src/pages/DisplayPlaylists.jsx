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



function DisplayPlaylists() {
    const navigate = useNavigate()
    const auth = getAuth();
    const [user, setUser] = useState(null)
    const [playlists, setPlaylists] = useState([])
    const [cookies, setCookie, removeCookie] = useCookies(["user"])

        useEffect(() => {
            if (user) {
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


                    res.forEach(row => {
                        temp.push(<Playlist vals={row}></Playlist>)
                    })

                    setPlaylists(temp)
                })
            }
        }, [user])
    

onAuthStateChanged(auth, (user) => {
        if (user) {
            setUser(user)
            } else {
            navigate('/login', { state: {redirectTo: '/playlists'} })
        }
    })
    


    const redirect = false

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

export default DisplayPlaylists;