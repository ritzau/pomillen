import React from "react";

// @ts-ignore
import GaugeChart from 'react-gauge-chart'
import Alert from "react-bootstrap/Alert";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export function EbacInfoSection({ ebac, rampedEbac, minutesToGreen }: {
    ebac: number,
    rampedEbac: number,
    minutesToGreen: number
}) {
    const value = Math.min(1.2, rampedEbac);
    const message = `${rampedEbac.toFixed(2)} ‰`;

    const alertVariant = ebac < 0.7 ? 'info' : ebac < 1.0 ? 'warning' : 'danger';
    const ramping = rampedEbac + 0.02 < ebac;
    const showAlert = ramping || alertVariant !== 'info';

    const formattedEbac = ebac.toFixed(2);
    const formattedMinutes = Math.ceil(minutesToGreen);

    return (
        <Row>
            <Col>
                <GaugeChart
                    id={'ebacGauge'}
                    percent={value / 1.2}
                    formatTextValue={() => message}
                    textColor={'black'}
                    arcsLength={[0.7, 0.3, 0.2]}
                    animDelay={0}
                    animate={false}
                />

                {showAlert &&
                    <Alert variant={alertVariant} className={'text-center'}>
                        {generateAlertMessage()}
                    </Alert>}
            </Col>
        </Row>);

    function generateAlertMessage() {
        if (ramping && alertVariant !== 'info') {
            return <span>Du är på väg emot {formattedEbac}&nbsp;&permil; och är grön om {formattedMinutes} min</span>;
        } else if (ramping) {
            return <span>Du är på väg emot {formattedEbac}&nbsp;&permil;</span>;
        } else if (alertVariant !== 'info') {
            return <span>Du är grön om {formattedMinutes} min</span>;
        } else {
            return null;
        }
    }
}