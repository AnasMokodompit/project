import { useEffect, useState } from 'react'
import Sidebar from '../../componet/Sidebar/Sidebar'
import style from './PersediaanBahanBaku.module.css'
import axios from 'axios'
import { useSelector } from 'react-redux'
import {FaSearch} from 'react-icons/fa'


function PersediaanBahanBaku() {
    const {dataLogin} = useSelector(tes => tes.userReducer)
    const [show, setShow] = useState()
    const [popup, setPopup] = useState(false)
    const [dataPersediaanBahanBaku, setDataPersediaanBahanBaku] = useState([])
    const [dataBahanBaku, setDataBahanBaku] = useState([])
    const [dataCreatePersediaanBahanBaku, setDataCreatePersediaanBahanBaku] = useState([])
    const [idPersediaanBahanBaku, setIdPersediaanBahanBaku] = useState()
    const [idBahanBaku, setIdBahanBaku] = useState()
    const [namaBahanBaku, setNamaBahanBaku] = useState()
    const [jumlah, setJumlah] = useState()
    const [namaSatuanPersediaanBahanBaku, setNamaSatuanPersediaanBahanBaku] = useState()

    const hendleGetApiAllPersediaanBahanBaku = () => {
        console.log(dataLogin)
        axios.get(`${process.env.REACT_APP_BASE_API}/persediaanBahanBaku`, { headers: { Authorization: `Bearer ${dataLogin.dataLogin.token}`}})
        .then((res) => {
            console.log(res.data.data)
            setDataPersediaanBahanBaku(res.data.data)
        }).catch((err) => {
            console.log(err)
        })
    }

    const hendleGetAllBahanBaku = () => {
        axios.get(`${process.env.REACT_APP_BASE_API}/bahanBaku`, { headers: { Authorization: `Bearer ${dataLogin.dataLogin.token}`}})
        .then((res) => {
            console.log(res.data.data)
            setDataBahanBaku(res.data.data)
        }).catch((err) => {
            console.log(err)
        })
    }

    const handleSearchBahanBaku = (e) => {
        e.preventDefault()
        axios.get(`${process.env.REACT_APP_BASE_API}/bahanBaku?searchName=${e.target.value}`, { headers: { Authorization: `Bearer ${dataLogin.dataLogin.token}`}})
        .then((res) => {
            console.log(res.data.data)
            if (res.data.data[0]?.name?.toLowerCase() == e.target.value?.toLowerCase()) {
                setNamaBahanBaku(e.target.value)
                setDataBahanBaku([])
                setIdBahanBaku(res.data.data[0].id)

                axios.get(`${process.env.REACT_APP_BASE_API}/persediaanBahanBaku?id_bahan_baku=${e.target.id}`, { headers: { Authorization: `Bearer ${dataLogin.dataLogin.token}`}})
                .then((res) => {
                    setDataCreatePersediaanBahanBaku(res.data.data)
                }).catch((err) => {
                    console.log(err)
                })
            }else if (e.target.value.length == 0) {
                setNamaBahanBaku()
                setDataBahanBaku([])
                setIdBahanBaku()
                setDataCreatePersediaanBahanBaku([])
            } else{
                setDataBahanBaku(res.data.data)
            }
        }).catch((err) => {
            console.log(err)
        })
    }

    const hendleClickBahanBaku = (e) => {
        e.preventDefault()
        setNamaBahanBaku(e.target.innerText)
        setDataBahanBaku([])
        setIdBahanBaku(e.target.id)

        axios.get(`${process.env.REACT_APP_BASE_API}/persediaanBahanBaku?id_bahan_baku=${e.target.id}`, { headers: { Authorization: `Bearer ${dataLogin.dataLogin.token}`}})
        .then((res) => {
            console.log(res.data.data)
            setDataCreatePersediaanBahanBaku(res.data.data)
        }).catch((err) => {
            console.log(err)
        })
    }

    const hendleSearchPersedianBahanBaku = (e) => {
        axios.get(`${process.env.REACT_APP_BASE_API}/persediaanBahanBaku?search=${e.target.value}&id_bahan_baku=${idBahanBaku}`, { headers: { Authorization: `Bearer ${dataLogin.dataLogin.token}`}})
        .then((res) => {
            console.log(res.data.data)
            setDataCreatePersediaanBahanBaku(res.data.data)
        }).catch((err) => {
            console.log(err)
        })
    }

    const hendleClickPersediaanBahanBaku = (e) => {
        e.preventDefault()
        setNamaSatuanPersediaanBahanBaku(e.target.innerText)
        setDataCreatePersediaanBahanBaku([])


        // return console.log(e.target.id)
        axios.get(`${process.env.REACT_APP_BASE_API}/persediaanBahanBaku/${e.target.id}`, { headers: { Authorization: `Bearer ${dataLogin.dataLogin.token}`}})
        .then((res) => {
            console.log(res.data.data)
            setJumlah(res.data.data.jumlah)
            setNamaSatuanPersediaanBahanBaku(res.data.data.satuan)
        }).catch((err) => {
            console.log(err)
        })
    }

    const hendleClose = () => {
        setDataBahanBaku([])
        setDataCreatePersediaanBahanBaku([])
        setJumlah()
        setNamaBahanBaku()
        setNamaSatuanPersediaanBahanBaku()
        setIdBahanBaku()
    }

    const hendleGetByIdPersediaanBahanBakuForEdit = (idBahanBaku) => {
        setIdPersediaanBahanBaku(idBahanBaku)

        axios.get(`${process.env.REACT_APP_BASE_API}/persediaanBahanBaku/${idBahanBaku}`, { headers: { Authorization: `Bearer ${dataLogin.dataLogin.token}`}})
        .then((res) => {
            console.log(res.data.data)
            setNamaSatuanPersediaanBahanBaku(res.data.data.satuan)
            setJumlah(res.data.data.jumlah)
            setNamaBahanBaku(res.data.data.bahanBaku.nama)
        }).catch((err) => {
            console.log(err)
        })
    }

    const sumbitPersediaanBahanBaku = () => {
        const data = {
            nama: namaBahanBaku,
            jumlah: jumlah,
            satuan: namaSatuanPersediaanBahanBaku
        }

        if (popup == "Tambah") {
            axios.post(`${process.env.REACT_APP_BASE_API}/persediaanBahanBaku`, data, { headers: { Authorization: `Bearer ${dataLogin.dataLogin.token}`}})
            .then((res) => {
                console.log(res.data.data)
                hendleGetApiAllPersediaanBahanBaku()
            }).catch((err) => {
                console.log(err)
                if (err?.response?.data?.code == 404) {
                    alert(err?.response?.data?.message)
                }
            })

            setPopup(false)
        }else if (popup == "Edit") {
            axios.patch(`${process.env.REACT_APP_BASE_API}/persediaanBahanBaku/${idPersediaanBahanBaku}`, data, { headers: { Authorization: `Bearer ${dataLogin.dataLogin.token}`}})
            .then((res) => {
                console.log(res.data.data)
                hendleGetApiAllPersediaanBahanBaku()
            }).catch((err) => {
                console.log(err)
                if (err?.response?.data?.code == 404) {
                    alert(err?.response?.data?.message)
                }
            })

        }
        
        setPopup(false)
        setDataBahanBaku([])
        setDataCreatePersediaanBahanBaku([])
        setJumlah()
        setNamaBahanBaku()
        setNamaSatuanPersediaanBahanBaku()
        setIdBahanBaku()
    }

    const hendleDeleteBahanBaku = (iddelete) => {
        axios.delete(`${process.env.REACT_APP_BASE_API}/persediaanBahanBaku/${iddelete}`, { headers: { Authorization: `Bearer ${dataLogin.dataLogin.token}`}})
        .then(() => {
            hendleGetApiAllPersediaanBahanBaku()
        }).catch((err) => {
            console.log(err)
        })
    } 


    useEffect(() => {
        hendleGetApiAllPersediaanBahanBaku()
    }, [])


    return (
        <div className={style.container}>
            <Sidebar/>
            <div  className="flex w-full flex-col p-4 font-archivo">
                <div>
                    <p className="text-2xl font-bold">Persediaan Bahan Baku</p>
                </div>
                <div className={style.buttonCreate}>
                    <input type="button" className={style.userAddButton} value="Tambah Data" onClick={() => setPopup("Tambah")}/>
                </div>  
                <div className={style.buttonSearchAndRow}>
                    <div className={style.entitas}>
                        <span>Show</span>
                        <select name="" id="" onChange={(e) => setShow(e.target.value)}>
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
                <div className={style.content}>
                    <table>
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Nama Bahan Baku</th>
                                <th>Jumlah</th>
                                <th>Satuan</th>
                                {/* <th>Harga</th> */}
                                <th>Options</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dataPersediaanBahanBaku.length !== 0 && (
                                dataPersediaanBahanBaku.map((data, key) => {
                                    return (
                                        <tr key={key}>
                                            <td>{key += 1}</td>
                                            <td>{data.bahanBaku.nama}</td>
                                            <td>{data.jumlah}</td>
                                            <td>{data.satuan}</td>
                                            {/* <td>{new Intl.NumberFormat("id-ID", {style: "currency", currency: "IDR"}).format(data.Price).replace(/(\.|,)00$/g, "")}</td> */}
                                            <td  className={style.options}>
                                                <span className={`material-symbols-outlined ${style.iconOptions}`} onClick={() => `${setPopup("Edit")} ${hendleGetByIdPersediaanBahanBakuForEdit(data.id)}`}>edit</span>
                                                <span className={`material-symbols-outlined ${style.iconOptions}`} onClick={() => hendleDeleteBahanBaku(data.id)}>delete</span>
                                            </td>
                                        </tr>
                                    )
                                })
                            )}
                        </tbody>
                    </table>
                </div>
                {(popup == "Tambah" || popup == "Edit") && (
                    <div className={style.contrainerPopUpBahanBaku}>
                        <div className={style.contentPopUpBahanBaku}>
                            <div className={style.top}>
                                {popup == "Tambah" && (
                                    <h5>Tambahkan Bahan Baku</h5>
                                    )}
                                {popup == "Edit" && (
                                    <h5>Edit Bahan Baku</h5>
                                )}
                                <span className="material-symbols-outlined" onClick={() => `${setPopup(false)} ${hendleClose()}`}>close</span>
                            </div>
                            <div className={style.itemContentOrderCustom}>
                                <label htmlFor="">Bahan Baku</label>
                                <div className={style.inputWrapper}>
                                    <FaSearch id={style.searchIcon} />
                                    <input
                                        placeholder="Type to search nama bahan baku..."
                                        value={namaBahanBaku}
                                        onClick={() => hendleGetAllBahanBaku()}
                                        onChange={(e) => `${setNamaBahanBaku(e.target.value)} ${handleSearchBahanBaku(e)}`}
                                    />
                                </div>
                                <div className={style.resultsList}>
                                    {dataBahanBaku.length !== 0 && (
                                        dataBahanBaku.map((data, key) => {
                                            console.log(data)
                                            return (
                                                <div id={data.id} key={key} onClick={(e) => hendleClickBahanBaku(e)} className={style.searchResult}>{data.nama}</div> 
                                            )
                                        })
                                    )}
                                </div>
                            </div>
                            <div className={style.itemContentOrderCustom}>
                                <label htmlFor="">Satuan</label>
                                <div className={style.inputWrapper}>
                                    <FaSearch id={style.searchIcon} />
                                    <input
                                        placeholder="Type to search nama satuan..."
                                        value={namaSatuanPersediaanBahanBaku}
                                        onChange={(e) => `${setNamaSatuanPersediaanBahanBaku(e.target.value)} ${hendleSearchPersedianBahanBaku(e)}`}
                                    />
                                </div>
                                <div className={style.resultsList}>
                                    {dataCreatePersediaanBahanBaku.length !== 0 && (
                                        dataCreatePersediaanBahanBaku.map((data, key) => {
                                            return (
                                                <div id={data.id} key={key} onClick={(e) => hendleClickPersediaanBahanBaku(e)} className={style.searchResult}>{data.satuan}</div> 
                                            )
                                        })
                                    )}
                                </div>
                            </div>
                            <div className={style.itemContentOrderCustom}>
                                <label htmlFor="">Jumlah</label>
                                <input type='text' id={style.input} value={jumlah} onChange={(e) => setJumlah(e.target.value)}></input>
                            </div>
                            <div className={style.button}>
                                <input type="button" value="Simpan" onClick={() => sumbitPersediaanBahanBaku()}/>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}


export default PersediaanBahanBaku