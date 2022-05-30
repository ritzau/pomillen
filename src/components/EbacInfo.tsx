import React, { ReactNode, useRef } from "react"

import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

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
    const message = props.rampedEbac > 1.6 ? "¯\\_(ツ)_/¯" : `${props.rampedEbac.toFixed(2)} ‰`

    const options: Highcharts.Options = {
        title: {
            text: undefined
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
        series: [{
            name: 'Ebac',
            type: 'spline',
            data: props.data,
        }],
        tooltip: {
            valueDecimals: 2,
        },
        xAxis: {
            type: "datetime",
            tickInterval: 10 * 60 * 1000,
            dateTimeLabelFormats: {
                hour: "%l %p",
                day: "%b %e '%y",
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
                // colors={["#f00b", "#ff0b", "#0f0b", "#ff0b", "#f00b"]}
                {
                    color: '#AAFFAA',
                    from: 0.6,
                    to: 0.8,
                },
                {
                    color: '#FCFFC5',
                    from: 0.8,
                    to: 1.0,
                },
                {
                    color: '#FFDDAA',
                    from: 1.0,
                    to: 1.2,
                },
                {
                    color: '#FF7777',
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

            <div>{message}</div>
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
            // FIXME: Lägg till tid till vad?
            message = <span>Lägg ner&hellip;</span>
        }

        message = (<span>{rampingEbac.toFixed(2)} =&gt; {peakEbac.toFixed(2)}</span>)

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
