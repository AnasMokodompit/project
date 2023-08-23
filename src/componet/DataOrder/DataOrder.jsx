import { useDispatch, useSelector } from 'react-redux'
import style from './DataOrder.module.css'
import { useEffect, useState } from 'react'
import {saveOrder, kurangOrder, deleteOrder, ResetDataOrder} from '../../config/actions/OrderAction'
import axios from 'axios'
import { ToastContainer, toast } from "react-toastify"



function DataOrder({tampilOrderan}) {
    const [dataOrderById, setDataOrderById] = useState([])
    const [namePemesan, setNamaPemesan] = useState('')
    const [noHp, setNoHp] = useState('')
    const [alamat, setAlamat] = useState('')
    const [email, setEmail] = useState('')
    let {dataOrder} = useSelector(data => data.CvTalangkaJaya)
    const dispatch = useDispatch()


    const hendleTambahOrder = (id, harga) => {
        dispatch(saveOrder({id: id, jumlah: 1, harga: harga}))
    }


    const hendleKurangOrder = (id, harga) => {
        dispatch(kurangOrder({id: id, jumlah: 1, harga: harga}))
    }


    const hendleHapusOrder = (id) => {
        dispatch(deleteOrder({id: id}))
    }

    const hendleSubmitOrder = () => {
        const data = {
            dataOrder,
            namePemesan: namePemesan,
            email: email,
            noHp: noHp,
            alamat: alamat
        }
        axios.post(`${process.env.REACT_APP_BASE_API}/orders`, data)
        .then((res) => {
            console.log(res.data.data)
            alert(`User berhasil dibuat, Login dengan Email yang telah dimasukan dan password ${res.data.data.users.password}`)
            ResetDataOrder()
        }).catch((err) => {
            console.log(err)
        })

        tampilOrderan("0")
    }
    // useEffect(() => {
    //     hendleCekOrder()
    // },[])

    return (
        <div className={style.dataOrder}>
            {/* <ToastContainer/> */}
            {/* {console.log(dataOrder)} */}
            {dataOrder?.length !== 0 && (
                <>
                {dataOrder?.map((data, key) => {
                    return (
                        <div className={style.content}>
                            <div className={style.imgOrder}>
                                <img src={data?.url_image} alt="" />
                            </div>
                            <div className={style.contentCenter}>
                               <div className={style.contentCenterItem}>
                                    <span className={style.cardCategori}>{data.name}</span>
                                    <span className={style.cardJdl}>
                                    <span className={style.subData}>Tipe : {data.tipe}</span></span>
                                    <div className={style.average} >
                                        <span onClick={() => hendleKurangOrder(data.id, data.harga)} >-</span>
                                        <span>{data.jumlah}</span>
                                        <span onClick={() => hendleTambahOrder(data.id, data.harga)} >+</span>
                                    </div>
                               </div>
                               <div className={style.contentCenterItem}>
                                    <span className={style.cardHarga}>{new Intl.NumberFormat("id-ID", {style: "currency", currency: "IDR"}).format(data.jumlahHarga)}</span>
                                    <span className={`material-symbols-outlined ${style.delete}`}  onClick={() => hendleHapusOrder(data.id)}>delete</span>
                               </div>
                            </div>
                        </div>
                    )
                })}
                {/* <div className={style.keterangan}>
                    <div className={style.keteranganItem}>
                        <span>Jumlah Product</span>
                        <span>3</span>
                    </div>
                    <div className={style.keteranganItem}>
                        <span>Jumlah Harga</span>
                        <span>200000</span>
                    </div>
                </div> */}
                </>
            )}
            <div className={style.formOrder}>
                <h4>Biodata Pembeli</h4>
                <div className={style.form}>
                    <div className={style.formItem}>
                        <label htmlFor="">Nama Pemesan</label>
                        <input type="text" value={namePemesan} onChange={(e) => setNamaPemesan(e.target.value)}/>
                    </div>
                    <div className={style.formItem}>
                        <label htmlFor="">No.HP</label>
                        <input type="text" value={noHp} onChange={(e) => setNoHp(e.target.value)}/>
                    </div>
                    <div className={style.formItem}>
                        <label htmlFor="">Email</label>
                        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                    <div className={style.formItem}>
                        <label htmlFor="">Alamat Lengkap</label>
                        <textarea name="" id="" cols="30" rows="7" value={alamat} onChange={(e) => setAlamat(e.target.value)}></textarea>
                    </div>
                </div>
                <input className={style.button} type="button" value="Checkout" onClick={hendleSubmitOrder}/>
            </div>
        </div>
    )
}

export default DataOrder