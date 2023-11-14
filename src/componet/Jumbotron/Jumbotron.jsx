import { Carousel } from "flowbite-react";

import img1 from "../../Asset/Picture8.jpg";
import img2 from "../../Asset/Picture9.jpg";
import img3 from "../../Asset/Picture5.jpg";
import img4 from "../../Asset/Picture1.jpg";
import img5 from "../../Asset/Picture6.jpg";

const Jumbotron = () => {
  return (
    <div className="px-6 lg:px-0">
      {/* <div className="mb-3">
        <h1 className="font-archivo text-2xl font-bold">
          Selamat Datang di CV. Talongka Jaya
        </h1>
      </div> */}
      <div className="h-48 sm:h-64 lg:h-[28rem]">
        <Carousel pauseOnHover>
          <a
            href={img1}
            target="_blank"
            rel="noreferrer"
            className="flex h-full w-full items-center justify-center bg-neutral-300">
            <img src={img1} alt="..." className="h-full w-full object-fill" />
          </a>
          <a
            href={img2}
            target="_blank"
            rel="noreferrer"
            className="flex h-full w-full items-center justify-center bg-neutral-300">
            <img src={img2} alt="..." className="h-full w-full object-fill" />
          </a>
          <a
            href={img3}
            target="_blank"
            rel="noreferrer"
            className="flex h-full w-full items-center justify-center bg-neutral-300">
            <img src={img3} alt="..." className="h-full w-full object-fill" />
          </a>
          <a
            href={img4}
            target="_blank"
            rel="noreferrer"
            className="flex h-full w-full items-center justify-center bg-neutral-300">
            <img src={img4} alt="..." className="h-full w-full object-fill" />
          </a>
          <a
            href={img5}
            target="_blank"
            rel="noreferrer"
            className="flex h-full w-full items-center justify-center bg-neutral-300">
            <img src={img5} alt="..." className="h-full w-full object-fill" />
          </a>
        </Carousel>
      </div>
    </div>
  );
};

export default Jumbotron;
