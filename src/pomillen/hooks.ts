import { useEffect, useReducer, useState } from "react"

export function useIntervallRefresh(periodMillis: number): number {
    const [, forceUpdate] = useReducer((x: number) => x + 1, 0)

    useEffect(() => {
            const timer = setInterval(forceUpdate, periodMillis)
            return () => clearInterval(timer)
        },
        [periodMillis])

    return Date.now()
}

export function useWindowDimensions() {
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions())

    useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowDimensions())
        }

        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [])

    return windowDimensions


    function getWindowDimensions() {
        const { innerWidth: width, innerHeight: height } = window

        return { width, height }
    }
}
