import React from "react"

import { StoreContext } from "../pomillen/contexts"
import App from "./App"
import LocalStoragePomillenStore from "../store/LocalStorageStore"

const PersistedApp: React.FunctionComponent = () => {
    return (
        <StoreContext.Provider value={new LocalStoragePomillenStore()}>
            <App />
        </StoreContext.Provider>
    )
}

export default PersistedApp
