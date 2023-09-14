import style from './Sidebar.module.css'
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import LinkScroll  from 'react-scroll'
import jwt from 'jwt-decode'
import {UserLogOut} from '../../config/actions/UserAction'

function Sidebar({nameSdiber}) {
    const {dataLogin} = useSelector(tes => tes.userReducer)
    const [id, setId] = useState('')
    const [dataCategories, setDataCategories] = useState('')
    const navigate = useNavigate() 
    
    const hendleGetAllCategory = () => {
        axios.get(`${process.env.REACT_APP_BASE_API}/categories`)
        .then((res) => {
            setDataCategories(res.data.data)
        }).catch((err) => {
            console.log(err)
        })
    }

    const hendleAccesRoleUser = () => {
        console.log(dataLogin)
        if (dataLogin?.dataLogin?.token) {       
            const decode = jwt(dataLogin.dataLogin.token)
            setId(decode.rolesId) 
        }else{
            setId('')
        }
        console.log(dataLogin, id)
    }

    const hendleLogout = () => {
        setId('')
        UserLogOut()
        localStorage.clear()
        setTimeout(() => {
            navigate('/')
        }, 300);
    }

    useEffect(() => {
        hendleGetAllCategory()
        hendleAccesRoleUser()
    },[])
    
    return (
        <>
            {console.log(id)}
            {(id === 1) ? (
                <div className={`${style.sidebar}`}>
                    <div className={style.item}>
                        <span>Cv Talangka Jaya</span>    
                        <span className={`${style.menu} material-symbols-outlined ${style.icon}`}>menu</span>
                    </div>
                    <div className={style.menuNavbar}>
                        <ul className={style.sideMenu}>
                            <li>
                                <Link className={`${style.menu}`} to='/beranda'>
                                    <span className={`${style.icon} material-symbols-outlined`}>home</span>
                                    <span className={`${style.menuSidebar}`}>Beranda</span>
                                </Link>
                            </li>
                            <li>
                                <Link className={`${style.menu}`} to='/product'>    
                                    <span className={`${style.icon} material-symbols-outlined`}>inventory_2</span>
                                    <span className={`${style.menuSidebar}`}>Product</span>
                                    {/* <span className={`${style.iconRight} material-symbols-outlined`}>chevron_right</span> */}
                                </Link>
                            </li>
                            <li>
                                <Link className={`${style.menu}`} to='/order'>    
                                    <span className={`${style.icon} material-symbols-outlined`}>shopping_cart</span>
                                    <span className={`${style.menuSidebar}`}>Order</span>
                                    {/* <span className={`${style.iconRight} material-symbols-outlined`}>chevron_right</span> */}
                                </Link>
                            </li>
                            <li>
                                <Link className={`${style.menu}`}>    
                                    <span className={`${style.icon} material-symbols-outlined`}>account_box</span>
                                    <span className={`${style.menuSidebar}`}>Akun Saya</span>
                                    {/* <span className={`${style.iconRight} material-symbols-outlined`}>chevron_right</span> */}
                                </Link>
                            </li>
                            <li>
                                <Link className={`${style.menu}`} onClick={hendleLogout}>    
                                    <span className={`${style.icon} material-symbols-outlined`}>logout</span>
                                    <span className={`${style.menuSidebar}`}>LogOut</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            ) : 
                // {id === "" && (
                    <div id= 'hero' className={style.sidebar}>
                        <ul className={style.contentSidebar}>
                            <h4 className={style.jdlSidebar}>CATEGORIES</h4>
                            <li>
                                <LinkScroll.Link to="product" spy={true} smooth={true} offset={-215} duration={500} onClick={() => nameSdiber()}>All Products</LinkScroll.Link>
                            </li>
                            {dataCategories.length !== 0 && (
                                dataCategories.map((data, key) => {
                                    return (
                                        <li key={key} >
                                            <LinkScroll.Link to="product" spy={true} smooth={true} offset={-215} duration={500} onClick={() => nameSdiber(data.id)}>{data.name}</LinkScroll.Link>
                                        </li>
                                    )
                                })
                            )}
                            
                        </ul>
                    </div>
                // )}
            }
        </>
    )
}

export default Sidebar