import React, { ReactNode } from "react"

import {
    Typography,
    Paper,
    useTheme,
    Grid,
} from '@material-ui/core'

import clsx from 'clsx'

import useStyles from "../theme/styles";

// @ts-ignore
import GaugeChart from 'react-gauge-chart'
import { clamp } from "../utils";
import classes from "*.module.css";

interface EbacInfoProps {
    ebac: number
    rampedEbac: number
    minutesToGreen: number
}

const EbacInfo: React.FC<EbacInfoProps> = (props) => {
    const classes = useStyles()
    const theme = useTheme()

    const value = Math.min(1.666, props.rampedEbac)
    const peak = Math.min(1.666, props.ebac)
    const message = props.rampedEbac > 1.6 ? '¯\_(ツ)_/¯' : `${value.toFixed(2)} ‰`

    return (
        <div>
            <div style={{position: 'relative'}}>
                <div style={{position: 'relative', zIndex: 10}}>
                    <GaugeChart
                        id={'ebacGauge'}
                        percent={value / 1.6}
                        formatTextValue={() => message}
                        textColor={theme.palette.text.primary}
                        arcsLength={[0.4, 0.2, 0.4, 0.2, 0.4]}
                        colors={["#f00b", "#ff0b", "#0f0b", "#ff0b", "#f00b"]}
                        arcPadding={0.04}
                        cornerRadius={4}

                        animDelay={0}
                        animate={true}
                        />
                </div>
                <div style={{position: 'absolute', left: 0, top: 0, right: 0, bottom: 0, zIndex: 5}} className={clsx(Math.abs(peak - value) < 0.005 && classes.hidden)}>
                    <GaugeChart
                        id={'ebacGauge-peak'}
                        percent={peak / 1.6}
                        colors={["#0000"]}
                        hideText={true}
                        needleColor={'#f808'}
                        animDelay={0}
                        animate={true}
                        />
                </div>
            </div>

            {AlertMessage(props.rampedEbac, props.ebac)}
        </div>
    )

    function AlertMessage(rampingEbac: number, peakEbac: number): ReactNode {
        const ramping = rampingEbac + 0.005 < peakEbac

        let variant: 'info' | 'success' | 'warning' | 'danger'
        let message: ReactNode

        if (peakEbac < 0.6) {
            variant = 'info'
            message = null
        }
        else if (peakEbac < 1.0) {
            variant = 'success'
            message = null
        }
        else if (peakEbac < 1.2) {
            variant = 'warning'
            message = <span>Det räcker nu</span>
        }
        else {
            variant = 'danger'
            // FIXME: Lägg till tid till vad?
            message = <span>Lägg ner&hellip;</span>
        }

        return (
            <Message variant={variant}>
                <Grid item>
                    <Typography variant='h3' display='inline'>
                        {emojiFromLevel(rampingEbac)}
                    </Typography>
                </Grid>
                {message !== null &&
                    <>
                        <Grid item>
                            <Typography variant='body1' display='inline'>
                                {message}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant='h3' display='inline'>
                                {emojiFromLevel(peakEbac)}
                            </Typography>
                        </Grid>
                    </>
                }
            </Message>
        )
    }
}

export default EbacInfo

interface MessageProps {
    variant: 'info' | 'success' | 'warning' | 'danger'
    children: ReactNode
}

const Message: React.FC<MessageProps> = (props) => {
    const classes = useStyles()

    const className = (() => {
        switch (props.variant) {
            case 'info':
                return classes.infoMessage
            case 'success':
                return classes.successMessage
            case 'warning':
                return classes.warningMessage
            case 'danger':
                return classes.dangerMessage
        }
    })()

    return (
        <Paper elevation={0} className={className}>
            <Grid container spacing={2} alignItems='center' justify='center'>
                {props.children}
            </Grid>
        </Paper>
    )
}

function emojiFromLevel(ebac: number): string {
    const emojis = [
        '🙂',
        '😛',
        '😀',
        '😃',
        '😄',
        '😁',
        '😎',
        '🥳',
        '😜',
        '🤪',
        '😌',
        '🥴',
        '🤡',
        '🤢',
        '🤮',
        '😴',
        '😵',
    ]
    const index = clamp(Math.floor(10 * ebac), 0, emojis.length - 1)

    return emojis[index]
}
