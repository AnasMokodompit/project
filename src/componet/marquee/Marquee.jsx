import React from "react";
import style from "./Marquee.module.css";
import Marquee from "react-fast-marquee";

const jalan = () => {
  return (
    <div className={style.announcement}>
      <Marquee speed={60} gradient={false} pauseOnHover>
        <span>CV.Talongka Jaya---"Quality is our Motto"</span>
      </Marquee>
    </div>
  );
};

export default jalan;
