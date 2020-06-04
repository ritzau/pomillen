import React, {useState} from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {Link} from "react-router-dom";
import InputGroup from "react-bootstrap/InputGroup";

function ebacLevel(ebac: number) {
  if (ebac < 0.2) {
    return "text-dark";
  } else if (ebac < 0.7) {
    return "text-success";
  } else if (ebac < 1.0) {
    return "text-warning";
  } else {
    return "text-danger";
  }
}

export function AddDrinkSection({addDrink, ebac, calculateEbac}: {
  addDrink: (volumeCl: number, alcoholPercentage: number) => void,
  ebac: number,
  calculateEbac: (volume: number, alcoholPercentage: number) => number
}) {
  const [volumeString, setVolume] = useState('');
  const [percentageString, setPercentage] = useState('');

  const volume = Number.parseFloat(volumeString);
  const percentage = Number.parseFloat(percentageString);
  const disabled = isNaN(volume) || isNaN(percentage);

  const leveledEbac = disabled ? 0 : calculateEbac(volume, percentage);

  return (
    <Row>
      <Col>
        <h2 className={'my-3'}>Lägg till dricka</h2>

        <Form>
          <InputGroup className={'my-3'}>
            <Form.Control
              placeholder="Hur mycket tänker du bälja i dig?"
              aria-label="Dryckens volym i centiliter"
              aria-describedby={'volumeUnit'}
              type={'number'}
              min={'0'}
              value={volumeString}
              onChange={e => setVolume(e.target.value)}
            />
            <InputGroup.Append>
              <InputGroup.Text id={'volumeUnit'}>cl</InputGroup.Text>
            </InputGroup.Append>
          </InputGroup>

          <InputGroup className={'my-3'}>
            <Form.Control
              placeholder="Hur stark är drycken?"
              aria-label="Dryckens alkolholhalt i procent"
              aria-describedby={'percentageUnit'}
              type={'number'}
              min={'0'}
              value={percentageString}
              onChange={e => setPercentage(e.target.value)}
            />
            <InputGroup.Append>
              <InputGroup.Text id={'percentageUnit'}>%</InputGroup.Text>
            </InputGroup.Append>
          </InputGroup>

          <Form.Group controlId="formAdd">
            <Link to={'/'}>
              <Button
                className={'float-right'}
                variant="primary"
                type="button"
                disabled={disabled}
                onClick={() => addDrink(volume, percentage)}
              >
                Lägg till
              </Button>
            </Link>
            <Form.Text className="text-muted">
              Dricker du detta kommer du levla
              till <span className={ebacLevel(leveledEbac)}>{leveledEbac.toFixed(2)}&nbsp;&permil;</span>
            </Form.Text>
          </Form.Group>
        </Form>
      </Col>
    </Row>
  );
}