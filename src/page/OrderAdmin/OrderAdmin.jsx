import axios from "axios";
import style from "./OrderAdmin.module.css";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { format } from "date-fns";
import { id as indonesia } from "date-fns/locale";

import { cn } from "../../utils/cn";

import { Button } from "../../componet/button";
import { Calendar } from "../../componet/calendar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "../../componet/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../componet/popover";

import Edit from "../../Asset/icons/untitled-ui-icons/line/components/Edit04";
import CalendarIcon from "../../Asset/icons/untitled-ui-icons/line/components/Calendar";

function OrderAdmin() {
  const { dataLogin } = useSelector((tes) => tes.userReducer);
  const [dataOrder, setDataOrder] = useState([]);
  const [productOrder, setProductOrder] = useState([]);
  const [statusOrderProduct, setStatusOrderProduct] = useState();
  const [id, setid] = useState();
  const [idProdutOrder, setIdProdukOrder] = useState();
  const [dataBuktiBayar, setDataBuktiBayar] = useState([]);
  const [keterangan, setKeterangan] = useState("");
  const [jumlah, setJumlah] = useState("");
  const [dataCkeckBoxStatusPesanan, setDataCheckBoxStatusPesanan] = useState(
    [],
  );
  const [isPembayaranDP, setIsPembayaranDP] = useState(false);
  const [isPembayaranLunas, setIsPembayaranLunas] = useState(false);

  const [statusPesanan, setStatusPesanan] = useState();
  const [tanggalPengerjaan, setTanggalPengerjaan] = useState();
  const [messageErrorPersediaanBahanBaku, setMessageErrorPersediaanBahanBaku] =
    useState([]);
  const [dataNamaProdukPembaruanStatus, setDataNamaProdukPembaruanStatus] =
    useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  //

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

  const hendleSubmintPembaruanStatus = () => {
    const data = {
      pesan_status: statusPesanan,
      tanggal_pengerjaan: new Date(tanggalPengerjaan),
    };
    axios
      .patch(
        `http://localhost:3000/api/v1.0/productOrder/ProdukOrderTerima/${idProdutOrder}`,
        data,
        { headers: { Authorization: `Bearer ${dataLogin.dataLogin.token}` } },
      )
      .then((res) => {
        hendleGetAllOrder();
      })
      .catch((err) => {
        console.log(err);
      });

    setStatusOrderProduct();
    setIdProdukOrder();
    setStatusPesanan();
    setTanggalPengerjaan();
  };

  const hendleStatusPesanan = (id_Product_order, status, event) => {
    const index = dataCkeckBoxStatusPesanan?.findIndex(
      (data) => data.id === id_Product_order,
    );

    const newArrayStatusCheckbox = [...dataCkeckBoxStatusPesanan];

    newArrayStatusCheckbox[index].id = id_Product_order;
    newArrayStatusCheckbox[index].status = status;

    setDataCheckBoxStatusPesanan(newArrayStatusCheckbox);

    axios
      .patch(
        `http://localhost:3000/api/v1.0/productOrder/${id_Product_order}`,
        { status: status },
        { headers: { Authorization: `Bearer ${dataLogin.dataLogin.token}` } },
      )
      .then((res) => {
        console.log(res.data.data);
        hendleGetAllOrder();
        hendleGetByIdProductOrder(
          res.data.data?.id_orders,
          res.data.data?.id_user,
        );
      })
      .catch((err) => {
        hendleGetAllOrder();
        console.log(err);
        if (err.response.data?.message.length !== 0) {
          alert(
            `Bahan Baku Tidak Mencukupi, ${err.response.data?.message.map(
              (data) =>
                ` ${data.bahanBaku.nama} Tersisa ${data.jumlah} ${data.satuan}`,
            )}`,
          );

          const index = dataCkeckBoxStatusPesanan?.findIndex(
            (data) => data.id === id_Product_order,
          );

          const newArrayStatusCheckbox = [...dataCkeckBoxStatusPesanan];

          newArrayStatusCheckbox[index].id = id_Product_order;
          newArrayStatusCheckbox[index].status = 0;

          setDataCheckBoxStatusPesanan(newArrayStatusCheckbox);
        }
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
        setKeterangan(
          `Penjualan ${res.data.data.map((data) => data.products?.name)}`,
        );
        setJumlah(res.data.data[0].orders.Price);
        setDataBuktiBayar(res.data.data[0].orders);
        setProductOrder(res.data.data);

        res.data.data.map((objectt) => {
          setDataCheckBoxStatusPesanan((data) => [
            ...data,
            { id: objectt.id, status: objectt.status },
          ]);
        });

        setIsPembayaranDP(res.data.data[0].orders.IsPembayaranDP);
        setIsPembayaranLunas(res.data.data[0].orders.IsPembayaranLunas);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const hendleTransaksi = (idOrder, statusTransaksi) => {
    const data = {
      id_jenis_transaksi: 1,
      id_nama_akun_jenis_transaksi: 18,
      keterangan: keterangan,
    };

    if (statusTransaksi == true && isPembayaranDP == false) {
      setIsPembayaranLunas(true);
      data.id_nama_akun_jenis_transaksi = 1;
      data.jumlah = jumlah;
    } else if (statusTransaksi == true && isPembayaranDP == true) {
      setIsPembayaranLunas(true);
      data.id_nama_akun_jenis_transaksi = 1;
      data.jumlah = 0.7 * jumlah;
    } else {
      setIsPembayaranDP(true);
      data.id_nama_akun_jenis_transaksi = 2;
      data.jumlah = 0.3 * jumlah;
    }

    // return console.log(data, statusTransaksi)

    axios
      .patch(`http://localhost:3000/api/v1.0/orders/${idOrder}`, {
        statusTransaksi: statusTransaksi,
      })
      .then((res) => {
        console.log(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .post(`http://localhost:3000/api/v1.0/transaksi`, data)
      .then((res) => {
        console.log(res.data.data);

        hendleGetAllOrder();
      })
      .catch((err) => {
        console.log(err);
        hendleGetAllOrder();
      });
  };

  const hendleCekProdukOrder = (id_order) => {
    axios
      .get(
        `http://localhost:3000/api/v1.0/productOrder/ProdukOrderTerima?id_orders=${id_order}`,
        { headers: { Authorization: `Bearer ${dataLogin.dataLogin.token}` } },
      )
      .then((res) => {
        setDataNamaProdukPembaruanStatus(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const hendleCekDataProdukOrderStatusAndTanggal = (idProdukOrderCek) => {
    setIdProdukOrder(idProdukOrderCek);
    axios
      .get(
        `http://localhost:3000/api/v1.0/productOrder/customers/${idProdukOrderCek}`,
        { headers: { Authorization: `Bearer ${dataLogin.dataLogin.token}` } },
      )
      .then((res) => {
        if (res.data.data.pesan_status !== null) {
          setStatusPesanan(res.data.data.pesan_status);
        } else {
          setStatusPesanan("");
        }
        if (res.data.data.tanggal_pengerjaan !== null) {
          setTanggalPengerjaan(new Date(res.data.data.tanggal_pengerjaan));
        } else {
          setTanggalPengerjaan("");
        }
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
    setDataCheckBoxStatusPesanan([]);
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
            <h1 className="text-2xl font-bold text-black">Pesanan</h1>
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
                    console.log(data);
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
                          })
                            .format(data.Price)
                            .replace(/(\.|,)00$/g, "")}
                        </td>
                        <td className="flex items-center justify-center gap-2">
                          {((data.IsPembayaranDP == true &&
                            data.IsPembayaranLunas == true) ||
                            data.IsPembayaranDP == true ||
                            data.IsPembayaranLunas == true) && (
                            // <span
                            //   className={`material-symbols-outlined ${style.iconOptions}`}
                            //   onClick={() =>
                            //     `${setStatusOrderProduct(true)} ${setid(
                            //       data.id,
                            //     )} ${hendleCekProdukOrder(data.id)}`
                            //   }>
                            //   edit
                            // </span>

                            <Dialog
                              open={isDialogOpen}
                              onOpenChange={(open) => {
                                setIsDialogOpen(open);
                              }}>
                              <DialogTrigger>
                                <button
                                  onClick={() => {
                                    // setStatusOrderProduct(true);
                                    setid(data.id);
                                    hendleCekProdukOrder(data.id);
                                  }}
                                  className="rounded-lg bg-amber-300 p-2">
                                  <Edit />
                                </button>
                              </DialogTrigger>
                              <DialogContent>
                                <div className="flex flex-col gap-4">
                                  <p className="font-archivo text-xl font-bold">
                                    Status Pesanan
                                  </p>
                                  <div className="font-archivo text-sm">
                                    <div className="flex flex-col">
                                      <label
                                        htmlFor="produk"
                                        className="font-bold">
                                        Produk
                                      </label>
                                      <select
                                        id="produk"
                                        onChange={(e) =>
                                          hendleCekDataProdukOrderStatusAndTanggal(
                                            e.target.value,
                                          )
                                        }
                                        className="rounded-lg border-2 border-neutral-500 p-3">
                                        <option>Pilih Produk</option>
                                        {dataNamaProdukPembaruanStatus.length !=
                                          0 &&
                                          dataNamaProdukPembaruanStatus.map(
                                            (data, index) => {
                                              return (
                                                <option
                                                  key={index}
                                                  value={data.id}>
                                                  {data.products.name}
                                                </option>
                                              );
                                            },
                                          )}
                                      </select>
                                    </div>
                                  </div>
                                  <div className="font-archivo text-sm">
                                    <div className="flex flex-col">
                                      <label className="font-bold">Pesan</label>
                                      <textarea
                                        // cols="30"
                                        // rows="10"
                                        value={statusPesanan}
                                        onChange={(e) =>
                                          setStatusPesanan(e.target.value)
                                        }
                                        className="min-h-[4rem] rounded-lg border-2 border-neutral-500 p-2"
                                      />
                                    </div>
                                  </div>
                                  <div className="font-archivo text-sm">
                                    <div className="flex flex-col">
                                      <label
                                        htmlFor="tanggal"
                                        className="font-bold">
                                        Tanggal Selesai
                                      </label>
                                      <Popover>
                                        <PopoverTrigger asChild>
                                          <Button
                                            variant={"outline"}
                                            className={cn(
                                              "justify-start border-2 border-neutral-500 p-3 text-left font-normal",
                                              !tanggalPengerjaan &&
                                                "text-muted-foreground",
                                            )}>
                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                            {tanggalPengerjaan ? (
                                              format(tanggalPengerjaan, "PPP", {
                                                locale: indonesia,
                                              })
                                            ) : (
                                              <span>Pilih Tanggal</span>
                                            )}
                                          </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0">
                                          <Calendar
                                            mode="single"
                                            selected={tanggalPengerjaan}
                                            onSelect={setTanggalPengerjaan}
                                            initialFocus
                                            disabled={{
                                              before: new Date(),
                                            }}
                                          />
                                        </PopoverContent>
                                      </Popover>
                                    </div>
                                  </div>
                                  <button
                                    onClick={() => {
                                      hendleSubmintPembaruanStatus();
                                      setIsDialogOpen(false);
                                    }}
                                    className="rounded-lg bg-amber-300 p-3 font-archivo font-bold">
                                    Simpan
                                  </button>
                                </div>
                              </DialogContent>
                            </Dialog>
                          )}
                          {/* <span className={`material-symbols-outlined ${style.iconOptions}`} onClick={() => hendleDeleteOrder(data.id)}>delete</span> */}
                          <span
                            ref={buttonRef}
                            className={`material-symbols-outlined ${style.iconOptions}`}
                            onClick={() =>
                              hendleGetByIdProductOrder(data.id, data.users.id)
                            }>
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
                <span className={`${style.before} material-symbols-outlined`}>
                  chevron_left
                </span>
                <span className={`${style.number}`}>1</span>
                <span className={`${style.after} material-symbols-outlined`}>
                  chevron_right
                </span>
              </div>
            </div>
          </div>
          {statusOrderProduct === "Product_Order" && (
            <div className={style.containerPopUpStatus}>
              <div ref={menuRef} className={style.dataOrder}>
                <div className={style.top}>
                  <span
                    onClick={() =>
                      `${setStatusOrderProduct("")} ${hendleClose()}`
                    }
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
                          <div>
                            <div key={key} className={style.content}>
                              <div className={style.imgOrder}>
                                <img
                                  src={
                                    data?.products?.product_images[0]?.url_image
                                  }
                                  alt=""
                                />
                              </div>
                              <div className={style.contentCenter}>
                                <div className={style.contentCenterItem}>
                                  <span className={style.cardCategori}>
                                    {data?.products.name}
                                  </span>
                                  <span className={style.cardJdl}>
                                    <span className={style.subData}>
                                      <span
                                        style={{
                                          fontWeight: "bold",
                                          fontSize: "14px",
                                        }}>
                                        Kategori :{" "}
                                      </span>
                                      {data?.products.categories.name}
                                    </span>
                                  </span>
                                  {data.jumlah_meter && (
                                    <span>
                                      <span
                                        style={{
                                          fontWeight: "bold",
                                          fontSize: "14px",
                                        }}>
                                        Jumlah Meter Jalan :{" "}
                                      </span>
                                      {data.jumlah_meter}
                                    </span>
                                  )}
                                  <span>
                                    <span
                                      style={{
                                        fontWeight: "bold",
                                        fontSize: "14px",
                                      }}>
                                      Jumlah Barang :{" "}
                                    </span>
                                    {data.jumlah}
                                  </span>
                                  <span>
                                    <p
                                      style={{
                                        fontWeight: "bold",
                                        fontSize: "14px",
                                      }}>
                                      Deskripsi Produk :{" "}
                                    </p>
                                    {data.products.Deskripsi_produk}
                                  </span>
                                </div>
                                {dataCkeckBoxStatusPesanan.length !== 0 &&
                                  (console.log(dataCkeckBoxStatusPesanan),
                                  console.log(data))}
                                <div className={style.contentCenterItem}>
                                  <span className={style.cardHarga}>
                                    {new Intl.NumberFormat("id-ID", {
                                      style: "currency",
                                      currency: "IDR",
                                    })
                                      .format(data.Price)
                                      .replace(/(\.|,)00$/g, "")}
                                  </span>
                                  <div className={style.average}>
                                    {isPembayaranDP == true ||
                                    isPembayaranLunas == true ||
                                    (isPembayaranDP == true &&
                                      isPembayaranLunas == true) ? (
                                      <>
                                        <span>
                                          {dataCkeckBoxStatusPesanan[key]
                                            ?.status == 2
                                            ? "Pesanan Diterima"
                                            : "Pesanan Ditolak"}
                                        </span>
                                      </>
                                    ) : (
                                      <>
                                        <div>
                                          <input
                                            id={`${data.id} trima`}
                                            type="checkbox"
                                            checked={
                                              dataCkeckBoxStatusPesanan[key]
                                                ?.status == 2
                                                ? true
                                                : ""
                                            }
                                            onChange={(e) =>
                                              hendleStatusPesanan(data.id, 2, e)
                                            }
                                          />
                                          <label htmlFor={`${data.id} trima`}>
                                            Pesanan diterima
                                          </label>
                                        </div>
                                        <div>
                                          <input
                                            id={`${data.id} tolak`}
                                            type="checkbox"
                                            checked={
                                              dataCkeckBoxStatusPesanan[key]
                                                ?.status == 1
                                                ? true
                                                : ""
                                            }
                                            onChange={(e) =>
                                              hendleStatusPesanan(data.id, 1, e)
                                            }
                                          />
                                          <label htmlFor={`${data.id} tolak`}>
                                            Pesanan ditolak
                                          </label>
                                        </div>
                                      </>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )
                      );
                    })}
                  </>
                )}
                {console.log(dataBuktiBayar)}
                {dataBuktiBayar.buktiBayar?.length !== 0 && (
                  <div className={style.formOrder}>
                    {/* {console.log(isPembayaranDP, isPembayaranLunas)} */}
                    <h6>Bukti Pembayaran</h6>
                    {dataBuktiBayar.buktiBayar?.map((data, key) => {
                      // console.log(data)
                      return (
                        <div className={style.contentBuktiPembayaran} key={key}>
                          {data.statusTransaksi === true ? (
                            <div className={style.contentItem}>
                              <span>Bukti Bayar Lunas</span>
                              <div className={style.item}>
                                {isPembayaranLunas === true ? (
                                  <p>Terverivikasi</p>
                                ) : (
                                  <input
                                    type="checkbox"
                                    checked={
                                      isPembayaranLunas == true ? true : false
                                    }
                                    onClick={() =>
                                      hendleTransaksi(
                                        dataBuktiBayar.id,
                                        data.statusTransaksi,
                                      )
                                    }
                                  />
                                )}
                              </div>
                            </div>
                          ) : (
                            <div className={style.contentItem}>
                              <span>Bukti Bayar 30%</span>
                              <div className={style.item}>
                                {isPembayaranDP === true ? (
                                  <p>Terverivikasi</p>
                                ) : (
                                  <input
                                    type="checkbox"
                                    checked={
                                      isPembayaranDP == true ? true : false
                                    }
                                    onClick={() =>
                                      hendleTransaksi(
                                        dataBuktiBayar.id,
                                        data.statusTransaksi,
                                      )
                                    }
                                  />
                                )}
                              </div>
                            </div>
                          )}
                          <img src={data.picture_bukti_bayar} alt="" />
                        </div>
                      );
                    })}
                    <div className={style.kesesuaianBuktiBayar}></div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default OrderAdmin;
