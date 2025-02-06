import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";

const StoryWithIndicator = ({ storie, duration = 3000, onStoryEnd, setDataStores }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let interval = null;

    if (progress < 100) {
      interval = setInterval(() => {
        setProgress((prev) => Math.min(prev + 1, 100));
      }, duration / 100);
    } else {
      clearInterval(interval);
      if (onStoryEnd) onStoryEnd(); // Вызываем функцию, когда история заканчивается
    }

    return () => clearInterval(interval);
  }, [progress, duration, onStoryEnd]);

  return (
    <div style={{ position: 'relative', width: "auto", height: "90%" }}>
    <div style={{ position: 'absolute', right: 0, top: -10, width: 20, height: 20, background: 'white', fontWeight: 900, borderRadius: 10, cursor: 'pointer' }}>
    <div style={{ position: 'absolute', left: 3.9, top: -1.6}}>X</div>    
    </div>
      <img
        style={{
          zIndex: 1001,
          display: "block",
          borderRadius: 5,
        }}
        src={storie.url}
        width={"auto"}
        height={"90%"}
        alt="story"
      />
      {storie?.link && (
        <a href={storie?.link}>
          <Button variant="contained" sx={{ width: "100%" }}>
            Перейти
          </Button>
        </a>
      )}
      <div
        style={{
          width: "100%",
          height: "5px",
          backgroundColor: "#f0f0f0",
          position: "relative",
          overflow: "hidden",
        }}
        className="indicator-container"
      >
        <div
          style={{
            width: `${progress}%`,
            height: "100%",
            backgroundColor: "#ff6262",
            transition: "width 0.1s linear",
          }}
          className="indicator"
        ></div>
      </div>
    </div>
  );
};

export default StoryWithIndicator;
