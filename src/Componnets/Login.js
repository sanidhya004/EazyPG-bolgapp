import React from 'react'
import './login.css'
import { Button } from '@mui/material'
import { auth,provider } from '../firbase-config'
import {signInWithPopup} from 'firebase/auth'
import {useNavigate} from 'react-router-dom'
export const Login = (props) => {
    let navigate=useNavigate();
    const SigninWithGoogle=()=>{
        
         signInWithPopup(auth,provider).then((result)=>{
            localStorage.setItem("isAuth",true);
            var user= result.user;
            const photoURL = user.photoURL;
            const email=user.email;
            const displayName = user.displayName;
            localStorage.setItem("photo",photoURL);
            localStorage.setItem("name",displayName);
            localStorage.setItem("email",email);
            props.setIsAuth(true)
            window.location.reload()
         })
        
    }

    const refreshPage = ()=>{
        window.location.reload();
     }
    const [message,setMessage]=React.useState('Login')
  return (
     <div className="loginpage">
         <p>Sign In With Google</p>
         <Button onClick={SigninWithGoogle} variant='contained' fullWidth className='btn' color="success">{message}</Button>
     </div>
  )
}
