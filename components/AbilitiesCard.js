import React from "react";

function AbilitiesCard({ abilities }) {
  return (
    <>
      {abilities?.key ? (
        <li>
          <div style={{ marginBottom: "16px" }}>
            <p className="abilities-key">{abilities?.key || null}</p>
            <p>{abilities?.desc || null}</p>
          </div>
        </li>
      ) : null}
    </>
  );
}

export default AbilitiesCard;
