import { useEffect, useState } from "react"
import { isBrowser } from "../components/common/constants"

const useLocalStorage = (key, initialValue = '') => {
    const [value, setValue] = useState(() => {
        return isBrowser && (localStorage.getItem(key) || initialValue)
    })

    useEffect(() => {
        localStorage.setItem(key, value)
    }, [value, key])

    return [value, setValue]

}

export default useLocalStorage;