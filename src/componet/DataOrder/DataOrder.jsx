import { useSelector } from 'react-redux'
import style from './DataOrder.module.css'

function DataOrder() {
    let {dataOrder} = useSelector(data => data.project)
    console.log(dataOrder)

    return (
        <div className={style.dataOrder}>
            {dataOrder.length !== 0 && (
                dataOrder.map((data, key) => {
                    console.log(data.JENIS_PRODUK)
                    return (
                        <div className={style.content}>
                            <span className={style.cardCategori}>{data.JENIS_PRODUK}</span>
                            <span className={style.cardJdl}><span className={style.subData}>Tipe : {data.TIPE}</span></span>
                            <span className={style.cardHarga}>{data.Harga}</span>
                        </div>
                    )
                })
            )}
            <div className={style.formOrder}>
                <h4>Biodata Pembeli</h4>
                <div className={style.form}>
                    <div className={style.formItem}>
                        <label htmlFor="">Nama Pemesan</label>
                        <input type="text" />
                    </div>
                    <div className={style.formItem}>
                        <label htmlFor="">Jumlah Pesanan</label>
                        <input type="text" />
                    </div>
                    <div className={style.formItem}>
                        <label htmlFor="">No.HP</label>
                        <input type="text" />
                    </div>
                    <div className={style.formItem}>
                        <label htmlFor="">Alamat</label>
                        <input type="text" />
                    </div>
                </div>
                <input className={style.button} type="button" value="Simpan" />
            </div>
        </div>
    )
}

export default DataOrder