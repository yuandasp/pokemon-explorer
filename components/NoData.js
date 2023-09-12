import Image from "next/image";
import React from "react";

function NoData() {
  return (
    <div className="no-data">
      <Image
        src="/assets/no-data-pokemon.jpeg"
        width={200}
        height={200}
        alt="no-data"
      />
      <p>There is nothing in here</p>
    </div>
  );
}

export default NoData;
