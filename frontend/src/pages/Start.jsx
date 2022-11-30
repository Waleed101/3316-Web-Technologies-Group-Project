import React, {useState} from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useCookies }  from "react-cookie";
import "../firebase.js"


import { Button} from '@chakra-ui/react'
import { Text } from '@chakra-ui/react'
import Login from './Login.jsx';
import Register from './Register.jsx';


function Start() {
    let navigate = useNavigate();
    const routeChange = () =>{
        let path = '/login'                                                                                                                                                                                                                                                                                                                 
        navigate(path)
    }

    return (
        <>  
            <Text fontSize='20px'>Welcome to the music app! 
                  You will find many features within this app including searching for your favourite music, creating playlists, and viewing public playlists!
                 <br></br> Click the Login button below to get started </Text>

            <Button onClick={() => {
                routeChange();
            }}>Login</Button>
            <Button onClick={() => {

                console.log("Create an Account clicked")
            }}>Create an Account</Button>
        </>
    );
}

export default Start;