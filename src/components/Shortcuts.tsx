import React, { 
    ReactNode, 
    useEffect, 
    useState 
} from "react"

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
        colProps = { sizeXl: '1', sizeSm: '2', sizeXs: '3' }

        if (windowDimensions.width < 576) {
            maxButtons = 8
        }
        else if (windowDimensions.width < 1200) {
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
                <ShortcutButton 
                onClick={() => props.addDrink(cl, pct)} 
                sublabel={<>{(props.calculateEbac(cl, pct)).toFixed(2)}&nbsp;&permil;</>}
                >
                    {cl} cl/{pct}&nbsp;%
                </ShortcutButton>
            </IonCol>
        ))

    return (
        <IonGrid className='ion-margin-horizontal-x' fixed={false}>
            <IonRow className='ion-align-items-end'>
                {buttons}
                <IonCol {...colProps}>
                    <ShortcutButton fill='clear' href="#/add">
                        Mer dricka
                    </ShortcutButton>
                </IonCol>
            </IonRow>
        </IonGrid>)
}

export default Shortcuts

// XXX: How do I get all props of IonButton?
interface ShortcutButtonProps {
    fill?: 'outline' | 'solid' | 'default' | 'clear'
    href?: string
    onClick?: () => void
    children?: ReactNode
    sublabel?: ReactNode
}

const ShortcutButton: React.FC<ShortcutButtonProps> = (props) => (
    <>
        <IonButton style={{textTransform: 'none'}} {...props} color='primary' expand='block'>
            {props.children}
        </IonButton>
        <div className='ion-text-center'>
            <small>{props.sublabel ? props.sublabel : <>&nbsp;</>}</small>
        </div>
    </>
)

function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window

    return { width, height }
}