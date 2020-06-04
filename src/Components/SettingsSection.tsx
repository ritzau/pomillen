import React, {useState} from "react";

import Form from "react-bootstrap/Form";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import {Link} from "react-router-dom";

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
      <h2 className="my-3">Inställningar</h2>

      <Form>
        <Form.Group controlId="formGender">
          <ToggleButtonGroup name={'foo'} value={gender} onChange={(v: string) => setGender(v)}>
            <ToggleButton type={"radio"} value="female">Kvinna</ToggleButton>
            <ToggleButton type={"radio"} value="male">Man</ToggleButton>
          </ToggleButtonGroup>
        </Form.Group>

        <InputGroup className={'my-3'}>
          <Form.Control
            placeholder="Hur mycket tänker du bälja i dig?"
            aria-label="Din vikt i kiloogram"
            aria-describedby={'weightUnit'}
            type={'number'}
            min={'1'}
            value={weightString}
            onChange={e => setWeight(e.target.value)}
          />
          <InputGroup.Append>
            <InputGroup.Text id={'weightUnit'}>kg</InputGroup.Text>
          </InputGroup.Append>
        </InputGroup>

        <InputGroup className={'my-3'}>
          <Form.Control
            placeholder="När drog du i dig den första?"
            aria-label="Tid vid start"
            aria-describedby={'startUnit'}
            pattern={'\\d{1,2}[\\.:]\\d{2}'}
            value={startTimeString}
            onChange={e => setStart(e.target.value)}
          />
          <InputGroup.Append>
            <InputGroup.Text id={'startUnit'}>hh.mm</InputGroup.Text>
          </InputGroup.Append>
        </InputGroup>

        <Form.Group controlId="formReset">
          <Link to={'/'}>
            <Button
              variant="primary"
              type="button"
              onClick={() => localStorage.clear()}
            >
              Nollställ
            </Button>
          </Link>
        </Form.Group>
      </Form>
    </Col>
  </Row>);
}