import style from './Navbar.module.css'
import ImgNavbar from '../../Asset/Img/Logo_Politeknik_Negeri_Manado.png'
import { Link } from 'react-scroll'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import DataOrder from '../DataOrder/DataOrder'


function Navbar() {
    const [activeNavbar, setActiveNavbar] = useState('hero')
    let {dataOrder} = useSelector(tes => tes.project)
    const [jumlahOrder, setJumlahOrder] = useState('')
    const [tampilOrderan, setTampilOrderan] = useState("0")

    const [fix, setFix] = useState(false)

    function setFixed() {
        // console.log(window.scrollY)
        if (window.scrollY >= 15) {
            setFix(true)
        }else{
            setFix(false)
        }

    }
    
    window.addEventListener("scroll", setFixed)

    const hendleOpsiClick = () => {
        if (tampilOrderan === "0") {
            setTampilOrderan("1")
        }else{
            setTampilOrderan("0")
        }
    }

    useEffect(() => {
        setJumlahOrder(dataOrder)
    },[dataOrder])

    return (
        <div className={fix ? `${style.navbar} ${style.fixed}` : `${style.navbar} ${style.nonFixed}`}>
            <ul className={style.navbarContent}>
                <img className={style.ImgNavbar} src={ImgNavbar} alt=""/>
                <li>
                    <Link className={activeNavbar === "hero" ? style.activeNavbar : ""} to="hero" spy={true} smooth={true} offset={-100} duration={500} onClick={() => setActiveNavbar('hero')}>Home</Link>
                </li>
                <li>
                    <Link className={activeNavbar === "tentang" ? style.activeNavbar : ""} to="tentang" spy={true} smooth={true} offset={-100} duration={500} onClick={() => setActiveNavbar('tentang')}>Tentang</Link>
                </li>
                <li>
                    <Link className={activeNavbar === "contactus" ? style.activeNavbar : ""} to="contactus" spy={true} smooth={true} offset={-150} duration={500} onClick={() => setActiveNavbar('contactus')}>Contact Us</Link>
                </li>
            </ul>
            <div className={style.main}>
                <span className={`material-symbols-outlined ${style.icon}`}>chat</span>
                <div  className={style.Orderan}>
                    <span className={`material-symbols-outlined ${style.icon}`} onClick={() => hendleOpsiClick()}>shopping_cart</span>
                    {jumlahOrder.length !== 0 && (
                        <span className={style.jumlah}>{jumlahOrder.length}</span>
                    )}
                </div>
            </div>
            {tampilOrderan === "1" && (
                <DataOrder/>
            )}
            {/* {(tampilOrderan === 1 && dataOrder.length !== 0) && (
                dataOrder.map((data) => {
                    console.log(data)
                    // return (
                    //     <div>
                    //         <h2>{data.jumlahPemesan}</h2>
                    //     </div>
                    // )
                })  
            )} */}
        </div>
    )
}


export default Navbar