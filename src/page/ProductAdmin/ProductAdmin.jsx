import Sidebar from "../../componet/Sidebar/Sidebar";
import style from "./ProductAdmin.module.css";
import img from "../../Asset/Cor1.jpg";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FaSearch } from "react-icons/fa";


function ProductAdmin() {
  const { dataLogin } = useSelector((tes) => tes.userReducer);
  const [dataProduct, setDataProduct] = useState([]);
  const [dataCategories, setDataCategories] = useState([]);
  const [popUpProduct, setPopUpProduct] = useState(false);
  const [show, setShow] = useState(10);
  const [page, setPage] = useState(1)
  const [namaProdukSearch, setNamaProdukSearch] = useState("")
  const [KategoriProdukSearch, setKategoriProdukSearch] = useState()
  const [aksi, setAksi] = useState("");

  //
  const [id, setId] = useState();
  const [namaProduct, setNamaProduct] = useState();
  const [hargaProduct, setHargaProduct] = useState();
  const [kategori, setKategori] = useState();
  const [ukuran, setUkuran] = useState();
  const [isPermeter, setIsPermeter] = useState(false)
  const [deskripsi, setDeskripsi] = useState();
  const [gambarProduk, setGambarProduct] = useState([]);
  const [dataBahanBakuProduk, setDataBahanBakuProduk] = useState([])

  // 
  const [aksiBahanBakuProduk, setAksiBahanBakuProduk] = useState("")
  const [idBahanBakuProduk, setIdBahanBakuProduk] = useState()
  const [idBahanBaku, setIdBahanBaku] = useState()
  const [formKeparluanBahanBaku, setFormKeparluanBahanBaku] = useState(false)
  const [namaBahanBaku, setNamaBahanBaku] = useState()
  const [namaSatuanPersediaanBahanBaku, setNamaSatuanPersediaanBahanBaku] = useState()
  const [jumlah, setJumlah] = useState()
  const [bahanBaku, setBahanBaku] = useState([])
  // const [dataCreateBahanBakuProduk, setDataCreateBahanBakuProduk] = useState([])
  const [dataCreatePersediaanBahanBaku, setDataCreatePersediaanBahanBaku] = useState([])
  const [idDrafTambahBahanBakuProduk, setIdDrafTambahBahanBakuProduk] = useState()

  const hendleGetAllProduct = async () => {
    await axios
      .get(`${process.env.REACT_APP_BASE_API}/products?row=${show}&page=${page}&search=${namaProdukSearch}&category=${KategoriProdukSearch}`)
      .then((res) => {
        setDataProduct(res.data.data);
        console.log(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const hendleGetAllCategory = () => {
    axios
      .get(`${process.env.REACT_APP_BASE_API}/categories`)
      .then((res) => {
        setDataCategories(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const hendleGetAllBahanBaku = () => {
    axios.get(`${process.env.REACT_APP_BASE_API}/bahanBaku`, {headers: { Authorization: `Bearer ${dataLogin.dataLogin.token}` }})
      .then((res) => {
        setBahanBaku(res.data.data)
      }).catch((err) => {
        console.log(err)
      })
    }


  const hendleTambahGambar = (e) => {
    setGambarProduct([...gambarProduk, e.target.files[0]]);
  };

  const hendleHapusGambar = (name) => {
    setGambarProduct(gambarProduk.filter((data) => data.name !== name));
  };

  const hendleClosePoUp = () => {
    setId();
    setNamaProduct();
    setHargaProduct();
    setKategori();
    setDeskripsi();
    setUkuran();
    setGambarProduct([]);
    setIsPermeter(false)
    setDataBahanBakuProduk([])
    setFormKeparluanBahanBaku(false)
    setBahanBaku([]);
    setDataCreatePersediaanBahanBaku([]);
    setJumlah();
    setNamaBahanBaku();
    setNamaSatuanPersediaanBahanBaku();
    setIdBahanBaku();
    setIdBahanBakuProduk()
  };

  const hendleSubmitProduct = () => {
    const formData = new FormData();

    // return console.log(isPermeter)

    formData.append("nama", namaProduct);
    formData.append("ukuran", ukuran);
    formData.append("harga", hargaProduct);
    formData.append("Deskripsi_produk", deskripsi);
    formData.append("categoriesId", kategori);
    formData.append("IsPermeter", isPermeter);
    
    gambarProduk.map((data, i) => {
      formData.append("gambarProduct", data);
    });
    
    
    
    if (aksi === "TambahProduct") {

      dataBahanBakuProduk.map((data, i) => {
        console.log(data,i)
        formData.append(`bahanBakuProduk[${i}][idBahanBaku]`, data.idBahanBaku);
        formData.append(`bahanBakuProduk[${i}][idDraf]`, data.idDraf);
        formData.append(`bahanBakuProduk[${i}][jumlah]`, data.jumlah);
        formData.append(`bahanBakuProduk[${i}][nama]`, data.nama);
        formData.append(`bahanBakuProduk[${i}][satuan]`, data.satuan);
      })


      axios
        .post(`${process.env.REACT_APP_BASE_API}/products`, formData, {
          headers: { Authorization: `Bearer ${dataLogin.dataLogin.token}` },
        })
        .then((res) => {
          hendleGetAllProduct();
          setPopUpProduct(false);
          setAksi("");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      axios
        .patch(`${process.env.REACT_APP_BASE_API}/products/${id}`, formData, {
          headers: { Authorization: `Bearer ${dataLogin.dataLogin.token}` },
        })
        .then((res) => {
          hendleGetAllProduct();
          setPopUpProduct(false);
          setAksi("");
        })
        .catch((err) => {
          console.log(err);
        });
    }


    setId();
    setNamaProduct();
    setHargaProduct();
    setKategori();
    setDeskripsi();
    setUkuran();
    setGambarProduct([]);
    setIsPermeter(false)
    setDataBahanBakuProduk([])
    setFormKeparluanBahanBaku(false)
    setBahanBaku([]);
    setDataCreatePersediaanBahanBaku([]);
    setJumlah();
    setNamaBahanBaku();
    setNamaSatuanPersediaanBahanBaku();
    setIdBahanBaku();
    setIdBahanBakuProduk()
    
  };

  const hendleEditProduct = (id) => {
    axios
      .get(`${process.env.REACT_APP_BASE_API}/products/${id}`, {
        headers: { Authorization: `Bearer ${dataLogin.dataLogin.token}` },
      })
      .then((res) => {
        setId(res.data.data.id);
        setNamaProduct(res.data.data.name);
        setHargaProduct(res.data.data.harga);
        setKategori(res.data.data.categoriesId);
        setDeskripsi(res.data.data.Deskripsi_produk);
        setUkuran(res.data.data.ukuran);
        setIsPermeter(res.data.data.IsPermeter)
        setGambarProduct(res.data.data.product_images);
        setDataBahanBakuProduk(res.data.data.bahanBakuProduk)
        console.log(res.data.data.IsPermeter);
        console.log(res.data.data);
      });
  };

  const hendleDeleteProduct = (idDelete) => {
    axios
      .delete(`${process.env.REACT_APP_BASE_API}/products/${idDelete}`, {
        headers: { Authorization: `Bearer ${dataLogin.dataLogin.token}` },
      })
      .then((res) => {
        hendleGetAllProduct();
      })
      .catch((err) => {
        console.log(err);
      });
  };


  // Bahan Baku Produk
  const hendleGetByIdBahanBakuProduk = (BahanBaku, satuanBahanBaku, jumlah) => {
      setNamaSatuanPersediaanBahanBaku(satuanBahanBaku);
      setJumlah(jumlah);
      setNamaBahanBaku(BahanBaku);
  }

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

  const sumbitPersediaanBahanBaku = () => {
    const data = {
      idBahanBaku: idBahanBaku,
      nama: namaBahanBaku,
      jumlah: jumlah,
      satuan: namaSatuanPersediaanBahanBaku,
    };

    if (aksi == "TambahProduct") {
      if (aksiBahanBakuProduk == "EditBahanBakuProduk") {
        
        const index = dataBahanBakuProduk.findIndex((item) => (item.idDraf == idDrafTambahBahanBakuProduk))

        if (index >= 0) {
          console.log(namaBahanBaku, namaSatuanPersediaanBahanBaku, index)
          const newArrayData = [...dataBahanBakuProduk];
          newArrayData[index].nama = namaBahanBaku;
          newArrayData[index].satuan = namaSatuanPersediaanBahanBaku;
          newArrayData[index].jumlah = jumlah;

          setDataBahanBakuProduk(newArrayData)
        }
      }else{
        data.idDraf = dataBahanBakuProduk.length
        setDataBahanBakuProduk([...dataBahanBakuProduk, data])
      }
    }else{
      if (aksiBahanBakuProduk == "EditBahanBakuProduk") {
        data.idProduk = id
        
        axios
            .patch(`${process.env.REACT_APP_BASE_API}/bahanBakuProduk/${idBahanBakuProduk}`, data, {
              headers: { Authorization: `Bearer ${dataLogin.dataLogin.token}` },
            })
            .then((res) => {
              console.log(res.data.data);
              hendleEditProduct(res.data.data.id_produk);
            })
            .catch((err) => {
              console.log(err);
              if (err?.response?.data?.code == 404) {
                alert(err?.response?.data?.message);
              }
            });
      }else{
        data.idProduk = id
        
        axios
            .post(`${process.env.REACT_APP_BASE_API}/bahanBakuProduk`, data, {
              headers: { Authorization: `Bearer ${dataLogin.dataLogin.token}` },
            })
            .then((res) => {
              console.log(res.data.data);
              hendleEditProduct(res.data.data.id_produk);
            })
            .catch((err) => {
              console.log(err);
              // if (err?.response?.data?.code == 404) {
              //   alert(err?.response?.data?.message);
              // }
            });
      }
    }
        
    setFormKeparluanBahanBaku(false);
    setBahanBaku([]);
    setDataCreatePersediaanBahanBaku([]);
    setJumlah();
    setNamaBahanBaku();
    setNamaSatuanPersediaanBahanBaku();
    setIdBahanBaku();
  }

  const hendleDeleteBahanBakuProduk = (idBahanBakuProduk) => {
    axios
          .delete(`${process.env.REACT_APP_BASE_API}/bahanBakuProduk/${idBahanBakuProduk}`, {
            headers: { Authorization: `Bearer ${dataLogin.dataLogin.token}` },
          })
          .then(() => {
            hendleEditProduct(id);
          })
          .catch((err) => {
            console.log(err);
          });
  }

    // Draff
      const hendleGetByNamaAndSatuanBahanBakuProdukDraf = (idDraf, nama, satuan, jumlah) => {
        setIdDrafTambahBahanBakuProduk(idDraf)
        setNamaSatuanPersediaanBahanBaku(satuan)
        setNamaBahanBaku(nama)
        setJumlah(jumlah)
      }


      const hendleDeleteBahanBakuProdukDraf = (nama, satuan) => {
        const newArrayData = dataBahanBakuProduk.filter(data => (data.nama !== nama && data.satuan !== satuan))

        setDataBahanBakuProduk(newArrayData)
      }

  const hendleClose = () => {
    setBahanBaku([]);
    setDataCreatePersediaanBahanBaku([]);
    setJumlah();
    setNamaBahanBaku();
    setNamaSatuanPersediaanBahanBaku();
    setIdBahanBaku();
    setIdBahanBakuProduk()
  };

  useEffect(() => {
    hendleGetAllProduct();
    hendleGetAllCategory();
  }, [page, show, namaProdukSearch, KategoriProdukSearch]);

  return (
    <div className={style.container}>
      <div className={style.kanan}>
        <p className="font-archivo text-2xl font-bold">Produk</p>
        <div className={style.buttonCreate}>
          <input
            type="button"
            className={style.userAddButton}
            value="Tambah Data"
            onClick={() =>
              `${setPopUpProduct(true)} ${setAksi(
                "TambahProduct",
              )}`
            }
          />
        </div>
        <div className={style.buttonSearchAndRow}>
          <div className={style.entitas}>
            <span>Show</span>
            <select name="" id="" value={show} onChange={(e) => setShow(e.target.value)}>
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
            <span>Entitas</span>
            <div className={style.category}>
              <select name="" id="" onChange={(e) => setKategoriProdukSearch(e.target.value)}>
                <option value="">All Category</option>
                  {dataCategories.length !== 0 &&
                    dataCategories.map((data, key) => {
                      return <option key={key} value={data.id}>{data.name}</option>;
                    })}
              </select>
            </div>
          </div>
          <div className={style.navbarHome}>
            <div className={`${style.item} ${style.search}`}>
              <input type="text" placeholder="Search Name" onChange={(e) => setNamaProdukSearch(e.target.value)}/>
              <span className="material-symbols-outlined">search</span>
            </div>
          </div>
        </div>
        <div className={style.contentProduct}>
          {console.log(dataProduct)}
          {dataProduct.length !== 0 &&
            dataProduct.map((data, key) => {
              return (
                <div key={key} className={style.card}>
                  <div className={style.contentCard}>
                    <img src={data.product_images[0]?.url_image} alt="" />
                    <span className={style.cardCategori}>
                      {data.categories?.name}
                    </span>
                    <span className={style.cardJdl}>{data?.name}</span>
                    <span className={style.cardHarga}>
                      {new Intl.NumberFormat("id-ID", {
                        style: "currency",
                        currency: "IDR",
                      })
                        .format(data.harga)
                        .replace(/(\.|,)00$/g, "")}
                      {data?.IsPermeter == true
                        ? " /meter jalan"
                        : ""}
                    </span>
                  </div>
                  <div className={style.optionCard}>
                    <span
                      className="material-symbols-outlined"
                      onClick={() =>
                        `${hendleEditProduct(data.id)} ${setPopUpProduct(
                          true,
                        )} ${setAksi("EditProduct")}`
                      }>
                      edit
                    </span>
                    <span
                      className="material-symbols-outlined"
                      onClick={() => hendleDeleteProduct(data.id)}>
                      delete
                    </span>
                  </div>
                </div>
              );
            })}
        </div>
        <div className={style.pagenation}>
          <span>Showing of entries</span>
          <div className={style.page}>
            <span className={`${style.before} material-symbols-outlined`}onClick={() => page === 1 ? page : setPage(page - 1)}>
              chevron_left
            </span>
            <span className={`${style.number}`}>{page}</span>
            <span className={`${style.after} material-symbols-outlined`} onClick={() => dataProduct.length < show ? setPage(page) : setPage(page + 1)}>
              chevron_right
            </span>
          </div>
        </div>
        {popUpProduct === true && (
          <div className={style.contrainerPopUpProduct}>
            <div className={style.contentPopUpProduct}>
              <div className={style.top}>
                {aksi == "EditProduct" && <h5>Edit Product</h5>}
                {aksi == "TambahProduct" && <h5>Tambahkan Product</h5>}
                <span
                  onClick={() =>
                    `${setPopUpProduct(false)} ${hendleClosePoUp()}`
                  }
                  className="material-symbols-outlined">
                  close
                </span>
              </div>
              <div className={style.body}>
                <div className={style.item}>
                  <label htmlFor="">Nama Product</label>
                  <input
                    type="text"
                    value={namaProduct}
                    onChange={(e) => setNamaProduct(e.target.value)}
                  />
                </div>
                <div className={style.item}>
                  <label htmlFor="">Harga Product</label>
                  <input
                    type="text"
                    value={hargaProduct}
                    onChange={(e) => setHargaProduct(e.target.value)}
                  />
                </div>
                <div className={style.checkboxPermeter}>
                  {console.log(isPermeter)}
                  <label htmlFor="">Dijual Permeter</label>
                  <input type="checkbox" name="" checked={isPermeter == true ? true : false} id="" onChange={() => setIsPermeter(!isPermeter)}/>
                </div>
                <div className={style.item}>
                  <label htmlFor="">Kategori</label>
                  <select
                    name=""
                    value={kategori}
                    id=""
                    onChange={(e) => setKategori(e.target.value)}>
                    <option value="">Pilih Kategori</option>
                    {dataCategories.length !== 0 &&
                      dataCategories.map((data, key) => {
                        // console.log(data)
                        return <option key={key} value={data.id}>{data.name}</option>;
                      })}
                  </select>
                </div>
                <div className={style.item}>
                  <label htmlFor="">Ukuran</label>
                  <input
                    type="text"
                    value={ukuran}
                    onChange={(e) => setUkuran(e.target.value)}
                  />
                </div>
                <div className={style.item}>
                  <label htmlFor="">Deskripsi</label>
                  <textarea
                    type="text"
                    value={deskripsi}
                    onChange={(e) => setDeskripsi(e.target.value)}
                  />
                </div>
                <div className={style.gambarProduct}>
                  <label htmlFor="">Foto Produk</label>
                  <label htmlFor="addGambar" type="text">
                    <span className="material-symbols-outlined">add</span>
                  </label>
                  <input
                    id="addGambar"
                    type="file"
                    style={{ display: "none" }}
                    onChange={(e) => hendleTambahGambar(e)}
                  />
                  <div className={style.displayImage}>
                    {gambarProduk.length !== 0 &&
                      gambarProduk.map((data, key) => {
                        return (
                          <span key={key}>
                            {data?.url_image ? (
                              <>
                                <span
                                  className="material-symbols-outlined"
                                  onClick={() => hendleHapusGambar(data.name)}>
                                  close
                                </span>
                                <img src={data.url_image} alt="" />
                              </>
                            ) : (
                              <>
                                <span
                                  className="material-symbols-outlined"
                                  onClick={() => hendleHapusGambar(data.name)}>
                                  close
                                </span>
                                <img src={URL.createObjectURL(data)} alt="" />
                              </>
                            )}
                          </span>
                        );
                      })}
                  </div>
                </div>
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
                        {dataBahanBakuProduk.length !== 0 && (
                          dataBahanBakuProduk.map((data, key) => {
                            console.log(data)
                            return (
                              <tr key={key}>
                                <td>{(key += 1)}</td>
                                {aksi === "TambahProduct" && (
                                  <td>{data?.nama}</td>
                                )}
                                {aksi === "EditProduct" && (
                                  <td>{data?.bahanBaku?.nama}</td>
                                )}
                                <td>{data.satuan}</td>
                                <td>{data.jumlah}</td>
                                <td className={style.options}>
                                  {aksi == "EditProduct" && (
                                    <>
                                      <span className={`material-symbols-outlined ${style.iconOptions}`} onClick={() => `${setFormKeparluanBahanBaku(true)} ${setIdBahanBaku(data.bahanBaku.id)} ${setIdBahanBakuProduk(data.id)} ${hendleGetByIdBahanBakuProduk(data.bahanBaku.nama, data.satuan, data.jumlah)} ${setAksiBahanBakuProduk("EditBahanBakuProduk")}`}>edit</span>
                                      <span className={`material-symbols-outlined ${style.iconOptions}`} onClick={() => hendleDeleteBahanBakuProduk(data.id)}>delete</span>
                                    </>
                                  )}
                                  {aksi == "TambahProduct" && (
                                    <>
                                      <span className={`material-symbols-outlined ${style.iconOptions}`} onClick={() => `${setFormKeparluanBahanBaku(true)} ${hendleGetByNamaAndSatuanBahanBakuProdukDraf(key-=1, data.nama, data.satuan, data.jumlah)} ${setAksiBahanBakuProduk("EditBahanBakuProduk")}`}>edit</span>
                                      <span className={`material-symbols-outlined ${style.iconOptions}`} onClick={() => hendleDeleteBahanBakuProdukDraf(data.nama, data.satuan)}>delete</span>
                                    </>
                                  )}
                                </td>
                              </tr>
                              )
                            })
                          )}
                      </tbody>
                    </table>
                  </div>
              </div>
              {formKeparluanBahanBaku === true && (
                <div className={style.item}>
                    <div className={style.contentPopUpBahanBaku}>
                      <div className={style.top}>
                        {/* {popup == "Tambah" && <h5>Tambahkan Bahan Baku</h5>}
                        {popup == "Edit" && <h5>Edit Bahan Baku</h5>} */}
                        <span>Input Bahan Baku Produk</span>
                        <span
                          className="material-symbols-outlined"
                          onClick={() => `${setFormKeparluanBahanBaku(false)} ${hendleClose()}`}>
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
              <div className={style.button}>
                <input
                  type="button"
                  value="Tambahkan"
                  onClick={() => hendleSubmitProduct()}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductAdmin;
