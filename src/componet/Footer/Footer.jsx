import style from './Footer.module.css'

function Footer() {
    return (
        <div className={style.footer}>
            <h3>CV Talongka Jaya</h3>
            <p>Menyediakan Bebagai Product, dan Pebeli Bisa Melakukan Pesanan sesuai dengan keiginan</p>
            <ul>
                <li><a href="https://www.facebook.com/"><i className="fa-brands fa-facebook"></i></a></li>
                <li><a href="https://www.instagram.com/?hl=id"><i className="fa-brands fa-instagram"></i></a></li>
                <li><a href="https://web.whatsapp.com/"><i className="fa-brands fa-whatsapp"></i></a></li>
                <li><a href="https://www.youtube.com/"><i className="fa-brands fa-youtube"></i></a></li>
            </ul>
            <p>Copyright &copy; 2023 by CV Talongka Jaya</p>
        </div>
    )
}


export default Footer