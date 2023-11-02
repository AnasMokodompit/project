import Navbar from "../../componet/Navbar/Navbar";
import style from "./Customer.module.css";
import { ToastContainer, toast } from "react-toastify";
import img from "../../Asset/Picture11.jpg";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate, Navigate } from "react-router-dom";
import jwt from "jwt-decode";
import DaftarPesanan from "../../componet/daftarPesanan/DaftarPesanan";
import PesananDiproses from "../../componet/pesananDiproses/PesananDiproses";
import PesananSelesai from "../../componet/pesananSelesai/PesananSelesai";

function Customer() {
  const navigate = useNavigate();
  const { dataLogin } = useSelector((tes) => tes.userReducer);
  const [dataUser, setDataUser] = useState([]);

  const [namaKategoriPesanan, setNamaKategoriPesanan] =
    useState("Daftar Pesanan");

  const isLogin = dataLogin?.dataLogin?.token;

  const hendleCekUser = () => {
    if (!!isLogin) {
      const decode = jwt(dataLogin?.dataLogin?.token);
      axios
        .get(`${process.env.REACT_APP_BASE_API}/users/${decode.id}`)
        .then((res) => {
          // console.log(res.data.data)
          setDataUser(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    hendleCekUser();
  }, []);

  if (!!isLogin) {
    return (
      <div className={style.container}>
        <ToastContainer />
        <Navbar />
        <div className="container mt-24 flex flex-col justify-center gap-8 font-archivo">
          <p className="text-xl font-bold">{namaKategoriPesanan}</p>
          {console.log(namaKategoriPesanan)}
          <div className="">
            <div className="flex items-center justify-between gap-4 rounded-lg bg-neutral-50 p-4 shadow-lg">
              <div className="flex items-center gap-4">
                <div className="w-24">
                  <img
                    className="aspect-square h-full rounded-lg object-cover"
                    src={img}
                    alt=""
                  />
                </div>
                <div>
                  <p className="text-base">{dataUser.name}</p>
                  <p className="text-sm font-bold">{dataUser.alamat}</p>
                </div>
              </div>
              {/* <input
                className="rounded-lg bg-amber-300 px-4 py-2"
                id={dataUser.id}
                type="button"
                value="Edit"
              /> */}
            </div>
          </div>
          <div className={style.contentItem}>
            <div className={style.itemCategori}>
              <h5>Kategori</h5>
              <div
                className={style.item}
                onClick={() => setNamaKategoriPesanan("Daftar Pesanan")}>
                <div>
                  <span className={`material-symbols-outlined ${style.icon}`}>
                    inventory_2
                  </span>
                  <span>Daftar Pesanan</span>
                </div>
                <span className="material-symbols-outlined">navigate_next</span>
              </div>
              <div
                className={style.item}
                onClick={() => setNamaKategoriPesanan("Pesanan Diproses")}>
                <div>
                  <span className={`material-symbols-outlined ${style.icon}`}>
                    progress_activity
                  </span>
                  <span>Pesanan Diproses</span>
                </div>
                <span className="material-symbols-outlined">navigate_next</span>
              </div>
              <div
                className={style.item}
                onClick={() => setNamaKategoriPesanan("Pesanan Selesai")}>
                <div>
                  <span className={`material-symbols-outlined ${style.icon}`}>
                    assignment_turned_in
                  </span>
                  <span>Pesanan Selesai</span>
                </div>
                <span className="material-symbols-outlined">navigate_next</span>
              </div>
            </div>
            {namaKategoriPesanan === "Daftar Pesanan" && <DaftarPesanan />}
            {namaKategoriPesanan === "Pesanan Diproses" && <PesananDiproses />}
            {namaKategoriPesanan === "Pesanan Selesai" && <PesananSelesai />}
          </div>
        </div>
      </div>
    );
  } else if (!isLogin) {
    return <Navigate to="/" />;
  }
}

export default Customer;
