import style from "./Footer.module.css";

function Footer() {
  return (
    <div className="flex flex-col items-center gap-2 bg-neutral-400 p-5 text-white">
      <img
        src="logo.png"
        alt="Logo CV Talongka Jaya"
        className="aspect-auto h-20"
      />
      {/* <h3>CV Talongka Jaya</h3> */}
      <p>
        Menyediakan Bebagai Product, dan Pebeli Bisa Melakukan Pesanan sesuai
        dengan keiginan
      </p>
      <ul className="flex gap-4">
        <li>
          <a href="https://www.facebook.com/">
            <i className="fa-brands fa-facebook"></i>
          </a>
        </li>
        <li>
          <a href="https://www.instagram.com/?hl=id">
            <i className="fa-brands fa-instagram"></i>
          </a>
        </li>
        <li>
          <a href="https://web.whatsapp.com/">
            <i className="fa-brands fa-whatsapp"></i>
          </a>
        </li>
        <li>
          <a href="https://www.youtube.com/">
            <i className="fa-brands fa-youtube"></i>
          </a>
        </li>
      </ul>
      <p>Copyright &copy; 2023 by CV Talongka Jaya</p>
    </div>
  );
}

export default Footer;
