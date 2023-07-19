import Image from "next/image";
import React from "react";

function Loader() {
  return (
    <div
      style={{ top: "50%", transform: "translateY(-50%)" }}
      className="fixed left-0 w-full flex justify-center items-center"
    >
      <Image width={100} height={100} alt="Loading..." src="/loader.svg" />
    </div>
  );
}

export default Loader;
