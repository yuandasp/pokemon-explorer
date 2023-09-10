import React from "react";
import { getBackgroundColor } from "@/lib/getBackgroundColor";

function BarStats({ title, statNum, pokemonColor }) {
  return (
    <div className="baseStats-card">
      <p>{title}</p>
      <p>{statNum}</p>
      <div
        className="bar-stats"
        style={{ borderColor: `${getBackgroundColor(pokemonColor)}` }}
      >
        <div
          style={{
            backgroundColor: `${getBackgroundColor(pokemonColor)}`,
            height: "16px",
            width: statNum > 100 ? "100%" : `${statNum}%`,
            borderRadius: "8px",
          }}
        ></div>
      </div>
    </div>
  );
}

export default BarStats;
