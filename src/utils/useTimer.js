import { useEffect, useState, useRef, useCallback } from 'react'
import moment from "moment";

const daySeconds = 86400;

const useTimer = () => {
    const [secondsInSale, setSecondsInSale] = useState(null);
    const [hours, setHours] = useState("00");
    const [minutes, setMinutes] = useState("00");
    const [seconds, setSeconds] = useState("00");
    const [startTimeSale, setStartTimeSale] = useState(null);
    const [endTimeSale, setEndTimeSale] = useState(null);
    const [isSale, setIsSale] = useState(null);


    let interval = useRef();

    const doStart = useCallback((options = {}) => {
        const {endTime, startTime} = options;

        const secondToEnd = Math.floor(endTime * 60 * 60);
        const saleTime = daySeconds - secondToEnd;

        setSecondsInSale(saleTime);
        setEndTimeSale(endTime);
        setStartTimeSale(startTime);
    }, []);

    const startTimer = useCallback( () => {
        interval.current = setInterval(() => {
            const time = moment().format("HH:mm:ss");
            let currentTime = moment.duration(time).asSeconds();

            let timeToSale = currentTime + secondsInSale;
            let timer = daySeconds - timeToSale;
            let timeEndSale = timer - 1;

            let second = Math.floor(timeEndSale % 60);
            let minute = Math.floor(moment.duration(timeEndSale).asMinutes() * 1000 % 60);
            let hour = Math.floor(timeEndSale / 60 / 60);

            setHours(hour);
            setMinutes(minute);
            setSeconds(second)

        }, 1000)
    }, [secondsInSale]);

    useEffect(() => {
        const hoursToSale = moment().hour();
        if(hoursToSale >= startTimeSale && hoursToSale < endTimeSale) {
            startTimer();
            setIsSale(true);
            return () => clearInterval(interval.current);
        }
        setIsSale(false);
        setSecondsInSale("00");
        setEndTimeSale("00");
        setStartTimeSale("00");
        return;
    }, [startTimeSale, endTimeSale, startTimer]);

    return [{hours, minutes, seconds, isSale}, doStart]
}

export default useTimer;