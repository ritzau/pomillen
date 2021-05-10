import React, { useState } from "react"

import Amplify from "aws-amplify"
import { 
    AuthState, 
    onAuthUIStateChange, 
} from "@aws-amplify/ui-components"

import { AuthContext, StoreContext } from "../pomillen/contexts"
import App from "./App"
import LocalStoragePomillenStore from "../store/LocalStorageStore"
import LoginPage from "../pages/LoginPage"

import awsConfig from "../aws-exports"


Amplify.configure(awsConfig)

const AuthStateApp: React.FunctionComponent = () => {
    const [authState, setAuthState] = useState<AuthState>()
    const [user, setUser] = useState<object | undefined>()
    const [wantsToLogIn, setWantsToLogIn] = useState(false)

    React.useEffect(() => {
        return onAuthUIStateChange((nextAuthState, authData) => {
            setAuthState(nextAuthState)
            setUser(authData)
        })
    }, [])

    const authContext = { 
        state: authState, 
        user: user, 
        setLogIn: (b: boolean) => setWantsToLogIn(b), 
    }

    const shouldPresentLoginPage = wantsToLogIn && (authState !== AuthState.SignedIn || !user)

    return (
        <StoreContext.Provider value={new LocalStoragePomillenStore()}>
            <AuthContext.Provider value={authContext}>
                {shouldPresentLoginPage ? <LoginPage /> : <App />}
            </AuthContext.Provider>
        </StoreContext.Provider>
    )
}

export default AuthStateApp
