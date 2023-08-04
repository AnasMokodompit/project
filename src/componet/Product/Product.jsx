import style from './Product.module.css'
import img1 from '../../Asset/5992673fce62e2da3cd96e14c1f1884e.jpg'
import img2 from '../../Asset/OIP.jpeg'
import img3 from '../../Asset/download.jpeg'
import img4 from '../../Asset/lemari-pakaian-kayu.jpg'
import { useState } from 'react'
import DataProduct from '../../Asset/Data.json'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {saveOrder} from '../../config/actions/OrderAction'



function Product() {
    const [valuePopUpRead, setValuePopUpRead] = useState('')
    const [dataById, setDataById] = useState([])
    const dispatch = useDispatch()

    // 

    const hendleCekDataProduct = (id) => {
        let DataById = DataProduct.filter((data) => data.id == id)
        setDataById(DataById)

    }

    const hendleSimpanOrderan = (id) => {
        let DataById = DataProduct.filter((data) => data.id == id)
        // console.log(DataById[0])
        dispatch(saveOrder(DataById[0]))
    }

    return (
        <div className={style.contentCard}>
            {/* <FormOrder/> */}
            {DataProduct.length !== 0 && (
                DataProduct.map((data, key) => {
                    // console.log(data)
                    return (
                    <div key={key} className={style.card}>
                        <ul className={style.popup}>
                            <li onClick={() => `${hendleSimpanOrderan(data.id)}`}><i className="fa-solid fa-cart-shopping"></i></li>
                            <li onClick={() => `${setValuePopUpRead("1")} ${hendleCekDataProduct(data.id)}`}><i className="fa-regular fa-eye"></i></li>
                        </ul>
                        <img src={img1} alt="" />
                        <span className={style.cardCategori}>{data.JENIS_PRODUK}</span>
                        <span className={style.cardJdl}>{data.TIPE}</span>
                        <span className={style.cardHarga}>{data.Harga}</span>
                    </div>
                    )
                })
            )}
            {(dataById.length !== 0 && valuePopUpRead === "1") && (
                <div className={style.ReadProductDetail}>
                    <div className={style.popup}>
                        <div className={style.top}>
                            <i onClick={() => setValuePopUpRead("0")} className="fa-regular fa-circle-xmark"></i>
                        </div>
                        <div className={style.content}>
                            <img src={img1} alt="" />
                            <div className={style.detail}>
                                <span className={style.cardCategori}>{dataById[0].JENIS_PRODUK}</span>
                                <span className={style.cardJdl}><span className={style.subData}>Tipe : </span>{dataById[0].TIPE}</span>
                                <span className={style.cardJdl}><span className={style.subData}>Ukuran : </span>{dataById[0].Ukuran}</span>
                                <span><span className={style.subData}>Deskripsi : </span>{dataById[0].Deskripsi_produk}</span>
                                <span className={style.cardHarga}>RP. {dataById[0].Harga}</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Product