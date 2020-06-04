import React, {useState} from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {Link} from "react-router-dom";

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
  const [volumeString, setVolume] = useState('4');
  const [percentageString, setPercentage] = useState('40');

  const volume = Number.parseFloat(volumeString);
  const percentage = Number.parseFloat(percentageString);

  const leveledEbac = calculateEbac(volume, percentage);

  return (
    <Row>
      <Col>
        <h2 className={'mt-2'}>Lägg till dricka</h2>

        <Form action={"/"}>
          <Form.Group controlId="formVolume">
            <Form.Label>Volym</Form.Label>
            <Form.Control type="number" placeholder="0" value={volumeString} min="0"
                          onChange={e => setVolume(e.target.value)}/>
            <Form.Text className="text-muted">
              Hur mycket tänker du bälja i dig i centiliter?
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="formPercentage">
            <Form.Label>Alkoholhalt</Form.Label>
            <Form.Control type="number" placeholder="0" value={percentageString}
                          onChange={e => setPercentage(e.target.value)}/>
            <Form.Text className="text-muted">
              Hur starkt var det i procent?
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="formAdd">
            <Button
              as={Link}
              to={'/'}
              variant="primary"
              type="button"
              onClick={() => addDrink(volume, percentage)}
            >
              Add
            </Button>
            <Form.Text className="text-muted">
              Lägger du till detta kommer du levla
              till <span className={ebacLevel(leveledEbac)}>{leveledEbac.toFixed(2)}&nbsp;&permil;</span>
            </Form.Text>
          </Form.Group>
        </Form>
      </Col>
    </Row>
  );
}