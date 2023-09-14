import axios from "axios"
import Sidebar from "../../componet/Sidebar/Sidebar"
import style from './OrderAdmin.module.css'
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import jwt from "jwt-decode"

function OrderAdmin() {
    const {dataLogin} = useSelector(tes => tes.userReducer)
    const [dataOrder, setDataOrder] = useState([])
    const [statusOrderProduct, setStatusOrderProduct] = useState()
    const [id, setid] = useState()

    //
    const [status, setStatus] = useState()


    const hendleGetAllOrder = () => {
        const decode = jwt(dataLogin.dataLogin.token)

        axios.get(`http://localhost:3000/api/v1.0/productOrder`, { headers: { Authorization: `Bearer ${dataLogin.dataLogin.token}`}})
        .then((res) => {
            console.log(res.data.data)
            setDataOrder(res.data.data)
        }).catch((err) => {
            console.log(err)
        })
        
        // axios.get(`http://localhost:3000/api/v1.0/orders`)
        // .then((res) => {
        //     setDataOrder(res.data.data)
        //     console.log(res.data.data)
        // }).catch((err) => {
        //     console.log(err)
        // })
    }

    const hendleDeleteOrder = (idProductOrder) => {
        axios.delete(`http://localhost:3000/api/v1.0/orders/${idProductOrder}`)
        .then((res) => {
            hendleGetAllOrder()
        }).catch((err) => [
            console.log(err)
        ])
    }

    const hendleSubmintPembaruanStatus = () => {
        
        axios.patch(`http://localhost:3000/api/v1.0/productOrder/${id}`,{status: status}, { headers: { Authorization: `Bearer ${dataLogin.dataLogin.token}`}})
        .then((res) => {
            console.log(res.data.data)
            hendleGetAllOrder()
        }).catch((err) => {
            console.log(err)
        })


        statusOrderProduct()
    }

    useEffect(() => {
        hendleGetAllOrder()
    }, [])


    return (
        <>
        <div className={style.container}>
            <Sidebar/>
            {/* <div className={`${(popupAddDataPengguna === "1") ? style.ForBackBlackPopUp : style.nonForBackBlackPopUp}`}>
            </div> */}
            <div className={style.kanan}>
                <div className={style.conTable}>
                    <h2>Orders</h2>
                    {/* <div className={style.buttonCreate}>
                        <input type="button" className={style.userAddButton} value="Tambah Data" />
                    </div>   */}
                    <div className={style.buttonSearchAndRow}>
                        <div className={style.entitas}>
                            <span>Show</span>
                            <select name="" id="">
                                <option value={5}>5</option>
                                <option value={10}>10</option>
                                <option value={25}>25</option>
                                <option value={50}>50</option>
                                <option value={100}>100</option>
                            </select>
                            <span>Entitas</span>
                        </div>
                        <div className={style.navbarHome}>
                            <div className={`${style.item} ${style.search}`}>
                                <input type="text" placeholder='Search Name'/>
                                <span className="material-symbols-outlined">search</span>
                            </div>
                        </div>
                    </div>      
                    <table>
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Nama Pemesan</th>
                                <th>Nama Produk</th>
                                <th>Alamat</th>
                                <th>Jumlah</th>
                                <th>Harga</th>
                                <th>Status</th>
                                <th>Options</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dataOrder.length !== 0 && (
                                dataOrder.map((data, key) => {
                                    console.log(data)
                                    return (
                                        <tr key={key}>
                                            <td>{key += 1}</td>
                                            <td>{data.users.name}</td>
                                            <td>{data.products.name}</td>
                                            <td>{data.users.alamat}</td>
                                            <td>{data.jumlah}</td>
                                            <td>{new Intl.NumberFormat("id-ID", {style: "currency", currency: "IDR"}).format(data.Price)}</td>
                                            {data.status === 2 && (
                                                <td>Pesanan Diterima</td>
                                            )}
                                            {data.status === 1 && (
                                                <td>Pesanan Ditolak</td>
                                            )}
                                            {data.status === 0 && (
                                                <td>Pesanan</td>
                                            )}
                                            <td className={style.options}>
                                                <span class={`material-symbols-outlined ${style.iconOptions}`} onClick={() => `${setStatusOrderProduct(true)} ${setid(data.id)} ${setStatus(data.status)}`}>edit</span>
                                                <span className={`material-symbols-outlined ${style.iconOptions}`} onClick={() => hendleDeleteOrder(data.id)}>delete</span>
                                                <span className={`material-symbols-outlined ${style.iconOptions}`}>visibility</span>
                                            </td>
                                        </tr>
                                    )
                                })
                            )}
                        </tbody>
                    </table>
                    <div className={style.pagenation}>
                        <span>Showing of entries</span>
                        <div className={style.page}>
                            <span className={`${style.before} material-symbols-outlined`} >chevron_left</span>
                            <span className={`${style.number}`}>1</span>
                            <span className={`${style.after} material-symbols-outlined`} >chevron_right</span>
                        </div>
                    </div>
                </div>
                {statusOrderProduct === true && (
                    <div className={style.containerPopUpStatus}>
                        <div className={style.contentStatus}>
                            <p><span onClick={() => `${setStatusOrderProduct()}`} className="material-symbols-outlined">close</span></p>
                            <span className={style.judul}>Pembaruan status pesanan produk</span>
                            <div className={style.item}>
                                <input id="terima" type="checkbox" checked={status === 2 ? true : false} onChange={() => setStatus(2)}/>
                                <div>
                                    <label htmlFor="terima">Pesanan diterima</label>
                                    <span>Tersetidanya semua kebutuhan dalam pembuatan</span>
                                </div>
                            </div>
                            <div className={style.item}>
                                <input id="ditolak" type="checkbox" checked={status === 1 ? true : false} onChange={() => setStatus(1)}/>
                                <div>
                                    <label htmlFor="ditolak">Pesanan ditolak</label>
                                    <span>Terdapat kendala dalam membuat pesanan, antara lain, bahan, keguangan dll</span>
                                </div>
                            </div>
                            <input className={style.button} type="button" value="Simpan" onClick={() => hendleSubmintPembaruanStatus()} />
                        </div>
                    </div>
                )}
            </div>
        </div>
        </>
    )
}

export default OrderAdmin