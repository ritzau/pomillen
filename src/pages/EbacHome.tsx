import React from 'react'

import {
    Button,
    Container,
    Menu,
    Segment,
} from 'semantic-ui-react'

import Shortcuts from "../components/Shortcuts"
import DrinksList from "../components/DrinksList"
import EbacInfo from "../components/EbacInfo"
import { Drink } from "../Drink"

interface EbacHomeProps {
    ebac: number
    peakEbac: number
    rampedEbac: number
    minutesToGreen: number

    shortcuts: number[][]
    drinks: Drink[]

    calculateEbac: (volume: number, alcoholPercent: number) => number
    addDrink: (volumeCl: number, alcoholPercent: number) => void
    deleteDrink: (index: number) => void
}

const EbacHome: React.FC<EbacHomeProps> = (props) => (
    <>
        <Segment inverted>
            <Menu inverted={true} size='large'>
                <Menu.Item header>
                    Pomillen
                    </Menu.Item>

                <Menu.Item position='right'>
                    <Button as='a' inverted icon='user circle' href='#/config' />
                </Menu.Item>
            </Menu>
        </Segment>
        <Container>
            <section>
                <EbacInfo
                    ebac={props.peakEbac}
                    rampedEbac={props.rampedEbac}
                    minutesToGreen={props.minutesToGreen} />
            </section>
            <section className='ion-margin-vertical'>
                <Shortcuts
                    shortcuts={props.shortcuts}
                    calculateEbac={props.calculateEbac}
                    addDrink={props.addDrink} />
            </section>

            <section className='ion-margin-vertical'>
                <DrinksList
                    drinks={props.drinks}
                    deleteDrink={props.deleteDrink} />
            </section>
        </Container>
    </>
)

export default EbacHome
