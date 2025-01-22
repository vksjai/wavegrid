import React, { useEffect, useState } from "react";
import "./App.css";

const App = () => {
  const rows = 15;
  const cols = 20;
  const [grid, setGrid] = useState([]);
  const [waveIndex, setWaveIndex] = useState(0);

  // Initialize the grid
  useEffect(() => {
    const initialGrid = Array(rows)
      .fill(null)
      .map(() => Array(cols).fill(false));
    setGrid(initialGrid);
  }, [rows, cols]);

  // Update the wave animation
  useEffect(() => {
    const interval = setInterval(() => {
      setWaveIndex((prevIndex) => (prevIndex + 1) % cols);
    }, 200); // Adjust speed of the wave here

    return () => clearInterval(interval);
  }, [cols]);

  // Render the grid with wave animation
  const getUpdatedGrid = () => {
    return grid.map((row, rowIndex) =>
      row.map((cell, colIndex) => {
        const isActive = Math.abs(waveIndex - colIndex) < 3; // Wave effect
        return isActive;
      })
    );
  };

  const updatedGrid = getUpdatedGrid();

  return (
    <div className="container">
      <header className="header">
        <h1>Dynamic Wave Grid</h1>
        <p>Enjoy the wave animation and dynamic color effects!</p>
      </header>
      <div className="grid">
        {updatedGrid.map((row, rowIndex) =>
          row.map((isActive, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className={`cell ${isActive ? "active" : ""}`}
            ></div>
          ))
        )}
      </div>
      <footer>
        <p>Created with React.js and CSS</p>
      </footer>
    </div>
  );
};

export default App;
