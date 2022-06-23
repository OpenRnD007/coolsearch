import { useCallback, useEffect, useRef } from "react"

/**
 * Check if component is mounted or not
 * @returns mountedState
 */
export function useIsMounted() {
    const ref = useRef(false)
    useEffect(() => {
        ref.current = true
        return () => {
            ref.current = false
        }
    }, [])
    return useCallback(() => ref.current, [ref])
}
