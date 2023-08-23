import style from './Product.module.css'
import img1 from '../../Asset/5992673fce62e2da3cd96e14c1f1884e.jpg'
import img2 from '../../Asset/OIP.jpeg'
import img3 from '../../Asset/download.jpeg'
import img4 from '../../Asset/lemari-pakaian-kayu.jpg'
import { useEffect, useState } from 'react'
// import DataProduct from '../../Asset/Data.json'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {saveOrder} from '../../config/actions/OrderAction'
import axios from 'axios'



function Product({product}) {
    const [valuePopUpRead, setValuePopUpRead] = useState('')
    const [dataById, setDataById] = useState([])
    const [dataProduct ,setDataProduct] = useState([])
    const [idcategory, setCategoryId] = useState()
    const dispatch = useDispatch()

    // 
    const hendleGetAllProduct = async () => {
        await axios.get(`${process.env.REACT_APP_BASE_API}/products`)
        .then((res) => {
            setDataProduct(res.data.data)
            console.log(res.data.data)
        }).catch((err) => {
            console.log(err)
        })
    }

    console.log(product)
    
    

    const hendleCekDataProduct = (id) => {
        axios(`${process.env.REACT_APP_BASE_API}/products/${id}`)
        .then((res) => {
            setDataById(res.data.data)
            // console.log(res.data.data)
        }).catch((err) => {
            console.log(err)
        })

    }

    const hendleSimpanOrderan = (id) => {
        // let data = {}
        axios(`${process.env.REACT_APP_BASE_API}/products/${id}`)
        .then((res) => {
            console.log(res.data.data)
            // dispatch(saveOrder(res.data.data))
            dispatch(saveOrder({id: res.data.data.id, url_image: res.data.data?.product_images[0]?.url_image, name: res.data.data.name, tipe: res.data.data.categories.name, jumlah: 1, harga: res.data.data.harga, jumlahHarga: res.data.data.harga}))
            // data = res.data.data
        }).catch((err) => {
            console.log(err)
        })

        // dispatch(saveOrder(data))
    }

    useEffect(() => {
        hendleGetAllProduct()
    },[])

    return (
        <div className={style.contentCard}>
            {/* <FormOrder/> */}
            {product.length === 0 ? (
                dataProduct.map((data, key) => {
                    // console.log(data)
                    return (
                    <div key={key} className={style.card}>
                        <ul className={style.popup}>
                            <li onClick={() => `${hendleSimpanOrderan(data.id)}`}><i className="fa-solid fa-cart-shopping"></i></li>
                            <li onClick={() => `${setValuePopUpRead("1")} ${hendleCekDataProduct(data.id)}`}><i className="fa-regular fa-eye"></i></li>
                        </ul>
                        <img src={data?.product_images[0]?.url_image} alt="" />
                        <span className={style.cardCategori}>{data?.categories?.name}</span>
                        <span className={style.cardJdl}>{data?.name}</span>
                        <span className={style.cardHarga}>{new Intl.NumberFormat("id-ID", {style: "currency", currency: "IDR"}).format(data.harga)}</span>
                    </div>
                    )
                })
            ): 
            product.map((data, key) => {
                    // console.log(data)
                    return (
                    <div key={key} className={style.card}>
                        <ul className={style.popup}>
                            <li onClick={() => `${hendleSimpanOrderan(data.id)}`}><i className="fa-solid fa-cart-shopping"></i></li>
                            <li onClick={() => `${setValuePopUpRead("1")} ${hendleCekDataProduct(data.id)}`}><i className="fa-regular fa-eye"></i></li>
                        </ul>
                        <img src={data?.product_images[0]?.url_image} alt="" />
                        <span className={style.cardCategori}>{data?.categories?.name}</span>
                        <span className={style.cardJdl}>{data?.name}</span>
                        <span className={style.cardHarga}>{new Intl.NumberFormat("id-ID", {style: "currency", currency: "IDR"}).format(data.harga)}</span>
                    </div>
                    )
                })
            }
            {console.log(dataById)}
            {(dataById.id && valuePopUpRead === "1") && (
                <div className={style.ReadProductDetail}>
                    <div className={style.popup}>
                        <div className={style.top}>
                            <i onClick={() => setValuePopUpRead("0")} className="fa-regular fa-circle-xmark"></i>
                        </div>
                        <div className={style.content}>
                            <img src={dataById?.product_images[0]?.url_image} alt="" />
                            <div className={style.detail}>
                                <span className={style.cardCategori}>{dataById?.categories?.name}</span>
                                <span className={style.cardJdl}><span className={style.subData}>Tipe : </span>{dataById?.name}</span>
                                <span className={style.cardJdl}><span className={style.subData}>Ukuran : </span>{dataById?.ukuran}</span>
                                <span><span className={style.subData}>Deskripsi : </span>{dataById?.Deskripsi_produk}</span>
                                <span className={style.cardHarga}>{new Intl.NumberFormat("id-ID", {style: "currency", currency: "IDR"}).format(dataById?.harga)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Product