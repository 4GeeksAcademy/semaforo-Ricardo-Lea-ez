import React, { useState, useEffect, useRef } from "react";

const TrafficLight = () => {
  const [colors, setColors] = useState(["red", "yellow", "green"]);
  const [color, setColor] = useState("red");
  const [autoChange, setAutoChange] = useState(true);

  const timerRef = useRef(null);

  useEffect(() => {
    if (!autoChange) {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      return;
    }

    timerRef.current = setInterval(() => {
      setColor((currentColor) => {
        const currentIndex = colors.indexOf(currentColor);
        const nextIndex = (currentIndex + 1) % colors.length;
        return colors[nextIndex];
      });
    }, 3000);

    return () => clearInterval(timerRef.current);
  }, [autoChange, colors]);

  const handleLightClick = (selectedColor) => {
    setColor(selectedColor);
    setAutoChange(false);
  };

  const toggleColor = () => {
    setAutoChange(false);
    const currentIndex = colors.indexOf(color);
    const nextIndex = (currentIndex + 1) % colors.length;
    setColor(colors[nextIndex]);
  };

  const addPurple = () => {
    if (!colors.includes("purple")) {
      setColors([...colors, "purple"]);
    }
  };

  const lightStyle = (lightColor) => ({
    width: "80px",
    height: "80px",
    margin: "10px auto",
    borderRadius: "50%",
    backgroundColor: lightColor,
    opacity: color === lightColor ? 1 : 0.3,
    boxShadow: color === lightColor ? `0 0 20px 5px ${lightColor}` : "none",
    cursor: "pointer",
    transition: "opacity 0.3s, box-shadow 0.3s",
  });

  return (
    <div style={{ width: "100px", margin: "20px auto", textAlign: "center" }}>
      {colors.map((lightColor) => (
        <div
          key={lightColor}
          style={lightStyle(lightColor)}
          onClick={() => handleLightClick(lightColor)}
          title={`Luz ${lightColor}`}
        />
      ))}

      <button onClick={toggleColor} style={{ marginTop: "20px", padding: "8px 12px" }}>
        Alternar color
      </button>

      <button onClick={addPurple} style={{ marginTop: "10px", padding: "8px 12px" }}>
        Añadir púrpura
      </button>

      {!autoChange && (
        <p style={{ fontSize: "12px", color: "#555", marginTop: "10px" }}>
          Cambio automático pausado (haz clic en "Alternar color" para cambiar manualmente)
        </p>
      )}
    </div>
  );
};

function App() {
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Semáforo React con useEffect</h1>
      <TrafficLight />
    </div>
  );
}

export default App;