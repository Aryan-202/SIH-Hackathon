import React from 'react';
import {useGoogleLogin} from '@react-oauth/google';

const LoginPage = () => {

  const googleLogin = useGoogleLogin({
    onSuccess: ()=>{},
    onError: ()=>{},
    flow: 'auth-code'
  })



  return (
    <div>
      <button
      onClick={googleLogin}
      >
        login with google
      </button>
    </div>
  )
}

export default LoginPage
