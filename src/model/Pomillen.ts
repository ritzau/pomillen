import React, { useEffect, useReducer, useRef } from "react"

import { Drink } from "../pomillen/Drink"
import PomillenStore from "../store/PomillenStore"


export interface DrinksState {
    drinks: Drink[]
    shortcuts: number[][]
}

export function initialDrinksState() {
    return {
        drinks: [],
        shortcuts: []
    }
}

export function loadDrinksState(store: PomillenStore) {
    return {
        drinks: store.loadDrinks(),
        shortcuts: store.loadShortcuts(),
    }
}

export interface DrinksAction {
    process(state: DrinksState): DrinksState
}

export class DrinkResetAction implements DrinksAction {
    process(_state: DrinksState) {
        return initialDrinksState()
    }
}

export class AddDrinkAction implements DrinksAction {
    readonly drink: Drink

    constructor(drink: Drink) {
        this.drink = drink
    }

    process(state: DrinksState) {
        const volumeCl = this.drink.volumeCl
        const alcoholPercent = this.drink.alcoholPercent

        const drinks = [...state.drinks, this.drink]
        const filteredShortcuts = state.shortcuts.filter((shortcut: number[]) => {
            const [cl, pct] = shortcut
            return !(cl === volumeCl && pct === alcoholPercent)
        })
        const shortcuts = [[volumeCl, alcoholPercent], ...filteredShortcuts].slice(0, 11)

        return {
            ...state,
            drinks,
            shortcuts,
        }
    }
}

export class DeleteDrinkAction implements DrinksAction {
    readonly index: number // FIXME int?

    constructor(index: number) {
        this.index = index
    }

    process(state: DrinksState) {
        const drinks = state.drinks.filter((_, i) => i !== this.index)

        return {
            ...state,
            drinks,
        }
    }
}

class DeleteAllDrinkAction implements DrinksAction {
    process(state: DrinksState) {
        return {
            ...state,
            drinks: [],
        }
    }
}

export function deleteAllDrinks(dispatch: React.Dispatch<DrinksAction>) {
    dispatch(new DeleteAllDrinkAction())
}

export function deleteAllDrinksAction(): DrinksAction {
    return new DeleteAllDrinkAction()
}

export function useDrinks(backingStore: PomillenStore): PomillenDrinks {
    const [drinksState, drinksDispatch] = useReducer(
        (state: DrinksState, action: DrinksAction) => action.process(state), 
        loadDrinksState(backingStore))

    const isFirstUpdate = useRef(true)

    useEffect(() => {
            if (isFirstUpdate.current) {
                isFirstUpdate.current = false
                return
            }

            console.log("Persist", drinksState)
            backingStore.storeShortcuts(drinksState.shortcuts)
            backingStore.storeDrinks(drinksState.drinks)
        },
        [backingStore, drinksState])
    
    return new PomillenDrinksImpl(drinksState, drinksDispatch)
}

export interface PomillenDrinks {
    readonly drinks: Drink[]
    readonly shortcuts: number[][]

    addDrink: (drink: Drink) => void
    deleteDrink:(index: number) => void
    deleteAllDrinks: () => void
}

export class PomillenDrinksNoop implements PomillenDrinks {
    readonly drinks = []
    readonly shortcuts = []

    addDrink(drink: Drink) {}
    deleteDrink(index: number) {}
    deleteAllDrinks() {}
}

class PomillenDrinksImpl implements PomillenDrinks {
    constructor(
        readonly state: DrinksState,
        readonly dispatch: React.Dispatch<DrinksAction>,
    ) { }

    
    public get drinks() : Drink[] {
        return this.state.drinks
    }

    public get shortcuts() : number[][] {
        return this.state.shortcuts
    }
    
    
    addDrink(drink: Drink) {
        this.dispatch(new AddDrinkAction(drink))
    }

    deleteDrink(index: number) {
        this.dispatch(new DeleteDrinkAction(index))
    }

    deleteAllDrinks() {
        this.dispatch(new DeleteAllDrinkAction())
    }
}
