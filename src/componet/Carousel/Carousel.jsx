import style from "./Carousel.module.css";
import img from "../../Asset/Picture8.jpg";
import img1 from "../../Asset/Picture9.jpg";
import img2 from "../../Asset/Picture5.jpg";
import img3 from "../../Asset/Picture1.jpg";
import img4 from "../../Asset/Picture6.jpg";

function Carousel() {
  return (
    // <div className={style.Carousel}>
    <div
      id="carouselExampleIndicators"
      className="carousel slide"
      data-interval="5000"
      data-ride="carousel">
      <ol className="carousel-indicators">
        <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
        <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
        <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
      </ol>
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img className="d-block w-100" src={img} alt="First slide" />
        </div>
        <div className="carousel-item">
          <img className="d-block w-100" src={img2} alt="Second slide" />
        </div>
        <div className="carousel-item">
          <img className="d-block w-100" src={img4} alt="Third slide" />
        </div>
      </div>
      <a
        className="carousel-control-prev"
        href="#carouselExampleIndicators"
        role="button"
        data-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="sr-only">Previous</span>
      </a>
      <a
        className="carousel-control-next"
        href="#carouselExampleIndicators"
        role="button"
        data-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="sr-only">Next</span>
      </a>
    </div>
    // {/* <div className={style.content}>
    //   <div className={style.detail}>
    //     <h2>CV Talongka Jaya</h2>
    //     <span>Tempat Pengrajin kayu</span>
    //     <input type="button" value="Sejarah" />
    //   </div>
    // </div> */}
    // </div>
  );
}

export default Carousel;
