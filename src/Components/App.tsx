import React, {useEffect, useState} from 'react';
import Container from "react-bootstrap/Container";
import {Route, Switch} from 'react-router-dom';

import {
  calculateRampedAlcoholGrams,
  calculateEbac,
  Drink,
  gramsOfAlcohol,
  minutesToGreen,
  calculateAlcoholGrams
} from "../Drink";
import {SettingsSection} from './SettingsSection';
import {TopBar, BackBar} from "./TopBar";
import {AddDrinkSection} from './AddDrinkSection';
import {QuickAddSection} from "./QuickAddSection";
import {DrinksSection} from "./DrinksSection";
import {EbacInfoSection} from "./EbacInfoSection";

import './App.css';
import {Footer} from "./Footer";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function loadStartTime(): number {
  let item = localStorage.getItem('startTime');
  if (item === null) {
    let now = Date.now();
    localStorage.setItem('startTime', now.toString());
    return now;
  }

  return Number.parseInt(item);
}

function loadDrinks(): Drink[] {
  let item = localStorage.getItem('drinks');
  if (item === null) {
    return [];
  }

  return JSON.parse(item as string)
    .map((d: any) => new Drink(d.timestamp, d.volumeCl, d.alcoholPercent));
}

function loadShortCuts() {
  let item = localStorage.getItem('shortcuts');
  if (item === null) {
    return [];
  }

  return JSON.parse(item as string);
}

function App() {
  const [gender, setGenderState] = useState(localStorage.getItem('gender') || 'female');
  const [weightString, setWeightState] = useState(localStorage.getItem('weight') || '66');
  const [startTime, setStartTime] = useState(loadStartTime());
  const [drinks, setDrinksState] = useState(loadDrinks());
  const [shortcuts, setShortcuts] = useState(loadShortCuts());

  const [foo, setFoo] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setFoo(foo + 1), 2000);
    return () => clearInterval(timer);
  });

  const weight = Number.parseFloat(weightString);
  const alcoholGrams = calculateAlcoholGrams(drinks);
  const ebac = calculateEbac(startTime, Date.now(), gender, weight, alcoholGrams);
  const rampedAlcoholGrams = calculateRampedAlcoholGrams(drinks);
  const rampedEbac = calculateEbac(startTime, Date.now(), gender, weight, rampedAlcoholGrams);

  function addDrink(volumeCl: number, alcoholPercent: number) {
    setDrinks([...drinks, new Drink(Date.now(), volumeCl, alcoholPercent)]);

    const filteredList = shortcuts.filter((shortcut: number[]) => {
      const [cl, pct] = shortcut;
      return !(cl === volumeCl && pct === alcoholPercent);
    })
    let newList = [[volumeCl, alcoholPercent], ...filteredList].slice(0, 11);
    setShortcuts(newList);
    localStorage.setItem('shortcuts', JSON.stringify(newList));
  }

  function deleteDrink(index: number) {
    setDrinks(drinks.filter((_, i) => i !== index));
  }

  function setDrinks(drinks: Drink[]) {
    setDrinksState(drinks);
    localStorage.setItem('drinks', JSON.stringify(drinks));
  }

  function setStart(value: number) {
    setStartTime(value);
    localStorage.setItem('startTime', value.toString());
  }

  function setGender(value: string) {
    setGenderState(value);
    localStorage.setItem('gender', value);
  }

  function setWeight(value: string) {
    setWeightState(value);
    localStorage.setItem('weight', value);
  }

  function calculateEbacX(volume: number, alcoholPercent: number) {
    return calculateEbac(startTime, Date.now(), gender, weight, alcoholGrams + gramsOfAlcohol(volume, alcoholPercent))
  }

  return (
    <>
      <div className={'content'}>
        <Switch>
          <Route path='/config'>
            <BackBar/>
            <Container fluid={'lg'}>
              <SettingsSection weightString={weightString} setWeight={setWeight} gender={gender}
                               setGender={setGender}
                               startTime={startTime} setStartTime={setStart}/>
            </Container>
          </Route>
          <Route path='/add'>
            <BackBar/>
            <Container fluid={'lg'}>
              <AddDrinkSection addDrink={addDrink} ebac={rampedEbac} calculateEbac={calculateEbacX}/>
            </Container>
          </Route>
          <Route path='/'>
            <TopBar/>
            <Container fluid={'lg'}>
              <EbacInfoSection ebac={ebac} rampedEbac={rampedEbac} minutesToGreen={minutesToGreen(ebac, gender)}/>
              <Row>
                <Col>
                  <h2 className={'mb-4'}>Dricka</h2>
                  <QuickAddSection shortcuts={shortcuts} ebac={rampedEbac} calculateEbac={calculateEbacX}
                                   addDrink={addDrink}/>
                  <DrinksSection drinks={drinks} deleteDrink={deleteDrink}/>
                </Col>
              </Row>
            </Container>
          </Route>
        </Switch>
      </div>
      <Footer/>
    </>
  );
}

export default App;