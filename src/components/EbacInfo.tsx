import React from "react";
import {
    Button,
    Container,
    Form,
    Icon,
    Input,
    Menu,
    Message,
    Segment,
} from 'semantic-ui-react'

// @ts-ignore
import GaugeChart from 'react-gauge-chart'

interface EbacInfoProps {
    ebac: number
    rampedEbac: number
    minutesToGreen: number
}

const EbacInfo: React.FC<EbacInfoProps> = (props) => {
    const value = Math.min(1.6, props.rampedEbac)
    const message = `${props.rampedEbac.toFixed(2)} ‰`

    const alertVariant = props.ebac < 0.7 ? 'secondary' : props.ebac < 1.0 ? 'warning' : 'danger'
    // const alertStyle = {
    //     backgroundColor: `var(--ion-color-${alertVariant})`,
    //     padding: '8px',
    //     margin: '16px 0px',
    //     textAlign: 'center' as const,
    // }
    // const alertTextStyle = {
    //     color: `var(--ion-color-${alertVariant}-contrast)`
    // }

    const ramping = props.rampedEbac + 0.005 < props.ebac
    const showAlert = ramping || alertVariant !== 'secondary'

    const formattedEbac = props.ebac.toFixed(2)
    const formattedMinutes = Math.ceil(props.minutesToGreen)

    return (
        <div>
            <GaugeChart
                id={'ebacGauge'}
                percent={value / 1.6}
                formatTextValue={() => message}
                textColor={'var(--ion-color-dark)'}
                arcsLength={[0.4, 0.2, 0.4, 0.2, 0.4]}
                colors={["#FF0000", "#FFFF00", "#00FF00", "#FFFF00", "#FF0000"]} 
                arcPadding={0.03}
              
                animDelay={0}
                animate={true}
            />

            {/* FIXME: Style */}
            {showAlert &&
                    <Message>
                        {generateAlertMessage()}
                    </Message>
            }
        </div>
    )

    function generateAlertMessage() {
        if (ramping && alertVariant !== 'secondary') {
            return <span>Du är på väg emot {formattedEbac}&nbsp;&permil; och är nere igen om {formattedMinutes} min</span>
        } else if (ramping) {
            return <span>Du är på väg emot {formattedEbac}&nbsp;&permil;</span>
        } else if (alertVariant !== 'secondary') {
            return <span>Du är nere igen om {formattedMinutes} min</span>
        } else {
            return null
        }
    }
}
export default EbacInfo
