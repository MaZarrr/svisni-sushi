import {useEffect, useState, useRef, useCallback} from 'react'
import moment from "moment";

const daySeconds = 86400;

export default () => {
    const [secondsInSale, setSecondsInSale] = useState(null);
    const [hours, setHours] = useState("00");
    const [minutes, setMinutes] = useState("00");
    const [seconds, setSeconds] = useState("00");
    const [startTimeSale, setStartTimeSale] = useState(null);
    const [endTimeSale, setEndTimeSale] = useState(null);

    let interval = useRef();

    const doStart = useCallback((options = {}) => {
        const {endTime, startTime} = options;

        const secondToEnd = Math.floor(endTime * 60 * 60);
        const saleTime = daySeconds - secondToEnd;

        setSecondsInSale(saleTime);
        setEndTimeSale(endTime);
        setStartTimeSale(startTime);
    }, []);

    const startTimer = () => {
        interval.current = setInterval(() => {
            const time = moment().format("HH:mm:ss");
            let current = moment.duration(time).asSeconds();

            let timeToSale = current + secondsInSale;
            let timer = daySeconds - timeToSale;
            let timeEndSale = timer - 1;

            let second = Math.floor(timeEndSale % 60);
            let minute = Math.floor(moment.duration(timeEndSale).asMinutes() * 1000 % 60);
            let hour = Math.floor(timeEndSale / 60 / 60);

            setHours(hour);
            setMinutes(minute);
            setSeconds(second)

        }, 1000)
    };

    useEffect(() => {
        // const hoursToSale = moment().hour();
        // if(hoursToSale > startTimeSale && hoursToSale < endTimeSale) {
        //     interval.current = startTimer();
            startTimer();
            return () => clearInterval(interval.current);
        // }
        // return;
    });

    return [{hours, minutes, seconds}, doStart]
}
























//
//
//
//
//
// import {useEffect, useState, useRef, useCallback} from 'react'
// import moment from "moment";
//
// // const secondsInSale = 18000; // stable
// // const [startTimeSale, setStartTimeSale] = useState(null);
// // const [endTimeSale, setEndTimeSale] = useState(null);
//
// export default () => {
//     const [secondsInSale, setSecondsInSale] = useState(null);
//     const [hours, setHours] = useState(null);
//     const [minutes, setMinutes] = useState(null);
//     const [seconds, setSeconds] = useState(null);
//     const [startTimeSale, setStartTimeSale] = useState(null);
//     const [endTimeSale, setEndTimeSale] = useState(null);
//
//     let interval = useRef();
//     const daySeconds = 86400;
//
//     const doStart = (options = {}) => {
//         const {endTime, startTime} = options;
//         console.log(endTime, startTime)
//         const saleTime = (endTime - startTime) * 60 * 60;
//         console.log(saleTime)
//         setSecondsInSale(saleTime);
//         setEndTimeSale(endTime);
//         setStartTimeSale(startTime);
//     };
//
//     const startTimer = useCallback(() => {
//         interval = setInterval(() => {
//             const time = moment().format("HH:mm:ss");
//             let current = moment.duration("10:00:00").asSeconds();
//
//             let timeToSale = current + secondsInSale;
//             let timer = daySeconds - timeToSale;
//             let timeEndSale = (timer - 1) / 2;
//
//             let second = Math.floor(timeEndSale % 60);
//             let minute = Math.floor(moment.duration(timeEndSale).asMinutes() * 1000 % 60);
//             let hour = Math.floor(timeEndSale / 60 / 60);
//
//             console.log(timeEndSale);
//             console.log(hour);
//
//             // let hour = Math.floor(((timeEndSale / 60 / 60) % 24));
//
//             setHours(hour);
//             setMinutes(minute);
//             setSeconds(second)
//
//         }, 1000)
//     }, []);
//
//     useEffect(() => {
//         // const hoursToSale = moment().hour();
//         moment.locale('ru');
//         const hoursToSale = 10;
//
//         if(hoursToSale >= startTimeSale && hoursToSale < endTimeSale) {
//             startTimer();
//             return () => clearInterval(interval.current);
//         }
//         return;
//     }, [startTimeSale, endTimeSale, startTimer]);
//
//     return [{hours, minutes, seconds}, doStart]
// }