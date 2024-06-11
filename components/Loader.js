import React from "react";

function Loader() {
  return (
    <div className="loader hide-scrollbar">
      <img src="/assets/pokemon-logo.png" alt="" width={240} />
      <p style={{ marginTop: "16px" }}>Loading...</p>
    </div>
  );
}

export default Loader;
