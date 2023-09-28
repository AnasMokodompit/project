import { useState } from "react";
import { format } from "date-fns";
import { id } from "date-fns/locale";

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

export const LabaRugi = () => {
  const [tanggalAwal, setTanggalAwal] = useState();
  const [tanggalAkhir, setTanggalAkhir] = useState();

  return (
    <section className="font-archivo">
      <div className="flex flex-col gap-4">
        <div>
          <h1 className="text-2xl font-bold">Laba Rugi</h1>
        </div>
        <div className="flex justify-between gap-4 rounded-lg bg-neutral-100 p-3">
          <div className="flex items-center gap-2">
            <div>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-60 justify-start gap-2 p-3 text-left font-normal",
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
                      "w-[280px] justify-start text-left font-normal",
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
                  />
                </PopoverContent>
              </Popover>
            </div>
            <button className="flex-shrink-0 rounded-lg bg-amber-300 p-2">
              <Printer />
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-12">
          <table className="w-full table-auto border-collapse rounded-lg border-2 text-sm">
            <thead>
              <tr>
                <th
                  colSpan={4}
                  className="bg-amber-300 px-4 py-3 text-left font-bold">
                  Laporan Laba Rugi
                </th>
              </tr>
            </thead>
            <tbody>
              {/* Pendapatan */}
              <tr className="border-b-2 bg-neutral-200">
                <th colSpan={4} className="px-4 py-1 text-left">
                  Pendapatan
                </th>
              </tr>
              <tr>
                <td className="border border-black px-4 py-1 text-left align-middle">
                  Pendapatan
                </td>
                <td className="w-0 border border-black px-4 py-1 text-right align-middle"></td>
                <td className="w-0 border border-black px-4 py-1 text-right align-middle"></td>
                <td className="w-0 border border-black px-4 py-1 text-right align-middle">
                  5.000.000
                </td>
              </tr>
              {/* Harga Pokok Penjualan */}
              <tr className="border-b-2 bg-neutral-200">
                <th colSpan={4} className="px-4 py-1 text-left">
                  Harga Pokok Penjualan
                </th>
              </tr>
              <tr>
                <td className="border border-black px-4 py-1 text-left align-middle">
                  Persediaan Bahan Baku
                </td>
                <td className="w-0 border border-black px-4 py-1 text-right align-middle">
                  10.000.000
                </td>
                <td className="w-0 border border-black px-4 py-1 text-right align-middle"></td>
                <td className="w-0 border border-black px-4 py-1 text-right align-middle"></td>
              </tr>
              <tr>
                <td className="border border-black px-4 py-1 text-left align-middle">
                  Persediaan Barang Jadi
                </td>
                <td className="w-0 border border-black px-4 py-1 text-right align-middle">
                  10.000.000
                </td>
                <td className="w-0 border border-black px-4 py-1 text-right align-middle"></td>
                <td className="w-0 border border-black px-4 py-1 text-right align-middle"></td>
              </tr>
              <tr>
                <td className="border border-black px-4 py-1 text-left align-middle"></td>
                <td className="w-0 border border-black px-4 py-1 text-right align-middle"></td>
                <td className="w-0 border border-black px-4 py-1 text-right align-middle">
                  10.000.000
                </td>
                <td className="w-0 border border-black px-4 py-1 text-right align-middle"></td>
              </tr>
              {/* Biaya Produksi */}
              <tr className="border-b-2 bg-neutral-200">
                <th colSpan={4} className="px-4 py-1 text-left">
                  Biaya Produksi
                </th>
              </tr>
              <tr>
                <td className="border border-black px-4 py-1 text-left align-middle">
                  Biaya Bahan Baku
                </td>
                <td className="w-0 border border-black px-4 py-1 text-right align-middle">
                  10.000.000
                </td>
                <td className="w-0 border border-black px-4 py-1 text-right align-middle"></td>
                <td className="w-0 border border-black px-4 py-1 text-right align-middle"></td>
              </tr>
              <tr>
                <td className="border border-black px-4 py-1 text-left align-middle">
                  Upah Pekerja
                </td>
                <td className="w-0 border border-black px-4 py-1 text-right align-middle">
                  10.000.000
                </td>
                <td className="w-0 border border-black px-4 py-1 text-right align-middle"></td>
                <td className="w-0 border border-black px-4 py-1 text-right align-middle"></td>
              </tr>
              <tr>
                <td className="border border-black px-4 py-1 text-left align-middle">
                  Biaya Bahan Pembantu
                </td>
                <td className="w-0 border border-black px-4 py-1 text-right align-middle">
                  10.000.000
                </td>
                <td className="w-0 border border-black px-4 py-1 text-right align-middle"></td>
                <td className="w-0 border border-black px-4 py-1 text-right align-middle"></td>
              </tr>
              <tr>
                <td className="border border-black px-4 py-1 text-left align-middle">
                  Total Biaya Produksi
                </td>
                <td className="w-0 border border-black px-4 py-1 text-right align-middle"></td>
                <td className="w-0 border border-black px-4 py-1 text-right align-middle">
                  10.000.000
                </td>
                <td className="w-0 border border-black px-4 py-1 text-right align-middle"></td>
              </tr>
              <tr>
                <td className="border border-black px-4 py-1 text-left align-middle">
                  Barang Siap Dijual
                </td>
                <td className="w-0 border border-black px-4 py-1 text-right align-middle"></td>
                <td className="w-0 border border-black px-4 py-1 text-right align-middle">
                  40.000.000
                </td>
                <td className="w-0 border border-black px-4 py-1 text-right align-middle"></td>
              </tr>
              <tr>
                <td colSpan={4} className="p-3"></td>
              </tr>
              <tr>
                <td className="border border-black px-4 py-1 text-left align-middle">
                  Persediaan Bahan Baku
                </td>
                <td className="w-0 border border-black px-4 py-1 text-right align-middle">
                  20.000.000
                </td>
                <td className="w-0 border border-black px-4 py-1 text-right align-middle"></td>
                <td className="w-0 border border-black px-4 py-1 text-right align-middle"></td>
              </tr>
              <tr>
                <td className="border border-black px-4 py-1 text-left align-middle">
                  Persediaan Barang Jadi
                </td>
                <td className="w-0 border border-black px-4 py-1 text-right align-middle">
                  10.000.000
                </td>
                <td className="w-0 border border-black px-4 py-1 text-right align-middle"></td>
                <td className="w-0 border border-black px-4 py-1 text-right align-middle"></td>
              </tr>
              <tr>
                <td className="border border-black px-4 py-1 text-left align-middle"></td>
                <td className="w-0 border border-black px-4 py-1 text-right align-middle"></td>
                <td className="w-0 border border-black px-4 py-1 text-right align-middle">
                  10.000.000
                </td>
                <td className="w-0 border border-black px-4 py-1 text-right align-middle"></td>
              </tr>
              <tr className="border-b-2 bg-amber-300">
                <td colSpan={3} className="px-4 py-1 text-left font-bold">
                  Harga Pokok Penjualan
                </td>
                <td
                  colSpan={1}
                  className="w-0 border border-black px-4 py-1 text-right align-middle">
                  20.000.000
                </td>
              </tr>
              <tr className="border-b-2 bg-amber-300">
                <td colSpan={3} className="px-4 py-1 text-left font-bold">
                  Laba (Rugi) Kotor
                </td>
                <td
                  colSpan={1}
                  className="w-0 border border-black px-4 py-1 text-right align-middle">
                  20.000.000
                </td>
              </tr>
              {/* Biaya Operasional */}
              <tr className="border-b-2 bg-neutral-200">
                <th colSpan={4} className="px-4 py-1 text-left">
                  Biaya Operasional
                </th>
              </tr>
              <tr>
                <td className="border border-black px-4 py-1 text-left align-middle">
                  Biaya Transport
                </td>
                <td className="w-0 border border-black px-4 py-1 text-right align-middle">
                  10.000.000
                </td>
                <td className="w-0 border border-black px-4 py-1 text-right align-middle"></td>
                <td className="w-0 border border-black px-4 py-1 text-right align-middle"></td>
              </tr>
              <tr>
                <td className="border border-black px-4 py-1 text-left align-middle">
                  Biaya Gaji Pegawai
                </td>
                <td className="w-0 border border-black px-4 py-1 text-right align-middle">
                  10.000.000
                </td>
                <td className="w-0 border border-black px-4 py-1 text-right align-middle"></td>
                <td className="w-0 border border-black px-4 py-1 text-right align-middle"></td>
              </tr>
              <tr>
                <td className="border border-black px-4 py-1 text-left align-middle">
                  Biaya Perlengkapan
                </td>
                <td className="w-0 border border-black px-4 py-1 text-right align-middle">
                  10.000.000
                </td>
                <td className="w-0 border border-black px-4 py-1 text-right align-middle"></td>
                <td className="w-0 border border-black px-4 py-1 text-right align-middle"></td>
              </tr>
              <tr>
                <td className="border border-black px-4 py-1 text-left align-middle">
                  Biaya Sewa
                </td>
                <td className="w-0 border border-black px-4 py-1 text-right align-middle">
                  10.000.000
                </td>
                <td className="w-0 border border-black px-4 py-1 text-right align-middle"></td>
                <td className="w-0 border border-black px-4 py-1 text-right align-middle"></td>
              </tr>
              <tr>
                <td className="border border-black px-4 py-1 text-left align-middle">
                  Biaya Telepon
                </td>
                <td className="w-0 border border-black px-4 py-1 text-right align-middle">
                  10.000.000
                </td>
                <td className="w-0 border border-black px-4 py-1 text-right align-middle"></td>
                <td className="w-0 border border-black px-4 py-1 text-right align-middle"></td>
              </tr>
              <tr>
                <td className="border border-black px-4 py-1 text-left align-middle">
                  Biaya Listrik
                </td>
                <td className="w-0 border border-black px-4 py-1 text-right align-middle">
                  10.000.000
                </td>
                <td className="w-0 border border-black px-4 py-1 text-right align-middle"></td>
                <td className="w-0 border border-black px-4 py-1 text-right align-middle"></td>
              </tr>
              <tr>
                <td className="border border-black px-4 py-1 text-left align-middle">
                  Biaya ATM/ATK
                </td>
                <td className="w-0 border border-black px-4 py-1 text-right align-middle">
                  10.000.000
                </td>
                <td className="w-0 border border-black px-4 py-1 text-right align-middle"></td>
                <td className="w-0 border border-black px-4 py-1 text-right align-middle"></td>
              </tr>
              <tr>
                <td className="border border-black px-4 py-1 text-left align-middle">
                  Biaya Lain-Lain
                </td>
                <td className="w-0 border border-black px-4 py-1 text-right align-middle">
                  10.000.000
                </td>
                <td className="w-0 border border-black px-4 py-1 text-right align-middle"></td>
                <td className="w-0 border border-black px-4 py-1 text-right align-middle"></td>
              </tr>
              <tr>
                <td className="border border-black px-4 py-1 text-left align-middle">
                  Biaya Penyusutan Peralatan
                </td>
                <td className="w-0 border border-black px-4 py-1 text-right align-middle">
                  10.000.000
                </td>
                <td className="w-0 border border-black px-4 py-1 text-right align-middle"></td>
                <td className="w-0 border border-black px-4 py-1 text-right align-middle"></td>
              </tr>
              <tr>
                <td className="border border-black px-4 py-1 text-left align-middle">
                  Biaya Penyusutan Mesin
                </td>
                <td className="w-0 border border-black px-4 py-1 text-right align-middle">
                  10.000.000
                </td>
                <td className="w-0 border border-black px-4 py-1 text-right align-middle"></td>
                <td className="w-0 border border-black px-4 py-1 text-right align-middle"></td>
              </tr>
              <tr>
                <td className="border border-black px-4 py-1 text-left align-middle">
                  Biaya Penyusutan Kendaraan
                </td>
                <td className="w-0 border border-black px-4 py-1 text-right align-middle">
                  10.000.000
                </td>
                <td className="w-0 border border-black px-4 py-1 text-right align-middle"></td>
                <td className="w-0 border border-black px-4 py-1 text-right align-middle"></td>
              </tr>
              <tr>
                <td className="border border-black px-4 py-1 text-left align-middle">
                  Biaya Penyusutan Gedung
                </td>
                <td className="w-0 border border-black px-4 py-1 text-right align-middle">
                  10.000.000
                </td>
                <td className="w-0 border border-black px-4 py-1 text-right align-middle"></td>
                <td className="w-0 border border-black px-4 py-1 text-right align-middle"></td>
              </tr>
              <tr className="border-b-2 bg-amber-300">
                <td colSpan={3} className="px-4 py-1 text-left font-bold">
                  Total Biaya Operasional
                </td>
                <td
                  colSpan={1}
                  className="w-0 border border-black px-4 py-1 text-right align-middle">
                  20.000.000
                </td>
              </tr>
              <tr className="border-b-2 bg-amber-300">
                <td colSpan={3} className="px-4 py-1 text-left font-bold">
                  Laba (Rugi) Operasi
                </td>
                <td
                  colSpan={1}
                  className="w-0 border border-black px-4 py-1 text-right align-middle">
                  20.000.000
                </td>
              </tr>
              {/* Pendapatan dan Beban Lain-Lain */}
              <tr className="border-b-2 bg-neutral-200">
                <th colSpan={4} className="px-4 py-1 text-left">
                  Pendapatan dan Beban Lain-Lain
                </th>
              </tr>
              <tr>
                <td className="border border-black px-4 py-1 text-left align-middle">
                  Pendapatan Bunga
                </td>
                <td className="w-0 border border-black px-4 py-1 text-right align-middle">
                  10.000.000
                </td>
                <td className="w-0 border border-black px-4 py-1 text-right align-middle"></td>
                <td className="w-0 border border-black px-4 py-1 text-right align-middle"></td>
              </tr>
              <tr>
                <td className="border border-black px-4 py-1 text-left align-middle">
                  Beban Bunga
                </td>
                <td className="w-0 border border-black px-4 py-1 text-right align-middle">
                  5.000.000
                </td>
                <td className="w-0 border border-black px-4 py-1 text-right align-middle"></td>
                <td className="w-0 border border-black px-4 py-1 text-right align-middle"></td>
              </tr>
              <tr className="border-b-2 bg-amber-300">
                <td colSpan={3} className="px-4 py-1 text-left font-bold">
                  Total Pendapatan dan Beban Lain-Lain
                </td>
                <td
                  colSpan={1}
                  className="w-0 border border-black px-4 py-1 text-right align-middle">
                  5.000.000
                </td>
              </tr>
              <tr className="border-b-2 bg-amber-300">
                <td colSpan={3} className="px-4 py-1 text-left font-bold">
                  Laba (Rugi) Usaha
                </td>
                <td
                  colSpan={1}
                  className="w-0 border border-black px-4 py-1 text-right align-middle">
                  20.000.000
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};
