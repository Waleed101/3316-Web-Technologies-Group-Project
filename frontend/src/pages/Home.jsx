import React, {useState} from 'react';
import { useCookies }  from "react-cookie";
import { getAuth, onAuthStateChanged, signOut} from "firebase/auth";
import "../firebase.js"
import  { useNavigate } from 'react-router-dom'
import { Button } from '@chakra-ui/react'

import { useToast } from "@chakra-ui/react"
import { Text } from '@chakra-ui/react'

import pdf from './LiamBriggsResume.pdf';

function Home() {
    const [cookies, setCookie, removeCookie] = useCookies(["user"])
    const navigate = useNavigate()
    let name = ""
    const auth = getAuth();
    const [user, setUser] = useState(null)

    const toast = useToast()

    onAuthStateChanged(auth, (user) => {
        if (user) {
            setUser(user)
            name = <h1>Hi {user.displayName}</h1>
        } else {
            name = <h1>Please log in.</h1>
        }
    })

    const onButtonClick = () => {
        // fetch('./LiamBriggsResume.pdf').then(response => {
        //     response.blob().then(blob => {
        //         const fileURL = window.URL.createObjectURL(blob);
        //         console.log(fileURL)
        //         // Setting various property values
        //         let alink = document.createElement('a');
        //         alink.href = fileURL;
        //         alink.download = 'LiamBriggsResume.pdf';
        //         alink.click();
        //     })
        // })
    }

    let adminMode = ""
    console.log(cookies)
    if (cookies['user'] && cookies['user'].role == 2)
        adminMode = <div>
                        <h1>Admin Privileges:</h1>
                        <br />
                        <Button onClick={() => {navigate('/adminActivation')}}>Grant Admin Acess</Button><br /><br />
                        <Button onClick={() => {navigate('/activation')}}>Activate/Deactivate Account</Button><br /><br />
                        <Button onClick={() => {navigate('/adminReviewAccess')}}>Access Reviews</Button><br /><br />
                        <a href={pdf} target="_blank" rel="noreferrer"><Button>DMCA</Button></a> <br /><br />
                        
                    </div>
        
    return (
        <>
        <Text fontSize='20px'>Welcome to the GROOVAY! 
                  You will find many features within this app including searching for your favourite music, creating playlists, and viewing public playlists!
                 <br></br> If you are not signed in click the Login button on the navigation bar to get started </Text>

            {name}
            {adminMode}
            <Button onClick={() => {
                console.log(user)
            }}>Show User Cookie</Button><br /><br />

            <Button onClick={() => {
                signOut(auth).then(() => 
                toast({
                    title: `Logged Out`,
                    description: "Successfully logged out",
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                }))
                removeCookie("user")
                console.log("Removed user cookie.")
            }}>Log-out</Button>
        </>
    );
}

export default Home;