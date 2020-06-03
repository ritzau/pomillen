import React from "react";

// @ts-ignore
import GaugeChart from 'react-gauge-chart'
import Alert from "react-bootstrap/Alert";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export function EbacInfoSection({ebac, minutesToGreen}: { ebac: number, minutesToGreen: number }) {
  const value = Math.min(1.2, ebac);
  const message = `${ebac.toFixed(2)} ‰`;

  const showAlert = ebac >= 0.7;
  const alertVariant = ebac >= 1.0 ? 'danger' : 'warning';
  const alertMessage = `Du är grön om ${Math.floor(minutesToGreen)} minuter.`;

  return (
    <Row>
      <Col>
        <GaugeChart
          id={'ebacGauge'}
          percent={value / 1.2}
          formatTextValue={() => message}
          textColor={'black'}
          arcsLength={[0.7, 0.3, 0.2]}
          animDelay={0}/>

        {showAlert &&
        <Alert variant={alertVariant} className={'text-center'}>
          {alertMessage}
        </Alert>}
      </Col>
    </Row>);
}