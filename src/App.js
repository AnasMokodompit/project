import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import Home from "./page/Home/Home";
import Login from "./page/login/Login";
import Beranda from "./page/Beranda/Beranda";
import OrderAdmin from "./page/OrderAdmin/OrderAdmin";
import ProductAdmin from "./page/ProductAdmin/ProductAdmin";
import Register from "./page/register/Register";
import Customer from "./page/Customer/Customer";
import PesananCustom from "./page/PesananCustom/PesananCustom";
import PersediaanBahanBaku from "./page/BahanBaku/PersediaanBahanBaku";
import { Transaksi } from "./page/transaksi";
import { Jurnal } from "./page/jurnal";
import { JenisTransaksi } from "./page/jenis-transaksi";
import { Akun } from "./page/akun";
import { PosisiKeuangan } from "./page/posisi-keuangan";
import { LabaRugi } from "./page/laba-rugi";
import { SaldoAwal } from "./page/saldo-awal";
import { RekapJurnal } from "./page/rekap-jurnal";
import { Pesan } from "./page/pesan";
import { PenjualanLangsung } from "./page/laporan-pajak/penjualan-langsung";
import { PenjualanWeb } from "./page/laporan-pajak/penjualan-web";
import { PengadaanMeubel as LaporanPajakPengadaanMeubel } from "./page/laporan-pajak/pengadaan-meubel";
import { PengadaanMeubel as PenjualanPengadaanMeubel } from "./page/penjualan/pengadaan-meubel";

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
          <Route path="/pesan" element={<Pesan />} />
          <Route path="/keuangan">
            <Route path="akun" element={<Akun />} />
            <Route path="saldo-awal" element={<SaldoAwal />} />
            <Route path="jenis-transaksi" element={<JenisTransaksi />} />
            <Route path="transaksi" element={<Transaksi />} />
            <Route path="jurnal" element={<Jurnal />} />
            <Route path="rekap-jurnal" element={<RekapJurnal />} />
            <Route path="posisi-keuangan" element={<PosisiKeuangan />} />
            <Route path="laba-rugi" element={<LabaRugi />} />
          </Route>
          <Route path="/laporan-pajak">
            <Route path="penjualan-langsung" element={<PenjualanLangsung />} />
            <Route path="penjualan-web" element={<PenjualanWeb />} />
            <Route
              path="pengadaan-meubel"
              element={<LaporanPajakPengadaanMeubel />}
            />
          </Route>
          <Route path="/penjualan">
            <Route path="pesanan" element={<OrderAdmin />} />
            <Route path="pesanan-custom" element={<PesananCustom />} />
            <Route
              path="pengadaan-meubel"
              element={<PenjualanPengadaanMeubel />}
            />
          </Route>
          <Route path="/produksi">
            <Route path="produk" element={<ProductAdmin />} />
            <Route path="bahan-baku" element={<PersediaanBahanBaku />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
