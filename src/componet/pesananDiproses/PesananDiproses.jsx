import { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import style from "./PesananDiproses.module.css";
import buktiBayar from "../../Asset/Img/profile_null.png";
import { useSelector } from "react-redux";
import axios from "axios";
import jwt from "jwt-decode";

import Refresh from "../../Asset/icons/untitled-ui-icons/line/components/RefreshCw04";

function PesananDiproses() {
  const { dataLogin } = useSelector((tes) => tes.userReducer);
  const [dataProduct, setDataProduct] = useState([]);
  const [dataProductById, setDataProductById] = useState([]);
  const [isPembayaranDP, setIsPembayaranDP] = useState(false);
  const [isPembayaranLunas, setIsPembayaranLunas] = useState(false);
  const [popUpInformasiPesanan, setPopUpInformasiPesanan] = useState("");
  const [dataImageClick, setDataImageClick] = useState(false);
  const [dataImageBuktiBayar, setDataImageBuktiBayar] = useState(false);
  const [id, setId] = useState();
  const [buktibayarGambar, setBuktiBayarGambar] = useState();
  const [pembayaran, setPembayaran] = useState("");

  const isLogin = dataLogin?.dataLogin?.token;

  const hendleCekOrderProductById = (idProdutOrder) => {
    setId(idProdutOrder);

    axios
      .get(
        `${process.env.REACT_APP_BASE_API}/productOrder/customers/${idProdutOrder}`,
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
        .get(
          `${process.env.REACT_APP_BASE_API}/productOrder/customers?statusKategori=Pesanan Diproses`,
          {
            headers: { Authorization: `Bearer ${dataLogin?.dataLogin?.token}` },
          },
        )
        .then((res) => {
          console.log(res.data.data);
          setDataProduct(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const { mutate: mutateUploadBuktiBayar, isLoading } = useMutation({
    mutationFn: async (data) => {
      return await axios.post(
        `${process.env.REACT_APP_BASE_API}/buktiBayar`,
        data,
        {
          headers: { Authorization: `Bearer ${dataLogin.dataLogin.token}` },
        },
      );
    },
    onSuccess: () => {
      alert(`Gambar Berhasil DI Kirim`);
      hendleOrderByCustemers();
      hendleCekOrderProductById(id);
    },
    onError: (error) => {
      if (error.response.data) {
        alert(`${error.response.data.message}`);
      }
      console.log(error);
    },
  });

  const handleUploadBuktiBayar = (id_orders) => {
    const formData = new FormData();

    formData.append("gambarBuktiBayar", buktibayarGambar);
    formData.append("statusTransaksi", pembayaran);
    formData.append("id_orders", id_orders);

    mutateUploadBuktiBayar(formData);
  };

  const formatData = (idProdutOrder, waktu) => {
    const countDownDate = new Date(waktu).getTime();

    const now = new Date().getTime();

    const distance = countDownDate - now;

    let days = Math.floor(distance / (1000 * 60 * 60 * 24));
    let hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    );
    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

    hendleTimeLine(idProdutOrder, waktu);

    // console.log(`${days} Hari ${hours} Jam ${minutes} Menit`)
    if (distance < 0) {
      return `Selesai`;
    } else {
      return `${days} Hari ${hours} Jam ${minutes} Menit`;
    }
  };

  const hendleTimeLine = (idProdutOrder, waktu) => {
    setInterval(() => {
      const countDownDate = new Date(waktu).getTime();

      const now = new Date().getTime();

      const distance = countDownDate - now;
      const update = document.getElementById(`${idProdutOrder}`);

      let days = Math.floor(distance / (1000 * 60 * 60 * 24));
      let hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      );
      let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

      // console.log(`${days} Hari ${hours} Jam ${minutes} Menit`)
      if (distance < 0) {
        // console.log("selesao")

        clearInterval(hendleTimeLine());

        const data = {
          pesan_status: "Selesai",
          tanggal_pengerjaan: null,
        };

        axios
          .patch(
            `${process.env.REACT_APP_BASE_API}/productOrder/ProdukOrderTerima/${idProdutOrder}`,
            data,
            {
              headers: { Authorization: `Bearer ${dataLogin.dataLogin.token}` },
            },
          )
          .then((res) => {
            return window.location.reload(true);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        if (update) {
          update.innerHTML = `${days} Hari ${hours} Jam ${minutes} Menit`;
        }
      }
    }, 1000);
  };

  const hendleClose = () => {
    setDataImageClick(false);
    setDataImageBuktiBayar(false);
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
              return (
                <div
                  key={key}
                  className={style.item}
                  onClick={() =>
                    `${setPopUpInformasiPesanan(
                      "Active",
                    )} ${hendleCekOrderProductById(data.id)} ${
                      data?.picture_bukti_bayar
                        ? setDataImageBuktiBayar(data?.picture_bukti_bayar)
                        : setDataImageBuktiBayar(false)
                    }`
                  }>
                  <img src={data.products.product_images[0].url_image} alt="" />
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
                  <span>
                    Status :{" "}
                    <span style={{ color: "red" }}>{data.pesan_status}</span>
                  </span>
                  <span>
                    Selesai :{" "}
                    <span id={data.id}>
                      {formatData(data.id, data.tanggal_pengerjaan)}
                    </span>
                  </span>
                </div>
              );
            })}
        </div>
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
                    {dataProductById?.products?.product_images?.length !== 0 &&
                      dataProductById?.products?.product_images.map(
                        (data, key) => {
                          return (
                            <img
                              key={key}
                              src={data.url_image}
                              alt=""
                              onClick={() => setDataImageClick(data.url_image)}
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
                              onChange={(e) => setPembayaran(e.target.value)}>
                              <option value="">Pilih Pembayaran</option>
                              {console.log(isPembayaranDP, isPembayaranLunas)}
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
                                  )} ${setBuktiBayarGambar(e.target.files[0])}`
                                }
                              />
                            </div>
                          )}
                          <button
                            disabled={isLoading}
                            onClick={() =>
                              handleUploadBuktiBayar(dataProductById.id_orders)
                            }
                            className="flex items-center gap-2 rounded-lg bg-amber-300 p-2 font-archivo transition-colors disabled:bg-amber-100">
                            <p>Kirim Bukti Bayar</p>
                            {!!isLoading && (
                              <span className="animate-spin">
                                <Refresh />
                              </span>
                            )}
                          </button>
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
                        Pesanan Ditolak, Terdapat kendala dalam membuat pesanan,
                        antara lain, bahan, keguangan dll
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
  );
}

export default PesananDiproses;
