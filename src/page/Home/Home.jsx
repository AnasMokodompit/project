import { useState } from "react";
import axios from "axios";

import Navbar from "./../../componet/Navbar/Navbar";
import Marquee from "../../componet/marquee/Marquee";
import Content from "./../../componet/Content/Content";
import Jumbotron from "../../componet/Jumbotron/Jumbotron";
import Footer from "./../../componet/Footer/Footer";
import Contact from "./../../componet/ContactUs/ContactUs";
import Tentang from "./../../componet/Tentang/Tentang";

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
  };

  return (
    <div className="flex flex-col items-center justify-center gap-12 font-archivo">
      <Navbar />
      <div className="container mt-12 lg:px-12">
        <div className="flex flex-col gap-8">
          <Marquee />
          <div className="flex flex-col gap-12">
            <Jumbotron />
            <Content product={sidebarIdData} />
            <Contact />
            <Tentang />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
