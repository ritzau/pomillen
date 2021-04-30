import { useContext } from "react";

import {
    IonBackButton,
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonItem,
    IonLabel,
    IonList,
    IonPage,
    IonTitle,
    IonToolbar,
    IonListHeader,
    IonRange,
    IonText,
} from '@ionic/react';

import { ProfileContext } from '../contexts'

import './SettingsPage.css'

const SettingsPage: React.FC = () => {
    const {value: profile, set: setProfile} = useContext(ProfileContext)

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref='/' />
                    </IonButtons>
                    <IonTitle>Inställningar</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent>
                <section>
                    <IonList>
                        <IonListHeader>
                            <IonLabel className='ion-text-wrap' color='dark'>
                                Hur många kilon bär du på?&ensp;
                                <IonText color='secondary'>
                                    {profile.bodyWeight.toFixed(0)}
                                </IonText>
                                &nbsp;kg
                            </IonLabel>
                        </IonListHeader>

                        <IonItem lines='none'>
                            <IonLabel className='ion-text-wrap' color='medium'>
                                <i>Lika bra att riva av denna på en gång. Var nu ärlig. Ingen tittar.</i>
                            </IonLabel>
                        </IonItem>

                        <IonItem className='ion-margin-bottom' lines='full'>
                            <IonRange
                                className='ion-margin-bottom'
                                min={50}
                                max={150}
                                snaps={true}
                                ticks={false}
                                pin={true}
                                value={profile.bodyWeight}
                                onIonChange={e => setProfile({bodyWeight: e.detail.value as number})}
                            >
                                <IonLabel slot='start'>50</IonLabel>
                                <IonLabel slot='end'>150</IonLabel>
                            </IonRange>
                        </IonItem>

                        <IonListHeader>
                            <IonLabel className='ion-text-wrap' color='dark'>
                                Hur är det med förbränningen?&ensp;
                                    <IonText color='secondary'>
                                    {(1_0 * profile.burnRatePerHour).toFixed(2)}
                                </IonText>
                                    &nbsp;&permil;/h
                                </IonLabel>
                        </IonListHeader>

                        <IonItem lines='none'>
                            <IonLabel className='ion-text-wrap' color='medium'>
                                <i>Töser ligger normalt mellan 0,14 &ndash; 0,21 med ett snitt på 0,17,
                                    och pågar ligger normalt mellan 0,13 &ndash; 0,17 med ett snitt på 0,15.</i>
                            </IonLabel>
                        </IonItem>

                        <IonItem className='ion-margin-bottom' lines='full'>
                            <IonRange
                                className='ion-margin-bottom'
                                min={10}
                                max={25}
                                snaps={true}
                                ticks={false}
                                pin={true}
                                value={1_000 * profile.burnRatePerHour}
                                onIonChange={e => setProfile({burnRatePerHour: (e.detail.value as number) / 1_000})}
                            >
                                <IonLabel slot='start'>0,10</IonLabel>
                                <IonLabel slot='end'>0,25</IonLabel>
                            </IonRange>
                        </IonItem>

                        <IonListHeader>
                            <IonLabel className='ion-text-wrap'>
                                Hur är det med vattenbalansen?&ensp;
                                    <IonText color='secondary'>
                                    {(100 * profile.bodyWaterRatio).toFixed(0)}&nbsp;%
                                    </IonText>
                            </IonLabel>
                        </IonListHeader>
                        <IonItem lines='none'>
                            <IonLabel className='ion-text-wrap' color='medium'>
                                <i>Töser snittar på 49&nbsp;% och pågar på 58&nbsp;%.</i>
                            </IonLabel>
                        </IonItem>
                        <IonItem className='ion-margin-bottom' lines='full'>
                            <IonRange
                                className='ion-margin-bottom'
                                min={40}
                                max={70}
                                snaps={true}
                                ticks={false}
                                pin={true}
                                value={100 * profile.bodyWaterRatio}
                                onIonChange={e => setProfile({bodyWaterRatio: (e.detail.value as number) / 100})}
                            >
                                <IonLabel slot='start'>40 %</IonLabel>
                                <IonLabel slot='end'>70 %</IonLabel>
                            </IonRange>
                        </IonItem>

                        <IonListHeader>
                            <IonLabel className='ion-text-wrap' color='dark'>
                                Hur snabbt slår det på?&ensp;
                                    <IonText color='secondary'>
                                    {profile.absorptionMinutes.toFixed(0)}
                                </IonText>
                                    &nbsp;min
                                </IonLabel>
                        </IonListHeader>
                        <IonItem lines='none'>
                            <IonLabel className='ion-text-wrap' color='medium'>
                                <i>Svårt det där. 20 min verkar rimligt.</i>
                            </IonLabel>
                        </IonItem>

                        <IonItem className='ion-margin-bottom' lines='full'>
                            <IonRange
                                className='ion-margin-bottom'
                                min={0}
                                max={60}
                                snaps={true}
                                ticks={false}
                                pin={true}
                                value={profile.absorptionMinutes}
                                onIonChange={e => setProfile({ absorptionMinutes: e.detail.value as number })}
                            >
                                <IonLabel slot='start'>0</IonLabel>
                                <IonLabel slot='end'>60</IonLabel>
                            </IonRange>
                        </IonItem>

                        <IonListHeader>
                            <IonLabel className='ion-text-wrap'>
                                Radera all data
                                </IonLabel>
                        </IonListHeader>

                        <IonItem className='ion-margin-bottom' lines='full'>
                            <IonLabel className='ion-text-wrap ion-margin-bottom' color='medium'>
                                <i>Allt försvinner&hellip;</i>
                            </IonLabel>
                            <IonButton className='ion-float-end ion-margin-bottom' color='danger' href='/' onClick={() => localStorage.clear()}>Återställ</IonButton>
                        </IonItem>

                        <IonItem lines='none'>
                            <section>
                                <p>
                                    Beräkningar och värden som används här är baserade på rapporten
                                    "Computing a BAC Estimate", utgiven av U.S. Department of Transportation
                                    &mdash; National Highway Traffic Safety Administration i oktober 1994.
                                    De i sin tur baserar sin rapport på svenske professor Erik Widmarks
                                    arbete på 12920 &ndash; 1930-talet. Killen har ett pris uppkallat efter sig 😎.
                                </p>

                                <p>
                                    Copyright (c) 2021 Tobias Ritzau
                                </p>

                                <p>
                                    Icons made by{' '}
                                    <a href="https://www.freepik.com" title="Freepik">Freepik</a> from{' '}
                                    <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>
                                </p>
                            </section>
                        </IonItem>

                    </IonList>
                </section>
            </IonContent>
        </IonPage >
    )
}

export default SettingsPage
