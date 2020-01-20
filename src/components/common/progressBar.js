import React, {useState, useEffect, useCallback} from "react"

export default () => {

    const [progressPercent, setProgressPercent] = useState(0);
   
    const progressBar = useCallback(() => {
        let windowScroll = document.documentElement.scrollTop;
        let windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        let per = windowScroll / windowHeight * 100;
        setProgressPercent(per)
      }, [])

      useEffect(() =>{
        window.addEventListener('scroll', progressBar)
        return () => window.removeEventListener('scroll', progressBar)
      }, [progressBar])
    return (
        <div style={{
            position: `fixed`,
            left: `0`,
            top: `0`,
            width: `6px`,
            height: `${progressPercent}%`,
            backgroundColor: `tomato`,
            zIndex: `1020`
        }}/>
    )
}