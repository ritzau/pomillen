import React, {useState} from "react";

import Form from "react-bootstrap/Form";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

const timeSeparator = new RegExp('[\\.:]')

export function SettingsSection({weightString, setWeight, gender, setGender, startTime, setStartTime}: {
  weightString: string,
  setWeight: (weightString: string) => void,
  gender: string,
  setGender: (gender: string) => void,
  startTime: number,
  setStartTime: (startTime: number) => void,
}) {
  const date = new Date(startTime);
  const hour = date.getHours().toString().padStart(2, '0');
  const minute = date.getMinutes().toString().padStart(2, '0');

  const [startTimeString, setStartTimeString] = useState(`${hour}.${minute}`);

  function setStart(time: string) {
    setStartTimeString(time);

    const ss = time.split(timeSeparator);
    if (ss.length !== 2) {
      return;
    }

    const h = Number.parseFloat(ss[0]);
    const m = Number.parseFloat(ss[1]);

    if (isNaN(h) || isNaN(m) || h < 0 || h > 23 || m < 0 || m > 59) {
      return;
    }

    const date = new Date();
    date.setHours(h, m, 0, 0);

    const now = Date.now();
    if (date.getTime() > now) {
      date.setDate(date.getDate() - 1);
    }

    setStartTime(date.getTime());
  }

  return (<Row>
    <Col>
    <h2 className="mt-2">Settings</h2>

    <Form>
      <div className={'row'}>
        <div className={'col'}>
          <Form.Group controlId="formGender">
            <Form.Label>Kön</Form.Label><br/>
            <ToggleButtonGroup name={'foo'} value={gender} onChange={(v: string) => setGender(v)}>
              <ToggleButton type={"radio"} value="female">Kvinna</ToggleButton>
              <ToggleButton type={"radio"} value="male">Man</ToggleButton>
            </ToggleButtonGroup>
          </Form.Group>
        </div>
      </div>

      <div className={'row'}>
        <div className={'col'}>
          <Form.Group controlId="formWeight">
            <Form.Label>Vikt</Form.Label>
            <Form.Control type="number" placeholder="0" min="1" value={weightString}
                          onChange={e => setWeight(e.target.value)}/>
            <Form.Text className="text-muted">
              Hur mycket väger du i kg?
            </Form.Text>
          </Form.Group>
        </div>
      </div>

      <div className={'row'}>
        <div className={'col'}>
          <Form.Group controlId="formStartDate">
            <Form.Label>Tid</Form.Label>
            <Form.Control
              type="text"
              value={startTimeString}
              pattern={'\\d{1,2}[\\.:]\\d{2}'}
              onChange={(e) => setStart(e.target.value)}
            />
            <Form.Text className="text-muted">
              När drog du i dig den första?
            </Form.Text>
          </Form.Group>
        </div>
      </div>

      <Row>
        <Col>
          <Button onClick={() => localStorage.clear()}>Nollställ</Button>
        </Col>
      </Row>
    </Form>
    </Col>
  </Row>);
}