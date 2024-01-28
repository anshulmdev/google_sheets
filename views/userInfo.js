import React from 'react';
import secrets from '../secrets.json';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';

const defaultScope = [
    'https://www.googleapis.com/auth/plus.me',
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/spreadsheets'
  ];

export const GoogleOAuth = () => {
    return (
        <GoogleOAuthProvider clientId={secrets.REACT_APP_CLIENTID} scope={defaultScope}><GoogleLogin
            onSuccess={credentialResponse => {
                console.log(credentialResponse);
            }}
            onError={() => {
                console.log('Login Failed')
            }}
        /></GoogleOAuthProvider>
    )
}