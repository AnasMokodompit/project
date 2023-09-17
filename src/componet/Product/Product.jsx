import style from "./Product.module.css";
import img1 from "../../Asset/5992673fce62e2da3cd96e14c1f1884e.jpg";
import img2 from "../../Asset/OIP.jpeg";
import img3 from "../../Asset/download.jpeg";
import img4 from "../../Asset/lemari-pakaian-kayu.jpg";
import { useEffect, useState } from "react";
// import DataProduct from '../../Asset/Data.json'
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { saveOrder } from "../../config/actions/OrderAction";
import axios from "axios";
import ReactStars from "react-rating-stars-component";

import ShoppingCart02 from "../../Asset/icons/untitled-ui-icons/line/components/ShoppingCart02";
import Plus from "../../Asset/icons/untitled-ui-icons/line/components/Plus";

function Product({ product }) {
  const [valuePopUpRead, setValuePopUpRead] = useState("");
  const [dataById, setDataById] = useState([]);
  const [dataProduct, setDataProduct] = useState([]);
  const [dataReviewProduct, setDataReviewProduct] = useState([]);
  const [jumlahStart, setJumlahStart] = useState(0);
  const [idcategory, setCategoryId] = useState();
  const dispatch = useDispatch();
  const [dataImageClick, setDataImageClick] = useState(false);
  const bulan = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  //
  const hendleGetAllProduct = async () => {
    await axios
      .get(`${process.env.REACT_APP_BASE_API}/products`)
      .then((res) => {
        setDataProduct(res.data.data);
        console.log(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  console.log(product);

  const hendleCekDataProduct = (id) => {
    axios(`${process.env.REACT_APP_BASE_API}/products/${id}`)
      .then((res) => {
        setDataById(res.data.data);
        setDataReviewProduct(res.data.data?.reviewevUserProduct);
        let countStart = 0;
        res.data.data.reviewevUserProduct.map((data) => {
          countStart += data.bintang;
          console.log(data);
        });

        setJumlahStart(countStart);
        // console.log(res.data.data)
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const hendleSimpanOrderan = (id) => {
    // let data = {}
    axios(`${process.env.REACT_APP_BASE_API}/products/${id}`)
      .then((res) => {
        console.log(res.data.data);
        // dispatch(saveOrder(res.data.data))
        dispatch(
          saveOrder({
            id: res.data.data.id,
            url_image: res.data.data?.product_images[0]?.url_image,
            name: res.data.data.name,
            tipe: res.data.data.categories.name,
            jumlah: 1,
            harga: res.data.data.harga,
            jumlahHarga: res.data.data.harga,
          }),
        );
        // data = res.data.data
      })
      .catch((err) => {
        console.log(err);
      });

    // dispatch(saveOrder(data))
  };

  const hendleClose = () => {
    setDataImageClick(false);
    setJumlahStart(0);
    setDataById([]);
  };

  const ratingChanged = (newRating) => {
    console.log(newRating);
  };

  useEffect(() => {
    hendleGetAllProduct();
  }, []);

  return (
    <div id="product" className="grid grid-cols-5 gap-6">
      {/* <FormOrder/> */}
      {product.length === 0
        ? dataProduct.map((data, key) => {
            // console.log(data)
            return (
              <div key={key} className="flex flex-col gap-2 rounded-lg shadow-lg">
                {/* <ul className={style.popup}>
                                <li onClick={() => `${hendleSimpanOrderan(data.id)}`}><i className="fa-solid fa-cart-shopping"></i></li>
                                <li onClick={() => `${setValuePopUpRead("1")} ${hendleCekDataProduct(data.id)}`}><i className="fa-regular fa-eye"></i></li>
                            </ul> */}
                <img
                  className="aspect-square h-2/3 rounded-t-lg object-cover"
                  src={data?.product_images[0]?.url_image}
                  alt=""
                />
                <div className="flex w-full flex-col gap-4 self-start px-3 pb-3">
                  <div className="flex flex-col gap-2">
                    <div>
                      <p className="truncate text-xl">{data?.name}</p>
                      <p className="text-sm font-light leading-none">{data?.categories?.name}</p>
                    </div>
                    <p className="text-lg font-normal">
                      {new Intl.NumberFormat("id-ID", {
                        style: "currency",
                        currency: "IDR",
                      })
                        .format(data.harga)
                        .replace(/(\.|,)00$/g, "")}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => `${hendleSimpanOrderan(data.id)}`}
                      className="flex flex-shrink-0 items-center rounded-lg border-2 border-amber-300 p-2 text-black">
                      <ShoppingCart02 className="flex-shrink-0 text-base" />
                      <sup>
                        <Plus />
                      </sup>
                    </button>
                    <button
                      onClick={() => `${setValuePopUpRead("1")} ${hendleCekDataProduct(data.id)}`}
                      className="flex w-full items-center justify-center gap-2 rounded-lg bg-amber-300 px-6 py-2 text-black">
                      Lihat Produk
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        : product.map((data, key) => {
            // console.log(data)
            return (
              <div key={key} className={style.card}>
                <ul className={style.popup}>
                  <li onClick={() => `${hendleSimpanOrderan(data.id)}`}>
                    <i className="fa-solid fa-cart-shopping"></i>
                  </li>
                  <li onClick={() => `${setValuePopUpRead("1")} ${hendleCekDataProduct(data.id)}`}>
                    <i className="fa-regular fa-eye"></i>
                  </li>
                </ul>
                <img src={data?.product_images[0]?.url_image} alt="" />
                <span className={style.cardCategori}>{data?.categories?.name}</span>
                <span className={style.cardJdl}>{data?.name}</span>
                <span className={style.cardHarga}>
                  {new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" })
                    .format(data.harga)
                    .replace(/(\.|,)00$/g, "")}
                </span>
              </div>
            );
          })}
      {/* {console.log(dataById)} */}
      {dataById.id && valuePopUpRead === "1" && (
        <div className={style.ReadProductDetail}>
          <div className={style.popup}>
            <div className={style.top}>
              <span
                onClick={() => `${setValuePopUpRead("0")} ${hendleClose()}`}
                className="material-symbols-outlined">
                close
              </span>
              {/* <i onClick={() => setValuePopUpRead("0")} className="fa-regular fa-circle-xmark"></i> */}
            </div>
            <div className={style.content}>
              <div className={style.image}>
                <img
                  src={
                    dataImageClick == false
                      ? dataById?.product_images[0]?.url_image
                      : dataImageClick
                  }
                  alt=""
                />
                <div className={style.itemImage}>
                  {console.log(dataById?.product_images)}
                  {dataById?.product_images?.length !== 0 &&
                    dataById?.product_images.map((data, key) => {
                      return (
                        <img
                          key={key}
                          src={data.url_image}
                          alt=""
                          onClick={() => setDataImageClick(data.url_image)}
                        />
                      );
                    })}
                  {/* <img src={dataById?.product_images[0]?.url_image} alt="" onClick={() => setDataImageClick(dataById?.product_images[0]?.url_image)} />
                                    <img src={img2} alt="" onClick={() => setDataImageClick(img2)} />
                                    <img src={img3} alt="" onClick={() => setDataImageClick(img3)} /> */}
                </div>
              </div>
              <div className={style.detail}>
                <span className={style.cardCategori}>{dataById?.categories?.name}</span>
                <span className={style.cardJdl}>{dataById?.name}</span>
                <span className={style.ukuran}>
                  <p className={style.subData}>Ukuran</p>
                  {dataById?.ukuran}
                </span>
                <span className={style.deskripsi}>
                  <p className={style.subData}>Deskripsi</p>
                  {dataById?.Deskripsi_produk}
                </span>
                <span className={style.cardHarga}>
                  {new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(
                    dataById?.harga,
                  )}
                </span>
                <span className={style.rantingStart}>
                  <ReactStars
                    onChange={ratingChanged}
                    edit={false}
                    count={5}
                    size={24}
                    value={jumlahStart ? jumlahStart / dataById.reviewevUserProduct.length : 0}
                    isHalf={true}
                    activeColor="#ffd700"
                  />
                  {console.log()}
                  <span className={style.total}>{dataById.reviewevUserProduct.length} Penilai</span>
                </span>
                <div className={style.contentReview}>
                  <h6>Penilaian Produk</h6>
                  {console.log(dataReviewProduct)}
                  {dataReviewProduct.length !== 0 &&
                    dataReviewProduct.map((data, key) => {
                      return (
                        <div key={key} className={style.itemReview}>
                          {/* <img className={style.profile} src={img1} alt="" /> */}
                          <span className={style.profile}></span>
                          <div className={style.dataReview}>
                            <span className={style.nama}>{data.users.name}</span>
                            <ReactStars
                              onChange={ratingChanged}
                              edit={false}
                              count={5}
                              size={17}
                              value={data.bintang}
                              activeColor="#ffd700"
                            />
                            {/* <span>06-Agustus-2023</span> */}
                            <span>
                              {new Date(data.created_at).getDate() +
                                " - " +
                                bulan[new Date(data.created_at).getMonth()] +
                                " - " +
                                new Date(data.created_at).getFullYear()}
                            </span>
                            <p className={style.comment}>{data.komentar}</p>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
            <div></div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Product;
