import React, { useContext, useState } from 'react';
import { Link } from "react-router-dom";
import {
    Divider,

    IconButton,
    Menu,
    MenuItem
} from '@material-ui/core';
import { AuthState } from '@aws-amplify/ui-components';
import { AuthContext } from '../contexts';
import { VikingIcon } from '../icons';

export function MainMenu() {
    const auth = useContext(AuthContext);

    const [anchorElement, setAnchorElement] = useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElement(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorElement(null);
    };

    const handleLogin = (event: React.MouseEvent<HTMLElement>) => {
        auth.setLogIn(true);
        handleClose();
    };

    const isLoggedIn = auth.state === AuthState.SignedIn && Boolean(auth.user);

    return (
        <div>
            <IconButton color='inherit' onClick={handleClick}>
                <VikingIcon />
            </IconButton>

            <Menu
                id="viking-menu"
                anchorEl={anchorElement}
                keepMounted
                open={Boolean(anchorElement)}
                onClose={handleClose}
            >
                <MenuItem component={Link} to='/config' onClick={handleClose}>Profil</MenuItem>
                <MenuItem onClick={handleClose}>Om</MenuItem>
                <Divider />

                {isLoggedIn
                    ? <MenuItem onClick={handleClose}>Logout</MenuItem>
                    : <MenuItem onClick={handleLogin}>Login</MenuItem>}
            </Menu>
        </div>
    );
}
