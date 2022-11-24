import {useState} from 'react'
import {auth} from './firebase'
import {sendEmailVerification} from 'firebase/auth'

function VerifyEmail() {
  const [buttonDisabled, setButtonDisabled] = useState(false)

  const resendEmailVerification = () => {
      setButtonDisabled(true)
      sendEmailVerification(auth.currentUser)
      .then(() => {
        setButtonDisabled(false)
      }).catch((err) => {
        alert(err.message)
        setButtonDisabled(false)
      })
      
    }
  return (
    <button 
  onClick={resendEmailVerification}
  disabled={buttonDisabled}
  >Resend Email</button>
  )
}