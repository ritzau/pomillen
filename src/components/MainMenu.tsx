import React, { useState } from "react"

import { Link } from "react-router-dom"

import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'

import { VikingIcon } from "../icons"


export default function MainMenu() {
    const [anchorElement, setAnchorElement] = useState<null | HTMLElement>(null)

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElement(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorElement(null)
    }

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
                <MenuItem component={Link} to="/about" onClick={handleClose}>Om</MenuItem>
            </Menu>
        </div>
    )
}
