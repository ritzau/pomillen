import React from "react";

import Button from "react-bootstrap/Button";
import {Link} from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export function QuickAddSection({shortcuts, ebac, calculateEbac, addDrink}: {
  shortcuts: number[][],
  ebac: number,
  calculateEbac: (cl: number, pct: number) => number,
  addDrink: (cl: number, pct: number) => void,
}) {
  const columnClass = 'pb-2 px-1 align-content-center';

  const buttons = shortcuts.map(([cl, pct]: number[]) => {
    return (
      <Col key={`${cl}:${pct}`} className={columnClass} xs={3} sm={2} md={1}>
        <Button className={'btn-block'} size={'sm'} onClick={() => addDrink(cl, pct)}>
          {cl} cl<br/>
          {pct}&nbsp;%<br/>
        </Button>
        <div className={'text-center'}>
          <small>
            <small>
              {(calculateEbac(cl, pct)).toFixed(2)}&nbsp;&permil;
            </small>
          </small>
        </div>
      </Col>
    );
  });

  return (
      <Row className={'px-3'}>
        {buttons}
        <Col className={columnClass} xs={3} sm={2} md={1}>
          <Button as={Link} variant={'outline-primary'} className={'btn-block'} size={'sm'} to={'/add'}>
            Mer<br/>
            dricka<br/>
          </Button>
          <br/>
          <small>&nbsp;</small>
        </Col>
      </Row>);
}