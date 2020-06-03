import Button from "react-bootstrap/Button";
import React from "react";
import {Drink} from "../Drink";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export function DrinksSection({drinks, deleteDrink}: {
  drinks: Drink[],
  deleteDrink: (id: number) => void
}) {
  return (
    <Row>
      <Col>
        <h2>Dricka</h2>
        <ul className="list-group">
          {drinks.map((d, i) => (
            <li key={i} className="list-group-item">
              <span className={'btn pl-0 ml-0'}>{d.toString()}</span>
              <Button className="float-right" variant="danger"
                      onClick={() => deleteDrink(i)}>Delete</Button>
            </li>
          ))}
        </ul>
      </Col>
    </Row>);
}