import logo from './logo.svg';
import style from './App.module.css'
import Navbar from './componet/Navbar/Navbar';
import Sidebar from './componet/Sidebar/Sidebar';
import Content from './componet/Content/Content';
import Carousel from './componet/Carousel/Carousel';
import Footer from './componet/Footer/Footer';
import Contact from './componet/ContactUs/ContactUs';
import Tentang from './componet/Tentang/Tentang';

function App() {
  return (
    <div className={style.App}>
      <Navbar/>
      <div className={style.menu}>
        <Sidebar/>
        <div className={style.content}>
          <Carousel/>
          <Content/>
          <Contact/>
          <Tentang/>
        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default App;
