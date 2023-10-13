import Navbar from "./../../componet/Navbar/Navbar";
import Marquee from "../../componet/marquee/Marquee";
import Sidebar from "./../../componet/Sidebar/Sidebar";
import Content from "./../../componet/Content/Content";
import Carousel from "./../../componet/Carousel/Carousel";
import Footer from "./../../componet/Footer/Footer";
import Contact from "./../../componet/ContactUs/ContactUs";
import Tentang from "./../../componet/Tentang/Tentang";
import { useState } from "react";
import axios from "axios";
import style from "./Home.module.css";

import { Jumbotron } from "../../componet/jumbotron";

function Home() {
  const [sidebarIdData, setSidebarIdData] = useState([]);

  const hendleCekProductByContent = (idproduct) => {
    axios
      .get(`${process.env.REACT_APP_BASE_API}/products?category=${idproduct}`)
      .then((res) => {
        setSidebarIdData(res.data.data);
        console.log(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });

    console.log(sidebarIdData);
  };

  return (
    <div className="flex flex-col gap-12 font-archivo">
      <Navbar />

      <div className="container mt-5">
        {/* <Sidebar nameSdiber={hendleCekProductByContent.bind(this)} /> */}
        <div className="flex flex-col gap-2">
          <Marquee />
          <Carousel />
          {/* <Jumbotron /> */}
          <Content product={sidebarIdData} />
          <Contact />
          <Tentang />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
