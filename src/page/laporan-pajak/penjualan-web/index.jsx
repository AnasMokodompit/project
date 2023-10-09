import { useState, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { format } from "date-fns";
import { id } from "date-fns/locale";

import { cn } from "../../../utils/cn";

import { Button } from "../../../componet/button";
import { Calendar } from "../../../componet/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../../componet/popover";

import CalendarIcon from "../../../Asset/icons/untitled-ui-icons/line/components/Calendar";
import Printer from "../../../Asset/icons/untitled-ui-icons/line/components/Printer";
import Minus from "../../../Asset/icons/untitled-ui-icons/line/components/Minus";
import Refresh from "../../../Asset/icons/untitled-ui-icons/line/components/RefreshCw04";

export const PenjualanWeb = () => {
  const [tanggalAwal, setTanggalAwal] = useState();
  const [tanggalAkhir, setTanggalAkhir] = useState();

  const refLaporanPajakPenjualanWeb = useRef();

  const handlePrintLaporanPajakPenjualanWeb = useReactToPrint({
    content: () => refLaporanPajakPenjualanWeb.current,
    documentTitle: `Laporan Pajak Penjualan Web`,
    bodyClass: "bg-white",
  });

  return (
    <section className="font-archivo">
      <div className="flex flex-col gap-4">
        <div>
          <p className="text-xs font-bold leading-none">Laporan Pajak</p>
          <h1 className="text-2xl font-bold">Penjualan Web</h1>
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
              onClick={handlePrintLaporanPajakPenjualanWeb}
              className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg border-2 border-neutral-500 bg-amber-300 p-2">
              <Printer />
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <table className="w-full border-collapse border-2 border-neutral-500 text-sm">
            <thead className="bg-amber-300">
              <tr>
                <th className="px-3 py-2 text-center">Pemesan</th>
                <th className="px-3 py-2 text-center">Alamat</th>
                <th className="px-3 py-2 text-center">No. Telp</th>
                <th className="px-3 py-2 text-center">Tipe</th>
                <th className="px-3 py-2 text-center">Jumlah</th>
                <th className="px-3 py-2 text-center">Total Harga</th>
              </tr>
            </thead>
            <tbody></tbody>
          </table>
        </div>
      </div>
    </section>
  );
};
