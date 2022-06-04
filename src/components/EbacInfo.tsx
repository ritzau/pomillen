import React, { ReactNode, useRef } from "react"

import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { orange } from '@mui/material/colors';

import { clamp } from "../pomillen/utils"
import Message from "./Message"

import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { useWindowDimensions } from "../pomillen/hooks";

interface EbacInfoProps {
    ebac: number
    rampedEbac: number
    now: number
    data: number[][]
}

const EbacInfo: React.FC<EbacInfoProps> = (props) => {
    const chartComponentRef = useRef<HighchartsReact.RefObject>(null)
    const { width: windowWidth } = useWindowDimensions()

    const chartHeight = windowWidth > 450? '300' : '66%'
    const maxEbac = Math.max(...props.data.map((p) => p[1]))
    const showGraph = props.data.length > 1

    const options: Highcharts.Options = {
        title: {
            text: undefined
        },
        chart: {
            backgroundColor: 'transparent',
            height: chartHeight,
            style: {
                fontFamily: [
                    "BlinkMacSystemFont",
                    "Lato",
                    "Roboto",
                    "Helvetica",
                    "sans-serif",
                ].join(","),
            },
        },
        colors: [orange[600]],
        time: {
            useUTC: false
        },
        plotOptions: {
            series: {
                marker: {
                    enabled: false
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
        credits: {
            enabled: false
        },
        series: [{
            name: 'EBAC',
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
            dateTimeLabelFormats: {
                millisecond: "%H.%M",
                minute: "%H.%M",
                hour: "%H.%M",
                day: "%H.%M",
                week: "%b %e '%y",
                month: "%b '%y",
                year: "%y"
            },
            labels: {
                style: {
                    color: '#fff',
                    fontSize: '12px',
                }
            }
        },
        yAxis: {
            title: {
                text: undefined,
            },
            labels: {
                style: {
                    color: '#fff',
                    fontSize: '12px',
                }
            },
            max: Math.min(maxEbac, 1.4),
        },
    }

    return (
        <div>
            {showGraph && <div>
                <HighchartsReact
                    highcharts={Highcharts}
                    options={options}
                    ref={chartComponentRef}
                    {...props}
                />
            </div>}

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
