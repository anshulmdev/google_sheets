import React from 'react';
import secrets from '../secrets.json';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';

export const GoogleOAuth = () => {
    return (
        <GoogleOAuthProvider clientId={secrets.REACT_APP_CLIENTID}><GoogleLogin
            onSuccess={credentialResponse => {
                console.log(credentialResponse);
            }}
            onError={() => {
                console.log('Login Failed')
            }}
        /></GoogleOAuthProvider>
    )
}