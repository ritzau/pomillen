import React, { useState } from "react"

import Button from '@mui/material/Button'
import InputAdornment from '@mui/material/InputAdornment'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { TimePicker } from '@mui/x-date-pickers/TimePicker'
import seLocale from 'date-fns/locale/sv'

import { Drink } from "../pomillen/Drink"

interface EditDrinkProps {
    timestamp: number
    volume: string
    percentage: string

    onSave(drink: Drink): void
}

const EditDrinkForm: React.FC<EditDrinkProps> = (props) => {
    const [volumeString, setVolume] = useState(props.volume)
    const [percentageString, setPercentage] = useState(props.percentage)
    const [value, setValue] = useState<Date | null>(new Date(props.timestamp))

    const volume = Number.parseFloat(volumeString)
    const percentage = Number.parseFloat(percentageString)
    const timestamp = value?.getTime() ?? 0
    const disabled = isNaN(volume) || isNaN(percentage) || timestamp === 0

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <TextField
                    fullWidth
                    variant="filled"
                    type="number"
                    label="Hur mycket tänker du bälja i dig?"
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                cl
                            </InputAdornment>
                        ),
                    }}
                    value={volumeString}
                    onChange={e => setVolume(e.target.value)}
                />
            </Grid>

            <Grid item xs={12}>
                <TextField
                    fullWidth
                    variant="filled"
                    type="number"
                    label="Hur stark är drickan?"
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                %
                            </InputAdornment>
                        ),
                    }}
                    value={percentageString}
                    onChange={e => setPercentage(e.target.value)}
                />
            </Grid>

            <Grid item xs={12}>
                <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={seLocale}>
                    <TimePicker
                        label="När skedde detta?"
                        value={value}
                        onChange={(newValue) => {
                            setValue(newValue)
                        }}
                        renderInput={(params) => <TextField fullWidth variant="filled" {...params} />}
                    />
                </LocalizationProvider>
            </Grid>

            <Grid item xs justifyContent="center" display="flex">
                <Button
                    variant="contained"
                    disabled={disabled}
                    onClick={() => props.onSave(new Drink(timestamp, volume, percentage))}
                >
                    Spara
                </Button>
            </Grid>
        </Grid>
    )
}

export default EditDrinkForm
