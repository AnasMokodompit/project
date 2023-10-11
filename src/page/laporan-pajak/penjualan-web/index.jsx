import { useState, useRef, useEffect, forwardRef } from "react";
import { useReactToPrint } from "react-to-print";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { id, tr } from "date-fns/locale";
import axios from "axios";

import { cn } from "../../../utils/cn";

import { Button } from "../../../componet/button";
import { Calendar } from "../../../componet/calendar";
import { Input } from "../../../componet/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../../componet/popover";

import CalendarIcon from "../../../Asset/icons/untitled-ui-icons/line/components/Calendar";
import Printer from "../../../Asset/icons/untitled-ui-icons/line/components/Printer";
import Minus from "../../../Asset/icons/untitled-ui-icons/line/components/Minus";
import Refresh from "../../../Asset/icons/untitled-ui-icons/line/components/RefreshCw04";
import ChevronLeft from "../../../Asset/icons/untitled-ui-icons/line/components/ChevronLeft";
import ChevronRight from "../../../Asset/icons/untitled-ui-icons/line/components/ChevronRight";
import Search from "../../../Asset/icons/untitled-ui-icons/line/components/SearchLg";

export const PenjualanWeb = () => {
  const [tanggalAwal, setTanggalAwal] = useState();
  const [tanggalAkhir, setTanggalAkhir] = useState();
  const [search, setSearch] = useState();
  const [page, setPage] = useState(1);

  const [penjualanWebData, setPenjualanWebData] = useState();

  const refLaporanPajakPenjualanWeb = useRef();

  const handlePrintLaporanPajakPenjualanWeb = useReactToPrint({
    content: () => refLaporanPajakPenjualanWeb.current,
    documentTitle: `Laporan Pajak Penjualan Web`,
    bodyClass: "bg-white",
  });

  const { refetch } = useQuery({
    queryKey: ["laporan-pajak-penjualan-web", tanggalAwal, tanggalAkhir],
    queryFn: async () => {
      return await axios.get(
        `${process.env.REACT_APP_BASE_API}/laporanPajak/penjualanWeb`,
        {
          params: {
            firstDate: tanggalAwal,
            lastDate: tanggalAkhir,
            search,
            page,
            row: 8,
          },
        },
      );
    },
    onSuccess: (data) => {
      setPenjualanWebData(data.data.data?.getDataOrdertAll);
    },
  });

  console.log(penjualanWebData);

  const optionsTime = {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "Asia/Makassar",
  };
  const formatterTime = new Intl.DateTimeFormat("id-ID", optionsTime);

  useEffect(() => {
    refetch();
  }, [search, page]);

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
          <div className="relative">
            <Search className="absolute bottom-0 left-2 top-0 m-auto" />
            <Input
              className="w-96 border-2 border-neutral-500 px-8 pr-4"
              placeholder="Cari"
              onChange={(event) => {
                setSearch(event.target.value);
              }}
            />
          </div>
        </div>
        <div className="flex w-full items-center justify-end gap-4 text-xs">
          <button
            onClick={() => {
              setPage(page - 1);
            }}
            className="rounded-lg bg-amber-300 p-2 disabled:bg-amber-200"
            disabled={page <= 1}>
            <ChevronLeft />
          </button>
          <div className="w-4 text-center">{page}</div>
          <button
            onClick={() => {
              setPage(page + 1);
            }}
            className="rounded-lg bg-amber-300 p-2 disabled:bg-amber-200"
            disabled={penjualanWebData?.length < 8}>
            <ChevronRight />
          </button>
        </div>
        <div className="flex flex-col gap-2">
          <table className="w-full border-collapse border-2 border-neutral-500 text-sm">
            <thead className="bg-amber-300">
              <tr>
                <th className="px-3 py-2 text-center">Tanggal</th>
                <th className="px-3 py-2 text-center">Pemesan</th>
                <th className="px-3 py-2 text-center">Alamat</th>
                <th className="px-3 py-2 text-center">No. Telp</th>
                <th className="px-3 py-2 text-center">Tipe</th>
                <th className="px-3 py-2 text-center">Jumlah</th>
                <th className="px-3 py-2 text-center">Total Harga</th>
              </tr>
            </thead>
            <tbody>
              {!!penjualanWebData && penjualanWebData.length !== 0 ? (
                penjualanWebData.map((data) => {
                  const {
                    id,
                    Price: totalHarga,
                    alamat,
                    jumlah,
                    users: { name: pemesan, nomor_hp: noTelp },
                    product_Orders: tipe,
                    created_at: tanggal,
                  } = data;

                  // const tipe = product_Orders[0]?.products?.name;
                  return (
                    <tr key={id}>
                      <td className="border-2 border-neutral-500 p-2">
                        {formatterTime.format(new Date(tanggal))}
                      </td>
                      <td className="border-2 border-neutral-500 p-2">
                        {pemesan}
                      </td>
                      <td className="border-2 border-neutral-500 p-2">
                        {alamat}
                      </td>
                      <td className="border-2 border-neutral-500 p-2">
                        {noTelp}
                      </td>
                      <td className="border-2 border-neutral-500 p-2">
                        <div className="flex gap-1">
                          {!!tipe &&
                            tipe.map((data) => {
                              const {
                                products: { name: nama },
                              } = data;
                              return (
                                <p className="after:content-[',']">{nama}</p>
                              );
                            })}
                        </div>
                      </td>
                      <td className="border-2 border-neutral-500 p-2">
                        {jumlah}
                      </td>
                      <td className="border-2 border-neutral-500 p-2">
                        {convertIDRCurrency(totalHarga)}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td
                    colSpan={20}
                    className="border-2 border-neutral-500 p-4 text-center text-neutral-900">
                    Data Kosong
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div style={{ display: "none" }}>
          <DokumenPenjualanWeb
            tanggalAwal={tanggalAwal}
            tanggalAkhir={tanggalAkhir}
            ref={refLaporanPajakPenjualanWeb}
          />
        </div>
      </div>
    </section>
  );
};

const DokumenPenjualanWeb = forwardRef((props, ref) => {
  const [penjualanWebData, setPenjualanWebData] = useState();

  const tanggalAwal = props?.tanggalAwal;
  const tanggalAkhir = props?.tanggalAkhir;

  const { refetch } = useQuery({
    queryKey: [
      "laporan-pajak-web-langsung",
      "dokumen",
      tanggalAwal,
      tanggalAkhir,
    ],
    queryFn: async () => {
      return await axios.get(
        `${process.env.REACT_APP_BASE_API}/laporanPajak/penjualanWeb`,
        {
          params: {
            firstDate: tanggalAwal,
            lastDate: tanggalAkhir,
          },
        },
      );
    },
    onSuccess: (data) => {
      setPenjualanWebData(data.data.data?.getDataOrdertAll);
    },
  });

  const setStyles = () => {
    return `@page { 
      margin: ${"1.5cm"} !important;
      size: landscape !important;
    }`;
  };

  const optionsTime = {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "Asia/Makassar",
  };
  const formatterTime = new Intl.DateTimeFormat("id-ID", optionsTime);

  return (
    <section ref={ref}>
      <style>{setStyles()}</style>
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-archivo text-xs font-bold">Laporan Pajak</p>
            <p className="font-archivo text-xl font-bold">Penjualan Web</p>
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
        <div>
          <table className="w-full border-collapse border-2 border-neutral-500 font-archivo text-sm">
            <thead className="bg-amber-300">
              <tr>
                <th className="px-3 py-2 text-center">Tanggal</th>
                <th className="px-3 py-2 text-center">Pemesan</th>
                <th className="px-3 py-2 text-center">Alamat</th>
                <th className="px-3 py-2 text-center">No. Telp</th>
                <th className="px-3 py-2 text-center">Tipe</th>
                <th className="px-3 py-2 text-center">Jumlah</th>
                <th className="px-3 py-2 text-center">Total Harga</th>
              </tr>
            </thead>
            <tbody>
              {!!penjualanWebData && penjualanWebData.length !== 0 ? (
                penjualanWebData.map((data) => {
                  // console.log(data);

                  const {
                    id,
                    Price: totalHarga,
                    alamat,
                    jumlah,
                    users: { name: pemesan, nomor_hp: noTelp },
                    product_Orders: tipe,
                    created_at: tanggal,
                  } = data;

                  // const tipe = product_Orders[0]?.products?.name;
                  return (
                    <tr key={id}>
                      <td className="border-2 border-neutral-500 p-2">
                        {formatterTime.format(new Date(tanggal))}
                      </td>
                      <td className="border-2 border-neutral-500 p-2">
                        {pemesan}
                      </td>
                      <td className="border-2 border-neutral-500 p-2">
                        {alamat}
                      </td>
                      <td className="border-2 border-neutral-500 p-2">
                        {noTelp}
                      </td>
                      <td className="border-2 border-neutral-500 p-2">
                        <div className="flex gap-1">
                          {!!tipe &&
                            tipe.map((data) => {
                              const {
                                products: { name: nama },
                              } = data;
                              return (
                                <p className="after:content-[',']">{nama}</p>
                              );
                            })}
                        </div>
                      </td>
                      <td className="border-2 border-neutral-500 p-2">
                        {jumlah}
                      </td>
                      <td className="border-2 border-neutral-500 p-2">
                        {convertIDRCurrency(totalHarga)}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td
                    colSpan={20}
                    className="border-2 border-neutral-500 p-4 text-center text-neutral-900">
                    Data Kosong
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
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
