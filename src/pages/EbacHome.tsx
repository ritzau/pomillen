import React from 'react'

import {
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonIcon,
    IonPage,
    IonTitle,
    IonToolbar,
} from '@ionic/react'

import {
    personCircleOutline,
} from 'ionicons/icons'


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
    <IonPage>
        <IonHeader>
            <IonToolbar>
                <IonTitle>Pomillen</IonTitle>
                <IonButtons slot="primary">
                    <IonButton href='#/config'>
                        <IonIcon slot='icon-only' icon={personCircleOutline} />
                    </IonButton>
                </IonButtons>
            </IonToolbar>
        </IonHeader>
        <IonContent>
            <section className='ion-margin-top ion-padding-top'>
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
        </IonContent>
    </IonPage>
)

export default EbacHome
