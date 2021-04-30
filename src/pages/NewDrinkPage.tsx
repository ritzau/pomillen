import React, { useState } from "react";

import {
    IonBackButton,
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonInput,
    IonItem,
    IonLabel,
    IonList,
    IonNote,
    IonPage,
    IonText,
    IonTitle,
    IonToolbar,
} from '@ionic/react';

interface NewDrinkProps {
    addDrink: (volumeCl: number, alcoholPercentage: number) => void
    ebac: number
    calculateEbac: (volume: number, alcoholPercentage: number) => number
}

const NewDrinkPage: React.FC<NewDrinkProps> = ({addDrink, ebac, calculateEbac}: NewDrinkProps) => {
    const [volumeString, setVolume] = useState('');
    const [percentageString, setPercentage] = useState('');
    const [hideHint, setHideHint] = useState(false);

    const volume = Number.parseFloat(volumeString);
    const percentage = Number.parseFloat(percentageString);
    const disabled = isNaN(volume) || isNaN(percentage);

    const leveledEbac = disabled ? ebac : calculateEbac(volume, percentage);

    let hintClass = 'ion-text-center'
    if (hideHint) {
        hintClass += ' ion-hide'
    }

    function add() {
        setHideHint(true)
        addDrink(volume, percentage)
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref='/' />
                    </IonButtons>
                    <IonTitle>Lägg till dricka</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <section className='ion-margin-vertical'>
                    <IonList>
                        <IonItem>
                            <IonInput
                                placeholder="Hur mycket tänker du bälja i dig?"
                                aria-label="Dryckens volym i centiliter"
                                aria-describedby={'volumeUnit'}
                                type="number"
                                min={'0'}
                                value={volumeString}
                                onIonChange={e => setVolume(e.detail.value!)}
                            />
                            <IonLabel color="medium">cl</IonLabel>
                        </IonItem>
                        <IonItem>
                            <IonInput
                                placeholder="Hur stark är drycken?"
                                aria-label="Dryckens alkolholhalt i procent"
                                aria-describedby={'percentageUnit'}
                                type="number"
                                min={'0'}
                                value={percentageString}
                                onIonChange={e => setPercentage(e.detail.value!)}
                            />
                            <IonLabel color="medium">%</IonLabel>
                        </IonItem>
                    </IonList>
                </section>

                <section className='ion-margin'>
                    <IonButton expand='block' fill='solid' color='secondary' disabled={disabled} href="/" onClick={add}>
                        Lägg till
                    </IonButton>

                    <div className={hintClass}>
                        <IonNote color='medium'>
                            Dricker du detta kommer du levla till <IonText color={ebacLevel(leveledEbac)}>{leveledEbac.toFixed(2)}&nbsp;&permil;</IonText>
                        </IonNote>
                    </div>
                </section>
            </IonContent>
        </IonPage >
    );
}

export default NewDrinkPage

function ebacLevel(ebac: number) {
    if (ebac < 0.2) {
        return "dark";
    } else if (ebac < 0.7) {
        return "success";
    } else if (ebac < 1.0) {
        return "warning";
    } else {
        return "danger";
    }
}
