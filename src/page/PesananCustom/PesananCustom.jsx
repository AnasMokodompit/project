import Sidebar from "../../componet/Sidebar/Sidebar";
import style from "./PesananCustom.module.css";
import { FaSearch } from "react-icons/fa";
import Minus from "../../Asset/icons/untitled-ui-icons/line/components/Minus";
import Plus from "../../Asset/icons/untitled-ui-icons/line/components/Plus";
import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
// import img from "../../../public/logo.png"

import { Input, CurrencyInput, NumericInput } from "../../componet/input";


function PesananCustom() {
  const { dataLogin } = useSelector((tes) => tes.userReducer);
  const [dataProduct, setDataProduct] = useState([]);
  const [dataPesananCustom, setDataPesananCustom] = useState([]);
  const [kategoryId, setKategoriId] = useState();
  const [gambarProduct, setGambarProduct] = useState([]);
  const [namaKategori, setNamaKategori] = useState();
  const [namaProduct, setNamaProduct] = useState();
  const [ukuranProduct, setUkuranProduct] = useState();
  const [deskripsiProduct, setDeskripsiProduct] = useState();
  const [hargaProduct, setHargaProduct] = useState();
  const [namaPemesan, setNamaPemesan] = useState();
  const [nomorPemesan, setNomorPemesan] = useState();
  const [emailPemesan, setEmailPemesan] = useState();
  const [alamatPemesan, setAlamatPemesan] = useState();
  const [isPermeter, setIsPermeter] = useState()
  const [idProduk, setIdProduk] = useState()

  // Bahan Baku
  const [formKeparluanBahanBaku, setFormKeparluanBahanBaku] = useState(false)
  const [aksiBahanBakuProduk, setAksiBahanBakuProduk] = useState()
  const [aksi, setAksi] = useState("");
  const [dataBahanBakuProduk, setDataBahanBakuProduk] = useState([])
  const [idBahanBakuProduk, setIdBahanBakuProduk] = useState()
  const [namaSatuanPersediaanBahanBaku, setNamaSatuanPersediaanBahanBaku] = useState()
  const [idBahanBaku, setIdBahanBaku] = useState()
  const [jumlah, setJumlah] = useState()
  const [namaBahanBaku, setNamaBahanBaku] = useState()
  const [idDrafTambahBahanBakuProduk, setIdDrafTambahBahanBakuProduk] = useState()
  const [id, setId] = useState();
  const [bahanBaku, setBahanBaku] = useState([])
  const [dataCreatePersediaanBahanBaku, setDataCreatePersediaanBahanBaku] = useState([])

  

  const handleSearchProduct = (e) => {
    e.preventDefault();

    axios
      .get(
        `${process.env.REACT_APP_BASE_API}/products?search=${e.target.value}`,
      )
      .then((res) => {
        console.log(res.data.data);
        setDataProduct(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };



  const hendleClickProduct = (e) => {
    e.preventDefault();
    setNamaProduct(e.target.innerText);
    setDataProduct([]);

    // return console.log(e.target.id)
    axios
      .get(`${process.env.REACT_APP_BASE_API}/products/${e.target.id}`)
      .then((res) => {
        console.log(res.data.data);
        setUkuranProduct(res.data.data.ukuran);
        setDeskripsiProduct(res.data.data.Deskripsi_produk);
        setHargaProduct(res.data.data.harga);
        setKategoriId(res.data.data.categoriesId)
        setNamaKategori(res.data.data.categories.name)
        setGambarProduct(res.data.data.product_images);
        setIsPermeter(res.data.data.IsPermeter)
        setDataBahanBakuProduk(res.data.data.bahanBakuProduk)
        setIdProduk(res.data.data.id)
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const hendleSimpanCustomPesanan = () => {
    const option = {
        name: namaProduct,
        ukuran: ukuranProduct,
        harga: hargaProduct,
        Deskripsi_produk: deskripsiProduct,
        kategoryId: kategoryId,
        namaKategori: namaKategori,
        product_images: gambarProduct,
        jumlah: 1,
        jumlahHarga: hargaProduct,
        bahanBakuProduk: dataBahanBakuProduk
    }

    if (isPermeter == true) {
      option.jumlah_meter = 1
    }

    setDataPesananCustom([
      ...dataPesananCustom, option,
    ]);


    setNamaKategori("");
    setNamaProduct("");
    setUkuranProduct("");
    setHargaProduct("")
    setDeskripsiProduct("");

    setDataBahanBakuProduk([])
    setFormKeparluanBahanBaku(false);
    setBahanBaku([]);
    setDataCreatePersediaanBahanBaku([]);
    setJumlah();
    setNamaBahanBaku();
    setNamaSatuanPersediaanBahanBaku();
    setIdBahanBaku();
  };

  const hendleTambahOrder = (name, Deskripsi_produk) => {
    const dataPermeterTambah = dataPesananCustom.filter(
      (item) => (item.name == name && item.Deskripsi_produk == Deskripsi_produk && item.jumlah_meter)
    );

    const itemIndexTambah = dataPesananCustom.findIndex(
      (item) => item.name == name && item.Deskripsi_produk == Deskripsi_produk,
    );
    
    const newArrayDataOrder = [...dataPesananCustom];
    if (itemIndexTambah >= 0 && dataPermeterTambah.length !== 0) {
      newArrayDataOrder[itemIndexTambah].jumlah += 1;
      newArrayDataOrder[itemIndexTambah].jumlahHarga = (newArrayDataOrder[itemIndexTambah].harga * newArrayDataOrder[itemIndexTambah].jumlah_meter) * newArrayDataOrder[itemIndexTambah].jumlah ;

      setDataPesananCustom(newArrayDataOrder);
    }
    else if (itemIndexTambah >= 0) {
      newArrayDataOrder[itemIndexTambah].jumlah += 1;
      newArrayDataOrder[itemIndexTambah].jumlahHarga += newArrayDataOrder[itemIndexTambah].harga;

      setDataPesananCustom(newArrayDataOrder);
    }
  };

  const hendleKurangOrder = (name, Deskripsi_produk) => {
    const dataPermeterTambah = dataPesananCustom.filter(
      (item) => (item.name == name && item.Deskripsi_produk == Deskripsi_produk && item.jumlah_meter)
    );

    const itemIndexTambah = dataPesananCustom.findIndex(
      (item) => item.name == name && item.Deskripsi_produk == Deskripsi_produk,
    );

    const newArrayDataOrder = [...dataPesananCustom];
    if (itemIndexTambah >= 0  && newArrayDataOrder[itemIndexTambah].jumlah > 1 && dataPermeterTambah.length !== 0) {
      newArrayDataOrder[itemIndexTambah].jumlah -= 1;
      newArrayDataOrder[itemIndexTambah].jumlahHarga = (newArrayDataOrder[itemIndexTambah].harga * newArrayDataOrder[itemIndexTambah].jumlah_meter) * newArrayDataOrder[itemIndexTambah].jumlah ;

      setDataPesananCustom(newArrayDataOrder);

    }
    else if (itemIndexTambah >= 0 && newArrayDataOrder[itemIndexTambah].jumlah > 1) {
      newArrayDataOrder[itemIndexTambah].jumlah -= 1;
      newArrayDataOrder[itemIndexTambah].jumlahHarga -= newArrayDataOrder[itemIndexTambah].harga;

      setDataPesananCustom(newArrayDataOrder);
    }else{
      setDataPesananCustom(dataPesananCustom.filter(item => item.name !== name && item.Deskripsi_produk !== Deskripsi_produk) )
    }
  };

  const hendleDeleterOrder = (name, Deskripsi_produk) => {
    const dataNoDelete = dataPesananCustom.filter((item) => item.name !== name && item.Deskripsi_produk !== Deskripsi_produk)

    setDataPesananCustom(dataNoDelete);

  }

  const hendleTambahMeterOrder = (name, Deskripsi_produk, harga) => {
    const itemIndexTambah = dataPesananCustom.findIndex(
      (item) => item.name == name && item.Deskripsi_produk == Deskripsi_produk,
    );

    if (itemIndexTambah >= 0) {
      const newArrayDataOrder = [...dataPesananCustom];
      newArrayDataOrder[itemIndexTambah].jumlah_meter += 1;
      newArrayDataOrder[itemIndexTambah].jumlahHarga = (newArrayDataOrder[itemIndexTambah].harga * newArrayDataOrder[itemIndexTambah].jumlah_meter) * newArrayDataOrder[itemIndexTambah].jumlah ;

      setDataPesananCustom(newArrayDataOrder);
    }
  }
  
  
  const hendleKurangMeterOrder = (name, Deskripsi_produk, harga) => {
    const itemIndexTambah = dataPesananCustom.findIndex(
      (item) => item.name == name && item.Deskripsi_produk == Deskripsi_produk,
    );
    
    const newArrayDataOrder = [...dataPesananCustom];
  
    if (itemIndexTambah >= 0 && newArrayDataOrder[itemIndexTambah].jumlah > 1) {
      newArrayDataOrder[itemIndexTambah].jumlah_meter -= 1;
      newArrayDataOrder[itemIndexTambah].jumlahHarga = (newArrayDataOrder[itemIndexTambah].harga * newArrayDataOrder[itemIndexTambah].jumlah_meter) * newArrayDataOrder[itemIndexTambah].jumlah;
  
      setDataPesananCustom(newArrayDataOrder);
    }else{
      setDataPesananCustom(dataPesananCustom.filter(item => item.name !== name && item.Deskripsi_produk !== Deskripsi_produk) )
    }
  }


  // Bahan Baku

const hendleSearchPersedianBahanBaku = (e) => {
  axios
    .get(
      `${process.env.REACT_APP_BASE_API}/persediaanBahanBaku?search=${e.target.value}&id_bahan_baku=${idBahanBaku}`,
      { headers: { Authorization: `Bearer ${dataLogin.dataLogin.token}` } },
    )
    .then((res) => {
      console.log(res.data.data);
      setDataCreatePersediaanBahanBaku(res.data.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

const hendleClickBahanBaku = (e) => {
  e.preventDefault();
  setNamaBahanBaku(e.target.innerText);
  setBahanBaku([]);
  setIdBahanBaku(e.target.id);

  axios
    .get(
      `${process.env.REACT_APP_BASE_API}/persediaanBahanBaku?id_bahan_baku=${e.target.id}`,
      {
        headers: { Authorization: `Bearer ${dataLogin.dataLogin.token}` },
      },
    )
    .then((res) => {
      console.log(res.data.data);
      setDataCreatePersediaanBahanBaku(res.data.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

const hendleClose = () => {
  setBahanBaku([]);
  setDataCreatePersediaanBahanBaku([]);
  setJumlah();
  setNamaBahanBaku();
  setNamaSatuanPersediaanBahanBaku();
  setIdBahanBaku();
  setIdBahanBakuProduk()
};

const hendleClickPersediaanBahanBaku = (e) => {
  e.preventDefault();
  setNamaSatuanPersediaanBahanBaku(e.target.innerText);
  setDataCreatePersediaanBahanBaku([]);

  // return console.log(e.target.id)
  axios
    .get(
      `${process.env.REACT_APP_BASE_API}/persediaanBahanBaku/${e.target.id}`,
      {
        headers: { Authorization: `Bearer ${dataLogin.dataLogin.token}` },
      },
    )
    .then((res) => {
      console.log(res.data.data);
      setNamaSatuanPersediaanBahanBaku(res.data.data.satuan);
    })
    .catch((err) => {
      console.log(err);
    });
};

const sumbitPersediaanBahanBaku = () => {
  
  const data = {
    bahanBaku: {id: idBahanBaku, nama: namaBahanBaku},
    id: Math.random().toString(36).replace(/[^a-z]+/g, '').substr(2, 10),
    id_bahan_baku: idBahanBaku,
    id_produk: idProduk,
    jumlah: jumlah,
    satuan: namaSatuanPersediaanBahanBaku
  }


  // return console.log(data)
  if (aksiBahanBakuProduk === "AddBahanBakuProduk") {
    const cekBahanBakuTelahAda = dataBahanBakuProduk.filter(data => (data?.bahanBaku?.nama == namaBahanBaku && data.satuan == namaSatuanPersediaanBahanBaku))

    if (cekBahanBakuTelahAda.length !== 0) {
      return alert('Bahan Baku Telah Dimasukan')
    }else{
      setDataBahanBakuProduk([...dataBahanBakuProduk, data])
    }

  }else{

    console.log(idBahanBakuProduk)
    const index = dataBahanBakuProduk.findIndex(data => (data.id == idBahanBakuProduk))

    const newArrayData = [...dataBahanBakuProduk];
    newArrayData[index].bahanBaku.id = idBahanBaku;
    newArrayData[index].bahanBaku.nama = namaBahanBaku;
    newArrayData[index].id = idBahanBakuProduk;
    newArrayData[index].id_bahan_baku = idBahanBaku;
    newArrayData[index].id_produk = idProduk;
    newArrayData[index].satuan = namaSatuanPersediaanBahanBaku;
    newArrayData[index].jumlah = jumlah;

    setDataBahanBakuProduk(newArrayData)
  }


  setFormKeparluanBahanBaku(false);
  setBahanBaku([]);
  setDataCreatePersediaanBahanBaku([]);
  setJumlah();
  setNamaBahanBaku();
  setNamaSatuanPersediaanBahanBaku();
  setIdBahanBaku();
}

// Bahan Baku Draf
const hendleGetByNamaAndSatuanBahanBakuProdukDraf = (idDraf, id_bahan_baku, nama, satuan, jumlah) => {
  setIdBahanBakuProduk(idDraf)
  setNamaSatuanPersediaanBahanBaku(satuan)
  setNamaBahanBaku(nama)
  setJumlah(jumlah)
  setIdBahanBaku(id_bahan_baku)
}

const hendleDeleteBahanBakuProdukDraf = (idProdukBahanBakuDelete) => {
  console.log(dataBahanBakuProduk)
  const newArrayData = dataBahanBakuProduk.filter(data => data.id !== idProdukBahanBakuDelete)
  
  setDataBahanBakuProduk(newArrayData)
  console.log(newArrayData, idProdukBahanBakuDelete)
}

const hendleGetAllBahanBaku = () => {
  axios.get(`${process.env.REACT_APP_BASE_API}/bahanBaku`, {headers: { Authorization: `Bearer ${dataLogin.dataLogin.token}` }})
    .then((res) => {
      setBahanBaku(res.data.data)
    }).catch((err) => {
      console.log(err)
    })
}

const handleSearchBahanBaku = (e) => {
  e.preventDefault();
  axios
    .get(
      `${process.env.REACT_APP_BASE_API}/bahanBaku?searchName=${e.target.value}`,
      {
        headers: { Authorization: `Bearer ${dataLogin.dataLogin.token}` },
      },
    )
    .then((res) => {
      console.log(res.data.data);
      if (
        res.data.data[0]?.name?.toLowerCase() == e.target.value?.toLowerCase()
      ) {
        setNamaBahanBaku(e.target.value);
        setBahanBaku([]);
        setIdBahanBaku(res.data.data[0].id);

        axios
          .get(
            `${process.env.REACT_APP_BASE_API}/persediaanBahanBaku?id_bahan_baku=${e.target.id}`,
            {
              headers: {
                Authorization: `Bearer ${dataLogin.dataLogin.token}`,
              },
            },
          )
          .then((res) => {
            setDataCreatePersediaanBahanBaku(res.data.data);
          })
          .catch((err) => {
            console.log(err);
          });
      } else if (e.target.value.length == 0) {
        setNamaBahanBaku();
        setBahanBaku([]);
        setIdBahanBaku();
        setDataCreatePersediaanBahanBaku([]);
      } else {
        setBahanBaku(res.data.data);
      }
    })
    .catch((err) => {
      console.log(err);
    });
  };


  // Kirim Order Custom
  const hendleSubmitOrderCustom = () => {
    const data = {
      user: {
        nama: namaPemesan,
        nomor: nomorPemesan,
        email: emailPemesan,
        alamat: alamatPemesan,
        status: 1
      },
      order: dataPesananCustom,
    }
    

    axios
        .post(
          `${process.env.REACT_APP_BASE_API}/pesananCustom`, data,
          {
            headers: {
              Authorization: `Bearer ${dataLogin.dataLogin.token}`,
            },
          },
        )
        .then((res) => {
          console.log(res.data.data)
          setNamaPemesan("")
          setNomorPemesan("")
          setEmailPemesan("")
          setAlamatPemesan("")
          setDataPesananCustom([])
        })
        .catch((err) => {
          console.log(err);
        });

        
  }

  const renderCurrency = (value) => {
    let number = Number(value);
    // let number = 5;
    
    console.log(number.toLocaleString("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
      minimumFractionDigits: 0,
    }))


    return number?.toLocaleString("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
      minimumFractionDigits: 0,
    });
  };
  
  const handleChange = (event) => {
    const result = event.target.value.replace(/\D/g, "");
    console.log(result) 
    setHargaProduct(Number(result));
  };
  
  
  return (
    console.log(hargaProduct),
    <div className={style.container}>
      <div className="flex w-full flex-col gap-8 p-4 font-archivo">
        <div>
          <p className="text-2xl font-bold text-black">Pesanan Custom</p>
        </div>
        <div className={style.content}>
          <div className={style.contentItem}>
            <p className="font-archivo font-extrabold">Pesanan</p>
            <div className={style.itemContentOrderCustom}>
              <label htmlFor="">Nama Produk</label>
              <div className={style.inputWrapper}>
                <FaSearch id={style.searchIcon} />
                <input
                  placeholder="Type to search produk..."
                  value={namaProduct}
                  onChange={(e) =>
                    `${setNamaProduct(e.target.value)} ${handleSearchProduct(
                      e,
                    )}`
                  }
                />
              </div>
              <div className={style.resultsList}>
                {dataProduct.length !== 0 &&
                  dataProduct.map((data, key) => {
                    return (
                      <div
                        id={data.id}
                        key={key}
                        onClick={(e) => hendleClickProduct(e)}
                        className={style.searchResult}>
                        {data.name}
                      </div>
                    );
                  })}
              </div>
            </div>
            <div className={style.itemContentOrderCustom}>
              <label htmlFor="">Ukuran Produk</label>
              <input
                type="text"
                id={style.input}
                value={ukuranProduct}
                onChange={(e) => setUkuranProduct(e.target.value)}></input>
            </div>
            <div className={style.itemContentOrderCustom}>
              <label htmlFor="">Deskripsi Produk</label>
              <textarea
                name=""
                id={style.textarea}
                cols="30"
                rows="10"
                value={deskripsiProduct}
                onChange={(e) =>
                  setDeskripsiProduct(e.target.value)
                }></textarea>
            </div>
            <div className={style.itemContentOrderCustom}>
              <label htmlFor="">Harga</label>
              <CurrencyInput
                  type="number"
                  id="harga_produk"
                  value={hargaProduct}
                  onChange={setHargaProduct}
                  className="text-right"
                />
            </div>
            {(dataBahanBakuProduk.length !== 0 || !!hargaProduct) && (
            <div className={style.item}>
                <label htmlFor="" className={style.judul}>Keperluan Bahan Baku</label>
                  <span className={style.buttonAddBahanBakuProduk} onClick={() => `${setFormKeparluanBahanBaku(true)} ${setAksiBahanBakuProduk("AddBahanBakuProduk")}`}>Buat</span>
                <table>
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>Bahan Baku</th>
                      <th>Satuan</th>
                      <th>Jumlah</th>
                      <th>Options</th>
                    </tr>
                  </thead>
                  <tbody>
                        {dataBahanBakuProduk.map((data, key) => {
                          console.log(data)
                          return (
                            <tr key={key}>
                              <td>{(key += 1)}</td>
                              {/* {aksi === "TambahProduct" && (
                                <td>{data?.nama}</td>
                              )}
                              {aksi === "EditProduct" && ( */}
                                <td>{data?.bahanBaku?.nama}</td>
                              {/* )} */}
                              <td>{data.satuan}</td>
                              <td>{data.jumlah}</td>
                              <td className={style.options}>
                                  <>
                                    <span className={`material-symbols-outlined ${style.iconOptions}`} onClick={() => `${setFormKeparluanBahanBaku(true)} ${hendleGetByNamaAndSatuanBahanBakuProdukDraf(data.id, data.id_bahan_baku, data?.bahanBaku?.nama, data.satuan, data.jumlah)} ${setAksiBahanBakuProduk("EditBahanBakuProduk")}`}>edit</span>
                                    <span className={`material-symbols-outlined ${style.iconOptions}`} onClick={() => hendleDeleteBahanBakuProdukDraf(data.id)}>delete</span>
                                  </>
                              </td>
                            </tr>
                            )
                          })}
                  </tbody>
                </table>
            </div>
            )}
            {formKeparluanBahanBaku === true && (
                <div className={style.item}>
                    <div className={style.contentPopUpBahanBaku}>
                      <div className={style.top}>
                        {/* {popup == "Tambah" && <h5>Tambahkan Bahan Baku</h5>}
                        {popup == "Edit" && <h5>Edit Bahan Baku</h5>} */}
                        <span>Input Bahan Baku Produk</span>
                        <span
                          className="material-symbols-outlined"
                          onClick={() => `${setFormKeparluanBahanBaku(false)} ${hendleClose()}`}
                          >
                          close
                        </span>
                      </div>
                      <div className={style.itemContentOrderCustom}>
                        <label htmlFor="">Bahan Baku</label>
                        <div className={style.inputWrapper}>
                          <FaSearch id={style.searchIcon} />
                          <input
                            placeholder="Type to search nama bahan baku..."
                            value={namaBahanBaku}
                            onClick={() => hendleGetAllBahanBaku()}
                            onChange={(e) =>
                              `${setNamaBahanBaku(
                                e.target.value,
                              )} ${handleSearchBahanBaku(e)}`
                            }
                          />
                        </div>
                        <div className={style.resultsList}>
                          {bahanBaku.length !== 0 &&
                            bahanBaku.map((data, key) => {
                              console.log(data);
                              return (
                                <div
                                  id={data.id}
                                  key={key}
                                  onClick={(e) => hendleClickBahanBaku(e)}
                                  className={style.searchResult}>
                                  {data.nama}
                                </div>
                              );
                            })}
                        </div>
                      </div>
                      <div className={style.itemContentOrderCustom}>
                        <label htmlFor="">Satuan</label>
                        <div className={style.inputWrapper}>
                          <FaSearch id={style.searchIcon} />
                          <input
                            placeholder="Type to search nama satuan..."
                            value={namaSatuanPersediaanBahanBaku}
                            onChange={(e) =>
                              `${setNamaSatuanPersediaanBahanBaku(
                                e.target.value,
                              )} ${hendleSearchPersedianBahanBaku(e)}`
                            }
                          />
                        </div>
                        <div className={style.resultsList}>
                          {dataCreatePersediaanBahanBaku.length !== 0 &&
                            dataCreatePersediaanBahanBaku.map((data, key) => {
                              return (
                                <div
                                  id={data.id}
                                  key={key}
                                  onClick={(e) => hendleClickPersediaanBahanBaku(e)}
                                  className={style.searchResult}>
                                  {data.satuan}
                                </div>
                              );
                            })}
                        </div>
                      </div>
                      <div className={style.itemContentOrderCustom}>
                        <label htmlFor="">Jumlah</label>
                        <input
                          type="text"
                          id={style.input}
                          value={jumlah}
                          onChange={(e) => setJumlah(e.target.value)}
                          >
                        </input>
                      </div>
                      <div className={style.button}>
                        <input
                          type="button"
                          value={aksi == "TambahProduct" ? "Simpan Draf" : "Kirim"}
                          onClick={() => sumbitPersediaanBahanBaku()}
                        />
                      </div>
                    </div>
                </div>
              )}
            <input
              className={style.ButtonSimpanPesanan}
              onClick={() => hendleSimpanCustomPesanan()}
              type="button"
              value="Simpan Pesanan"
            />
          </div>
          <div className={style.contentItem}>
            <div className="flex flex-col gap-12">
              {dataPesananCustom?.length !== 0 &&
                (console.log(dataPesananCustom),
                (
                  <div className="flex flex-col gap-4">
                    <p className="font-archivo font-extrabold">Keranjang</p>
                    <div className="flex flex-col gap-4">
                      {dataPesananCustom?.map((data, index) => {
                        return (
                          <div
                            key={index}
                            className="relative grid grid-cols-3 gap-2 rounded-lg bg-neutral-100 p-2 font-archivo shadow-sm">
                            <div className="col-span-1 self-center">
                              <img
                                className="h-32 w-24 rounded-lg object-cover"
                                src={data.product_images[0]?.url_image == undefined ? "/profile_null.png" : data.product_images[0]?.url_image}
                                alt="Gambar Produk"
                              />
                            </div>
                            <div className="col-span-2 pr-4">
                              <div className="flex flex-col gap-2">
                                <div>
                                  <p className="truncate text-base">
                                    {data.name}
                                  </p>
                                  <p className="text-xs font-bold">
                                    Kateogri : {data.namaKategori}
                                  </p>
                                  <p className="text-xs font-bold">
                                    Ukuran : {data.ukuran}
                                  </p>
                                  <p className="text-xs font-bold">
                                    Deskripsi : {data.Deskripsi_produk}
                                  </p>
                                </div>
                                {data?.jumlah_meter && (
                                    <>
                                      <p className="text-xs font-bold">
                                        harga permeter: {data.harga}
                                      </p>
                                      <p className="flex w-max border-collapse items-center justify-between gap-3 rounded-lg">
                                        
                                        <button
                                            className="flex h-5 w-5 items-center justify-center rounded-md border-2 border-neutral-500 transition-colors hover:border-amber-300 hover:bg-amber-300"
                                            onClick={() =>
                                              hendleKurangMeterOrder(
                                                data.name,
                                                data.Deskripsi_produk,
                                                data.harga,
                                              )}
                                            >
                                            <Minus className="text-base" />
                                          </button>
                                          <p className="w-3 text-center">
                                            {data.jumlah_meter}
                                          </p>
                                          <button
                                            className="flex h-5 w-5 items-center justify-center rounded-md border-2 border-neutral-500 transition-colors hover:border-amber-300 hover:bg-amber-300"
                                            onClick={() =>
                                              hendleTambahMeterOrder(
                                                data.name,
                                                data.Deskripsi_produk,
                                                data.harga,
                                              )}
                                            >
                                            <Plus className="text-base" />
                                          </button>
                                          <span>Meter</span>
                                      </p>
                                    </>
                                  )}
                                <p className={style.cardHarga}>
                                  {new Intl.NumberFormat("id-ID", {
                                    style: "currency",
                                    currency: "IDR",
                                  })
                                    .format(data.jumlahHarga)
                                    .replace(/(\.|,)00$/g, "")}
                                </p>
                                <div className="flex w-max border-collapse items-center justify-between gap-3 rounded-lg">
                                  <button
                                    className="flex h-8 w-8 items-center justify-center rounded-md border-2 border-neutral-500 transition-colors hover:border-amber-300 hover:bg-amber-300"
                                    onClick={() =>
                                      hendleKurangOrder(
                                        data.name,
                                        data.Deskripsi_produk,
                                      )
                                    }>
                                    <Minus className="text-base" />
                                  </button>
                                  <p className="w-4 text-center">
                                    {data.jumlah}
                                  </p>
                                  <button
                                    className="flex h-8 w-8 items-center justify-center rounded-md border-2 border-neutral-500 transition-colors hover:border-amber-300 hover:bg-amber-300"
                                    onClick={() =>
                                      hendleTambahOrder(
                                        data.name,
                                        data.Deskripsi_produk,
                                      )
                                    }>
                                    <Plus className="text-base" />
                                  </button>
                                </div>
                              </div>
                              <div className={style.contentCenterItem}></div>
                            </div>
                            <button
                              className="absolute right-0 top-0 rounded-bl-lg rounded-tr-lg  bg-red-500 p-1 text-white transition-all"
                              onClick={() => hendleDeleterOrder(data.name,data.Deskripsi_produk)}>
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
                ))}
                
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
                      onChange={(e) =>
                        setAlamatPemesan(e.target.value)
                      }></textarea>
                  </div>
                </div>
                <input
                  className={`rounded-lg bg-amber-300 p-2 font-bold ${style.buttonCheckOut}`}
                  type="button"
                  value="Checkout"
                  onClick={hendleSubmitOrderCustom}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


var rupiah = document.getElementById("rupiah");
console.log(rupiah)
// rupiah.addEventListener("keyup", function(e) {
//   // tambahkan 'Rp.' pada saat form di ketik
//   // gunakan fungsi formatRupiah() untuk mengubah angka yang di ketik menjadi format angka
//   rupiah.value = formatRupiah(this.value, "Rp. ");
// });

// /* Fungsi formatRupiah */
// function formatRupiah(angka, prefix) {
//   var number_string = angka.replace(/[^,\d]/g, "").toString(),
//     split = number_string.split(","),
//     sisa = split[0].length % 3,
//     rupiah = split[0].substr(0, sisa),
//     ribuan = split[0].substr(sisa).match(/\d{3}/gi);

//   // tambahkan titik jika yang di input sudah menjadi angka ribuan
//   if (ribuan) {
//     let separator = sisa ? "." : "";
//     rupiah += separator + ribuan.join(".");
//   }

//   rupiah = split[1] != undefined ? rupiah + "," + split[1] : rupiah;
//   return prefix == undefined ? rupiah : rupiah ? "Rp. " + rupiah : "";
// }


export default PesananCustom;
