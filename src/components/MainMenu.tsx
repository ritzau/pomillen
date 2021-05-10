import React, { useContext, useState } from "react"

import { Link } from "react-router-dom"

import {
    Divider,
    IconButton,
    Menu,
    MenuItem
} from "@material-ui/core"

import { AuthState } from "@aws-amplify/ui-components"
import Auth from "@aws-amplify/auth"

import { AuthContext } from "../pomillen/contexts"
import { VikingIcon } from "../icons"


export default function MainMenu() {
    const auth = useContext(AuthContext)

    const [anchorElement, setAnchorElement] = useState<null | HTMLElement>(null)

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElement(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorElement(null)
    }

    const handleLogin = (_event: React.MouseEvent<HTMLElement>) => {
        auth.setLogIn(true)
        handleClose()
    }

    const handleLogout = (_event: React.MouseEvent<HTMLElement>) => {
        auth.setLogIn(false)
        Auth.signOut()
        handleClose()
    }

    const isLoggedIn = auth.state === AuthState.SignedIn && Boolean(auth.user)
    const username = auth.user?.attributes?.nickname ?? ""

    return (
        <div>
            <IconButton color="inherit" onClick={handleClick}>
                <VikingIcon />
            </IconButton>

            <Menu
                id="viking-menu"
                anchorEl={anchorElement}
                keepMounted
                open={Boolean(anchorElement)}
                onClose={handleClose}
            >
                <MenuItem component={Link} to="/config" onClick={handleClose}>Profil</MenuItem>
                <MenuItem onClick={handleClose}>Om</MenuItem>
                <Divider />

                {isLoggedIn
                    ? <MenuItem onClick={handleLogout}>Logout {username}</MenuItem>
                    : <MenuItem onClick={handleLogin}>Login</MenuItem>}
            </Menu>
        </div>
    )
}
