import React, {useState} from 'react';
import { useCookies }  from "react-cookie";
import { getAuth, onAuthStateChanged, signOut} from "firebase/auth";
import "../firebase.js"
import  { useNavigate } from 'react-router-dom'
import { Button } from '@chakra-ui/react'

function Home() {
    const [cookies, setCookie, removeCookie] = useCookies(["user"])
    const navigate = useNavigate()
    let name = ""
    const auth = getAuth();
    const [user, setUser] = useState(null)

    onAuthStateChanged(auth, (user) => {
        if (user) {
            setUser(user)
            name = <h1>Hi {user.displayName}</h1>
        } else {
            name = <h1>Uh oh. No name for you.</h1>
        }
    })

    

    let adminMode = ""
    console.log(cookies)
    if (cookies['user'] && cookies['user'].role == 2)
        adminMode = <div>
                        <h2>Admin Privileges:</h2>
                        <Button onClick={() => {navigate('/adminActivation')}}>Grant Admin Acess</Button>
                        <Button onClick={() => {navigate('/activation')}}>Activate/Deactivate Account</Button>
                        <Button onClick={() => {navigate('/adminReviewAccess')}}>Access Reviews</Button>

                    </div>
    
            

    
    return (
        <>
            {name}
            {adminMode}
            
            <Button onClick={() => {
                console.log(user)
            }}>Show User Cookie</Button>

            <Button onClick={() => {
                signOut(auth).then(() => alert("Successfully Logged Out"))
                removeCookie("user")
                console.log("Removed user cookie.")
            }}>Log-out</Button>
        </>
    );
}

export default Home;