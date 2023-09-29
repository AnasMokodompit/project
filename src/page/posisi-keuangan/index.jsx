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

export const PosisiKeuangan = () => {
  const [tanggalAwal, setTanggalAwal] = useState();
  const [tanggalAkhir, setTanggalAkhir] = useState();

  return (
    <section className="font-archivo">
      <div className="flex flex-col gap-4">
        <div>
          <h1 className="text-2xl font-bold">Posisi Keuangan</h1>
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
                  Laporan Posisi Keuangan
                </th>
              </tr>
            </thead>
            <tbody>
              {/* Aktiva Lancar */}
              <tr className="border-b-2 bg-neutral-200">
                <th colSpan={4} className="px-4 py-1 text-left">
                  Aktiva Lancar
                </th>
              </tr>
              <tr>
                <td className="border border-black px-4 py-1 text-left align-middle">
                  Kas
                </td>
                <td className="w-0 border border-black px-4 py-1 text-right align-middle"></td>
                <td className="w-0 border border-black px-4 py-1 text-right align-middle">
                  1.000.000
                </td>
                <td className="w-0 border border-black px-4 py-1 text-right align-middle"></td>
              </tr>
              <tr>
                <td className="border border-black px-4 py-1 text-left align-middle">
                  Piutang Usaha
                </td>
                <td className="w-0 border border-black px-4 py-1 text-right align-middle"></td>
                <td className="w-0 border border-black px-4 py-1 text-right align-middle">
                  1.000.000
                </td>
                <td className="w-0 border border-black px-4 py-1 text-right align-middle"></td>
              </tr>
              <tr>
                <td className="border border-black px-4 py-1 text-left align-middle">
                  Persediaan Barang Jadi
                </td>
                <td className="w-0 border border-black px-4 py-1 text-right align-middle"></td>
                <td className="w-0 border border-black px-4 py-1 text-right align-middle">
                  1.000.000
                </td>
                <td className="w-0 border border-black px-4 py-1 text-right align-middle"></td>
              </tr>
              <tr>
                <td className="border border-black px-4 py-1 text-left align-middle">
                  Persediaan Bahan Baku
                </td>
                <td className="w-0 border border-black px-4 py-1 text-right align-middle"></td>
                <td className="w-0 border border-black px-4 py-1 text-right align-middle">
                  1.000.000
                </td>
                <td className="w-0 border border-black px-4 py-1 text-right align-middle"></td>
              </tr>
              <tr>
                <td className="border border-black px-4 py-1 text-left align-middle">
                  Persediaan Bahan Pembantu
                </td>
                <td className="w-0 border border-black px-4 py-1 text-right align-middle"></td>
                <td className="w-0 border border-black px-4 py-1 text-right align-middle">
                  1.000.000
                </td>
                <td className="w-0 border border-black px-4 py-1 text-right align-middle"></td>
              </tr>
              <tr>
                <td colSpan={4} className="p-3"></td>
              </tr>
              <tr>
                <td className="border border-black px-4 py-1 text-left align-middle">
                  Total Aktiva Lancar
                </td>
                <td className="w-0 border border-black px-4 py-1 text-right align-middle"></td>
                <td className="w-0 border border-black px-4 py-1 text-right align-middle"></td>
                <td className="w-0 border border-black px-4 py-1 text-right align-middle">
                  5.000.000
                </td>
              </tr>
              {/* Aktiva Tetap */}
              <tr className="border-b-2 bg-neutral-200">
                <th colSpan={4} className="px-4 py-1 text-left">
                  Aktiva Tetap
                </th>
              </tr>
              <tr>
                <td className="border border-black px-4 py-1 text-left align-middle">
                  Tanah
                </td>
                <td className="w-0 border border-black px-4 py-1 text-right align-middle"></td>
                <td className="w-0 border border-black px-4 py-1 text-right align-middle">
                  6.000.000
                </td>
                <td className="w-0 border border-black px-4 py-1 text-right align-middle"></td>
              </tr>
              <tr>
                <td colSpan={4} className="p-3"></td>
              </tr>
              <tr>
                <td className="border border-black px-4 py-1 text-left align-middle">
                  Gedung
                </td>
                <td className="w-0 border border-black px-4 py-1 text-right align-middle">
                  5.500.000
                </td>
                <td className="w-0 border border-black px-4 py-1 text-right align-middle"></td>
                <td className="w-0 border border-black px-4 py-1 text-right align-middle"></td>
              </tr>
              <tr>
                <td className="border border-black px-4 py-1 text-left align-middle">
                  Akumulasi Penyusutan Gedung
                </td>
                <td className="w-0 border border-black px-4 py-1 text-right align-middle">
                  500.000
                </td>
                <td className="w-0 border border-black px-4 py-1 text-right align-middle"></td>
                <td className="w-0 border border-black px-4 py-1 text-right align-middle"></td>
              </tr>
              <tr>
                <td className="border border-black px-4 py-1 text-left align-middle"></td>
                <td className="w-0 border border-black px-4 py-1 text-right align-middle"></td>
                <td className="w-0 border border-black px-4 py-1 text-right align-middle">
                  5.000.000
                </td>
                <td className="w-0 border border-black px-4 py-1 text-right align-middle"></td>
              </tr>
              <tr>
                <td colSpan={4} className="p-3"></td>
              </tr>
              <tr>
                <td className="border border-black px-4 py-1 text-left align-middle">
                  Mesin
                </td>
                <td className="w-0 border border-black px-4 py-1 text-right align-middle">
                  3.500.000
                </td>
                <td className="w-0 border border-black px-4 py-1 text-right align-middle"></td>
                <td className="w-0 border border-black px-4 py-1 text-right align-middle"></td>
              </tr>
              <tr>
                <td className="border border-black px-4 py-1 text-left align-middle">
                  Akumulasi Penyusutan Mesin
                </td>
                <td className="w-0 border border-black px-4 py-1 text-right align-middle">
                  500.000
                </td>
                <td className="w-0 border border-black px-4 py-1 text-right align-middle"></td>
                <td className="w-0 border border-black px-4 py-1 text-right align-middle"></td>
              </tr>
              <tr>
                <td className="border border-black px-4 py-1 text-left align-middle"></td>
                <td className="w-0 border border-black px-4 py-1 text-right align-middle"></td>
                <td className="w-0 border border-black px-4 py-1 text-right align-middle">
                  3.000.000
                </td>
                <td className="w-0 border border-black px-4 py-1 text-right align-middle"></td>
              </tr>
              <tr>
                <td colSpan={4} className="p-3"></td>
              </tr>
              <tr>
                <td className="border border-black px-4 py-1 text-left align-middle">
                  Peralatan
                </td>
                <td className="w-0 border border-black px-4 py-1 text-right align-middle">
                  2.500.000
                </td>
                <td className="w-0 border border-black px-4 py-1 text-right align-middle"></td>
                <td className="w-0 border border-black px-4 py-1 text-right align-middle"></td>
              </tr>
              <tr>
                <td className="border border-black px-4 py-1 text-left align-middle">
                  Akumulasi Penyusutan Peralatan
                </td>
                <td className="w-0 border border-black px-4 py-1 text-right align-middle">
                  500.000
                </td>
                <td className="w-0 border border-black px-4 py-1 text-right align-middle"></td>
                <td className="w-0 border border-black px-4 py-1 text-right align-middle"></td>
              </tr>
              <tr>
                <td className="border border-black px-4 py-1 text-left align-middle"></td>
                <td className="w-0 border border-black px-4 py-1 text-right align-middle"></td>
                <td className="w-0 border border-black px-4 py-1 text-right align-middle">
                  2.000.000
                </td>
                <td className="w-0 border border-black px-4 py-1 text-right align-middle"></td>
              </tr>
              <tr>
                <td colSpan={4} className="p-3"></td>
              </tr>
              <tr>
                <td className="border border-black px-4 py-1 text-left align-middle">
                  Kendaraan
                </td>
                <td className="w-0 border border-black px-4 py-1 text-right align-middle">
                  5.500.000
                </td>
                <td className="w-0 border border-black px-4 py-1 text-right align-middle"></td>
                <td className="w-0 border border-black px-4 py-1 text-right align-middle"></td>
              </tr>
              <tr>
                <td className="border border-black px-4 py-1 text-left align-middle">
                  Akumulasi Penyusutan Kendaraan
                </td>
                <td className="w-0 border border-black px-4 py-1 text-right align-middle">
                  500.000
                </td>
                <td className="w-0 border border-black px-4 py-1 text-right align-middle"></td>
                <td className="w-0 border border-black px-4 py-1 text-right align-middle"></td>
              </tr>
              <tr>
                <td className="border border-black px-4 py-1 text-left align-middle"></td>
                <td className="w-0 border border-black px-4 py-1 text-right align-middle"></td>
                <td className="w-0 border border-black px-4 py-1 text-right align-middle">
                  5.000.000
                </td>
                <td className="w-0 border border-black px-4 py-1 text-right align-middle"></td>
              </tr>
              <tr>
                <td colSpan={4} className="p-3"></td>
              </tr>
              <tr>
                <td className="border border-black px-4 py-1 text-left align-middle">
                  Total Aktiva Tetap
                </td>
                <td className="w-0 border border-black px-4 py-1 text-right align-middle"></td>
                <td className="w-0 border border-black px-4 py-1 text-right align-middle"></td>
                <td className="w-0 border border-black px-4 py-1 text-right align-middle">
                  15.000.000
                </td>
              </tr>
              <tr className="border-b-2 bg-amber-300">
                <td colSpan={3} className="px-4 py-1 text-left font-bold">
                  Total Aktiva
                </td>
                <td
                  colSpan={1}
                  className="w-0 border border-black px-4 py-1 text-right align-middle">
                  20.000.000
                </td>
              </tr>
              {/* Kewajiban Lancar */}
              <tr className="border-b-2 bg-neutral-200">
                <th colSpan={4} className="px-4 py-1 text-left">
                  Kewajiban Lancar
                </th>
              </tr>
              <tr>
                <td className="border border-black px-4 py-1 text-left align-middle">
                  Utang Usaha
                </td>
                <td className="w-0 border border-black px-4 py-1 text-right align-middle"></td>
                <td className="w-0 border border-black px-4 py-1 text-right align-middle">
                  1.000.000
                </td>
                <td className="w-0 border border-black px-4 py-1 text-right align-middle"></td>
              </tr>
              {/* Keajiban Jangka Panjang */}
              <tr className="border-b-2 bg-neutral-200">
                <th colSpan={4} className="px-4 py-1 text-left">
                  Kewajiban Jangka Panjang
                </th>
              </tr>
              <tr>
                <td className="border border-black px-4 py-1 text-left align-middle">
                  Utang Bank
                </td>
                <td className="w-0 border border-black px-4 py-1 text-right align-middle"></td>
                <td className="w-0 border border-black px-4 py-1 text-right align-middle">
                  2.000.000
                </td>
                <td className="w-0 border border-black px-4 py-1 text-right align-middle"></td>
              </tr>
              <tr>
                <td colSpan={4} className="p-3"></td>
              </tr>
              <tr>
                <td className="border border-black px-4 py-1 text-left align-middle">
                  Total Kewajiban
                </td>
                <td className="w-0 border border-black px-4 py-1 text-right align-middle"></td>
                <td className="w-0 border border-black px-4 py-1 text-right align-middle"></td>
                <td className="w-0 border border-black px-4 py-1 text-right align-middle">
                  5.000.000
                </td>
              </tr>
              {/* Modal */}
              <tr className="border-b-2 bg-neutral-200">
                <th colSpan={4} className="px-4 py-1 text-left">
                  Modal
                </th>
              </tr>
              <tr>
                <td className="border border-black px-4 py-1 text-left align-middle">
                  Modal Pemilik
                </td>
                <td className="w-0 border border-black px-4 py-1 text-right align-middle"></td>
                <td className="w-0 border border-black px-4 py-1 text-right align-middle"></td>
                <td className="w-0 border border-black px-4 py-1 text-right align-middle">
                  10.000.000
                </td>
              </tr>
              <tr className="border-b-2 bg-amber-300">
                <td colSpan={3} className="px-4 py-1 text-left font-bold">
                  Total Kewajiban dan Modal
                </td>
                <td
                  colSpan={1}
                  className="w-0 border border-black px-4 py-1 text-right align-middle">
                  15.000.000
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};
