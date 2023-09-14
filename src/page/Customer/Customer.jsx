import Navbar from '../../componet/Navbar/Navbar'
import style from './Customer.module.css'
import { ToastContainer, toast } from "react-toastify"
import img from '../../Asset/Picture11.jpg'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import jwt from 'jwt-decode'
import buktiBayar from '../../Asset/Img/profile_null.png'



function Customer() {
    const {dataLogin} = useSelector(tes => tes.userReducer)
    const [dataUser, setDataUser] = useState([])
    const [dataProduct, setDataProduct] = useState([])
    const [popUpInformasiPesanan, setPopUpInformasiPesanan] = useState('')
    const [dataProductById, setDataProductById] = useState([])
    const [dataImageClick, setDataImageClick] = useState(false)
    const [dataImageBuktiBayar, setDataImageBuktiBayar] = useState(false)
    const [buktibayarr, setBuktiBayar] = useState()


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

        axios.get(`http://localhost:3000/api/v1.0/productOrder`, { headers: { Authorization: `Bearer ${dataLogin.dataLogin.token}`}})
        .then((res) => {
            console.log(res.data.data)
            setDataProduct(res.data.data)
        }).catch((err) => {
            console.log(err)
        })
    }

    const hendleUploadBuktiBayar = (id) => {
        const formData = new FormData()
            
        formData.append('gambarBuktiBayar', buktibayarr)

        console.log(id, dataImageBuktiBayar)
        axios.patch(`http://localhost:3000/api/v1.0/productOrder/${id}`, formData, { headers: { Authorization: `Bearer ${dataLogin.dataLogin.token}`}})
        .then((res) => {
            hendleOrderByCustemers()
        }).catch((err) => {
            console.log(err)
        })
    }

    const hendleClose = () => {
        setDataImageClick(false)
        setDataImageBuktiBayar(false)
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
                        {console.log(dataProduct)}
                        {dataProduct.length !== 0 && (
                            dataProduct.map((data,key) => {
                                return (
                                    <div key={key} className={style.item} onClick={() => `${setPopUpInformasiPesanan('Active')} ${setDataProductById(data)} ${data?.picture_bukti_bayar ? setDataImageBuktiBayar(data?.picture_bukti_bayar) : setDataImageBuktiBayar(false)}`}>
                                        <img src={data.products.product_images[0].url_image} alt="" />
                                        <span>{data.products.name}</span>
                                        <span>{data.products.categories.name}</span>
                                        <span>{data.jumlah} Product</span>
                                        <span>Total Harga : {new Intl.NumberFormat("id-ID", {style: "currency", currency: "IDR"}).format(data.Price)}</span>
                                    </div>
                                )
                            })
                        )}
                    </div>
                    {popUpInformasiPesanan === "Active" && (
                        {dataProductById},
                        <div className={style.ReadProductDetail}>
                            <div className={style.popup}>
                                <div className={style.top}>
                                    <span onClick={() => `${setPopUpInformasiPesanan("")} ${hendleClose()}`} className="material-symbols-outlined">close</span>
                                </div>
                                <div className={style.content}>
                                    {console.log(dataProductById)}
                                    <div className={style.image}>
                                        <img src={dataImageClick == false ? dataProductById?.products?.product_images[0]?.url_image : dataImageClick} alt="" />
                                        <div className={style.itemImage}>
                                            {dataProductById?.products?.product_images?.length !== 0 && (
                                                dataProductById?.products?.product_images.map((data,key) => {
                                                    return (
                                                        <img key={key} src={data.url_image} alt="" onClick={() => setDataImageClick(data.url_image)} />
                                                    )
                                                })
                                            )}
                                        </div>
                                    </div>
                                    <div className={style.detail}>
                                        <span className={style.cardCategori}>{dataProductById?.products?.categories?.name}</span>
                                        <span className={style.cardJdl}>{dataProductById?.products?.name}</span>
                                        <span className={style.ukuran}>
                                            <p className={style.subData}>Ukuran</p>
                                            {dataProductById?.products?.ukuran}
                                        </span>
                                        <span className={style.deskripsi}><p className={style.subData}>Deskripsi</p>{dataProductById?.products?.Deskripsi_produk}</span>
                                        <span className={style.cardHarga}>{new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(dataProductById?.products?.harga)}</span>
                                        <p className={style.judulDetailPesanan}>Detail Pesanan</p>
                                        <span>{dataProductById?.jumlah} Product</span>
                                        <span>Total Harga : {new Intl.NumberFormat("id-ID", {style: "currency", currency: "IDR"}).format(dataProductById?.Price)}</span>
                                        {dataProductById.status === 2 && (
                                            <div className={style.contentBuktiBayar}>
                                                <p>Upload Bukti Pembayaran :</p>
                                                <div className={style.itemBuktiBayar}>
                                                    <img className={style.imgBuktiBayar} src={dataImageBuktiBayar == false ? buktiBayar : dataImageBuktiBayar} alt="" />
                                                    <input type="file" onChange={(e) => `${setDataImageBuktiBayar(URL.createObjectURL(e.target.files[0]))} ${setBuktiBayar(e.target.files[0])}`} />
                                                </div>
                                                <input className={style.button} type="button" value="Kirim Bukti Bayar" onClick={() => hendleUploadBuktiBayar(dataProductById.id)} />
                                            </div>
                                        )}
                                        {dataProductById.status === 0 && (
                                            <div className={style.contentBuktiBayar}>
                                                <p style={{marginTop: '10px', color: 'blue', fontStyle: 'italic'}}>Menunggu Konfirmasi Toko, Untuk Lanjut Ke Pembayaran</p>
                                            </div>
                                        )}
                                        {dataProductById.status === 1 && (
                                            <div className={style.contentBuktiBayar}>
                                                <p style={{marginTop: '10px', color: 'blue', fontStyle: 'italic'}}>Pesanan Ditolak, Terdapat kendala dalam membuat pesanan, antara lain, bahan, keguangan dll</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Customer