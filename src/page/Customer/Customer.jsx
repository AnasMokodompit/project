import Navbar from '../../componet/Navbar/Navbar'
import style from './Customer.module.css'
import { ToastContainer, toast } from "react-toastify"
import img from '../../Asset/Picture11.jpg'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import jwt from 'jwt-decode'



function Customer() {
    const {dataLogin} = useSelector(tes => tes.userReducer)
    const [dataUser, setDataUser] = useState([])
    const [dataProduct, setDataProduct] = useState([])

    const hendleCekUser = () => {
        const decode = jwt(dataLogin.dataLogin.token)

        axios.get(`http://localhost:3000/api/v1.0/users/${decode.id}`)
        .then((res) => {
            // console.log(res.data.data)
            setDataUser(res.data.data)
        }).catch((err) => {
            console.log(err)
        })
    }

    const hendleOrderByCustemers = () => {
        const decode = jwt(dataLogin.dataLogin.token)

        axios.get(`http://localhost:3000/api/v1.0/orders?id_user=${decode.id}`)
        .then((res) => {
            // console.log(res.data.data)
            setDataProduct(res.data.data)
        }).catch((err) => {
            console.log(err)
        })
    }
    useEffect(() => {
        hendleCekUser()
        hendleOrderByCustemers()
    },[])
    return (
        <div className={style.container}>
            <ToastContainer/>
            <Navbar/>
            <div className={style.content}>
                <h4>Daftar Pembelian</h4>
                <div className={style.contentProfile}>
                   <div className={style.contentProfileItem}>
                    <img src={img} alt="" />
                        <div>
                            <h5>{dataUser.name}</h5>
                            <span>{dataUser.alamat}</span>
                        </div>
                   </div>
                    <input id={dataUser.id} type="button" value="Edit" />
                </div>
                <div className={style.contentItem}>
                    <div className={style.itemCategori}>
                        <h5>Kategori</h5>
                        <div className={style.item}>
                            <div>
                                <span className={`material-symbols-outlined ${style.icon}`}>inventory_2</span>
                                <span>Daftar Pesanan</span>
                            </div>
                            <span className="material-symbols-outlined">navigate_next</span>
                        </div>
                        <div className={style.item}>
                            <div>
                                <span className={`material-symbols-outlined ${style.icon}`}>progress_activity</span>
                                <span>Pesanan Diproses</span>
                            </div>
                            <span className="material-symbols-outlined">navigate_next</span>
                        </div>
                        <div className={style.item}>
                            <div>
                                <span className={`material-symbols-outlined ${style.icon}`}>assignment_turned_in</span>
                                <span>Pesanan Selesai</span>
                            </div>
                            <span className="material-symbols-outlined">navigate_next</span>
                        </div>
                    </div>
                    <div className={style.itemProduct}>
                        {dataProduct.length !== 0 && (
                            console.log(dataProduct),
                            dataProduct.map((data,key) => {
                                return (
                                    <div key={key} className={style.item}>
                                        <img src={data.product_Orders[0].products.product_images[0].url_image} alt="" />
                                        <span>{data.product_Orders[0].products.name}</span>
                                        <span>{data.product_Orders[0].products.categories.name}</span>
                                        <span>{new Intl.NumberFormat("id-ID", {style: "currency", currency: "IDR"}).format(data.product_Orders[0].products.harga)}</span>
                                    </div>
                                )
                            })
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Customer