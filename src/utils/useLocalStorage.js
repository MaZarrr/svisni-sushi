import { useEffect, useState } from "react"
import { isBrowser } from "../components/common/constants"

const useLocalStorage = (key, initialValue = null) => {
    const [valueStorage, setValue] = useState(() => {
        return isBrowser && (JSON.parse(localStorage.getItem(key)) || initialValue)
    })

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(valueStorage))
    }, [valueStorage, key])

    return [valueStorage, setValue]

}

export default useLocalStorage;