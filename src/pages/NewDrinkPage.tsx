import React, { useState } from "react";

import { createMedia } from '@artsy/fresnel'

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

const { MediaContextProvider, Media } = createMedia({
    breakpoints: {
        mobile: 0,
        tablet: 768,
        computer: 1024,
    },
})

interface NewDrinkProps {
    addDrink: (volumeCl: number, alcoholPercentage: number) => void
    ebac: number
    calculateEbac: (volume: number, alcoholPercentage: number) => number
}

const NewDrinkPage: React.FC<NewDrinkProps> = ({ addDrink, ebac, calculateEbac }: NewDrinkProps) => {
    const [volumeString, setVolume] = useState('');
    const [percentageString, setPercentage] = useState('');
    const [hideHint, setHideHint] = useState(false);

    const volume = Number.parseFloat(volumeString);
    const percentage = Number.parseFloat(percentageString);
    const disabled = isNaN(volume) || isNaN(percentage);

    const leveledEbac = disabled ? ebac : calculateEbac(volume, percentage);

    function add() {
        setHideHint(true)
        addDrink(volume, percentage)
    }

    const level = ebacLevel(leveledEbac)
    const info = level === "info"
    const positive = level === "positive"
    const warning = level === "warning"
    const negative = level === "negative"

    console.log(disabled, level, warning)

    return (
        <>
            <Segment inverted>
                <Menu inverted={true} size='large'>
                    <Menu.Item as='a'>
                        <Icon name='chevron left' />
                        Tillbaka
                    </Menu.Item>

                    <Menu.Item header>
                        Lägg till dricka
                    </Menu.Item>
                </Menu>
            </Segment>

            <Container>
                <Form>
                    <Form.Field>
                        <Input
                            placeholder="Hur mycket tänker du bälja i dig?"
                            aria-label="Dryckens volym i centiliter"
                            aria-describedby={'volumeUnit'}
                            type="number"
                            min={'0'}
                            value={volumeString}
                            onChange={e => setVolume(e.target.value!)}
                            label={{ basic: true, content: 'cl' }}
                            labelPosition='right'
                        />
                    </Form.Field>
                    <Form.Field>
                        <Input
                            placeholder="Hur stark är drycken?"
                            aria-label="Dryckens alkolholhalt i procent"
                            aria-describedby={'percentageUnit'}
                            type="number"
                            min={'0'}
                            value={percentageString}
                            onChange={e => setPercentage(e.target.value!)}
                            label={{ basic: true, content: '%' }}
                            labelPosition='right'
                        />
                    </Form.Field>

                    <Form.Field>
                        <Button primary fluid disabled={disabled} href="/" onClick={add}>
                            Lägg till
                        </Button>

                        <Message 
                            small 
                            hidden={hideHint}
                            info={info} 
                            positive={positive} 
                            warning={false} // FIXME
                            negative={negative} 
                            >
                            <p>Dricker du detta kommer du levla till {leveledEbac.toFixed(2)}&nbsp;&permil;</p>
                        </Message>
                    </Form.Field>
                </Form>

            </Container>
        </>)
}

export default NewDrinkPage

function ebacLevel(ebac: number) {
    if (ebac < 0.2) {
        return "info";
    } else if (ebac < 0.7) {
        return "positive";
    } else if (ebac < 1.0) {
        return "warning";
    } else {
        return "negative";
    }
}
