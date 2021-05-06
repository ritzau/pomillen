import React from 'react'

import { AuthState } from '@aws-amplify/ui-components';

import EbacProfile from './ebac'

export const ProfileContext = React.createContext({
    value: EbacProfile.CreateOtherProfile(88), 
    set: (props: {}) => {},
});

export const AuthContext = React.createContext({
    state: undefined as AuthState | undefined,
    user: undefined as object | undefined, 
    setLogIn: (_: boolean) => {},
});
