import { useEffect, useState, useRef, useCallback } from 'react'
import moment from "moment";

const daySeconds = 86400;

const useTimer = () => {
    const [secondsInSale, setSecondsInSale] = useState(null);
    const [hours, setHours] = useState("00");
    const [minutes, setMinutes] = useState("00");
    const [seconds, setSeconds] = useState("00");
    const [{ startDay, firsDay }, setDayNumber] = useState({startDay: 1, firsDay: 5});
    const [startTimeSale, setStartTimeSale] = useState(null);
    const [endTimeSale, setEndTimeSale] = useState(null);
    const [isSale, setIsSale] = useState(null);


    let interval = useRef();

   /**
    * функция запуска таймера в любом компоненте
    * @param {object} options
    * @param {number} endTime, число в 24 формате, до какого времени работает таймер
    * @param {number} startTime, число в 24 формате, с какого часа начинает работает таймер
    * @param {number} startDayNumber, от 0 до 7 где 0 - воскресенье, 7 суббота - день недели с которого запускается таймер
    * @param {number} firstDayNumber, от 0 до 7 где 0 - воскресенье, 7 суббота - последний день работы таймера
    */
    const doStart = useCallback((options = {}) => {
        const {endTime, startTime, startDayNumber, firstDayNumber} = options;
        
        const secondToEnd = Math.floor(endTime * 60 * 60);
        const saleTime = daySeconds - secondToEnd;

        setSecondsInSale(saleTime);
        setEndTimeSale(endTime);
        setStartTimeSale(startTime);
        setDayNumber({startDay: startDayNumber ? startDayNumber : startDay, firsDay: firstDayNumber ? firstDayNumber : firsDay})
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
        const currendDayNumber = moment().day()
        if(hoursToSale >= startTimeSale && hoursToSale < endTimeSale && currendDayNumber >= startDay && currendDayNumber < firsDay) {
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