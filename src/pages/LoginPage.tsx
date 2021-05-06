import React, { useContext } from 'react'

import {
    AmplifyAuthenticator,
    AmplifyButton,
    AmplifySignIn
} from '@aws-amplify/ui-react'

import { AuthContext } from '../contexts'
import useStyle from '../theme/styles'

const LoginPage: React.FC = () => {
    const classes = useStyle()
    const auth = useContext(AuthContext)

    return (
        <AmplifyAuthenticator>
            <AmplifySignIn
                hideSignUp={false}
                slot="sign-in"
            >
                <AmplifyButton
                    slot='secondary-footer-content'
                    variant='anchor'
                    handleButtonClick={() => auth.setLogIn(false)}
                    className={classes.signInSecondaryButton}
                >
                    Cancel
                </AmplifyButton>
            </AmplifySignIn>
        </AmplifyAuthenticator>
    )
}

export default LoginPage
