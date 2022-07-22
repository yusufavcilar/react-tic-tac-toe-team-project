import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import GameWrapper from "./context/GameContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <GameWrapper>
      <App />
    </GameWrapper>
  </React.StrictMode>
);
