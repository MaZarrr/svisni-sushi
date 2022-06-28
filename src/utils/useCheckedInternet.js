import { useState } from "react";
import { isBrowser } from "../components/common/constants";

const useCheckedInternet = () => {
    const [isOnline, setOnline] = useState(true)
    
    const checkedIsOnline = () => {
        if(isBrowser) {
            console.log("isBrowserisBrowser", isBrowser);
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

    // const checkedIsOnline = () => {
    //     fetch('http://example.com/', {
    //     method: 'GET',   
    //     mode: 'no-cors'})
    //     .then((responce) => {
    //         if(responce.ok) {
    //             console.log("responce___ 123", responce);
    //             setOnline(true)
    //         }
    //     })
    //     .catch(error => {
    //         setOnline(false)
    //         // The resource could not be reached
    //         console.log("No Internet connection", error);
    //         });
    // } 
