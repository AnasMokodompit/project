import axios from "axios"
import Sidebar from "../../componet/Sidebar/Sidebar"
import style from './OrderAdmin.module.css'
import { useEffect, useState } from "react"

function OrderAdmin() {
    const [dataOrder, setDataOrder] = useState([])

    const hendleGetAllOrder = () => {
        axios.get(`http://localhost:3000/api/v1.0/orders`)
        .then((res) => {
            setDataOrder(res.data.data)
            console.log(res.data.data)
        }).catch((err) => {
            console.log(err)
        })
    }

    const hendleDeleteOrder = (id) => {
        axios.delete(`http://localhost:3000/api/v1.0/orders/${id}`)
        .then((res) => {
            hendleGetAllOrder()
        }).catch((err) => [
            console.log(err)
        ])
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
                                <th>Nomor HP</th>
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
                                            <td>{data.nama_pemesan}</td>
                                            <td>{data.no_hp}</td>
                                            <td>{data.alamat}</td>
                                            <td>{data.jumlah}</td>
                                            <td>{new Intl.NumberFormat("id-ID", {style: "currency", currency: "IDR"}).format(data.Price)}</td>
                                            <td>Pesanan</td>
                                            <td className={style.options}>
                                                <span class={`material-symbols-outlined ${style.iconOptions}`}>edit</span>
                                                <span className={`material-symbols-outlined ${style.iconOptions}`} onClick={() => hendleDeleteOrder(data.id)}>delete</span>
                                                <span className={`material-symbols-outlined ${style.iconOptions}`}>visibility</span>
                                            </td>
                                        </tr>
                                    )
                                })
                            )}
                            {/* {dataPengguna.length !== 0 && (
                                dataPengguna.map((data, key) => {
                                    return (
                                        <tr key={key}>
                                            <td>{data?.id}</td>
                                            <td>{data?.name}</td>
                                            <td>{data?.email}</td>
                                            <td>{data?.jurusan?.name}</td>
                                            <td>{data?.prodi?.name}</td>
                                            <td>{data?.nomor_tlp}</td>
                                            <td>{data?.role?.name}</td>
                                            <td>
                                                <span className={`${style.iconOptions} material-symbols-outlined`} onClick={() => `${setPopupAddDataPengguna("1")} ${hendleEditDataPengguna(data.id)} ${setPopupDataPengguna("EditDataPengguna")}`}>edit</span> 
                                                <span className={`${style.iconOptions} material-symbols-outlined`} onClick={() => hendleDeleteDataPengguna(data.id)}>delete</span>
                                            </td>
                                        </tr>
                                    )
                                })
                            )} */}
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
                {/* {popupAddDataPengguna === "1" && (
                    <div className={style.containerPopUp}>
                        <div className={style.contentTitle}>
                            <p>Tambah Akun</p>
                            <span className={`material-symbols-outlined`} onClick={() => `${setPopupAddDataPengguna("0")} ${hendleCloseDataPengguna()}`}>close</span>
                        </div>
                        <div className={style.itemPopUp}>
                            <label htmlFor="">Username</label>
                            <input type="text" value={username} onChange={(e) => setUserName(e.target.value)}/>
                        </div>
                        <div className={style.itemPopUp}>
                            <label htmlFor="">Name</label>
                            <input type="text" value={name} onChange={(e) => setName(e.target.value)}/>
                        </div>
                        <div className={style.itemPopUp}>
                            <label htmlFor="">Role User</label>
                            <select name="" id="" value={role} onChange={(e) => setRole(e.target.value)}>
                                <option>-- Pilih Role User --</option>
                                <option value="1">Admin</option>
                                <option value="2">Reviewer</option>
                                <option value="3">Dosen</option>
                                <option value="4">Mahasiswa</option>
                            </select>
                        </div>
                        <div className={style.itemPopUp}>
                            <label htmlFor="">Email</label>
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                        </div>
                        <div className={style.itemPopUp}>
                            <label htmlFor="">Password</label>
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                        </div>
                        {role == 3 && (
                            console.log(jabatanKampus),
                            <div className={style.itemPopUp}>
                                <label htmlFor="">Jabatan Kampus</label>
                                <select name="" id="" value={jabatanKampus} onChange={(e) => setJabatanKampus(e.target.value)}>
                                    <option value="Kepala Jurusan">Kajur</option>
                                    <option value="Kepala Program Studi">Kaprodi</option>
                                </select>
                            </div>
                        )}
                        <div className={style.conSubmit}>
                            <input type="button" value="Submit"/>
                        </div>
                    </div>
                )} */}
            </div>
        </div>
        </>
    )
}

export default OrderAdmin