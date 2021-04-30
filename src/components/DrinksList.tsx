import {
    IonIcon,
    IonItem,
    IonItemOption,
    IonItemOptions,
    IonItemSliding,
    IonLabel,
    IonList,
} from '@ionic/react';

import { 
    trashBinSharp,
 } from 'ionicons/icons'

import { Drink } from "../Drink";

export default function DrinksList({ drinks, deleteDrink }: {
    drinks: Drink[],
    deleteDrink: (id: number) => void
}) {
    return (
        <IonList>
            {drinks.map((d, i) => (
                <IonItemSliding key={d.timestamp}>
                    <IonItem>
                        <IonLabel>{d.toString()}</IonLabel>
                    </IonItem>
                    <IonItemOptions side="end" onIonSwipe={() => deleteDrink(i)}>
                        <IonItemOption color='danger' slot='icon-only' expandable={true} onClick={() => deleteDrink(i)}>
                            <IonIcon icon={trashBinSharp} />
                        </IonItemOption>
                    </IonItemOptions>
                </IonItemSliding>
            ))}
        </IonList>
    )
}