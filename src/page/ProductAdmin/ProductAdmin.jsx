import Sidebar from '../../componet/Sidebar/Sidebar'
import style from './ProductAdmin.module.css'
import img from '../../Asset/Cor1.jpg'
import axios from 'axios'
import { useEffect, useState } from 'react'


function ProductAdmin() {
    const [dataProduct, setDataProduct] = useState([])

    const hendleGetAllProduct = async () => {
        await axios.get(`${process.env.REACT_APP_BASE_API}/products`)
        .then((res) => {
            setDataProduct(res.data.data)
            console.log(res.data.data)
        }).catch((err) => {
            console.log(err)
        })
    }

    useEffect(() => {
        hendleGetAllProduct()
    },[])
    return (
        <div className={style.container}>
            <Sidebar/>
            <div className={style.kanan}>
                    <h2>Product</h2>
                    <div className={style.buttonCreate}>
                        <input type="button" className={style.userAddButton} value="Tambah Data" />
                    </div>  
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
                            <div className={style.category}>
                                <select name="" id="">
                                    <option value="">All Category</option>
                                    <option value="">Meja</option>
                                    <option value="">Kursi</option>
                                    <option value="">Lemari</option>
                                </select>
                            </div>
                        </div>
                        <div className={style.navbarHome}>
                            <div className={`${style.item} ${style.search}`}>
                                <input type="text" placeholder='Search Name'/>
                                <span className="material-symbols-outlined">search</span>
                            </div>
                        </div>
                    </div>  
                    <div className={style.contentProduct}>
                        {console.log(dataProduct)}
                        {dataProduct.length !== 0 && (
                            dataProduct.map((data, key) => {
                                return (
                                    <div className={style.card}>
                                        <img src={data.product_images[0]?.url_image} alt="" />
                                        <span className={style.cardCategori}>{data.categories?.name}</span>
                                        <span className={style.cardJdl}>{data?.name}</span>
                                        <span className={style.cardHarga}>{new Intl.NumberFormat("id-ID", {style: "currency", currency: "IDR"}).format(data.harga)}</span>
                                        <div className={style.optionCard}>
                                            <span class="material-symbols-outlined">edit</span>
                                            <span class="material-symbols-outlined">delete</span>
                                        </div>
                                    </div>
                                )
                            })
                        )}
                    </div> 
            </div>
        </div>
    )
}

export default ProductAdmin