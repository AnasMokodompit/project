import React from "react";
import Marquee from "react-fast-marquee";

const jalan = () => {
  return (
    <div className="px-6 font-archivo font-bold lg:px-0">
      <Marquee speed={60} gradient={false}>
        <div className="flex flex-col items-center justify-center md:flex-row">
          <img src="logo1.png" alt="Logo CV. Talongka Jaya" className="h-8" />
          <span className="text-base md:text-lg lg:text-xl">
            "Quality is our Motto"
          </span>
        </div>
      </Marquee>
    </div>
  );
};

export default jalan;
