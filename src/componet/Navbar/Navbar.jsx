import style from "./Navbar.module.css";
import ImgNavbar from "../../Asset/Img/Logo_Politeknik_Negeri_Manado.png";
import { Link } from "react-scroll";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DataOrder from "../DataOrder/DataOrder";
import { NavLink, useNavigate } from "react-router-dom";
import jwt from "jwt-decode";
import { UserLogOut } from "../../config/actions/UserAction";

import axios from "axios";

import {
  ResetDataOrder,
  deleteOrder,
  kurangOrder,
  saveOrder,
} from "../../config/actions/OrderAction";

// Icons
import ShoppingCart02 from "../../Asset/icons/untitled-ui-icons/line/components/ShoppingCart02";
import LogIn02 from "../../Asset/icons/untitled-ui-icons/line/components/LogIn02";
import MessageTextSquare02 from "../../Asset/icons/untitled-ui-icons/line/components/MessageTextSquare02";
import Hurricane02 from "../../Asset/icons/untitled-ui-icons/line/components/Hurricane02";
import Minus from "../../Asset/icons/untitled-ui-icons/line/components/Minus";
import Plus from "../../Asset/icons/untitled-ui-icons/line/components/Plus";
import XClose from "../../Asset/icons/untitled-ui-icons/line/components/XClose";
import Box from "../../Asset/icons/untitled-ui-icons/line/components/Box";
import LogOut01 from "../../Asset/icons/untitled-ui-icons/line/components/LogOut01";

// Components
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../../componet/sheet";
import { ScrollArea } from "../../componet/scroll-area";

function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { dataLogin } = useSelector((tes) => tes.userReducer);
  let { dataOrder } = useSelector((tes) => tes.CvTalangkaJaya);

  const [dataOrderById, setDataOrderById] = useState([]);
  const [activeNavbar, setActiveNavbar] = useState("hero");
  const [jumlahOrder, setJumlahOrder] = useState("");
  const [tampilOrderan, setTampilOrderan] = useState("0");
  const [id, setId] = useState("");
  const [posisionNavbar, setPosisionNavbar] = useState("");
  const [fix, setFix] = useState(false);
  const [namePemesan, setNamaPemesan] = useState("");
  const [noHp, setNoHp] = useState("");
  const [alamat, setAlamat] = useState("");
  const [email, setEmail] = useState("");

  // let { dataOrder } = useSelector((data) => data.CvTalangkaJaya);
  // const dispatch = useDispatch();

  const hendleTambahOrder = (id, harga) => {
    dispatch(saveOrder({ id: id, jumlah: 1, harga: harga }));
  };

  const hendleKurangOrder = (id, harga) => {
    dispatch(kurangOrder({ id: id, jumlah: 1, harga: harga }));
  };

  const hendleHapusOrder = (id) => {
    dispatch(deleteOrder({ id: id }));
  };

  const hendleSubmitOrder = () => {
    const data = {
      dataOrder,
      namePemesan: namePemesan,
      email: email,
      noHp: noHp,
      alamat: alamat,
    };
    axios
      .post(`${process.env.REACT_APP_BASE_API}/orders`, data)
      .then((res) => {
        console.log(res.data.data);
        alert(
          `User berhasil dibuat, Login dengan Email yang telah dimasukan dan password ${res.data.data.users.password}`,
        );
        ResetDataOrder();
      })
      .catch((err) => {
        console.log(err);
      });

    // tampilOrderan("0");
  };

  function setFixed() {
    // console.log(window.scrollY)
    if (window.scrollY >= 15) {
      setFix(true);
    } else {
      setFix(false);
    }
  }

  window.addEventListener("scroll", setFixed);

  const hendleOpsiClick = () => {
    if (tampilOrderan === "0") {
      setTampilOrderan("1");
    } else {
      setTampilOrderan("0");
    }
  };

  const hendlePopUpOrder = (valuePopUp) => {
    console.log(valuePopUp);
    dispatch(ResetDataOrder());
    setTampilOrderan(valuePopUp);
  };

  const hendleAccesRoleUser = () => {
    if (dataLogin?.dataLogin?.token) {
      const decode = jwt(dataLogin.dataLogin.token);
      setId(decode.rolesId);
      // console.log(decode)
    }
    // console.log(dataLogin, id)
  };

  const hendleLogout = () => {
    setId("");
    UserLogOut();
    localStorage.clear();
    setTimeout(() => {
      navigate("/");
    }, 300);
  };

  useEffect(() => {
    setJumlahOrder(dataOrder);
    hendleAccesRoleUser();
  }, [dataOrder]);

  return (
    <div className="flex flex-col gap-10">
      {/*
            <div className={fix ? `${style.navbar} ${style.fixed}` : `${style.navbar} ${style.nonFixed}`}>
        {posisionNavbar === "" && (
          <ul className={style.navbarContent}>
            <img className={style.ImgNavbar} src={ImgNavbar} alt="" />
            <li>
              <Link
                className={activeNavbar === "hero" ? style.activeNavbar : ""}
                to="hero"
                spy={true}
                smooth={true}
                offset={-100}
                duration={500}
                onClick={() => setActiveNavbar("hero")}>
                Home
              </Link>
            </li>
            <li>
              <Link
                className={activeNavbar === "tentang" ? style.activeNavbar : ""}
                to="tentang"
                spy={true}
                smooth={true}
                offset={-100}
                duration={500}
                onClick={() => setActiveNavbar("tentang")}>
                Tentang
              </Link>
            </li>
            <li>
              <Link
                className={activeNavbar === "contactus" ? style.activeNavbar : ""}
                to="contactus"
                spy={true}
                smooth={true}
                offset={-150}
                duration={500}
                onClick={() => setActiveNavbar("contactus")}>
                Contact Us
              </Link>
            </li>
          </ul>
        )}
        {posisionNavbar === "menu" && (
          <NavLink to="/">
            <span className={style.linkHome} onClick={() => setPosisionNavbar("")}>
              Menu
            </span>
          </NavLink>
        )}
        <div className={style.main}>
          {id ? (
            <>
              <NavLink to="/customer">
                <span
                  className={`material-symbols-outlined ${style.icon}`}
                  onClick={() => setPosisionNavbar("menu")}>
                  menu
                </span>
              </NavLink>
              <NavLink to="/customer/profile">
                <span className={`material-symbols-outlined ${style.icon}`}>person</span>
              </NavLink>
            </>
          ) : (
            <NavLink to="/login">
              <span className={`material-symbols-outlined ${style.icon}`}>login</span>
            </NavLink>
          )}
          <span className={`material-symbols-outlined ${style.icon}`}>chat</span>
          <div className={style.Orderan}>
            <span
              className={`material-symbols-outlined ${style.icon}`}
              onClick={() => hendleOpsiClick()}>
              shopping_cart
            </span>
            {jumlahOrder?.length !== 0 && (
              <span className={style.jumlah}>{jumlahOrder?.length}</span>
            )}
          </div>
        </div>
        {tampilOrderan === "1" && <DataOrder tampilOrderan={hendlePopUpOrder.bind(this)} />}
      </div>
      */}

      {/* <div className={fix ? `${style.navbar} ${style.fixed}` : `${style.navbar} ${style.nonFixed}`}>
        {posisionNavbar === "" && (
          <ul className={style.navbarContent}>
            <img className={style.ImgNavbar} src={ImgNavbar} alt="" />
            <li>
              <Link
                className={activeNavbar === "hero" ? style.activeNavbar : ""}
                to="hero"
                spy={true}
                smooth={true}
                offset={-100}
                duration={500}
                onClick={() => setActiveNavbar("hero")}>
                Home
              </Link>
            </li>
            <li>
              <Link
                className={activeNavbar === "tentang" ? style.activeNavbar : ""}
                to="tentang"
                spy={true}
                smooth={true}
                offset={-100}
                duration={500}
                onClick={() => setActiveNavbar("tentang")}>
                Tentang
              </Link>
            </li>
            <li>
              <Link
                className={activeNavbar === "contactus" ? style.activeNavbar : ""}
                to="contactus"
                spy={true}
                smooth={true}
                offset={-150}
                duration={500}
                onClick={() => setActiveNavbar("contactus")}>
                Contact Us
              </Link>
            </li>
          </ul>
        )}
        {posisionNavbar === "menu" && (
          <NavLink to="/">
            <span className={style.linkHome} onClick={() => setPosisionNavbar("")}>
              Menu
            </span>
          </NavLink>
        )}
        <div className={style.main}>
          {id ? (
            <>
              <NavLink to="/customer">
                <span
                  className={`material-symbols-outlined ${style.icon}`}
                  onClick={() => setPosisionNavbar("menu")}>
                  menu
                </span>
              </NavLink>
              <NavLink to="/customer/profile">
                <span className={`material-symbols-outlined ${style.icon}`}>person</span>
              </NavLink>
            </>
          ) : (
            <NavLink to="/login">
              <span className={`material-symbols-outlined ${style.icon}`}>login</span>
            </NavLink>
          )}
          <span className={`material-symbols-outlined ${style.icon}`}>chat</span>
          <div className={style.Orderan}>
            <span
              className={`material-symbols-outlined ${style.icon}`}
              onClick={() => hendleOpsiClick()}>
              shopping_cart
            </span>
            {jumlahOrder?.length !== 0 && (
              <span className={style.jumlah}>{jumlahOrder?.length}</span>
            )}
          </div>
        </div>
        {tampilOrderan === "1" && <DataOrder tampilOrderan={hendlePopUpOrder.bind(this)} />}
      </div> */}

      <nav className="fixed z-50 flex w-full items-center justify-between bg-amber-300 p-4 font-archivo text-lg">
        <div>
          <NavLink to="/" className="flex items-center gap-4">
            <Hurricane02 className="text-2xl" />
            <p className="font-archivo text-2xl font-bold uppercase">Talongka Jaya</p>
          </NavLink>
        </div>
        <div>
          <ul className="flex gap-8">
            {/* <Link
              className="cursor-pointer"
              to="hero"
              spy={true}
              smooth={true}
              offset={-150}
              duration={500}>
              Beranda
            </Link> */}
            {/* <Link>Produk</Link> */}
            <Link
              className="cursor-pointer"
              to="tentang"
              spy={true}
              smooth={true}
              offset={-150}
              duration={500}>
              Tentang
            </Link>
            <Link
              className="cursor-pointer"
              to="contactus"
              spy={true}
              smooth={true}
              offset={-150}
              duration={500}>
              Kontak Kami
            </Link>
          </ul>
        </div>
        <div>
          <div className="flex items-center gap-8">
            <Sheet>
              <SheetTrigger>
                <button onClick={() => hendleOpsiClick()} className="relative flex items-center">
                  <ShoppingCart02 className="text-[1.5rem]" />
                  {jumlahOrder?.length !== 0 && (
                    <p className="absolute right-2 top-2 flex h-5 w-5 -translate-y-full translate-x-full items-center justify-center rounded-full bg-red-500 p-1 font-open-sans text-xs text-white">
                      {jumlahOrder?.length}
                    </p>
                  )}
                </button>
              </SheetTrigger>
              <SheetContent className="bg-white">
                <ScrollArea className="h-full">
                  <div className="flex flex-col gap-12">
                    {dataOrder?.length !== 0 && (
                      <div className="flex flex-col gap-4">
                        <p className="font-archivo text-lg font-extrabold">Keranjang</p>
                        <div className="flex flex-col gap-4">
                          {dataOrder?.map((data, index) => {
                            return (
                              <div className="relative grid grid-cols-3 gap-2 rounded-lg bg-neutral-100 p-2 font-archivo shadow-sm">
                                <div className="col-span-1 self-center">
                                  <img
                                    className="h-32 w-24 rounded-lg object-cover"
                                    src={data?.url_image}
                                    alt="Gambar Produk"
                                  />
                                </div>
                                <div className="col-span-2 pr-4">
                                  <div className="flex flex-col gap-2">
                                    <div>
                                      <p className="truncate text-base">{data.name}</p>
                                      <p className="text-xs font-bold">Tipe: {data.tipe}</p>
                                    </div>
                                    <p className={style.cardHarga}>
                                      {new Intl.NumberFormat("id-ID", {
                                        style: "currency",
                                        currency: "IDR",
                                      })
                                        .format(data.jumlahHarga)
                                        .replace(/(\.|,)00$/g, "")}
                                          {data?.name.toLowerCase() == "kitcen set" ? " /meter jalan" : ""}
                                          {data?.name.toLowerCase() == "set kamar tidur" ? " /meter jalan" : ""}
                                          {data?.name.toLowerCase() == "backdrop / partisi ruangan / mini bar" ? " /meter jalan" : ""}
                                    </p>
                                    <div className="flex w-max border-collapse items-center justify-between gap-3 rounded-lg">
                                      <button
                                        className="flex h-8 w-8 items-center justify-center rounded-md border-2 border-neutral-500 transition-colors hover:border-amber-300 hover:bg-amber-300"
                                        onClick={() => hendleKurangOrder(data.id, data.harga)}>
                                        <Minus className="text-base" />
                                      </button>
                                      <p className="w-4 text-center">{data.jumlah}</p>
                                      <button
                                        className="flex h-8 w-8 items-center justify-center rounded-md border-2 border-neutral-500 transition-colors hover:border-amber-300 hover:bg-amber-300"
                                        onClick={() => hendleTambahOrder(data.id, data.harga)}>
                                        <Plus className="text-base" />
                                      </button>
                                    </div>
                                  </div>
                                  <div className={style.contentCenterItem}>
                                    {/* <span
                                    className={`material-symbols-outlined ${style.delete}`}
                                    onClick={() => hendleHapusOrder(data.id)}>
                                    delete
                                  </span> */}
                                  </div>
                                </div>
                                <button
                                  onClick={() => hendleHapusOrder(data.id)}
                                  className="absolute right-0 top-0 rounded-bl-lg rounded-tr-lg  bg-red-500 p-1 text-white transition-all">
                                  <XClose className="text-base" />
                                </button>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                    <div className="flex flex-col gap-4 font-open-sans ">
                      <p className="text-lg font-bold">Biodata Pembeli</p>
                      <div className="flex flex-col gap-4 py-2">
                        <div className="flex flex-col">
                          <label htmlFor="" className="text-left">
                            Nama
                          </label>
                          <input
                            className="w-full rounded-lg border-2 border-black p-2 text-base text-black"
                            type="text"
                            value={namePemesan}
                            onChange={(e) => setNamaPemesan(e.target.value)}
                          />
                        </div>
                        <div className="flex flex-col">
                          <label className="text-left">Nomor Telepon</label>
                          <input
                            className="w-full rounded-lg border-2 border-black p-2 text-base text-black"
                            type="text"
                            value={noHp}
                            onChange={(e) => setNoHp(e.target.value)}
                          />
                        </div>
                        <div className="flex flex-col">
                          <label className="text-left">Email</label>
                          <input
                            className="w-full rounded-lg border-2 border-black p-2 text-base text-black"
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </div>
                        <div className="flex flex-col">
                          <label className="text-left">Alamat</label>
                          <textarea
                            className="w-full rounded-lg border-2 border-black p-2 text-base text-black"
                            name=""
                            id=""
                            cols="30"
                            rows="7"
                            value={alamat}
                            onChange={(e) => setAlamat(e.target.value)}></textarea>
                        </div>
                      </div>
                      <input
                        className="rounded-lg bg-amber-300 p-2 font-bold"
                        type="button"
                        value="Checkout"
                        onClick={hendleSubmitOrder}
                      />
                    </div>
                  </div>
                </ScrollArea>
              </SheetContent>
            </Sheet>
            {/* <button>
              <MessageTextSquare02 className="text-[1.5rem]" />
            </button> */}
            {!!dataLogin && (
              <>
                <NavLink to="/customer">
                  <Box className="text-[1.5rem]" />
                </NavLink>
                <button onClick={hendleLogout}>
                  <LogOut01 className="text-[1.5rem]" />
                </button>
              </>
            )}
            {!dataLogin && (
              <NavLink to="/login">
                <LogIn02 className="text-[1.5rem]" />
              </NavLink>
            )}
          </div>
        </div>
      </nav>
      {/* <DataOrder /> */}
    </div>
  );
}

export default Navbar;
