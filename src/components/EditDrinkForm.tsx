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
                    label="Hur mycket"
                    placeholder="Hur mycket tänker du bälja i dig?"
                    aria-label="Dryckens volym i centiliter"
                    type="number"
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                cl
                            </InputAdornment>
                        ),
                        // XXX min: "0",
                    }}
                    value={volumeString}
                    onChange={e => setVolume(e.target.value)}
                />
            </Grid>

            <Grid item xs={12}>
                <TextField
                    fullWidth
                    label="Hur stark"
                    placeholder="Hur stark är drycken?"
                    aria-label="Dryckens alkolholhalt i procent"
                    type="number"
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                %
                            </InputAdornment>
                        ),
                        // XXX min: "0",
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
                        renderInput={(params) => <TextField fullWidth {...params} />}
                    />
                </LocalizationProvider>
            </Grid>

            <Grid item xs={12}>
                <Button
                    variant="contained"
                    fullWidth
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
