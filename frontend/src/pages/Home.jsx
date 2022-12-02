import React, {useState} from 'react';
import { useCookies }  from "react-cookie";
import { getAuth, onAuthStateChanged, reload, signOut} from "firebase/auth";
import "../firebase.js"
import  { useNavigate } from 'react-router-dom'
import { Button } from '@chakra-ui/react'

import { useToast } from "@chakra-ui/react"

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

    

    let adminMode = ""
    console.log(cookies)
    if (cookies['user'] && cookies['user'].role == 2)
        adminMode = <div>
                        <h1>Admin Privileges:</h1>
                        <br />
                        <Button onClick={() => {navigate('/adminActivation')}}>Grant Admin Acess</Button><br /><br />
                        <Button onClick={() => {navigate('/activation')}}>Activate/Deactivate Account</Button><br /><br />
                        <Button onClick={() => {navigate('/adminReviewAccess')}}>Access Reviews</Button><br /><br />

                    </div>
    
            

    
    return (
        <>
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
                window.location.reload(false)
            }}>Log-out</Button>
        </>
    );
}

export default Home;