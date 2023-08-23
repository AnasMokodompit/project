import style from './Navbar.module.css'
import ImgNavbar from '../../Asset/Img/Logo_Politeknik_Negeri_Manado.png'
import { Link } from 'react-scroll'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import DataOrder from '../DataOrder/DataOrder'
import { NavLink } from 'react-router-dom'
import {ResetDataOrder} from '../../config/actions/OrderAction'
import jwt from 'jwt-decode'



function Navbar() {
    const {dataLogin} = useSelector(tes => tes.userReducer)
    const [activeNavbar, setActiveNavbar] = useState('hero')
    let {dataOrder} = useSelector(tes => tes.CvTalangkaJaya)
    const [jumlahOrder, setJumlahOrder] = useState('')
    const [tampilOrderan, setTampilOrderan] = useState("0")
    const dispatch = useDispatch()
    const [id, setId] = useState('')
    const [posisionNavbar, setPosisionNavbar] = useState('')


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

    const hendlePopUpOrder = (valuePopUp) => {
        console.log(valuePopUp)
        dispatch(ResetDataOrder())
        setTampilOrderan(valuePopUp)
    }

    const hendleAccesRoleUser = () => {
        if (dataLogin?.dataLogin?.token) {       
            const decode = jwt(dataLogin.dataLogin.token)
            setId(decode.rolesId) 
            // console.log(decode)
        }
        // console.log(dataLogin, id)
    }

    
    useEffect(() => {
        setJumlahOrder(dataOrder)
        hendleAccesRoleUser()
    },[dataOrder])

    return (
        <div className={fix ? `${style.navbar} ${style.fixed}` : `${style.navbar} ${style.nonFixed}`}>
            {posisionNavbar === '' && (
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
            )}
            {posisionNavbar === 'menu' && (
                <NavLink to='/'>
                    <span className={style.linkHome} onClick={() => setPosisionNavbar('')}>Menu</span>
                </NavLink>
            )}
            <div className={style.main}>
                {id ? (
                    <>
                    <NavLink to='/customer'>
                        <span className={`material-symbols-outlined ${style.icon}`} onClick={() => setPosisionNavbar('menu')}>menu</span>
                    </NavLink>
                    <NavLink to='/customer/profile'>
                        <span className={`material-symbols-outlined ${style.icon}`}>person</span>
                    </NavLink>
                    </>
                ): 
                    <NavLink to='/login'>
                        <span className={`material-symbols-outlined ${style.icon}`}>login</span>
                    </NavLink>
                }
                <span className={`material-symbols-outlined ${style.icon}`}>chat</span>
                <div  className={style.Orderan}>
                    <span className={`material-symbols-outlined ${style.icon}`} onClick={() => hendleOpsiClick()}>shopping_cart</span>
                    {jumlahOrder?.length !== 0 && (
                        <span className={style.jumlah}>{jumlahOrder?.length}</span>
                    )}
                </div>
            </div>
            {tampilOrderan === "1" && (
                <DataOrder tampilOrderan={hendlePopUpOrder.bind(this)}/>
            )}
        </div>
    )
}


export default Navbar