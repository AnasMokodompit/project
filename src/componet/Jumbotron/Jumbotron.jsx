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
      <div className="h-48 sm:h-64 xl:h-80 2xl:h-96">
        <Carousel className="object-contain" pauseOnHover>
          <img src={img1} alt="..." />
          <img src={img2} alt="..." />
          <img src={img3} alt="..." />
          <img src={img4} alt="..." />
          <img src={img5} alt="..." />
        </Carousel>
      </div>
    </div>
  );
};

export default Jumbotron;
