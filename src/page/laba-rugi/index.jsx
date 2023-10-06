import { useState, useRef, useEffect, forwardRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { useReactToPrint } from "react-to-print";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import axios from "axios";

import { cn } from "../../utils/cn";

import { Button } from "../../componet/button";
import { Calendar } from "../../componet/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../componet/popover";

import CalendarIcon from "../../Asset/icons/untitled-ui-icons/line/components/Calendar";
import Printer from "../../Asset/icons/untitled-ui-icons/line/components/Printer";
import Minus from "../../Asset/icons/untitled-ui-icons/line/components/Minus";
import Refresh from "../../Asset/icons/untitled-ui-icons/line/components/RefreshCw04";

export const LabaRugi = () => {
  const [tanggalAwal, setTanggalAwal] = useState();
  const [tanggalAkhir, setTanggalAkhir] = useState();
  const [labaRugiData, setLabaRugiData] = useState();
  const refLaporanLabaRugi = useRef();

  const [oldestDate, setOldestDate] = useState();

  const handlePrintLaporanLabaRugi = useReactToPrint({
    content: () => refLaporanLabaRugi.current,
    documentTitle: `Laporan Laba Rugi`,
    bodyClass: "bg-white",
  });

  // console.log(oldestDate);

  const { refetch } = useQuery({
    queryKey: ["laba-rugi", { tanggalAwal, tanggalAkhir }],
    queryFn: async () => {
      if (!!tanggalAwal && !!tanggalAkhir) {
        let tanggalAkhirModified = new Date(tanggalAkhir);
        tanggalAkhirModified.setHours(23, 59, 59);

        return await axios.get(
          `${process.env.REACT_APP_BASE_API}/saldoAkunTransaksi/labaRugi`,
          {
            params: {
              firstDate: tanggalAwal,
              lastDate: tanggalAkhirModified,
            },
          },
        );
      } else {
        return await axios.get(
          `${process.env.REACT_APP_BASE_API}/saldoAkunTransaksi/labaRugi`,
        );
      }
    },
    onSuccess: (data) => {
      setLabaRugiData(data.data.data.labaRugi);

      setOldestDate(data.data.data.oldestDate);
    },
  });

  useEffect(() => {
    refetch();
  }, [tanggalAwal, tanggalAkhir]);

  console.log(labaRugiData);

  if (!!labaRugiData) {
    const saldoPendapatan = labaRugiData[0]?.akun[0]?.saldo;
    const saldoAwalPersediaanBahanBaku = labaRugiData[1]?.akun[0]?.saldo;
    const saldoAwalPersediaanBarangJadi = labaRugiData[1]?.akun[1]?.saldo;
    const saldoBiayaBahanBaku = labaRugiData[2]?.akun[0]?.saldo;
    const saldoUpahPekerja = labaRugiData[2]?.akun[1]?.saldo;
    const saldoBiayaBahanPembantu = labaRugiData[2]?.akun[2]?.saldo;
    const saldoPersediaanBahanBaku = labaRugiData[2]?.akun[3]?.saldo;
    const saldoPersediaanBarangJadi = labaRugiData[2]?.akun[4]?.saldo;
    const saldoBiayaTransport = labaRugiData[3]?.akun[0]?.saldo;
    const saldoBiayaGajiPegawai = labaRugiData[3]?.akun[1]?.saldo;
    const saldoBiayaPerlengkapan = labaRugiData[3]?.akun[2]?.saldo;
    const saldoBiayaSewa = labaRugiData[3]?.akun[3]?.saldo;
    const saldoBiayaTelepon = labaRugiData[3]?.akun[4]?.saldo;
    const saldoBiayaListrik = labaRugiData[3]?.akun[5]?.saldo;
    const saldoBiayaATMATK = labaRugiData[3]?.akun[6]?.saldo;
    const saldoBiayaLainLain = labaRugiData[3]?.akun[7]?.saldo;
    const saldoBiayaPenyusutanPeralatan = labaRugiData[3]?.akun[8]?.saldo;
    const saldoBiayaPenyusutanMesin = labaRugiData[3]?.akun[9]?.saldo;
    const saldoBiayaPenyusutanKendaraan = labaRugiData[3]?.akun[10]?.saldo;
    const saldoBiayaPenyusutanGedung = labaRugiData[3]?.akun[11]?.saldo;
    const saldoPendapatanBunga = labaRugiData[4]?.akun[0]?.saldo;
    const saldoBebanBunga = labaRugiData[4]?.akun[1]?.saldo;

    const saldoTotalHargaPokokPenjualan =
      saldoAwalPersediaanBahanBaku + saldoAwalPersediaanBarangJadi;
    const saldoTotalBiayaProduksi =
      saldoBiayaBahanBaku + saldoUpahPekerja + saldoBiayaBahanPembantu;
    const saldoTotalPersediaan =
      saldoPersediaanBahanBaku - saldoPersediaanBarangJadi;
    const saldoTotalHargaPokokPenjualanFinal =
      saldoTotalHargaPokokPenjualan +
      saldoTotalBiayaProduksi +
      saldoPersediaanBahanBaku;
    const saldoTotalLabaRugiKotor =
      saldoPendapatan - saldoTotalHargaPokokPenjualanFinal;
    const saldoTotalBiayaOperasional =
      saldoBiayaTransport +
      saldoBiayaGajiPegawai +
      saldoBiayaPerlengkapan +
      saldoBiayaSewa +
      saldoBiayaTelepon +
      saldoBiayaListrik +
      saldoBiayaATMATK +
      saldoBiayaLainLain +
      saldoBiayaPenyusutanPeralatan +
      saldoBiayaPenyusutanMesin +
      saldoBiayaPenyusutanKendaraan +
      saldoBiayaPenyusutanGedung;
    const saldoTotalLabaRugiOperasi =
      saldoTotalLabaRugiKotor - saldoTotalBiayaOperasional;
    const saldoTotalPendapatanDanBebanLainLain =
      saldoPendapatanBunga - saldoBebanBunga;
    const saldoTotalLabaRugiUsaha =
      saldoTotalLabaRugiOperasi - saldoTotalPendapatanDanBebanLainLain;

    // console.log(labaRugiData);

    return (
      <section className="font-archivo">
        <div className="flex flex-col gap-4">
          <div>
            <h1 className="text-2xl font-bold">Laba Rugi</h1>
          </div>
          <div className="flex justify-between gap-4 rounded-lg border-2 border-neutral-500 bg-neutral-100 p-3">
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setTanggalAwal();
                  setTanggalAkhir();
                }}
                className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg border-2 border-neutral-500 bg-amber-300 p-2">
                <Refresh />
              </button>
              <div>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-60 justify-start gap-2 border-2 border-neutral-500 px-3 py-2 text-left font-normal",
                        !tanggalAwal && "text-muted-foreground",
                      )}>
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {tanggalAwal ? (
                        format(tanggalAwal, "PPP", { locale: id })
                      ) : (
                        <span>Pilih tanggal</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent align="start" className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={tanggalAwal}
                      onSelect={setTanggalAwal}
                      initialFocus
                      // disabled={{
                      //   after: new Date(),
                      //   before: new Date(oldestDate),
                      // }}
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <Minus />
              <div>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-60 justify-start gap-2 border-2 border-neutral-500 px-3 py-2 text-left font-normal",
                        !tanggalAkhir && "text-muted-foreground",
                      )}>
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {tanggalAkhir ? (
                        format(tanggalAkhir, "PPP", { locale: id })
                      ) : (
                        <span>Pilih tanggal</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent align="start" className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={tanggalAkhir}
                      onSelect={setTanggalAkhir}
                      initialFocus
                      // disabled={{
                      //   after: new Date(),
                      //   before: new Date(oldestDate),
                      // }}
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <button
                onClick={handlePrintLaporanLabaRugi}
                className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg border-2 border-neutral-500 bg-amber-300 p-2">
                <Printer />
              </button>
            </div>
          </div>
          <div className="flex flex-col gap-12">
            <table className="w-full table-auto border-collapse rounded-lg border-2 border-neutral-500 text-sm">
              <thead>
                <tr className="border-2 border-neutral-500">
                  <th
                    colSpan={4}
                    className="bg-amber-300 px-4 py-3 text-left font-bold">
                    Laporan Laba Rugi
                  </th>
                </tr>
              </thead>
              <tbody>
                {/* Pendapatan */}
                <tr className="border-2 border-neutral-500 bg-neutral-200">
                  <th colSpan={4} className="px-4 py-1 text-left">
                    Pendapatan
                  </th>
                </tr>
                <tr>
                  <td className="border-2 border-neutral-500 px-4 py-1 text-left align-middle">
                    Pendapatan
                  </td>
                  <td className="w-0 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                  <td className="w-0 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                  <td className="w-0 border-2 border-neutral-500 px-4 py-1 text-right align-middle">
                    {convertIDRCurrency(saldoPendapatan)}
                  </td>
                </tr>
                {/* Harga Pokok Penjualan */}
                <tr className="border-2 border-neutral-500 bg-neutral-200">
                  <th colSpan={4} className="px-4 py-1 text-left">
                    Harga Pokok Penjualan
                  </th>
                </tr>
                <tr>
                  <td className="border-2 border-neutral-500 px-4 py-1 text-left align-middle">
                    Persediaan Bahan Baku
                  </td>
                  <td className="w-0 border-2 border-neutral-500 px-4 py-1 text-right align-middle">
                    {convertIDRCurrency(saldoAwalPersediaanBahanBaku)}
                  </td>
                  <td className="w-0 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                  <td className="w-0 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                </tr>
                <tr>
                  <td className="border-2 border-neutral-500 px-4 py-1 text-left align-middle">
                    Persediaan Barang Jadi
                  </td>
                  <td className="w-0 border-2 border-neutral-500 px-4 py-1 text-right align-middle">
                    {convertIDRCurrency(saldoAwalPersediaanBarangJadi)}
                  </td>
                  <td className="w-0 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                  <td className="w-0 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                </tr>
                <tr>
                  <td className="border-2 border-neutral-500 px-4 py-1 text-left align-middle"></td>
                  <td className="w-0 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                  <td className="w-0 border-2 border-neutral-500 px-4 py-1 text-right align-middle">
                    {convertIDRCurrency(saldoTotalHargaPokokPenjualan)}
                  </td>
                  <td className="w-0 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                </tr>
                {/* Biaya Produksi */}
                <tr className="border-2 border-neutral-500 bg-neutral-200">
                  <th colSpan={4} className="px-4 py-1 text-left">
                    Biaya Produksi
                  </th>
                </tr>
                <tr>
                  <td className="border-2 border-neutral-500 px-4 py-1 text-left align-middle">
                    Biaya Bahan Baku
                  </td>
                  <td className="w-0 border-2 border-neutral-500 px-4 py-1 text-right align-middle">
                    {convertIDRCurrency(saldoBiayaBahanBaku)}
                  </td>
                  <td className="w-0 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                  <td className="w-0 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                </tr>
                <tr>
                  <td className="border-2 border-neutral-500 px-4 py-1 text-left align-middle">
                    Upah Pekerja
                  </td>
                  <td className="w-0 border-2 border-neutral-500 px-4 py-1 text-right align-middle">
                    {convertIDRCurrency(saldoUpahPekerja)}
                  </td>
                  <td className="w-0 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                  <td className="w-0 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                </tr>
                <tr>
                  <td className="border-2 border-neutral-500 px-4 py-1 text-left align-middle">
                    Biaya Bahan Pembantu
                  </td>
                  <td className="w-0 border-2 border-neutral-500 px-4 py-1 text-right align-middle">
                    {convertIDRCurrency(saldoBiayaBahanPembantu)}
                  </td>
                  <td className="w-0 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                  <td className="w-0 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                </tr>
                <tr>
                  <td className="border-2 border-neutral-500 px-4 py-1 text-left align-middle">
                    Total Biaya Produksi
                  </td>
                  <td className="w-0 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                  <td className="w-0 border-2 border-neutral-500 px-4 py-1 text-right align-middle">
                    {convertIDRCurrency(saldoTotalBiayaProduksi)}
                  </td>
                  <td className="w-0 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                </tr>
                <tr>
                  <td className="border-2 border-neutral-500 px-4 py-1 text-left align-middle">
                    Barang Siap Dijual
                  </td>
                  <td className="w-0 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                  <td className="w-0 border-2 border-neutral-500 px-4 py-1 text-right align-middle">
                    {convertIDRCurrency(0)}
                  </td>
                  <td className="w-0 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                </tr>
                <tr>
                  <td colSpan={4} className="p-3"></td>
                </tr>
                <tr>
                  <td className="border-2 border-neutral-500 px-4 py-1 text-left align-middle">
                    Persediaan Bahan Baku
                  </td>
                  <td className="w-0 border-2 border-neutral-500 px-4 py-1 text-right align-middle">
                    {convertIDRCurrency(saldoPersediaanBahanBaku)}
                  </td>
                  <td className="w-0 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                  <td className="w-0 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                </tr>
                <tr>
                  <td className="border-2 border-neutral-500 px-4 py-1 text-left align-middle">
                    Persediaan Barang Jadi
                  </td>
                  <td className="w-0 border-2 border-neutral-500 px-4 py-1 text-right align-middle">
                    {convertIDRCurrency(saldoPersediaanBarangJadi)}
                  </td>
                  <td className="w-0 border-2 border-neutral-500 px-4 py-1 text-right align-middle">
                    {convertIDRCurrency(saldoTotalPersediaan)}
                  </td>
                  <td className="w-0 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                </tr>
                {/* <tr>
                  <td className="border-2 border-neutral-500 px-4 py-1 text-left align-middle"></td>
                  <td className="w-0 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                  <td className="w-0 border-2 border-neutral-500 px-4 py-1 text-right align-middle">
                    {convertIDRCurrency(saldoTotalPersediaan)}
                  </td>
                  <td className="w-0 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                </tr> */}
                <tr className="border-2 border-neutral-500 bg-amber-300">
                  <td colSpan={3} className="px-4 py-1 text-left font-bold">
                    Harga Pokok Penjualan
                  </td>
                  <td
                    colSpan={1}
                    className="w-0 border-2 border-neutral-500 px-4 py-1 text-right align-middle">
                    {convertIDRCurrency(saldoTotalHargaPokokPenjualanFinal)}
                  </td>
                </tr>
                <tr className="border-2 border-neutral-500 bg-amber-300">
                  <td colSpan={3} className="px-4 py-1 text-left font-bold">
                    Laba (Rugi) Kotor
                  </td>
                  <td
                    colSpan={1}
                    className="w-0 border-2 border-neutral-500 px-4 py-1 text-right align-middle">
                    {convertIDRCurrency(saldoTotalLabaRugiKotor)}
                  </td>
                </tr>
                {/* Biaya Operasional */}
                <tr className="border-2 border-neutral-500 bg-neutral-200">
                  <th colSpan={4} className="px-4 py-1 text-left">
                    Biaya Operasional
                  </th>
                </tr>
                <tr>
                  <td className="border-2 border-neutral-500 px-4 py-1 text-left align-middle">
                    Biaya Transport
                  </td>
                  <td className="w-0 border-2 border-neutral-500 px-4 py-1 text-right align-middle">
                    {convertIDRCurrency(saldoBiayaTransport)}
                  </td>
                  <td className="w-0 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                  <td className="w-0 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                </tr>
                <tr>
                  <td className="border-2 border-neutral-500 px-4 py-1 text-left align-middle">
                    Biaya Gaji Pegawai
                  </td>
                  <td className="w-0 border-2 border-neutral-500 px-4 py-1 text-right align-middle">
                    {convertIDRCurrency(saldoBiayaGajiPegawai)}
                  </td>
                  <td className="w-0 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                  <td className="w-0 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                </tr>
                <tr>
                  <td className="border-2 border-neutral-500 px-4 py-1 text-left align-middle">
                    Biaya Perlengkapan
                  </td>
                  <td className="w-0 border-2 border-neutral-500 px-4 py-1 text-right align-middle">
                    {convertIDRCurrency(saldoBiayaPerlengkapan)}
                  </td>
                  <td className="w-0 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                  <td className="w-0 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                </tr>
                <tr>
                  <td className="border-2 border-neutral-500 px-4 py-1 text-left align-middle">
                    Biaya Sewa
                  </td>
                  <td className="w-0 border-2 border-neutral-500 px-4 py-1 text-right align-middle">
                    {convertIDRCurrency(saldoBiayaSewa)}
                  </td>
                  <td className="w-0 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                  <td className="w-0 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                </tr>
                <tr>
                  <td className="border-2 border-neutral-500 px-4 py-1 text-left align-middle">
                    Biaya Telepon
                  </td>
                  <td className="w-0 border-2 border-neutral-500 px-4 py-1 text-right align-middle">
                    {convertIDRCurrency(saldoBiayaTelepon)}
                  </td>
                  <td className="w-0 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                  <td className="w-0 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                </tr>
                <tr>
                  <td className="border-2 border-neutral-500 px-4 py-1 text-left align-middle">
                    Biaya Listrik
                  </td>
                  <td className="w-0 border-2 border-neutral-500 px-4 py-1 text-right align-middle">
                    {convertIDRCurrency(saldoBiayaListrik)}
                  </td>
                  <td className="w-0 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                  <td className="w-0 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                </tr>
                <tr>
                  <td className="border-2 border-neutral-500 px-4 py-1 text-left align-middle">
                    Biaya ATM/ATK
                  </td>
                  <td className="w-0 border-2 border-neutral-500 px-4 py-1 text-right align-middle">
                    {convertIDRCurrency(saldoBiayaATMATK)}
                  </td>
                  <td className="w-0 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                  <td className="w-0 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                </tr>
                <tr>
                  <td className="border-2 border-neutral-500 px-4 py-1 text-left align-middle">
                    Biaya Lain-Lain
                  </td>
                  <td className="w-0 border-2 border-neutral-500 px-4 py-1 text-right align-middle">
                    {convertIDRCurrency(saldoBiayaLainLain)}
                  </td>
                  <td className="w-0 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                  <td className="w-0 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                </tr>
                <tr>
                  <td className="border-2 border-neutral-500 px-4 py-1 text-left align-middle">
                    Biaya Penyusutan Peralatan
                  </td>
                  <td className="w-0 border-2 border-neutral-500 px-4 py-1 text-right align-middle">
                    {convertIDRCurrency(saldoBiayaPenyusutanPeralatan)}
                  </td>
                  <td className="w-0 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                  <td className="w-0 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                </tr>
                <tr>
                  <td className="border-2 border-neutral-500 px-4 py-1 text-left align-middle">
                    Biaya Penyusutan Mesin
                  </td>
                  <td className="w-0 border-2 border-neutral-500 px-4 py-1 text-right align-middle">
                    {convertIDRCurrency(saldoBiayaPenyusutanMesin)}
                  </td>
                  <td className="w-0 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                  <td className="w-0 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                </tr>
                <tr>
                  <td className="border-2 border-neutral-500 px-4 py-1 text-left align-middle">
                    Biaya Penyusutan Kendaraan
                  </td>
                  <td className="w-0 border-2 border-neutral-500 px-4 py-1 text-right align-middle">
                    {convertIDRCurrency(saldoBiayaPenyusutanKendaraan)}
                  </td>
                  <td className="w-0 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                  <td className="w-0 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                </tr>
                <tr>
                  <td className="border-2 border-neutral-500 px-4 py-1 text-left align-middle">
                    Biaya Penyusutan Gedung
                  </td>
                  <td className="w-0 border-2 border-neutral-500 px-4 py-1 text-right align-middle">
                    {convertIDRCurrency(saldoBiayaPenyusutanGedung)}
                  </td>
                  <td className="w-0 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                  <td className="w-0 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                </tr>
                <tr className="border-2 border-neutral-500 bg-amber-300">
                  <td colSpan={3} className="px-4 py-1 text-left font-bold">
                    Total Biaya Operasional
                  </td>
                  <td
                    colSpan={1}
                    className="w-0 border-2 border-neutral-500 px-4 py-1 text-right align-middle">
                    {convertIDRCurrency(saldoTotalBiayaOperasional)}
                  </td>
                </tr>
                <tr className="border-2 border-neutral-500 bg-amber-300">
                  <td colSpan={3} className="px-4 py-1 text-left font-bold">
                    Laba (Rugi) Operasi
                  </td>
                  <td
                    colSpan={1}
                    className="w-0 border-2 border-neutral-500 px-4 py-1 text-right align-middle">
                    {convertIDRCurrency(saldoTotalLabaRugiOperasi)}
                  </td>
                </tr>
                {/* Pendapatan dan Beban Lain-Lain */}
                <tr className="border-2 border-neutral-500 bg-neutral-200">
                  <th colSpan={4} className="px-4 py-1 text-left">
                    Pendapatan dan Beban Lain-Lain
                  </th>
                </tr>
                <tr>
                  <td className="border-2 border-neutral-500 px-4 py-1 text-left align-middle">
                    Pendapatan Bunga
                  </td>
                  <td className="w-0 border-2 border-neutral-500 px-4 py-1 text-right align-middle">
                    {convertIDRCurrency(saldoPendapatanBunga)}
                  </td>
                  <td className="w-0 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                  <td className="w-0 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                </tr>
                <tr>
                  <td className="border-2 border-neutral-500 px-4 py-1 text-left align-middle">
                    Beban Bunga
                  </td>
                  <td className="w-0 border-2 border-neutral-500 px-4 py-1 text-right align-middle">
                    {convertIDRCurrency(saldoBebanBunga)}
                  </td>
                  <td className="w-0 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                  <td className="w-0 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                </tr>
                <tr className="border-2 border-neutral-500 bg-amber-300">
                  <td colSpan={3} className="px-4 py-1 text-left font-bold">
                    Total Pendapatan dan Beban Lain-Lain
                  </td>
                  <td
                    colSpan={1}
                    className="w-0 border-2 border-neutral-500 px-4 py-1 text-right align-middle">
                    {convertIDRCurrency(saldoTotalPendapatanDanBebanLainLain)}
                  </td>
                </tr>
                <tr className="border-2 border-neutral-500 bg-amber-300">
                  <td colSpan={3} className="px-4 py-1 text-left font-bold">
                    Laba (Rugi) Usaha
                  </td>
                  <td
                    colSpan={1}
                    className="w-0 border-2 border-neutral-500 px-4 py-1 text-right align-middle">
                    {convertIDRCurrency(saldoTotalLabaRugiUsaha)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div style={{ display: "none" }}>
            <DokumenLabaRugi
              ref={refLaporanLabaRugi}
              tanggalAwal={tanggalAwal}
              tanggalAkhir={tanggalAkhir}
            />
          </div>
        </div>
      </section>
    );
  }
};

const DokumenLabaRugi = forwardRef((props, ref) => {
  const [labaRugiData, setLabaRugiData] = useState();

  const tanggalAwal = props?.tanggalAwal;
  const tanggalAkhir = props?.tanggalAkhir;

  const { refetch } = useQuery({
    queryKey: ["laba-rugi", { tanggalAwal, tanggalAkhir }],
    queryFn: async () => {
      if (!!tanggalAwal && !!tanggalAkhir) {
        let tanggalAkhirModified = new Date(tanggalAkhir);
        tanggalAkhirModified.setHours(23, 59, 59);

        return await axios.get(
          `${process.env.REACT_APP_BASE_API}/saldoAkunTransaksi/labaRugi`,
          {
            params: {
              firstDate: tanggalAwal,
              lastDate: tanggalAkhirModified,
            },
          },
        );
      } else {
        return await axios.get(
          `${process.env.REACT_APP_BASE_API}/saldoAkunTransaksi/labaRugi`,
        );
      }
    },
    onSuccess: (data) => {
      setLabaRugiData(data.data.data.labaRugi);
    },
  });

  const optionsTime = {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "Asia/Makassar",
  };
  const formatterTime = new Intl.DateTimeFormat("id-ID", optionsTime);

  const setStyles = () => {
    return `@page { 
      margin: ${"1.5cm"} !important;
    }`;
  };

  if (!!labaRugiData) {
    const saldoPendapatan = labaRugiData[0]?.akun[0]?.saldo;
    const saldoAwalPersediaanBahanBaku = labaRugiData[1]?.akun[0]?.saldo;
    const saldoAwalPersediaanBarangJadi = labaRugiData[1]?.akun[1]?.saldo;
    const saldoBiayaBahanBaku = labaRugiData[2]?.akun[0]?.saldo;
    const saldoUpahPekerja = labaRugiData[2]?.akun[1]?.saldo;
    const saldoBiayaBahanPembantu = labaRugiData[2]?.akun[2]?.saldo;
    const saldoPersediaanBahanBaku = labaRugiData[2]?.akun[3]?.saldo;
    const saldoPersediaanBarangJadi = labaRugiData[2]?.akun[4]?.saldo;
    const saldoBiayaTransport = labaRugiData[3]?.akun[0]?.saldo;
    const saldoBiayaGajiPegawai = labaRugiData[3]?.akun[1]?.saldo;
    const saldoBiayaPerlengkapan = labaRugiData[3]?.akun[2]?.saldo;
    const saldoBiayaSewa = labaRugiData[3]?.akun[3]?.saldo;
    const saldoBiayaTelepon = labaRugiData[3]?.akun[4]?.saldo;
    const saldoBiayaListrik = labaRugiData[3]?.akun[5]?.saldo;
    const saldoBiayaATMATK = labaRugiData[3]?.akun[6]?.saldo;
    const saldoBiayaLainLain = labaRugiData[3]?.akun[7]?.saldo;
    const saldoBiayaPenyusutanPeralatan = labaRugiData[3]?.akun[8]?.saldo;
    const saldoBiayaPenyusutanMesin = labaRugiData[3]?.akun[9]?.saldo;
    const saldoBiayaPenyusutanKendaraan = labaRugiData[3]?.akun[10]?.saldo;
    const saldoBiayaPenyusutanGedung = labaRugiData[3]?.akun[11]?.saldo;
    const saldoPendapatanBunga = labaRugiData[4]?.akun[0]?.saldo;
    const saldoBebanBunga = labaRugiData[4]?.akun[1]?.saldo;

    const saldoTotalHargaPokokPenjualan =
      saldoAwalPersediaanBahanBaku + saldoAwalPersediaanBarangJadi;
    const saldoTotalBiayaProduksi =
      saldoBiayaBahanBaku + saldoUpahPekerja + saldoBiayaBahanPembantu;
    const saldoTotalPersediaan =
      saldoPersediaanBahanBaku - saldoPersediaanBarangJadi;
    const saldoTotalHargaPokokPenjualanFinal =
      saldoTotalHargaPokokPenjualan +
      saldoTotalBiayaProduksi +
      saldoPersediaanBahanBaku;
    const saldoTotalLabaRugiKotor =
      saldoPendapatan - saldoTotalHargaPokokPenjualanFinal;
    const saldoTotalBiayaOperasional =
      saldoBiayaTransport +
      saldoBiayaGajiPegawai +
      saldoBiayaPerlengkapan +
      saldoBiayaSewa +
      saldoBiayaTelepon +
      saldoBiayaListrik +
      saldoBiayaATMATK +
      saldoBiayaLainLain +
      saldoBiayaPenyusutanPeralatan +
      saldoBiayaPenyusutanMesin +
      saldoBiayaPenyusutanKendaraan +
      saldoBiayaPenyusutanGedung;
    const saldoTotalLabaRugiOperasi =
      saldoTotalLabaRugiKotor - saldoTotalBiayaOperasional;
    const saldoTotalPendapatanDanBebanLainLain =
      saldoPendapatanBunga - saldoBebanBunga;
    const saldoTotalLabaRugiUsaha =
      saldoTotalLabaRugiOperasi - saldoTotalPendapatanDanBebanLainLain;

    // console.log(labaRugiData);

    return (
      <section ref={ref}>
        <style>{setStyles()}</style>
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-archivo text-xl font-bold">Laba Rugi</p>
            </div>
            {!!tanggalAwal && !!tanggalAkhir && (
              <div className="flex items-center gap-2">
                <p className="text-xs font-bold">Periode:</p>
                <p className="text-[8pt]">
                  {formatterTime.format(new Date(props.tanggalAwal))}
                </p>
                <Minus className="text-xs" />
                <p className="text-[8pt]">
                  {formatterTime.format(new Date(props.tanggalAkhir))}
                </p>
              </div>
            )}
          </div>
          <div className="flex flex-col gap-12">
            <table className="w-full table-auto border-collapse rounded-lg border-2 border-neutral-500 text-sm">
              <thead>
                <tr className="border-2 border-neutral-500">
                  <th
                    colSpan={4}
                    className="bg-amber-300 px-4 py-3 text-left font-bold">
                    Laporan Laba Rugi
                  </th>
                </tr>
              </thead>
              <tbody>
                {/* Pendapatan */}
                <tr className="border-2 border-neutral-500 bg-neutral-200">
                  <th colSpan={4} className="px-4 py-1 text-left">
                    Pendapatan
                  </th>
                </tr>
                <tr>
                  <td className="border-2 border-neutral-500 px-4 py-1 text-left align-middle">
                    Pendapatan
                  </td>
                  <td className="w-0 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                  <td className="w-0 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                  <td className="w-0 border-2 border-neutral-500 px-4 py-1 text-right align-middle">
                    {convertIDRCurrency(saldoPendapatan)}
                  </td>
                </tr>
                {/* Harga Pokok Penjualan */}
                <tr className="border-2 border-neutral-500 bg-neutral-200">
                  <th colSpan={4} className="px-4 py-1 text-left">
                    Harga Pokok Penjualan
                  </th>
                </tr>
                <tr>
                  <td className="border-2 border-neutral-500 px-4 py-1 text-left align-middle">
                    Persediaan Bahan Baku
                  </td>
                  <td className="w-0 border-2 border-neutral-500 px-4 py-1 text-right align-middle">
                    {convertIDRCurrency(saldoAwalPersediaanBahanBaku)}
                  </td>
                  <td className="w-0 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                  <td className="w-0 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                </tr>
                <tr>
                  <td className="border-2 border-neutral-500 px-4 py-1 text-left align-middle">
                    Persediaan Barang Jadi
                  </td>
                  <td className="w-0 border-2 border-neutral-500 px-4 py-1 text-right align-middle">
                    {convertIDRCurrency(saldoAwalPersediaanBarangJadi)}
                  </td>
                  <td className="w-0 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                  <td className="w-0 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                </tr>
                <tr>
                  <td className="border-2 border-neutral-500 px-4 py-1 text-left align-middle"></td>
                  <td className="w-0 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                  <td className="w-0 border-2 border-neutral-500 px-4 py-1 text-right align-middle">
                    {convertIDRCurrency(saldoTotalHargaPokokPenjualan)}
                  </td>
                  <td className="w-0 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                </tr>
                {/* Biaya Produksi */}
                <tr className="border-2 border-neutral-500 bg-neutral-200">
                  <th colSpan={4} className="px-4 py-1 text-left">
                    Biaya Produksi
                  </th>
                </tr>
                <tr>
                  <td className="border-2 border-neutral-500 px-4 py-1 text-left align-middle">
                    Biaya Bahan Baku
                  </td>
                  <td className="w-0 border-2 border-neutral-500 px-4 py-1 text-right align-middle">
                    {convertIDRCurrency(saldoBiayaBahanBaku)}
                  </td>
                  <td className="w-0 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                  <td className="w-0 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                </tr>
                <tr>
                  <td className="border-2 border-neutral-500 px-4 py-1 text-left align-middle">
                    Upah Pekerja
                  </td>
                  <td className="w-0 border-2 border-neutral-500 px-4 py-1 text-right align-middle">
                    {convertIDRCurrency(saldoUpahPekerja)}
                  </td>
                  <td className="w-0 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                  <td className="w-0 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                </tr>
                <tr>
                  <td className="border-2 border-neutral-500 px-4 py-1 text-left align-middle">
                    Biaya Bahan Pembantu
                  </td>
                  <td className="w-0 border-2 border-neutral-500 px-4 py-1 text-right align-middle">
                    {convertIDRCurrency(saldoBiayaBahanPembantu)}
                  </td>
                  <td className="w-0 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                  <td className="w-0 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                </tr>
                <tr>
                  <td className="border-2 border-neutral-500 px-4 py-1 text-left align-middle">
                    Total Biaya Produksi
                  </td>
                  <td className="w-0 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                  <td className="w-0 border-2 border-neutral-500 px-4 py-1 text-right align-middle">
                    {convertIDRCurrency(saldoTotalBiayaProduksi)}
                  </td>
                  <td className="w-0 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                </tr>
                <tr>
                  <td className="border-2 border-neutral-500 px-4 py-1 text-left align-middle">
                    Barang Siap Dijual
                  </td>
                  <td className="w-0 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                  <td className="w-0 border-2 border-neutral-500 px-4 py-1 text-right align-middle">
                    {convertIDRCurrency(0)}
                  </td>
                  <td className="w-0 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                </tr>
                <tr>
                  <td colSpan={4} className="p-3"></td>
                </tr>
                <tr>
                  <td className="border-2 border-neutral-500 px-4 py-1 text-left align-middle">
                    Persediaan Bahan Baku
                  </td>
                  <td className="w-0 border-2 border-neutral-500 px-4 py-1 text-right align-middle">
                    {convertIDRCurrency(saldoPersediaanBahanBaku)}
                  </td>
                  <td className="w-0 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                  <td className="w-0 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                </tr>
                <tr>
                  <td className="border-2 border-neutral-500 px-4 py-1 text-left align-middle">
                    Persediaan Barang Jadi
                  </td>
                  <td className="w-0 border-2 border-neutral-500 px-4 py-1 text-right align-middle">
                    {convertIDRCurrency(saldoPersediaanBarangJadi)}
                  </td>
                  <td className="w-0 border-2 border-neutral-500 px-4 py-1 text-right align-middle">
                    {convertIDRCurrency(saldoTotalPersediaan)}
                  </td>
                  <td className="w-0 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                </tr>
                {/* <tr>
                  <td className="border-2 border-neutral-500 px-4 py-1 text-left align-middle"></td>
                  <td className="w-0 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                  <td className="w-0 border-2 border-neutral-500 px-4 py-1 text-right align-middle">
                    {convertIDRCurrency(saldoTotalPersediaan)}
                  </td>
                  <td className="w-0 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                </tr> */}
                <tr className="border-2 border-neutral-500 bg-amber-300">
                  <td colSpan={3} className="px-4 py-1 text-left font-bold">
                    Harga Pokok Penjualan
                  </td>
                  <td
                    colSpan={1}
                    className="w-0 border-2 border-neutral-500 px-4 py-1 text-right align-middle">
                    {convertIDRCurrency(saldoTotalHargaPokokPenjualanFinal)}
                  </td>
                </tr>
                <tr className="border-2 border-neutral-500 bg-amber-300">
                  <td colSpan={3} className="px-4 py-1 text-left font-bold">
                    Laba (Rugi) Kotor
                  </td>
                  <td
                    colSpan={1}
                    className="w-0 border-2 border-neutral-500 px-4 py-1 text-right align-middle">
                    {convertIDRCurrency(saldoTotalLabaRugiKotor)}
                  </td>
                </tr>
                {/* Biaya Operasional */}
                <tr className="border-2 border-neutral-500 bg-neutral-200">
                  <th colSpan={4} className="px-4 py-1 text-left">
                    Biaya Operasional
                  </th>
                </tr>
                <tr>
                  <td className="border-2 border-neutral-500 px-4 py-1 text-left align-middle">
                    Biaya Transport
                  </td>
                  <td className="w-0 border-2 border-neutral-500 px-4 py-1 text-right align-middle">
                    {convertIDRCurrency(saldoBiayaTransport)}
                  </td>
                  <td className="w-0 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                  <td className="w-0 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                </tr>
                <tr>
                  <td className="border-2 border-neutral-500 px-4 py-1 text-left align-middle">
                    Biaya Gaji Pegawai
                  </td>
                  <td className="w-0 border-2 border-neutral-500 px-4 py-1 text-right align-middle">
                    {convertIDRCurrency(saldoBiayaGajiPegawai)}
                  </td>
                  <td className="w-0 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                  <td className="w-0 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                </tr>
                <tr>
                  <td className="border-2 border-neutral-500 px-4 py-1 text-left align-middle">
                    Biaya Perlengkapan
                  </td>
                  <td className="w-0 border-2 border-neutral-500 px-4 py-1 text-right align-middle">
                    {convertIDRCurrency(saldoBiayaPerlengkapan)}
                  </td>
                  <td className="w-0 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                  <td className="w-0 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                </tr>
                <tr>
                  <td className="border-2 border-neutral-500 px-4 py-1 text-left align-middle">
                    Biaya Sewa
                  </td>
                  <td className="w-0 border-2 border-neutral-500 px-4 py-1 text-right align-middle">
                    {convertIDRCurrency(saldoBiayaSewa)}
                  </td>
                  <td className="w-0 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                  <td className="w-0 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                </tr>
                <tr>
                  <td className="border-2 border-neutral-500 px-4 py-1 text-left align-middle">
                    Biaya Telepon
                  </td>
                  <td className="w-0 border-2 border-neutral-500 px-4 py-1 text-right align-middle">
                    {convertIDRCurrency(saldoBiayaTelepon)}
                  </td>
                  <td className="w-0 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                  <td className="w-0 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                </tr>
                <tr>
                  <td className="border-2 border-neutral-500 px-4 py-1 text-left align-middle">
                    Biaya Listrik
                  </td>
                  <td className="w-0 border-2 border-neutral-500 px-4 py-1 text-right align-middle">
                    {convertIDRCurrency(saldoBiayaListrik)}
                  </td>
                  <td className="w-0 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                  <td className="w-0 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                </tr>
                <tr>
                  <td className="border-2 border-neutral-500 px-4 py-1 text-left align-middle">
                    Biaya ATM/ATK
                  </td>
                  <td className="w-0 border-2 border-neutral-500 px-4 py-1 text-right align-middle">
                    {convertIDRCurrency(saldoBiayaATMATK)}
                  </td>
                  <td className="w-0 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                  <td className="w-0 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                </tr>
                <tr>
                  <td className="border-2 border-neutral-500 px-4 py-1 text-left align-middle">
                    Biaya Lain-Lain
                  </td>
                  <td className="w-0 border-2 border-neutral-500 px-4 py-1 text-right align-middle">
                    {convertIDRCurrency(saldoBiayaLainLain)}
                  </td>
                  <td className="w-0 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                  <td className="w-0 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                </tr>
                <tr>
                  <td className="border-2 border-neutral-500 px-4 py-1 text-left align-middle">
                    Biaya Penyusutan Peralatan
                  </td>
                  <td className="w-0 border-2 border-neutral-500 px-4 py-1 text-right align-middle">
                    {convertIDRCurrency(saldoBiayaPenyusutanPeralatan)}
                  </td>
                  <td className="w-0 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                  <td className="w-0 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                </tr>
                <tr>
                  <td className="border-2 border-neutral-500 px-4 py-1 text-left align-middle">
                    Biaya Penyusutan Mesin
                  </td>
                  <td className="w-0 border-2 border-neutral-500 px-4 py-1 text-right align-middle">
                    {convertIDRCurrency(saldoBiayaPenyusutanMesin)}
                  </td>
                  <td className="w-0 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                  <td className="w-0 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                </tr>
                <tr>
                  <td className="border-2 border-neutral-500 px-4 py-1 text-left align-middle">
                    Biaya Penyusutan Kendaraan
                  </td>
                  <td className="w-0 border-2 border-neutral-500 px-4 py-1 text-right align-middle">
                    {convertIDRCurrency(saldoBiayaPenyusutanKendaraan)}
                  </td>
                  <td className="w-0 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                  <td className="w-0 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                </tr>
                <tr>
                  <td className="border-2 border-neutral-500 px-4 py-1 text-left align-middle">
                    Biaya Penyusutan Gedung
                  </td>
                  <td className="w-0 border-2 border-neutral-500 px-4 py-1 text-right align-middle">
                    {convertIDRCurrency(saldoBiayaPenyusutanGedung)}
                  </td>
                  <td className="w-0 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                  <td className="w-0 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                </tr>
                <tr className="border-2 border-neutral-500 bg-amber-300">
                  <td colSpan={3} className="px-4 py-1 text-left font-bold">
                    Total Biaya Operasional
                  </td>
                  <td
                    colSpan={1}
                    className="w-0 border-2 border-neutral-500 px-4 py-1 text-right align-middle">
                    {convertIDRCurrency(saldoTotalBiayaOperasional)}
                  </td>
                </tr>
                <tr className="border-2 border-neutral-500 bg-amber-300">
                  <td colSpan={3} className="px-4 py-1 text-left font-bold">
                    Laba (Rugi) Operasi
                  </td>
                  <td
                    colSpan={1}
                    className="w-0 border-2 border-neutral-500 px-4 py-1 text-right align-middle">
                    {convertIDRCurrency(saldoTotalLabaRugiOperasi)}
                  </td>
                </tr>
                {/* Pendapatan dan Beban Lain-Lain */}
                <tr className="border-2 border-neutral-500 bg-neutral-200">
                  <th colSpan={4} className="px-4 py-1 text-left">
                    Pendapatan dan Beban Lain-Lain
                  </th>
                </tr>
                <tr>
                  <td className="border-2 border-neutral-500 px-4 py-1 text-left align-middle">
                    Pendapatan Bunga
                  </td>
                  <td className="w-0 border-2 border-neutral-500 px-4 py-1 text-right align-middle">
                    {convertIDRCurrency(saldoPendapatanBunga)}
                  </td>
                  <td className="w-0 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                  <td className="w-0 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                </tr>
                <tr>
                  <td className="border-2 border-neutral-500 px-4 py-1 text-left align-middle">
                    Beban Bunga
                  </td>
                  <td className="w-0 border-2 border-neutral-500 px-4 py-1 text-right align-middle">
                    {convertIDRCurrency(saldoBebanBunga)}
                  </td>
                  <td className="w-0 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                  <td className="w-0 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                </tr>
                <tr className="border-2 border-neutral-500 bg-amber-300">
                  <td colSpan={3} className="px-4 py-1 text-left font-bold">
                    Total Pendapatan dan Beban Lain-Lain
                  </td>
                  <td
                    colSpan={1}
                    className="w-0 border-2 border-neutral-500 px-4 py-1 text-right align-middle">
                    {convertIDRCurrency(saldoTotalPendapatanDanBebanLainLain)}
                  </td>
                </tr>
                <tr className="border-2 border-neutral-500 bg-amber-300">
                  <td colSpan={3} className="px-4 py-1 text-left font-bold">
                    Laba (Rugi) Usaha
                  </td>
                  <td
                    colSpan={1}
                    className="w-0 border-2 border-neutral-500 px-4 py-1 text-right align-middle">
                    {convertIDRCurrency(saldoTotalLabaRugiUsaha)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    );
  }
});

function convertIDRCurrency(value) {
  const optionsCurrency = {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  };
  const formatterCurrency = new Intl.NumberFormat("id-ID", optionsCurrency);
  const convertValue = formatterCurrency.format(value);
  return convertValue;
}
