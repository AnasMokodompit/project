import Sidebar from "../../componet/Sidebar/Sidebar";
import style from "./ProductAdmin.module.css";
import img from "../../Asset/Cor1.jpg";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function ProductAdmin() {
  const { dataLogin } = useSelector((tes) => tes.userReducer);
  const [dataProduct, setDataProduct] = useState([]);
  const [dataCategories, setDataCategories] = useState([]);
  const [popUpProduct, setPopUpProduct] = useState(false);
  const [show, setShow] = useState(5);
  const [aksi, setAksi] = useState("");

  //
  const [id, setId] = useState();
  const [namaProduct, setNamaProduct] = useState();
  const [hargaProduct, setHargaProduct] = useState();
  const [kategori, setKategori] = useState();
  const [ukuran, setUkuran] = useState();
  const [deskripsi, setDeskripsi] = useState();
  const [gambarProduk, setGambarProduct] = useState([]);
  const [dataBahanBakuProduk, setDataBahanBakuProduk] = useState([])

  // 
  const [bahanBaku, setBahanBaku] = useState([])
  const [persediaanBahanBaku, setPersediaanBahanBaku] = useState([])

  const hendleGetAllProduct = async () => {
    await axios
      .get(`${process.env.REACT_APP_BASE_API}/products?row=${show}`)
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
    
    const hendleGetSatuanBerdasarkanBahanBaku = (e) => {
      axios.get(`${process.env.REACT_APP_BASE_API}/persediaanBahanBaku?id_bahan_baku=${e.target.value}`, {headers: { Authorization: `Bearer ${dataLogin.dataLogin.token}` }})
      .then((res) => {
        setPersediaanBahanBaku(res.data.data)
      }).catch((err) => {
        console.log(err)
      })
  }

  const hendleGetAllSatuanBahanBaku = () => {
    axios.get(`${process.env.REACT_APP_BASE_API}/persediaanBahanBaku`, {headers: { Authorization: `Bearer ${dataLogin.dataLogin.token}` }})
      .then((res) => {
        setPersediaanBahanBaku(res.data.data)
      }).catch((err) => {
        console.log(err)
      })
  }

  const hendleCreateProduct = () => {};

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
  };

  const hendleSubmitProduct = () => {
    const formData = new FormData();

    formData.append("nama", namaProduct);
    formData.append("ukuran", ukuran);
    formData.append("harga", hargaProduct);
    formData.append("Deskripsi_produk", deskripsi);
    formData.append("categoriesId", kategori);

    gambarProduk.map((data, i) => {
      formData.append("gambarProduct", data);
    });

    if (aksi === "TambahProduct") {
      axios
        .post(`http://localhost:3000/api/v1.0/products`, formData, {
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
        .patch(`http://localhost:3000/api/v1.0/products/${id}`, formData, {
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
  };

  const hendleEditProduct = (id) => {
    axios
      .get(`http://localhost:3000/api/v1.0/products/${id}`, {
        headers: { Authorization: `Bearer ${dataLogin.dataLogin.token}` },
      })
      .then((res) => {
        setId(res.data.data.id);
        setNamaProduct(res.data.data.name);
        setHargaProduct(res.data.data.harga);
        setKategori(res.data.data.categoriesId);
        setDeskripsi(res.data.data.Deskripsi_produk);
        setUkuran(res.data.data.ukuran);
        setGambarProduct(res.data.data.product_images);
        setDataBahanBakuProduk(res.data.data.bahanBakuProduk)
        console.log(res.data.data);
      });
  };

  const hendleDeleteProduct = (idDelete) => {
    axios
      .delete(`http://localhost:3000/api/v1.0/products/${idDelete}`, {
        headers: { Authorization: `Bearer ${dataLogin.dataLogin.token}` },
      })
      .then((res) => {
        hendleGetAllProduct();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    hendleGetAllProduct();
    hendleGetAllCategory();
    hendleGetAllBahanBaku();
    hendleGetAllSatuanBahanBaku();
  }, [show]);

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
              `${hendleCreateProduct()} ${setPopUpProduct(true)} ${setAksi(
                "TambahProduct",
              )}`
            }
          />
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
              <input type="text" placeholder="Search Name" />
              <span className="material-symbols-outlined">search</span>
            </div>
          </div>
        </div>
        <div className={style.contentProduct}>
          {console.log(dataProduct)}
          {dataProduct.length !== 0 &&
            dataProduct.map((data, key) => {
              return (
                <div className={style.card}>
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
                      {data?.name.toLowerCase() == "kitcen set"
                        ? " /meter jalan"
                        : ""}
                      {data?.name.toLowerCase() == "set kamar tidur"
                        ? " /meter jalan"
                        : ""}
                      {data?.name.toLowerCase() ==
                      "backdrop / partisi ruangan / mini bar"
                        ? " /meter jalan"
                        : ""}
                    </span>
                  </div>
                  <div className={style.optionCard}>
                    <span
                      class="material-symbols-outlined"
                      onClick={() =>
                        `${hendleEditProduct(data.id)} ${setPopUpProduct(
                          true,
                        )} ${setAksi("EditProduct")}`
                      }>
                      edit
                    </span>
                    <span
                      class="material-symbols-outlined"
                      onClick={() => hendleDeleteProduct(data.id)}>
                      delete
                    </span>
                  </div>
                </div>
              );
            })}
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
                        return <option value={data.id}>{data.name}</option>;
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
                                  class="material-symbols-outlined"
                                  onClick={() => hendleHapusGambar(data.name)}>
                                  close
                                </span>
                                <img src={data.url_image} alt="" />
                              </>
                            ) : (
                              <>
                                <span
                                  class="material-symbols-outlined"
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
                  {dataBahanBakuProduk.length !== 0 && (
                    dataBahanBakuProduk.map((data, key) => {
                      console.log(data)
                      return (
                        <div className={style.itemBahanBaku}>
                          <label htmlFor="">{key + 1}</label>
                          <select name="" id="" value={data.id_bahan_baku} onChange={(e) => hendleGetSatuanBerdasarkanBahanBaku(e)}>
                            <option value="">Pilih Bahan Baku</option>
                            {bahanBaku.length !== 0 && (
                              bahanBaku.map((data, key) => {
                                return (
                                  <option key={key} value={data.id}>{data.nama}</option>
                                )
                              })
                            )}
                          </select>
                          <select name="" id="" value={data.satuan} onChange={(e) => e}>
                            <option value="">Pilih Satuan</option>
                            {persediaanBahanBaku.length !== 0 && (
                              persediaanBahanBaku.map((data, key) => {
                                return (
                                  <option id={data.id} value={data.satuan}>{data.satuan}</option>
                                )
                              })
                            )}
                          </select>
                          <input type="text" name="" id="" value={data.jumlah} placeholder="Jumlah" />
                        </div>
                      )
                    })
                  )}
                </div>
              </div>
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
