import { useState } from "react";
import { isBrowser } from "../components/common/constants";

const useCheckedInternet = () => {
    const [isOnline, setOnline] = useState(true)
    
    const checkedIsOnline = () => {
        if(isBrowser) {
            window.addEventListener('online', function(e){
                console.log("online");
                setOnline(true)
            })
            window.addEventListener('offline', function(e){
                console.log("offline");
                setOnline(false)
            })
        }
    } 

    const removeCheckedEventIsOnline = () => {
        if(isBrowser) {
            window.removeEventListener('online', () => {
                setOnline(false)
            })
            window.removeEventListener('offline', () => {
                setOnline(true)
            })
        }
    }
    return [isOnline, checkedIsOnline, removeCheckedEventIsOnline]
    
}

export default useCheckedInternet;
