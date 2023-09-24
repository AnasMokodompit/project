import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import Home from "./page/Home/Home";
import Login from "./page/login/Login";
import Beranda from "./page/Beranda/Beranda";
import OrderAdmin from "./page/OrderAdmin/OrderAdmin";
import ProductAdmin from "./page/ProductAdmin/ProductAdmin";
import Register from "./page/register/Register";
import Customer from "./page/Customer/Customer";
import { Transaksi } from "./page/transaksi";
import { Jurnal } from "./page/jurnal";
import { JenisTransaksi } from "./page/jenis-transaksi";
import { Akun } from "./page/akun";

// Layouts
import { LayoutSidebar } from "./layouts";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/beranda" element={<Beranda />} />
        <Route path="/customer" element={<Customer />} />
        <Route element={<LayoutSidebar />}>
          <Route path="/jenis-transaksi" element={<JenisTransaksi />} />
          <Route path="/order" element={<OrderAdmin />} />
          <Route path="/product" element={<ProductAdmin />} />
          <Route path="/akun" element={<Akun />} />
          <Route path="/jurnal" element={<Jurnal />} />
          <Route path="/transaksi" element={<Transaksi />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
