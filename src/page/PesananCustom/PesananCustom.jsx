import Sidebar from '../../componet/Sidebar/Sidebar'
import style from './PesananCustom.module.css'
import {FaSearch} from 'react-icons/fa'
import Minus from "../../Asset/icons/untitled-ui-icons/line/components/Minus";
import Plus from "../../Asset/icons/untitled-ui-icons/line/components/Plus";
import XClose from "../../Asset/icons/untitled-ui-icons/line/components/XClose";
import { useState } from 'react';
import axios from 'axios';


function PesananCustom() {
    const [dataKategory, setDataKategory] = useState([])
    const [dataProduct, setDataProduct] = useState([])
    const [dataPesananCustom, setDataPesananCustom] = useState([])
    const [kategoryId, setKategoriId] = useState()
    const [gambarProduct, setGambarProduct] = useState([])
    const [namaKategori, setNamaKategori] = useState()
    const [namaProduct, setNamaProduct] = useState()
    const [ukuranProduct, setUkuranProduct] = useState()
    const [deskripsiProduct, setDeskripsiProduct] = useState()
    const [hargaProduct, setHargaProduct] = useState()
    const [namaPemesan, setNamaPemesan] = useState()
    const [nomorPemesan, setNomorPemesan] = useState()
    const [emailPemesan, setEmailPemesan] = useState()
    const [alamatPemesan, setAlamatPemesan] = useState()

    const hendleGetAllKategori = () => {
        axios.get(`http://localhost:3000/api/v1.0/categories`)
        .then((res) => {
            setDataKategory(res.data.data)
            console.log(res.data.data)
        }).catch((err) => {
            console.log(err)
        })
    }

    const handleSearchKategpri = (e) => {
        e.preventDefault()
        axios.get(`http://localhost:3000/api/v1.0/categories?searchName=${e.target.value}`)
        .then((res) => {
            console.log(res.data.data)
            if (res.data.data[0]?.name.toLowerCase() == e.target.value.toLowerCase()) {
                setNamaKategori(e.target.value)
                setDataKategory([])
                setKategoriId(res.data.data[0].id)

                axios.get(`http://localhost:3000/api/v1.0/products?category=${e.target.id}`)
                .then((res) => {
                    setDataProduct(res.data.data)
                }).catch((err) => {
                    console.log(err)
                })
            }else if (e.target.value.length == 0) {
                setNamaKategori()
                setDataKategory([])
                setKategoriId()
                setDataProduct([])
            } else{
                setDataKategory(res.data.data)
            }
        }).catch((err) => {
            console.log(err)
        })
    }

    const handleSearchProduct = (e) => {
        e.preventDefault()

        axios.get(`http://localhost:3000/api/v1.0/products?search=${e.target.value}&category=${kategoryId}`)
        .then((res) => {
            console.log(res.data.data)
            setDataProduct(res.data.data)
        }).catch((err) => {
            console.log(err)
        })
    }
    
    const hendleClickKategori = (e) => {
        e.preventDefault()
        setNamaKategori(e.target.innerText)
        setDataKategory([])
        setKategoriId(e.target.id)


        axios.get(`http://localhost:3000/api/v1.0/products?category=${e.target.id}`)
        .then((res) => {
            setDataProduct(res.data.data)
        }).catch((err) => {
            console.log(err)
        })
    }

    const hendleClickProduct = (e) => {
        e.preventDefault()
        setNamaProduct(e.target.innerText)
        setDataProduct([])


        // return console.log(e.target.id)
        axios.get(`http://localhost:3000/api/v1.0/products/${e.target.id}`)
        .then((res) => {
            console.log(res.data.data)
            setUkuranProduct(res.data.data.ukuran)
            setDeskripsiProduct(res.data.data.Deskripsi_produk)
            setHargaProduct(res.data.data.harga)
            setGambarProduct(res.data.data.product_images)
        }).catch((err) => {
            console.log(err)
        })
    }

    const hendleSimpanCustomPesanan = () => {
        setDataPesananCustom([...dataPesananCustom, {name: namaProduct, ukuran: ukuranProduct, harga: hargaProduct, Deskripsi_produk: deskripsiProduct, kategoryId: kategoryId, namaKategori: namaKategori, product_images: gambarProduct, jumlah: 1, jumlahHarga: hargaProduct}])
        setNamaKategori("")
        setNamaProduct("")
        setUkuranProduct("")
        setDeskripsiProduct("")
    }

    const hendleTambahOrder = (name, Deskripsi_produk) => {
        const itemIndexTambah = dataPesananCustom.findIndex((item) => item.name == name && item.Deskripsi_produk == Deskripsi_produk)

        console.log(itemIndexTambah)

        if (itemIndexTambah >= 0) {
            const newArrayDataOrder = [...dataPesananCustom]
            newArrayDataOrder[itemIndexTambah].jumlah += 1
            newArrayDataOrder[itemIndexTambah].jumlahHarga += newArrayDataOrder[itemIndexTambah].harga

            
            setDataPesananCustom(newArrayDataOrder)
        }
    }

    const hendleKurangOrder = () => {
         
    }

    return (
        <div className={style.container}>
            <Sidebar/>
            <div  className="flex w-full flex-col gap-8 p-4 font-archivo">
                <div>
                    <p className="text-2xl font-bold">Pesanan Custom</p>
                </div>
                <div className={style.content}>
                    <div className={style.contentItem}>
                        <p className="font-archivo font-extrabold">Pesanan</p>
                        <div className={style.itemContentOrderCustom}>
                            <label htmlFor="">Kategory</label>
                            <div className={style.inputWrapper}>
                                <FaSearch id={style.searchIcon} />
                                <input
                                    placeholder="Type to search kategori..."
                                    value={namaKategori}
                                    onClick={() => hendleGetAllKategori()}
                                    onChange={(e) => `${setNamaKategori(e.target.value)} ${handleSearchKategpri(e)}`}
                                />
                            </div>
                            <div className={style.resultsList}>
                                {dataKategory.length !== 0 && (
                                    dataKategory.map((data, key) => {
                                        return (
                                            <div id={data.id} key={key} onClick={(e) => hendleClickKategori(e)} className={style.searchResult}>{data.name}</div> 
                                        )
                                    })
                                )}
                            </div>
                        </div>
                        <div className={style.itemContentOrderCustom}>
                            <label htmlFor="">Nama Produk</label>
                            <div className={style.inputWrapper}>
                                <FaSearch id={style.searchIcon} />
                                <input
                                    placeholder="Type to search produk..."
                                    value={namaProduct}
                                    onChange={(e) => `${setNamaProduct(e.target.value)} ${handleSearchProduct(e)}`}
                                />
                            </div>
                            <div className={style.resultsList}>
                                {dataProduct.length !== 0 && (
                                    dataProduct.map((data, key) => {
                                        return (
                                            <div id={data.id} key={key} onClick={(e) => hendleClickProduct(e)} className={style.searchResult}>{data.name}</div> 
                                        )
                                    })
                                )}
                            </div>
                        </div>
                        <div className={style.itemContentOrderCustom}>
                            <label htmlFor="">Ukuran Produk</label>
                            <input type='text' id={style.input} value={ukuranProduct} onChange={(e) => setUkuranProduct(e.target.value)}></input>
                        </div>
                        <div className={style.itemContentOrderCustom}>
                            <label htmlFor="">Deskripsi Produk</label>
                            <textarea  name="" id={style.textarea} cols="30" rows="10"  value={deskripsiProduct} onChange={(e) => setDeskripsiProduct(e.target.value)}></textarea>
                        </div>
                        <input className={style.ButtonSimpanPesanan} onClick={() => hendleSimpanCustomPesanan()} type="button" value="Simpan Pesanan" />
                    </div>
                    <div className={style.contentItem}>
                        <div className="flex flex-col gap-12">
                            {dataPesananCustom?.length !== 0 && (
                            console.log(dataPesananCustom),
                            <div className="flex flex-col gap-4">
                                <p className="font-archivo font-extrabold">Keranjang</p>
                                <div className="flex flex-col gap-4">
                                {dataPesananCustom?.map((data, index) => {
                                    return (
                                    <div key={index} className="relative grid grid-cols-3 gap-2 rounded-lg bg-neutral-100 p-2 font-archivo shadow-sm">
                                        <div className="col-span-1 self-center">
                                        <img
                                            className="h-32 w-24 rounded-lg object-cover"
                                            src={data.product_images[0].url_image}
                                            alt="Gambar Produk"
                                        />
                                        </div>
                                        <div className="col-span-2 pr-4">
                                        <div className="flex flex-col gap-2">
                                            <div>
                                            <p className="truncate text-base">{data.name}</p>
                                            <p className="text-xs font-bold">Kateogri : {data.namaKategori}</p>
                                            <p className="text-xs font-bold">Ukuran : {data.ukuran}</p>
                                            <p className="text-xs font-bold">Deskripsi : {data.Deskripsi_produk}</p>
                                            </div>
                                            <p className={style.cardHarga}>
                                            {new Intl.NumberFormat("id-ID", {
                                                style: "currency",
                                                currency: "IDR",
                                            })
                                                .format(data.jumlahHarga)
                                                .replace(/(\.|,)00$/g, "")}
                                                {data?.name.toLowerCase() == "kitcen set" ? " /meter jalan" : ""}
                                                {data?.name.toLowerCase() == "set kamar tidur" ? " /meter jalan" : ""}
                                                {data?.name.toLowerCase() == "backdrop / partisi ruangan / mini bar" ? " /meter jalan" : ""}
                                            </p>
                                            <div className="flex w-max border-collapse items-center justify-between gap-3 rounded-lg">
                                            <button
                                                className="flex h-8 w-8 items-center justify-center rounded-md border-2 border-neutral-500 transition-colors hover:border-amber-300 hover:bg-amber-300"
                                                onClick={() => hendleKurangOrder(data.name, data.Deskripsi_produk)}>
                                                <Minus className="text-base" />
                                            </button>
                                            <p className="w-4 text-center">{data.jumlah}</p>
                                            <button
                                                className="flex h-8 w-8 items-center justify-center rounded-md border-2 border-neutral-500 transition-colors hover:border-amber-300 hover:bg-amber-300"
                                                onClick={() => hendleTambahOrder(data.name, data.Deskripsi_produk)}>
                                                <Plus className="text-base" />
                                            </button>
                                            </div>
                                        </div>
                                        <div className={style.contentCenterItem}>
                                        </div>
                                        </div>
                                        <button
                                        // onClick={() => hendleHapusOrder(data.id)}
                                        className="absolute right-0 top-0 rounded-bl-lg rounded-tr-lg  bg-red-500 p-1 text-white transition-all">
                                            <span
                                            className={`material-symbols-outlined text-base ${style.delete}`}>
                                            delete
                                        </span>
                                        </button>
                                    </div>
                                    );
                                })}
                                </div>
                            </div>
                            )}
                            <div className="flex flex-col gap-4 font-open-sans ">
                            <p className="font-bold">Biodata Pembeli</p>
                            <div className="flex flex-col gap-2">
                                <div className="flex flex-col">
                                <label htmlFor="" className="text-left">
                                    Nama
                                </label>
                                <input
                                    className={style.input}
                                    type="text"
                                    value={namaPemesan}
                                    onChange={(e) => setNamaPemesan(e.target.value)}
                                />
                                </div>
                                <div className="flex flex-col">
                                <label className="text-left">Nomor Telepon</label>
                                <input
                                    className={style.input}
                                    type="text"
                                    value={nomorPemesan}
                                    onChange={(e) => setNomorPemesan(e.target.value)}
                                />
                                </div>
                                <div className="flex flex-col">
                                <label className="text-left">Email</label>
                                <input
                                    className={style.input}
                                    type="text"
                                    value={emailPemesan}
                                    onChange={(e) => setEmailPemesan(e.target.value)}
                                />
                                </div>
                                <div className="flex flex-col">
                                <label className="text-left">Alamat</label>
                                <textarea
                                    className={style.textarea}
                                    name=""
                                    id=""
                                    cols="30"
                                    rows="7"
                                    value={alamatPemesan}
                                    onChange={(e) => setAlamatPemesan(e.target.value)}>
                                </textarea>
                                {/* <textarea
                                    className={style.input}
                                    name=""
                                    id=""
                                    cols="30"
                                    rows="7"
                                    value={alamat}
                                    onChange={(e) => setAlamat(e.target.value)}>
                                </textarea> */}
                                </div>
                            </div>
                            <input
                                className={`rounded-lg bg-amber-300 p-2 font-bold ${style.buttonCheckOut}`}
                                type="button"
                                value="Checkout"
                                // onClick={hendleSubmitOrder}
                            />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default PesananCustom