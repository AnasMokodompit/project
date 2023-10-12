import { useState, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import axios from "axios";

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

export const PengadaanMeubel = () => {
  const [tanggalAwal, setTanggalAwal] = useState();
  const [tanggalAkhir, setTanggalAkhir] = useState();
  const [pengadaanMeubel, setPengadaanMeubel] = useState()

  const refLaporanPajakPengadaanMeubel = useRef();

  const handlePrintLaporanPajakPengadaanMeubel = useReactToPrint({
    content: () => refLaporanPajakPengadaanMeubel.current,
    documentTitle: `Laporan Pajak Penjualan Langsung`,
    bodyClass: "bg-white",
  });

  const {} = useQuery({
    queryKey: ["laporan-pajak-pengadaan-meubel", tanggalAwal, tanggalAkhir],
    queryFn: async () => {
      return axios.get(`${process.env.REACT_APP_BASE_API}/laporanPajak/penjualanMeubel?page=1&row=10`);
    },
    onSuccess: (data) => {
      setPengadaanMeubel(data.data.data?.getDataOrdertAll)
      console.log(data.data.data.getDataOrdertAll);
    },
  });

  const optionsTime = {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "Asia/Makassar",
  };
  const formatterTime = new Intl.DateTimeFormat("id-ID", optionsTime);

  return (
    <section className="font-archivo">
      <div className="flex flex-col gap-4">
        <div>
          <p className="text-xs font-bold leading-none">Laporan Pajak</p>
          <h1 className="text-2xl font-bold">Pengadaan Meubel</h1>
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
              onClick={handlePrintLaporanPajakPengadaanMeubel}
              className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg border-2 border-neutral-500 bg-amber-300 p-2">
              <Printer />
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <table className="w-full border-collapse border-2 border-neutral-500 text-sm">
            <thead className="bg-amber-300">
              <tr>
                <th className="px-3 py-2 text-center">Tanggal</th>
                <th className="px-3 py-2 text-center">Keterangan</th>
                <th className="px-3 py-2 text-center">Jumlah</th>
                <th className="px-3 py-2 text-center">DPP</th>
                <th className="px-3 py-2 text-center">PPN</th>
                <th className="px-3 py-2 text-center">PPh 22</th>
              </tr>
            </thead>
            <tbody>
              {!!pengadaanMeubel && pengadaanMeubel.length !== 0 ? (
                pengadaanMeubel.map((item, index) => {
                  // console.log(item)

                  const {
                    id,
                    Price,
                    pajakOrder: { DPP, PPN, PPh_22 },
                    product_Orders,
                    created_at: tanggal,
                  } = item;

                  return (
                    <tr key={id}>
                      <td className="border-2 border-neutral-500 p-2">
                        {formatterTime.format(new Date(tanggal))}
                      </td>
                      <td className="border-2 border-neutral-500 p-2">
                        <div className="flex gap-1">
                          {!!product_Orders &&
                            product_Orders.map((data) => {
                              console.log(data)
                              const {
                                jumlah,
                                products: { name: nama },
                              } = data;
                              return (
                                <p className="after:content-[',']">{`${nama} : ${jumlah}`}</p>
                              );
                            })}
                        </div>
                      </td>
                      <td className="border-2 border-neutral-500 p-2 text-center">
                        {convertIDRCurrency(Price)}
                      </td>
                      <td className="border-2 border-neutral-500 p-2 text-center">
                        {convertIDRCurrency(DPP)}
                      </td>
                      <td className="border-2 border-neutral-500 p-2 text-center">
                        {convertIDRCurrency(PPN)}
                      </td>
                      <td className="border-2 border-neutral-500 p-2 text-center">
                        {convertIDRCurrency(PPh_22)}
                      </td>
                    </tr>
                  )

                })
              ) : ""}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

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
