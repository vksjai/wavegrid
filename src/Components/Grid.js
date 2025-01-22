import React, { useState, useEffect } from 'react';
import './Grid.css'; // Import your CSS styles

const Grid = () => {
  const [rows, setRows] = useState(15);
  const [cols, setCols] = useState(20);
  const [grid, setGrid] = useState([]);
  const [waveDirection, setWaveDirection] = useState(1); // 1: right
  const [wavePosition, setWavePosition] = useState(Math.floor(cols / 2));
  const [waveColorIndex, setWaveColorIndex] = useState(0);
  const colors = ['darkgreen', 'darkblue']; 

  useEffect(() => {
    initializeGrid();
  }, [rows, cols]);

  const initializeGrid = () => {
    const newGrid = [];
    for (let i = 0; i < rows; i++) {
      const row = [];
      for (let j = 0; j < cols; j++) {
        row.push({ color: 'black', opacity: 1 });
      }
      newGrid.push(row);
    }
    setGrid(newGrid);
  };

  const updateGrid = () => {
    const newGrid = [...grid];

    // Clear previous wave
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        newGrid[i][j].color = 'black';
        newGrid[i][j].opacity = 1;
      }
    }

    // Draw new wave with current color (only in the current row)
    for (let j = 0; j < cols; j++) {
      if (Math.abs(j - wavePosition) <= 2) {
        for (let i = 0; i < rows; i++) {
          newGrid[i][j].color = colors[waveColorIndex];
          newGrid[i][j].opacity = 0.5; // Wave cells
        }
      } else if (Math.abs(j - wavePosition) <= 3) {
        for (let i = 0; i < rows; i++) {
          newGrid[i][j].color = colors[waveColorIndex];
          newGrid[i][j].opacity = 0.2; // Wave edge cells
        }
      }
    }

    // Update wave position
    setWavePosition((wavePosition + waveDirection + cols) % cols);

    // Change color when reaching the end
    if (wavePosition === cols - 1) {
      setWaveColorIndex((waveColorIndex + 1) % colors.length); 
    }

    setGrid(newGrid);
  };

  useEffect(() => {
    const interval = setInterval(updateGrid, 100); // Adjust speed here
    return () => clearInterval(interval);
  }, [updateGrid]);

  return (
    <div className="grid-container">
      {grid.map((row, rowIndex) => (
        <div key={rowIndex} className="grid-row">
          {row.map((cell, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className="grid-cell"
              style={{ backgroundColor: cell.color, opacity: cell.opacity }}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Grid;