import { useState, useEffect, useRef } from "react";


const useCheckTime = (time, isAuth) => {
    const [seconds, setSeconds] = useState(time);
    const [isTime, setIsTime] = useState(true);
    let interval = useRef();
    

  const startTimer = () => {
    setIsTime(false)
    interval.current = setInterval(() => {
        setSeconds(seconds => seconds - 1)
        return () => clearInterval(interval.current);
    }, 1000);
  };

  useEffect(() => {
    console.log("interval.current2", seconds);
    console.log("interval isAuth", isAuth);
    if(seconds === 1 || isAuth) {
        setSeconds(time)
        setIsTime(true)
        console.log("secondssss", seconds);
        return () => clearInterval(interval.current);
    }
  }, [seconds, isAuth]);

  return [{ seconds, isTime }, startTimer];
};

export default useCheckTime;