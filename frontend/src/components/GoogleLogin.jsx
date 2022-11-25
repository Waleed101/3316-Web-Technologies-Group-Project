import { React, useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { Link, useNavigate } from "react-router-dom";
import { auth, signInWithGoogle } from "../firebase.js";
import { useAuthState } from "react-firebase-hooks/auth";

let url = require("../setup/api.setup.js")

function GoogleLogin(props) {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [cookies, setCookie, removeCookie] = useCookies(["user"])
    const navigate = useNavigate()

    const submit = async () => {
        let cookie = await signInWithGoogle()
        console.log(cookie)
        navigate(props.vals.redirectTo)                   
    }
    console.log(props.vals)
//   const navigate = useNavigate();
//   useEffect(() => {
//     if (loading) {
//       // maybe trigger a loading screen
//       return;
//     }
//     if (user) navigate("/");
//   }, [user, loading]);

    return (
        <div>
            <button className="login__btn login__google" onClick={submit}>
          Login with Google
        </button>
    </div>
        
    );
}

export default GoogleLogin;