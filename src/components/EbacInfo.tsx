import React, { ReactNode } from "react"

import {
    Typography,
    Paper,
    useTheme,
    Grid,
} from '@material-ui/core'

import useStyles from "../theme/styles";

// @ts-ignore
import GaugeChart from 'react-gauge-chart'
import { clamp } from "../utils";

interface EbacInfoProps {
    ebac: number
    rampedEbac: number
    minutesToGreen: number
}

const EbacInfo: React.FC<EbacInfoProps> = (props) => {
    const theme = useTheme()

    const value = Math.min(1.6, props.rampedEbac)
    const message = props.rampedEbac > 1.6 ? '¯\_(ツ)_/¯' : `${value.toFixed(2)} ‰`

    return (
        <div>
            <GaugeChart
                id={'ebacGauge'}
                percent={value / 1.6}
                formatTextValue={() => message}
                textColor={theme.palette.text.primary}
                arcsLength={[0.4, 0.2, 0.4, 0.2, 0.4]}
                colors={["#FF0000", "#FFFF00", "#00FF00", "#FFFF00", "#FF0000"]}
                arcPadding={0.03}

                animDelay={0}
                animate={true}
            />

            {AlertMessage(props.rampedEbac, props.ebac)}
        </div>
    )

    function AlertMessage(rampingEbac: number, peakEbac: number): ReactNode {
        const ramping = rampingEbac + 0.005 < peakEbac
        const formattedEbac = peakEbac.toFixed(2)

        let variant: 'info' | 'success' | 'warning' | 'danger'
        let message: ReactNode

        if (peakEbac < 0.6) {
            if (ramping) {
                variant = 'info'
                message = <span>Kämpa på! Du är på väg emot {formattedEbac}&nbsp;&permil;.</span>
            }
            else {
                variant = 'info'
                message = <span>Här händer det inte så mycket idag</span>
            }
        }
        else if (peakEbac < 1.0) {
            variant = 'success'
            if (ramping) {
                message = <span>Du är på väg emot {formattedEbac}&nbsp;&permil;.</span>
            }
            else {
                message = <span>Allt är precis som det ska va.</span>
            }
        }
        else if (peakEbac < 1.2) {
            variant = 'warning'
            if (ramping) {
                message = <span>Du är på väg emot {formattedEbac}&nbsp;&permil;!</span>
            }
            else {
                // FIXME: Lägg till tid till vad?
                message = <span>Läge att ta det lugnt ett tag!</span>
            }
        }
        else {
            variant = 'danger'
            if (ramping) {
                message = <span>Du är på väg emot {formattedEbac}&nbsp;&permil;!!!</span>
            }
            else {
                // FIXME: Lägg till tid till vad?
                message = <span>Läge att ta det lugnt ett tag!!!</span>
            }
        }

        return (
            <Message variant={variant}>
                <Grid item>
                    <Typography variant='h3' display='inline'>
                        {emojiFromLevel(rampingEbac)}
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography variant='body1' display='inline'>
                        {message}
                    </Typography>
                </Grid>
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