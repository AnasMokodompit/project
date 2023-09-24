import axios from "axios";
import Sidebar from "../../componet/Sidebar/Sidebar";
import style from "./OrderAdmin.module.css";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import jwt from "jwt-decode";

function OrderAdmin() {
  const { dataLogin } = useSelector((tes) => tes.userReducer);
  const [dataOrder, setDataOrder] = useState([]);
  const [productOrder, setProductOrder] = useState([]);
  const [statusOrderProduct, setStatusOrderProduct] = useState();
  const [id, setid] = useState();
  const [dataBuktiBayar, setDataBuktiBayar] = useState([]);
  const [keterangan, setKeterangan] = useState("");
  const [jumlah, setJumlah] = useState("");

  //
  const [status, setStatus] = useState([]);

  const hendleGetAllOrder = () => {
    // const decode = jwt(dataLogin.dataLogin.token)

    axios
      .get(`http://localhost:3000/api/v1.0/orders`)
      .then((res) => {
        console.log(res.data.data);
        setDataOrder(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const hendleDeleteOrder = (idProductOrder) => {
    axios
      .delete(`http://localhost:3000/api/v1.0/orders/${idProductOrder}`)
      .then((res) => {
        hendleGetAllOrder();
      })
      .catch((err) => [console.log(err)]);
  };

  const hendleSubmintPembaruanStatus = () => {
    axios
      .patch(
        `http://localhost:3000/api/v1.0/productOrder/${id}`,
        { status: status },
        { headers: { Authorization: `Bearer ${dataLogin.dataLogin.token}` } },
      )
      .then((res) => {
        console.log(res.data.data);
        hendleGetAllOrder();
      })
      .catch((err) => {
        console.log(err);
      });

    statusOrderProduct();
  };

  const hendleStatusPesanan = (id_Product_order, status, event) => {
    axios
      .patch(
        `http://localhost:3000/api/v1.0/productOrder/${id_Product_order}`,
        { status: status },
        { headers: { Authorization: `Bearer ${dataLogin.dataLogin.token}` } },
      )
      .then((res) => {
        console.log(res.data.data);
        hendleGetByIdProductOrder();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const hendleGetByIdProductOrder = (id_order, id_user) => {
    setStatusOrderProduct("Product_Order");

    axios
      .get(
        `http://localhost:3000/api/v1.0/productOrder/customers?order_id=${id_order}&id_user=${id_user}`,
        { headers: { Authorization: `Bearer ${dataLogin.dataLogin.token}` } },
      )
      .then((res) => {
        console.log(res.data.data);
        setKeterangan(`Penjualan ${res.data.data.map((data) => data.products?.name)}`);
        setJumlah(res.data.data[0].orders.Price);
        setDataBuktiBayar(res.data.data[0].orders);
        setProductOrder(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const hendleTransaksi = (statusTransaksi) => {
    const data = {
      id_jenis_transaksi: 1,
      id_nama_akun_transaksi: 18,
      keterangan: keterangan,
    };

    if (statusTransaksi == true) {
      data.id_nama_akun_transaksi = 18;
      data.jumlah = jumlah;
    } else {
      data.id_nama_akun_transaksi = 36;
      data.jumlah = 0.3 * jumlah;
    }

    // console.log(data)

    axios
      .post(`http://localhost:3000/api/v1.0/transaksi`, data)
      .then((res) => {
        console.log(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const menuRef = useRef(null);
  const buttonRef = useRef();

  const handleClickOutside = (event) => {
    if (
      menuRef.current &&
      !menuRef.current.contains(event.target) &&
      event.target !== buttonRef.current
    ) {
      setStatusOrderProduct();
    }
  };

  const hendleClose = () => {
    setKeterangan("");
    setJumlah("");
  };

  useEffect(() => {
    hendleGetAllOrder();
    // document.addEventListener("click", handleClickOutside, false);
    // return () => {
    //     document.removeEventListener("click", handleClickOutside, false);
    // };
  }, []);

  return (
    <>
      <div className={style.container}>
        <div className={style.kanan}>
          <div className={style.conTable}>
            <h2>Orders</h2>
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
                  <input type="text" placeholder="Search Name" />
                  <span className="material-symbols-outlined">search</span>
                </div>
              </div>
            </div>
            <table>
              <thead>
                <tr>
                  <th>No</th>
                  <th>Nama Pemesan</th>
                  {/* <th>Nama Produk</th> */}
                  <th>Alamat</th>
                  <th>Jumlah</th>
                  <th>Harga</th>
                  {/* <th>Status</th> */}
                  <th>Options</th>
                </tr>
              </thead>
              <tbody>
                {dataOrder.length !== 0 &&
                  dataOrder.map((data, key) => {
                    // console.log(data)
                    return (
                      <tr key={key}>
                        <td>{(key += 1)}</td>
                        <td>{data.nama_pemesan}</td>
                        {/* <td>{data.products.name}</td> */}
                        <td>{data.alamat}</td>
                        <td>{data.jumlah}</td>
                        <td>
                          {new Intl.NumberFormat("id-ID", {
                            style: "currency",
                            currency: "IDR",
                          }).format(data.Price)}
                        </td>
                        {/* {data.status === true && (
                                                <td>Pesanan Diterima</td>
                                            )}
                                            {data.status === false && (
                                                <td>Pesanan Ditolak</td>
                                            )} */}
                        <td className={style.options}>
                          {/* <span class={`material-symbols-outlined ${style.iconOptions}`} onClick={() => `${setStatusOrderProduct(true)} ${setid(data.id)} ${setStatus(data.status)}`}>edit</span> */}
                          {/* <span className={`material-symbols-outlined ${style.iconOptions}`} onClick={() => hendleDeleteOrder(data.id)}>delete</span> */}
                          <span
                            ref={buttonRef}
                            className={`material-symbols-outlined ${style.iconOptions}`}
                            onClick={() => hendleGetByIdProductOrder(data.id, data.users.id)}>
                            visibility
                          </span>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
            <div className={style.pagenation}>
              <span>Showing of entries</span>
              <div className={style.page}>
                <span className={`${style.before} material-symbols-outlined`}>chevron_left</span>
                <span className={`${style.number}`}>1</span>
                <span className={`${style.after} material-symbols-outlined`}>chevron_right</span>
              </div>
            </div>
          </div>
          {/* {statusOrderProduct === true && (
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
                )} */}
          {statusOrderProduct === "Product_Order" && (
            <div className={style.containerPopUpStatus}>
              <div ref={menuRef} className={style.dataOrder}>
                <div className={style.top}>
                  <span
                    onClick={() => `${setStatusOrderProduct("")} ${hendleClose()}`}
                    className="material-symbols-outlined">
                    close
                  </span>
                </div>
                {productOrder?.length !== 0 && (
                  <>
                    {productOrder?.map((data, key) => {
                      return (
                        console.log(data),
                        (
                          <div key={key} className={style.content}>
                            <div className={style.imgOrder}>
                              <img src={data?.products?.product_images[0].url_image} alt="" />
                            </div>
                            <div className={style.contentCenter}>
                              <div className={style.contentCenterItem}>
                                <span className={style.cardCategori}>{data?.products.name}</span>
                                <span className={style.cardJdl}>
                                  <span className={style.subData}>
                                    Kategori : {data?.products.categories.name}
                                  </span>
                                </span>
                                <span>Jumlah : {data.jumlah}</span>
                                <span>Deskripsi Produk : {data.products.Deskripsi_produk}</span>
                              </div>
                              <div className={style.contentCenterItem}>
                                <span className={style.cardHarga}>
                                  {new Intl.NumberFormat("id-ID", {
                                    style: "currency",
                                    currency: "IDR",
                                  }).format(data.Price)}
                                </span>
                                <div className={style.average}>
                                  <div>
                                    <input
                                      id={`${data.id} trima`}
                                      type="checkbox"
                                      checked={data.status == 2 ? true : false}
                                      onChange={(e) => hendleStatusPesanan(data.id, 2, e)}
                                    />
                                    <label htmlFor={`${data.id} trima`}>Pesanan diterima</label>
                                  </div>
                                  <div>
                                    <input
                                      id={`${data.id} tolak`}
                                      type="checkbox"
                                      checked={data.status == 1 ? true : false}
                                      onChange={(e) => hendleStatusPesanan(data.id, 1, e)}
                                    />
                                    <label htmlFor={`${data.id} tolak`}>Pesanan ditolak</label>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )
                      );
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
                {console.log(dataBuktiBayar)}
                {dataBuktiBayar.buktiBayar?.length !== 0 && (
                  <div className={style.formOrder}>
                    <h6>Bukti Pembayaran</h6>
                    {dataBuktiBayar.buktiBayar?.map((data, key) => {
                      return (
                        <div key={key}>
                          {data.statusTransaksi === true ? (
                            <p>
                              Bukti Bayar Lunas{" "}
                              <span>
                                <input
                                  type="checkbox"
                                  onClick={() =>
                                    hendleTransaksi(dataBuktiBayar?.buktiBayar[0]?.statusTransaksi)
                                  }
                                />
                              </span>
                            </p>
                          ) : (
                            <p>
                              Bukti Bayar 30%{" "}
                              <span>
                                <input
                                  type="checkbox"
                                  onClick={() =>
                                    hendleTransaksi(dataBuktiBayar?.buktiBayar[0]?.statusTransaksi)
                                  }
                                />
                              </span>
                            </p>
                          )}
                          <img src={data.picture_bukti_bayar} alt="" />
                        </div>
                      );
                    })}
                    <div className={style.kesesuaianBuktiBayar}></div>
                  </div>
                )}
                {/* {console.log(dataBuktiBayar.buktiBayar?.length)} */}
                {console.log(dataBuktiBayar.buktiBayar)}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default OrderAdmin;
