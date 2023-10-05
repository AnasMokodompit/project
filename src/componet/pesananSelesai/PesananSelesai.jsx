import { useState } from 'react';
import style from './PesananSelesai.module.css'
import buktiBayar from "../../Asset/Img/profile_null.png";
import { useSelector } from 'react-redux';
import axios from 'axios';
import jwt from "jwt-decode";
import { useEffect } from 'react';
import ReactStars from "react-rating-stars-component";



function PesananSelesai() {
    const { dataLogin } = useSelector((tes) => tes.userReducer);
    const [dataProduct, setDataProduct] = useState([])
    const [dataProductById, setDataProductById] = useState([]);
    const [isPembayaranDP, setIsPembayaranDP] = useState(false);
    const [isPembayaranLunas, setIsPembayaranLunas] = useState(false);
    const [popUpInformasiPesanan, setPopUpInformasiPesanan] = useState("");
    const [dataImageClick, setDataImageClick] = useState(false);
    const [dataImageBuktiBayar, setDataImageBuktiBayar] = useState(false);
    const [id, setId] = useState();
    const [pembayaran, setPembayaran] = useState("");
    const [buktibayarGambar, setBuktiBayarGambar] = useState();
    const [popupBeriNilai, setPopupBeriNilai] = useState(false)
    const [jumlahStart, setJumlahStart] = useState(0);
    const [komentarReview, setKomentarReview] = useState()
    const [idProduk, setIdProdut] = useState()


    const isLogin = dataLogin?.dataLogin?.token;

    

    const hendleCekOrderProductById = (idProdutOrder) => {
        setId(idProdutOrder);
    
        axios
          .get(
            `http://localhost:3000/api/v1.0/productOrder/customers/${idProdutOrder}`,
            {
              headers: { Authorization: `Bearer ${dataLogin.dataLogin.token}` },
            },
          )
          .then((res) => {
            console.log(res.data.data);
            // setDataBuktiBayar(res.data.data?.orders?.buktiBayar)
            setDataProductById(res.data.data);
    
            setIsPembayaranDP(res.data.data.orders.IsPembayaranDP);
            setIsPembayaranLunas(res.data.data.orders.IsPembayaranLunas);
          })
          .catch((err) => {
            console.log(err);
          });
    };

    const hendleOrderByCustemers = () => {
        if (!!isLogin) {
          const decode = jwt(dataLogin?.dataLogin?.token);
          axios
            .get(`http://localhost:3000/api/v1.0/productOrder/customers?statusKategori=Pesanan Selesai`, {
              headers: { Authorization: `Bearer ${dataLogin?.dataLogin?.token}` },
            })
            .then((res) => {
              console.log(res.data.data);
              setDataProduct(res.data.data);
            })
            .catch((err) => {
              console.log(err);
            });
        }
    };  

    const hendleUploadBuktiBayar = (id_orders) => {
        const formData = new FormData();

        formData.append("gambarBuktiBayar", buktibayarGambar);
        formData.append("statusTransaksi", pembayaran);
        formData.append("id_orders", id_orders);

        axios
        .post(`http://localhost:3000/api/v1.0/buktiBayar`, formData, {
            headers: { Authorization: `Bearer ${dataLogin.dataLogin.token}` },
        })
        .then((res) => {
            alert(`Gambar Berhasil DI Kirim`);
            hendleOrderByCustemers();
            hendleCekOrderProductById(id);
        })
        .catch((err) => {
            if (err.response.data) {
            alert(`${err.response.data.message}`);
            }
            console.log(err);
        })
        .catch((err) => {
            console.log(err);
        });
    };

    const hendleClose = () => {
        setDataImageClick(false);
        setDataImageBuktiBayar(false);
        setPembayaran("");
    };

    const hendleKirimReviewProduk = () => {
        const data = {
            id_produk_order: id,
            products_id: idProduk,
            bintang: jumlahStart,
            komentar: komentarReview
        }
        axios
        .post(`http://localhost:3000/api/v1.0/reviewProduk`, data, {
            headers: { Authorization: `Bearer ${dataLogin.dataLogin.token}` },
        })
        .then((res) => {
            hendleOrderByCustemers()
        }).catch((err) => {
            console.log(err)
        })

        console.log(data)

        setPopupBeriNilai(false)
        setIdProdut()
        setJumlahStart(0)
        setKomentarReview()
        setId()
    }

    const ratingChanged = (newRating) => {
        setJumlahStart(newRating)
        console.log(newRating)
    };

    useEffect(() => {
        hendleOrderByCustemers();
    }, [dataProductById]);
    

    return (
        <div>
            <div className={style.contentPesananDiproses}>
                <div className={style.itemProduct}>
                {dataProduct.length !== 0 &&
                    dataProduct.map((data, key) => {
                        console.log(data)
                    return (
                        <div className={style.item}>
                            <div
                                key={key}
                                onClick={() =>
                                    `${setPopUpInformasiPesanan(
                                    "Active",
                                    )} ${hendleCekOrderProductById(data.id)} ${
                                    data?.picture_bukti_bayar
                                        ? setDataImageBuktiBayar(data?.picture_bukti_bayar)
                                        : setDataImageBuktiBayar(false)
                                    }`
                                }>
                                <img
                                    src={data.products.product_images[0].url_image}
                                    alt=""
                                />
                                <span>{data.products.name}</span>
                                <span>{data.products.categories.name}</span>
                                {data.jumlah_meter && (
                                    <span>{data.jumlah_meter} Meter Jalan</span>
                                )}
                                <span>{data.jumlah} Barang</span>
                                <span>
                                    Total Harga :{" "}
                                    {new Intl.NumberFormat("id-ID", {
                                    style: "currency",
                                    currency: "IDR",
                                    })
                                    .format(data.Price)
                                    .replace(/(\.|,)00$/g, "")}
                                </span>
                                <span>Status : <span style={{color: "green"}}>{data.pesan_status}</span></span>
                            </div>
                            {data.statusReview == false && (
                                <input className={style.inputReview} type="button" value="Beri Nilai" onClick={() => `${setPopupBeriNilai(true)} ${setIdProdut(data.id_product)} ${setId(data.id)}`} />
                            )}
                        </div>
                    );
                    })}
                </div>
                {popupBeriNilai == true && (
                      <div className={style.containerPopUpStatus}>
                      <div className={style.contentStatus}>
                          <p><span onClick={() => `${setPopupBeriNilai(false)}`} className="material-symbols-outlined">close</span></p>
                          <span className={style.judul}>Review Produk</span>
                          <div className={style.rating}>
                              <div>
                                    <label htmlFor="">Rating</label>
                                    <ReactStars
                                        onChange={ratingChanged}
                                        edit={true}
                                        count={5}
                                        size={24}
                                        value={jumlahStart}
                                        isHalf={true}
                                        activeColor="#ffd700"
                                    />
                              </div>
                          </div>
                          <div className={style.item}>
                              <div>
                                  <label htmlFor="">Komentar</label>
                                  <textarea name="" id="" cols="30" rows="10" value={komentarReview} onChange={(e) => setKomentarReview(e.target.value)}></textarea>
                              </div>
                          </div>
                          <input className={style.button} type="button" value="Kirim" onClick={() => hendleKirimReviewProduk()}/>
                      </div>
                  </div>
                )}
                {popUpInformasiPesanan === "Active" && (
                <div className={style.ReadProductDetail}>
                    <div className={style.popup}>
                    <div className={style.top}>
                        <span
                        onClick={() =>
                            `${setPopUpInformasiPesanan("")} ${hendleClose()}`
                        }
                        className="material-symbols-outlined">
                        close
                        </span>
                    </div>
                    <div className={style.content}>
                        {/* {console.log(dataProductById)} */}
                        <div className={style.image}>
                        <img
                            src={
                            dataImageClick == false
                                ? dataProductById?.products?.product_images[0]
                                    ?.url_image
                                : dataImageClick
                            }
                            alt=""
                        />
                        <div className={style.itemImage}>
                            {dataProductById?.products?.product_images?.length !==
                            0 &&
                            dataProductById?.products?.product_images.map(
                                (data, key) => {
                                return (
                                    <img
                                    key={key}
                                    src={data.url_image}
                                    alt=""
                                    onClick={() =>
                                        setDataImageClick(data.url_image)
                                    }
                                    />
                                );
                                },
                            )}
                        </div>
                        </div>
                        <div className={style.detail}>
                        <span className={style.cardCategori}>
                            {dataProductById?.products?.categories?.name}
                        </span>
                        <span className={style.cardJdl}>
                            {dataProductById?.products?.name}
                        </span>
                        <span className={style.ukuran}>
                            <p className={style.subData}>Ukuran</p>
                            {dataProductById?.products?.ukuran}
                        </span>
                        <span className={style.deskripsi}>
                            <p className={style.subData}>Deskripsi</p>
                            {dataProductById?.products?.Deskripsi_produk}
                        </span>
                        <span className={style.cardHarga}>
                            {new Intl.NumberFormat("id-ID", {
                            style: "currency",
                            currency: "IDR",
                            })
                            .format(dataProductById?.products?.harga)
                            .replace(/(\.|,)00$/g, "")}
                            {dataProductById?.products?.IsPermeter == true
                                ? " /meter jalan"
                                : ""}
                        </span>
                        {console.log(dataProductById)}
                        {dataProductById.jumlah_meter && (
                            <span>{dataProductById.jumlah_meter} Meter Jalan</span>
                        )}
                        <span>{dataProductById.jumlah} Barang</span>
                        <span>
                            Total Harga :{" "}
                            {new Intl.NumberFormat("id-ID", {
                            style: "currency",
                            currency: "IDR",
                            })
                            .format(dataProductById?.Price)
                            .replace(/(\.|,)00$/g, "")}
                        </span>
                        <span className={style.judulDetailPesanan}>
                            Total yang dibayar
                        </span>
                        <span>
                            Harga :{" "}
                            {new Intl.NumberFormat("id-ID", {
                            style: "currency",
                            currency: "IDR",
                            })
                            .format(dataProductById?.orders?.Price)
                            .replace(/(\.|,)00$/g, "")}
                        </span>
                        {console.log(dataProductById)}
                        {dataProductById.status === 2 && (
                            <div className={style.contentBuktiBayar}>
                            {dataProductById?.orders?.buktiBayar.length !== 0 && (
                                <>
                                <p className={style.judulDetailPesanan}>
                                    Bukti Bayar
                                </p>
                                {dataProductById?.orders?.buktiBayar.map(
                                    (data, key) => {
                                    return (
                                        <div key={key}>
                                        <p>
                                            {data.statusTransaksi == true
                                            ? "Bayar Lunas"
                                            : "Bayar Uang Muka 30%"}
                                        </p>
                                        <img
                                            style={{
                                            width: "100px",
                                            height: "100px",
                                            }}
                                            src={data.picture_bukti_bayar}
                                            alt=""
                                        />
                                        </div>
                                    );
                                    },
                                )}
                                </>
                            )}
                            {isPembayaranLunas !== true && (
                                <>
                                <p className={style.judulDetailPesanan}>
                                    Upload Bukti Pembayaran
                                </p>
                                <div className={style.pembayaran}>
                                    {console.log(pembayaran, dataProductById)}
                                    <select
                                    name=""
                                    id=""
                                    value={pembayaran}
                                    onChange={(e) =>
                                        setPembayaran(e.target.value)
                                    }>
                                    <option value="">Pilih Pembayaran</option>
                                    {console.log(
                                        isPembayaranDP,
                                        isPembayaranLunas,
                                    )}
                                    {isPembayaranDP !== true && (
                                        <option value="false">Uang Muka 30%</option>
                                    )}
                                    <option value="true">Lunas</option>
                                    </select>
                                </div>
                                {pembayaran.length !== 0 && (
                                    <div className={style.itemBuktiBayar}>
                                    <img
                                        className={style.imgBuktiBayar}
                                        src={
                                        dataImageBuktiBayar == false
                                            ? buktiBayar
                                            : dataImageBuktiBayar
                                        }
                                        alt=""
                                    />
                                    <input
                                        type="file"
                                        onChange={(e) =>
                                        `${setDataImageBuktiBayar(
                                            URL.createObjectURL(e.target.files[0]),
                                        )} ${setBuktiBayarGambar(
                                            e.target.files[0],
                                        )}`
                                        }
                                    />
                                    </div>
                                )}
                                <input
                                    className={style.button}
                                    type="button"
                                    value="Kirim Bukti Bayar"
                                    onClick={() =>
                                    hendleUploadBuktiBayar(
                                        dataProductById.id_orders,
                                    )
                                    }
                                />
                                </>
                            )}
                            </div>
                        )}
                        {dataProductById.status === 0 && (
                            <div className={style.contentBuktiBayar}>
                            <p
                                style={{
                                marginTop: "10px",
                                color: "blue",
                                fontStyle: "italic",
                                }}>
                                Menunggu Konfirmasi Toko, Untuk Lanjut Ke Pembayaran
                            </p>
                            </div>
                        )}
                        {dataProductById.status === 1 && (
                            <div className={style.contentBuktiBayar}>
                            <p
                                style={{
                                marginTop: "10px",
                                color: "blue",
                                fontStyle: "italic",
                                }}>
                                Pesanan Ditolak, Terdapat kendala dalam membuat
                                pesanan, antara lain, bahan, keguangan dll
                            </p>
                            </div>
                        )}
                        </div>
                    </div>
                    <div></div>
                    </div>
                </div>
                )}
            </div>
        </div>
    )
}

export default PesananSelesai