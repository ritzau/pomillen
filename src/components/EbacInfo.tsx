import React, { ReactNode, useRef } from "react"

import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { green, yellow, orange, red } from '@mui/material/colors';

import { clamp } from "../pomillen/utils"
import Message from "./Message"

import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

interface EbacInfoProps {
    ebac: number
    rampedEbac: number
    now: number
    data: number[][]
}

const EbacInfo: React.FC<EbacInfoProps> = (props) => {
    const chartComponentRef = useRef<HighchartsReact.RefObject>(null)

    const maxEbac = Math.max(...props.data.map((p) => p[1]))
    // const message = props.rampedEbac > 1.6 ? "¯\\_(ツ)_/¯" : `${props.rampedEbac.toFixed(2)} ‰`

    const options: Highcharts.Options = {
        title: {
            text: undefined
        },
        chart: {
            backgroundColor: 'transparent',
        },
        colors: ['#2f7ed8', '#0d233a', '#8bbc21', '#910000', '#1aadce',
        '#492970', '#f28f43', '#77a1e5', '#c42525', '#a6c96a'],
        time: {
            useUTC: false
        },
        plotOptions: {
            series: {
                marker: {
                    enabled: true
                },
                zoneAxis: 'x',
                zones: [{
                    value: props.now
                }, {
                    dashStyle: 'Dash'
                }]
            },
        },
        legend: {
            enabled: false
        },
        series: [{
            name: 'Ebac',
            type: 'spline',
            data: props.data,
        }],
        tooltip: {
            valueDecimals: 2,
            dateTimeLabelFormats: {
                millisecond: '%a %H.%M'
            }
        },
        xAxis: {
            type: "datetime",
            tickInterval: 10 * 60 * 1000,
            dateTimeLabelFormats: {
                millisecond: "%H.%M",
                minute: "%H.%M",
                hour: "%H.%M",
                day: "%b %e %H.%M",
                week: "%b %e '%y",
                month: "%b '%y",
                year: "%y"
            }
        },
        yAxis: {
            title: {
                text: undefined,
            },
            max: Math.min(maxEbac, 1.4),
            tickInterval: 0.2,
            plotBands: [
                {
                    color: green[400],
                    from: 0.6,
                    to: 0.8,
                },
                {
                    color: yellow[400],
                    from: 0.8,
                    to: 1.0,
                },
                {
                    color: orange[400],
                    from: 1.0,
                    to: 1.2,
                },
                {
                    color: red[500],
                    from: 1.2,
                    to: 1.4,
                },
            ],
        },
    }

    return (
        <div>
            <div>
                <HighchartsReact
                    highcharts={Highcharts}
                    options={options}
                    ref={chartComponentRef}
                    {...props}
                />
            </div>

            {AlertMessage(props.rampedEbac, props.ebac)}
        </div>
    )

    function AlertMessage(rampingEbac: number, peakEbac: number): ReactNode {
        let variant: "info" | "success" | "warning" | "danger"
        let message: ReactNode

        if (peakEbac < 0.6) {
            variant = "info"
            message = null
        }
        else if (peakEbac < 1.0) {
            variant = "success"
            message = null
        }
        else if (peakEbac < 1.2) {
            variant = "warning"
            message = <span>Det räcker nu</span>
        }
        else {
            variant = "danger"
            message = <span>Lägg ner&hellip;</span>
        }

        return (
            <Message variant={variant}>
                <Grid item>
                    <Typography variant="h3" display="inline">
                        {emojiFromLevel(rampingEbac)}
                    </Typography>
                </Grid>
                {message !== null &&
                    <>
                        <Grid item>
                            <Typography variant="body1" display="inline">
                                {message}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant="h3" display="inline">
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

function emojiFromLevel(ebac: number): string {
    const emojis = [
        "🙂",
        "😛",
        "😀",
        "😃",
        "😄",
        "😁",
        "😎",
        "🥳",
        "😜",
        "🤪",
        "😌",
        "🥴",
        "🤡",
        "🤢",
        "🤮",
        "😴",
        "😵",
    ]
    const index = clamp(Math.floor(10 * ebac), 0, emojis.length - 1)

    return emojis[index]
}
