import React, { useContext } from "react"

import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography'

import { ProfileContext } from "../pomillen/contexts";


const DisclaimerAlert: React.FC = (props) => {
    const preferences = useContext(ProfileContext)
    const millisSinceLastEula = Date.now() - preferences.settings.lastConfirmedEula
    const isTimeToShowEula = millisSinceLastEula > 0 && millisSinceLastEula / 1000 / 60 / 60 / 24 / 7 - 1 > 0

    const [open, setOpen] = React.useState(isTimeToShowEula);

    const handleClose = () => {
        preferences.updateSettings({
            lastConfirmedEula: Date.now(),
        })
        setOpen(false)
    };

    return (
        <Dialog
            fullScreen
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {"End User License Agreement"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    <Typography variant="body2" gutterBottom sx={{ fontStyle: 'italic' }}>
                        DISCLAIMER: This is not a tool. It is a toy. It tries to give you a rough
                        estimate of your blood alcohol content but it cannot be used to draw any
                        conclusion about your state. There are also good chances that there are
                        severe bugs that cause the states values to be way off. Most importantly
                        never drink and drive, not even the next day.
                    </Typography>

                    <Typography variant="h5" mt={3}>
                        MIT License
                    </Typography>

                    <Typography variant="body1" gutterBottom>
                        Copyright (c) 2022 Tobias Ritzau
                    </Typography>

                    <Typography variant="body2" gutterBottom>
                        Permission is hereby granted, free of charge, to any person obtaining a copy
                        of this software and associated documentation files (the "Software"), to deal
                        in the Software without restriction, including without limitation the rights
                        to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
                        copies of the Software, and to permit persons to whom the Software is
                        furnished to do so, subject to the following conditions:
                    </Typography>

                    <Typography variant="body2" gutterBottom>
                        The above copyright notice and this permission notice shall be included in all
                        copies or substantial portions of the Software.
                    </Typography>

                    <Typography variant="body2" gutterBottom>
                        THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
                        IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
                        FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
                        AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
                        LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
                        OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
                        SOFTWARE.
                    </Typography>

                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} autoFocus>I agree</Button>
            </DialogActions>
        </Dialog>
    )
}

export default DisclaimerAlert
