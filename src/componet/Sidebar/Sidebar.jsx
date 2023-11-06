// Packages
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, Link, NavLink, Navigate } from "react-router-dom";
import axios from "axios";
import jwt from "jwt-decode";

// Actions
import { UserLogOut } from "../../config/actions/UserAction";

// Components
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../componet/accordion";

// Icons
import CoinSwap02 from "../../Asset/icons/untitled-ui-icons/line/components/CoinsSwap02";
import HomeLine from "../../Asset/icons/untitled-ui-icons/line/components/HomeLine";
import Inbox02 from "../../Asset/icons/untitled-ui-icons/line/components/Inbox02";
import ShoppingCart02 from "../../Asset/icons/untitled-ui-icons/line/components/ShoppingCart02";
import UserSquare from "../../Asset/icons/untitled-ui-icons/line/components/UserSquare";
import LogOut01 from "../../Asset/icons/untitled-ui-icons/line/components/LogOut01";
import Table from "../../Asset/icons/untitled-ui-icons/line/components/Table";
import BankNote02 from "../../Asset/icons/untitled-ui-icons/line/components/BankNote02";
import Coins03 from "../../Asset/icons/untitled-ui-icons/line/components/Coins03";
import Coins04 from "../../Asset/icons/untitled-ui-icons/line/components/Coins04";
import CreditCard01 from "../../Asset/icons/untitled-ui-icons/line/components/CreditCard01";
import CreditCardCheck from "../../Asset/icons/untitled-ui-icons/line/components/CreditCardCheck";
import CreditCardPlus from "../../Asset/icons/untitled-ui-icons/line/components/CreditCardPlus";
import CreditCardEdit from "../../Asset/icons/untitled-ui-icons/line/components/CreditCardEdit";
import CoinsStacked01 from "../../Asset/icons/untitled-ui-icons/line/components/CoinsStacked01";
import CoinsHand from "../../Asset/icons/untitled-ui-icons/line/components/CoinsHand";
import Scales02 from "../../Asset/icons/untitled-ui-icons/line/components/Scales02";
import Building07 from "../../Asset/icons/untitled-ui-icons/line/components/Building07";
import Server01 from "../../Asset/icons/untitled-ui-icons/line/components/Server01";
import Box from "../../Asset/icons/untitled-ui-icons/line/components/Box";
import MessageTextSquare from "../../Asset/icons/untitled-ui-icons/line/components/MessageTextSquare01";

function Sidebar({ nameSdiber }) {
  const { dataLogin } = useSelector((tes) => tes.userReducer);
  const [id, setId] = useState("");
  const [dataCategories, setDataCategories] = useState("");
  const navigate = useNavigate();

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

  const hendleAccesRoleUser = () => {
    // console.log(dataLogin);
    if (dataLogin?.dataLogin?.token) {
      const decode = jwt(dataLogin.dataLogin.token);
      setId(decode.rolesId);
    } else {
      setId("");
    }
    // console.log(dataLogin, id);
  };

  const hendleLogout = () => {
    setId("");
    UserLogOut();
    localStorage.clear();
    setTimeout(() => {
      navigate("/");
    }, 300);
    setTimeout(() => {
      navigate(0);
    }, 350);
  };

  useEffect(() => {
    hendleGetAllCategory();
    hendleAccesRoleUser();
  }, []);

  // console.log(id);

  if (id === 1) {
    return (
      <div className="relative flex h-full w-full flex-col items-center gap-3 bg-neutral-100 py-4 font-archivo">
        <div className="flex w-full items-center justify-center">
          {/* <Link to="/" className="text-lg font-bold">
            CV Talongka Jaya
          </Link> */}
          <Link to="/">
            <img
              src="/logo.png"
              alt="Logo CV Talongka Jaya"
              className="aspect-auto h-8"
            />
          </Link>
        </div>
        <div
          className="scrollbar-gutter-stable-both flex h-full w-full flex-col gap-8 overflow-y-auto px-3 py-6 text-base
        ">
          <Accordion type="multiple" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger className="hover:no-underline focus:outline-none active:outline-none">
                <div className="flex items-center gap-3">
                  <BankNote02 className="flex-shrink-0 text-2xl" />
                  <p>Keuangan</p>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <ul className="flex w-full flex-col gap-4">
                  <NavLink
                    to="/keuangan/akun"
                    className="transition-colors hover:text-amber-300 hover:no-underline">
                    <div className="flex items-center gap-3">
                      <CoinsStacked01 className="flex-shrink-0 text-2xl" />
                      <p>Akun</p>
                    </div>
                  </NavLink>
                  <NavLink
                    to="/keuangan/saldo-awal"
                    className="transition-colors hover:text-amber-300 hover:no-underline">
                    <div className="flex items-center gap-3">
                      <Coins04 className="flex-shrink-0 text-2xl" />
                      <p>Saldo Awal</p>
                    </div>
                  </NavLink>
                  <NavLink
                    to="/keuangan/jenis-transaksi"
                    className="transition-colors hover:text-amber-300 hover:no-underline">
                    <div className="flex items-center gap-3">
                      <Coins03 className="flex-shrink-0 text-2xl" />
                      <p>Jenis Transaksi</p>
                    </div>
                  </NavLink>
                  <NavLink
                    to="/keuangan/transaksi"
                    className="transition-colors hover:text-amber-300 hover:no-underline">
                    <div className="flex items-center gap-3">
                      <CoinSwap02 className="flex-shrink-0 text-2xl" />
                      <p>Transaksi</p>
                    </div>
                  </NavLink>
                  <NavLink
                    to="/keuangan/jurnal"
                    className="transition-colors hover:text-amber-300 hover:no-underline">
                    <div className="flex items-center gap-3">
                      <CreditCard01 className="flex-shrink-0 text-2xl" />
                      <p>Jurnal</p>
                    </div>
                  </NavLink>
                  <NavLink
                    to="/keuangan/rekap-jurnal"
                    className="transition-colors hover:text-amber-300 hover:no-underline">
                    <div className="flex items-center gap-3">
                      <CreditCardCheck className="flex-shrink-0 text-2xl" />
                      <p>Rekap Jurnal</p>
                    </div>
                  </NavLink>
                  <NavLink
                    to="/keuangan/posisi-keuangan"
                    className="transition-colors hover:text-amber-300 hover:no-underline">
                    <div className="flex items-center gap-3">
                      <CoinsHand className="flex-shrink-0 text-2xl" />
                      <p>Posisi Keuangan</p>
                    </div>
                  </NavLink>
                  <NavLink
                    to="/keuangan/laba-rugi"
                    className="transition-colors hover:text-amber-300 hover:no-underline">
                    <div className="flex items-center gap-3">
                      <Scales02 className="flex-shrink-0 text-2xl" />
                      <p>Laba Rugi</p>
                    </div>
                  </NavLink>
                </ul>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="hover:no-underline focus:outline-none active:outline-none">
                <div className="flex items-center gap-3">
                  <CoinsHand className="flex-shrink-0 text-2xl" />
                  <p>Laporan Pajak</p>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <ul className="flex w-full flex-col gap-4">
                  <NavLink
                    to="/laporan-pajak/pph-tarif-1"
                    className="transition-colors hover:text-amber-300 hover:no-underline">
                    <div className="flex items-center gap-3">
                      <CoinsStacked01 className="flex-shrink-0 text-2xl" />
                      <p>PPh 25 Tarif 0.5%</p>
                    </div>
                  </NavLink>
                  <NavLink
                    to="/laporan-pajak/pph-tarif-2"
                    className="transition-colors hover:text-amber-300 hover:no-underline">
                    <div className="flex items-center gap-3">
                      <CoinsStacked01 className="flex-shrink-0 text-2xl" />
                      <p>PPh 25 Tarif 50% x 22%</p>
                    </div>
                  </NavLink>
                  <NavLink
                    to="/laporan-pajak/penjualan-web"
                    className="transition-colors hover:text-amber-300 hover:no-underline">
                    <div className="flex items-center gap-3">
                      <CoinsStacked01 className="flex-shrink-0 text-2xl" />
                      <p>Penjualan Web</p>
                    </div>
                  </NavLink>
                  <NavLink
                    to="/laporan-pajak/penjualan-langsung"
                    className="transition-colors hover:text-amber-300 hover:no-underline">
                    <div className="flex items-center gap-3">
                      <CoinsStacked01 className="flex-shrink-0 text-2xl" />
                      <p>Penjualan Langsung</p>
                    </div>
                  </NavLink>
                  <NavLink
                    to="/laporan-pajak/pengadaan-meubel"
                    className="transition-colors hover:text-amber-300 hover:no-underline">
                    <div className="flex items-center gap-3">
                      <CoinsStacked01 className="flex-shrink-0 text-2xl" />
                      <p>Pengadaan Meubel</p>
                    </div>
                  </NavLink>
                </ul>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger className="hover:no-underline focus:outline-none active:outline-none">
                <div className="flex items-center gap-3">
                  <ShoppingCart02 className="flex-shrink-0 text-2xl" />
                  <p>Penjualan</p>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <ul className="flex w-full flex-col gap-4">
                  <NavLink
                    to="/penjualan/pesanan"
                    className="transition-colors hover:text-amber-300 hover:no-underline">
                    <div className="flex items-center gap-3">
                      <CreditCardPlus className="flex-shrink-0 text-2xl" />
                      <p>Pesanan</p>
                    </div>
                  </NavLink>
                  <NavLink
                    to="/penjualan/pesanan-custom"
                    className="transition-colors hover:text-amber-300 hover:no-underline">
                    <div className="flex items-center gap-3">
                      <CreditCardEdit className="flex-shrink-0 text-2xl" />
                      <p>Pesanan Custom</p>
                    </div>
                  </NavLink>
                  <NavLink
                    to="/penjualan/pengadaan-meubel"
                    className="transition-colors hover:text-amber-300 hover:no-underline">
                    <div className="flex items-center gap-3">
                      <CreditCardPlus className="flex-shrink-0 text-2xl" />
                      <p>Pengadaan Meubel</p>
                    </div>
                  </NavLink>
                </ul>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger className="hover:no-underline focus:outline-none active:outline-none">
                <div className="flex items-center gap-3">
                  <Building07 className="flex-shrink-0 text-2xl" />
                  <p>Produksi</p>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <ul className="flex w-full flex-col gap-4">
                  <NavLink
                    to="/produksi/produk"
                    className="transition-colors hover:text-amber-300 hover:no-underline">
                    <div className="flex items-center gap-3">
                      <Box className="flex-shrink-0 text-2xl" />
                      <p>Produk</p>
                    </div>
                  </NavLink>
                  <NavLink
                    to="/produksi/bahan-baku"
                    className="transition-colors hover:text-amber-300 hover:no-underline">
                    <div className="flex items-center gap-3">
                      <Server01 className="flex-shrink-0 text-2xl" />
                      <p>Persediaan Bahan Baku</p>
                    </div>
                  </NavLink>
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <NavLink
            to="/pesan"
            className="transition-colors hover:text-amber-300 hover:no-underline">
            <div className="flex items-center gap-3">
              <MessageTextSquare className="flex-shrink-0 text-2xl" />
              <p className="text-sm">Pesan</p>
            </div>
          </NavLink>
          <button onClick={hendleLogout}>
            <div className="flex items-center gap-3 py-3">
              <LogOut01 className="text-2xl" />
              <p className="text-sm">Logout</p>
            </div>
          </button>
        </div>
      </div>
    );
  }
}

export default Sidebar;
