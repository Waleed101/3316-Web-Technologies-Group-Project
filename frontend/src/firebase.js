// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {
GoogleAuthProvider,
getAuth,
signInWithPopup,
sendSignInLinkToEmail,
signInWithEmailAndPassword,
createUserWithEmailAndPassword,
sendPasswordResetEmail,
signOut
} from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBhLLPfBl5moGoaUBeGfGrfHnt2LkQQbTg",
  authDomain: "se3316-lab4-159af.firebaseapp.com",
  projectId: "se3316-lab4-159af",
  storageBucket: "se3316-lab4-159af.appspot.com",
  messagingSenderId: "40256693583",
  appId: "1:40256693583:web:46c2d7916aa2850e3c913a"
};

let url = require("./setup/api.setup.js")

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();
const signInWithGoogle = async () => {
    console.log("t")

  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    let body = JSON.stringify({
        "email": user.email,
        "password": user.uid
    })

return await fetch(url + "api/auth/", {
method: "POST",
headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
},
body: body
})
.then(res => res.json())
.then(async res => {
        if(res.message) {
            let body = JSON.stringify({
                "email": user.email,
                "password": user.uid,
                "name": user.displayName
            })
            fetch(url + "api/auth/register/", {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: body
            })
            .then(res => res.json())
                .then(res => {
                    console.log(res)
                        if(res.message) {
                            alert(`Error: ${res.message}`)
                        } else {
                            alert(`Successfully created account with email ${user.email}`)
                            return res
                        }
                    })
        } else {
            console.log(res)
            alert(`Successfully logged in with email ${user.email}`)
            return res
        }
    })

  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

export {
    auth,
    signInWithGoogle,
  };

  