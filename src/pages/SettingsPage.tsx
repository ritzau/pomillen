import { useContext } from "react";

import {
    Button,
    Container,
    Form,
    Header,
    Icon,
    Input,
    Label,
    Menu,
    Message,
    Segment,
} from 'semantic-ui-react'

import { ProfileContext } from '../contexts'

import './SettingsPage.css'

const SettingsPage: React.FC = () => {
    const { value: profile, set: setProfile } = useContext(ProfileContext)

    return (
        <>
            <Segment inverted>
                <Menu inverted={true} size='large'>
                    <Menu.Item as='a'>
                        <Icon name='chevron left' />
                        Tillbaka
                    </Menu.Item>

                    <Menu.Item header>
                        Inställningar
                    </Menu.Item>
                </Menu>
            </Segment>

            <Container>
                <Form>
                    <Form.Field>
                        <Header>Hur många kilon bär du på?&ensp;
                            <span>
                                {profile.bodyWeight.toFixed(0)}
                            </span>
                            &nbsp;kg
                        </Header>

                        <div>
                            <i>Lika bra att riva av denna på en gång. Var nu ärlig. Ingen tittar.</i>
                        </div>

                        <Input
                            type='range'
                            fluid
                            min={50}
                            max={150}
                            value={profile.bodyWeight}
                            onChange={e => setProfile({ bodyWeight: Number.parseFloat(e.target.value) })}
                        />
                    </Form.Field>

                    <hr />

                    <Form.Field>
                        <Header>
                            Hur är det med förbränningen?&ensp;
                                <span>
                                {(1_0 * profile.burnRatePerHour).toFixed(2)}
                            </span>
                                &nbsp;&permil;/h
                        </Header>

                        <div>
                            <i>Töser ligger normalt mellan 0,14 &ndash; 0,21 med ett snitt på 0,17,
                                    och pågar ligger normalt mellan 0,13 &ndash; 0,17 med ett snitt på 0,15.</i>
                        </div>

                        <Input
                            type='range'
                            fluid
                            min={10}
                            max={25}
                            value={1_000 * profile.burnRatePerHour}
                            onChange={e => setProfile({ burnRatePerHour: Number.parseFloat(e.target.value) / 1_000 })}
                        />
                    </Form.Field>

                    <hr />

                    <Form.Field>
                        <Header>
                            Hur är det med vattenbalansen?&ensp;
                                <span>
                                {(100 * profile.bodyWaterRatio).toFixed(0)}&nbsp;%
                                </span>
                        </Header>

                        <div>
                            <i>Töser snittar på 49&nbsp;% och pågar på 58&nbsp;%.</i>
                        </div>

                        <Input
                            type='range'
                            fluid
                            min={40}
                            max={70}
                            value={100 * profile.bodyWaterRatio}
                            onChange={e => setProfile({ bodyWaterRatio: Number.parseFloat(e.target.value) / 100 })}
                        />
                    </Form.Field>

                    <hr />

                    <Form.Field>
                        <Header>
                            Hur snabbt slår det på?&ensp;
                            <span>
                                {profile.absorptionMinutes.toFixed(0)}
                            </span>
                            &nbsp;min
                        </Header>

                        <div>
                            <i>Svårt det där. 20 min verkar rimligt.</i>
                        </div>

                        <Input
                            type='range'
                            fluid
                            min={0}
                            max={60}
                            value={profile.absorptionMinutes}
                            onChange={e => setProfile({ absorptionMinutes: Number.parseFloat(e.target.value) })}
                        />
                    </Form.Field>

                    <hr />

                    <Form.Field>
                        <Header>
                            Radera all data
                        </Header>

                        <Button negative floated='right' href='/' onClick={() => localStorage.clear()}>Återställ</Button>

                        <div>
                            <i>Allt försvinner&hellip;</i>
                        </div>

                    </Form.Field>

                    <hr />

                    <Form.Field>
                        <label>
                            <Header>
                                Radera all data
                        </Header>
                        </label>
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
                    </Form.Field>
                </Form>
            </Container>
        </>
    )
}

export default SettingsPage
