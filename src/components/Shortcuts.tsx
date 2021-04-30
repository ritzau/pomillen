import React, { useEffect, useState } from "react"

import {
    IonButton,
    IonCol,
    IonGrid,
    IonRow,
} from '@ionic/react'

interface Shortcuts {
    shortcuts: number[][]
    calculateEbac: (cl: number, pct: number) => number
    addDrink: (cl: number, pct: number) => void
}

const Shortcuts: React.FC<Shortcuts> = (props) => {
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

    useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    let maxButtons: number
    let colProps: {}
    if (windowDimensions.width < 375) {
        maxButtons = 6
        colProps = { sizeXs: '4' }
    }
    else {
        colProps = { sizeLg: '1', sizeSm: '2', sizeXs: '3' }

        if (windowDimensions.width < 576) {
            maxButtons = 8
        }
        else if (windowDimensions.width < 992) {
            maxButtons = 6
        }
        else {
            maxButtons = 12
        }
    }

    const buttons = props.shortcuts
        .slice(0, maxButtons - 1)
        .map(([cl, pct]: number[]) => (
            <IonCol key={`${cl}:${pct}`} {...colProps}>
                <IonButton expand='block' size='large' onClick={() => props.addDrink(cl, pct)}>
                    {cl} cl<br />{pct}&nbsp;%
                </IonButton>
                <div className='ion-text-center'>
                    {(props.calculateEbac(cl, pct)).toFixed(2)}&nbsp;&permil;
                </div>
            </IonCol>
        ))

    return (
        <IonGrid className='ion-margin-horizontal-x' fixed={false}>
            <IonRow className='ion-align-items-end'>
                {buttons}
                <IonCol {...colProps}>
                    <IonButton color="primary" size='large' fill='outline' expand='block' href="#/add">
                        Mer<br />dricka
                    </IonButton>
                    <div className='ion-text-center'>
                        &nbsp;
                    </div>
                </IonCol>
            </IonRow>
        </IonGrid>)
}

export default Shortcuts

function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window

    return { width, height }
}