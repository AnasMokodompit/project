import Navbar from './../../componet/Navbar/Navbar';
import Sidebar from './../../componet/Sidebar/Sidebar';
import Content from './../../componet/Content/Content';
import Carousel from './../../componet/Carousel/Carousel';
import Footer from './../../componet/Footer/Footer';
import Contact from './../../componet/ContactUs/ContactUs';
import Tentang from './../../componet/Tentang/Tentang';
import { useState } from 'react';
import axios from 'axios';
import style from './Home.module.css'


function Home() {
    const [sidebarIdData, setSidebarIdData] = useState([])

  const hendleCekProductByContent = (idproduct) => {
    axios.get(`${process.env.REACT_APP_BASE_API}/products?category=${idproduct}`)
    .then((res) => {
      setSidebarIdData(res.data.data)
        console.log(res.data.data)
    }).catch((err) => {
        console.log(err)
    })


    console.log(sidebarIdData)
  }

    return (
        <div className={style.container}>
            <Navbar/>
            <div className={style.menu}>
                <Sidebar nameSdiber={hendleCekProductByContent.bind(this)}/>
                <div className={style.content}>
                <Carousel/>
                <Content product={sidebarIdData}/>
                <Contact/>
                <Tentang/>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default Home