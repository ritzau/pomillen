
import {
    Button,
    Container,
    Menu,
    Segment,
    Label,
    Item,
    List,
} from 'semantic-ui-react'

import { Drink } from "../Drink";

export default function DrinksList({ drinks, deleteDrink }: {
    drinks: Drink[],
    deleteDrink: (id: number) => void
}) {
    return (
        <List>
            {drinks.map((d, i) => (
                // <IonItemSliding key={d.timestamp}>
                    <List.Item>
                        <Button negative icon='trash' compact floated='right'></Button>
                        {d.toString()}
                    </List.Item>
                //     <IonItemOptions side="end" onIonSwipe={() => deleteDrink(i)}>
                //         <IonItemOption color='danger' slot='icon-only' expandable={true} onClick={() => deleteDrink(i)}>
                //             <IonIcon icon={trashBinSharp} />
                //         </IonItemOption>
                //     </IonItemOptions>
                // </IonItemSliding>
            ))}
        </List>
    )
}