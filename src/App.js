import logo from "./logo.svg";
import style from "./App.module.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./page/Home/Home";
import Login from "./page/login/Login";
import Beranda from "./page/Beranda/Beranda";
import OrderAdmin from "./page/OrderAdmin/OrderAdmin";
import ProductAdmin from "./page/ProductAdmin/ProductAdmin";
import Register from "./page/register/Register";
import Customer from "./page/Customer/Customer";
import { Transaksi } from "./page/transaksi";
import { Jurnal } from "./page/jurnal";
import PesananCustom from "./page/PesananCustom/PesananCustom";
import PersediaanBahanBaku from "./page/BahanBaku/PersediaanBahanBaku";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/beranda" element={<Beranda />} />
        <Route path="/product" element={<ProductAdmin />} />
        <Route path="/order" element={<OrderAdmin />} />
        <Route path="/transaksi" element={<Transaksi />} />
        <Route path="/jurnal" element={<Jurnal />} />
        <Route path="/customer" element={<Customer />} />
        <Route path="/order/custom" element={<PesananCustom />} />
        <Route path="/bahan-baku" element={<PersediaanBahanBaku />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
