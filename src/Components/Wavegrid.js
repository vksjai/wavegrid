import React, { useState, useEffect } from "react";
import "./Wavwgrid.css";

const App = () => {
  const rows = 15;
  const cols = 20;
  const [wave, setWave] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setWave((prev) => prev + 1);
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const getColor = (row, col) => {
    const distance = Math.abs(row - Math.sin((col + wave) / 2) * rows);
    const intensity = Math.max(0, 255 - distance * 10);
    return `rgb(0, ${intensity}, 0)`;
  };

  return (
    <div className="container">
      <div className="grid">
        {Array.from({ length: rows }).map((_, row) => (
          <div key={row} className="row">
            {Array.from({ length: cols }).map((_, col) => (
              <div
                key={col}
                className={`cell ${Math.sin((col + wave) / 2) * rows <= row ? 'active' : ''}`}
                style={{ backgroundColor: getColor(row, col) }}
              ></div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
