import React, {
  useState,
  useEffect,
  useRef,
  forwardRef,
  Fragment,
} from "react";
import { useReactToPrint } from "react-to-print";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import axios from "axios";

import { cn } from "../../utils/cn";

import { Button } from "../../componet/button";
import { Calendar } from "../../componet/calendar";
import { Input } from "../../componet/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../componet/popover";

import Search from "../../Asset/icons/untitled-ui-icons/line/components/SearchLg";
import CalendarIcon from "../../Asset/icons/untitled-ui-icons/line/components/Calendar";
import Printer from "../../Asset/icons/untitled-ui-icons/line/components/Printer";
import Minus from "../../Asset/icons/untitled-ui-icons/line/components/Minus";
import Refresh from "../../Asset/icons/untitled-ui-icons/line/components/RefreshCw04";
import ChevronLeft from "../../Asset/icons/untitled-ui-icons/line/components/ChevronLeft";
import ChevronRight from "../../Asset/icons/untitled-ui-icons/line/components/ChevronRight";
import ChevronDown from "../../Asset/icons/untitled-ui-icons/line/components/ChevronDown";

export const Jurnal = () => {
  const [transaksiData, setTransaksiData] = useState();
  const [jumlah, setJumlah] = useState()
  const [tanggalAwal, setTanggalAwal] = useState();
  const [tanggalAkhir, setTanggalAkhir] = useState();
  const [oldestDate, setOldestDate] = useState();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const refJurnal = useRef();
  const handlePrintJurnal = useReactToPrint({
    content: () => refJurnal.current,
    documentTitle: `Jurnal`,
    bodyClass: "bg-white",
  });

  const [isSortingTanggal, setIsSortingTanggal] = useState(false);

  const handleSortingTanggal = () => {
    const sortedData = [...transaksiData];

    sortedData.sort((a, b) => {
      const dateA = new Date(a.tanggal);
      const dateB = new Date(b.tanggal);

      if (!isSortingTanggal) {
        return dateA - dateB;
      } else {
        return dateB - dateA;
      }
    });

    setTransaksiData(sortedData);
    setIsSortingTanggal(!isSortingTanggal);
  };

  console.log(transaksiData);

  const { refetch } = useQuery({
    queryKey: ["transaksi"],
    queryFn: async () => {
      if (!!tanggalAwal && !!tanggalAkhir && !!search) {
        let tanggalAkhirModified = new Date(tanggalAkhir);
        tanggalAkhirModified.setHours(23, 59, 59);

        return await axios.get(
          `${process.env.REACT_APP_BASE_API}/transaksi?firstDate=${tanggalAwal}&lastDate=${tanggalAkhirModified}&search=${search}&page=${page}&row=8`,
        );
      } else if (!!tanggalAwal && !!tanggalAkhir) {
        let tanggalAkhirModified = new Date(tanggalAkhir);
        tanggalAkhirModified.setHours(23, 59, 59);

        return await axios.get(
          `${process.env.REACT_APP_BASE_API}/transaksi?firstDate=${tanggalAwal}&lastDate=${tanggalAkhirModified}&page=${page}&row=8`,
        );
      } else if (!!search) {
        return await axios.get(
          `${process.env.REACT_APP_BASE_API}/transaksi?search=${search}&page=${page}&row=8`,
        );
      } else {
        return await axios.get(
          `${process.env.REACT_APP_BASE_API}/transaksi?page=${page}&row=8`,
        );
      }
    },
    onSuccess: (data) => {
      setTransaksiData(data.data.data.listTransaksi);
      setOldestDate(data.data.data.oldestDate);
      setJumlah(data.data.data.jumlah)
    },
  });

  const optionsTime = {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "Asia/Makassar",
  };
  const formatterTime = new Intl.DateTimeFormat("id-ID", optionsTime);

  useEffect(() => {
    refetch();
  }, [tanggalAwal, tanggalAkhir, search, page]);

  return (
    <section className="flex max-w-full overflow-auto font-archivo">
      <div className="flex w-full flex-col gap-4 font-archivo">
        <div>
          <p className="text-2xl font-bold">Jurnal</p>
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
                <PopoverContent className="w-auto p-0">
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
            <Minus className="text-neutral-800" />
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
                <PopoverContent className="w-auto p-0">
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
              onClick={handlePrintJurnal}
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
            disabled={transaksiData?.length < 8}>
            <ChevronRight />
          </button>
        </div>
        <div>
          <table className="w-full border-collapse rounded-lg border-2 border-neutral-500 text-sm">
            <thead>
              <tr className="bg-amber-300">
                <th className="p-2 text-center">
                  <div className="flex w-full items-center justify-center gap-4">
                    <p>Tanggal</p>
                    <button
                      onClick={() => handleSortingTanggal()}
                      className="flex h-6 w-6 items-center justify-center rounded-lg bg-amber-100">
                      <ChevronDown
                        className={cn("transition-all", {
                          "rotate-180": isSortingTanggal,
                        })}
                      />
                    </button>
                  </div>
                </th>
                <th className="p-2 text-center">Transaksi</th>
                <th className="p-2 text-center">Nama Akun</th>
                <th className="p-2 text-center">Keterangan</th>
                <th className="p-2 text-center">Jumlah</th>
                <th className="p-2 text-center">Akun</th>
                <th className="p-2 text-center">Debet</th>
                <th className="p-2 text-center">Kredit</th>
              </tr>
            </thead>
            <tbody>
              {!!transaksiData && transaksiData.length !== 0 ? (
                transaksiData.map((item, index) => {
                  const { id } = item;

                  return (
                    <Fragment key={id}>
                      <tr>
                        <td
                          rowSpan={
                            item.namaAkunTransaksiDalamJenisTransaksi.nama ===
                            "Pendapatan DP"
                              ? 4
                              : 2
                          }
                          className="border-2 border-neutral-500 px-4 py-1 text-left">
                          {formatterTime.format(new Date(item.tanggal))}
                        </td>
                        <td
                          rowSpan={
                            item.namaAkunTransaksiDalamJenisTransaksi.nama ===
                            "Pendapatan DP"
                              ? 4
                              : 2
                          }
                          className="border-2 border-neutral-500 px-4 py-1 text-left">
                          {item.jenis_transaksi.nama}
                        </td>
                        <td
                          rowSpan={
                            item.namaAkunTransaksiDalamJenisTransaksi.nama ===
                            "Pendapatan DP"
                              ? 4
                              : 2
                          }
                          className="border-2 border-neutral-500 px-4 py-1 text-left">
                          {item.namaAkunTransaksiDalamJenisTransaksi.nama ===
                          "Pendapatan DP"
                            ? "Pendapatan"
                            : item.namaAkunTransaksiDalamJenisTransaksi.nama}
                        </td>
                        <td
                          rowSpan={
                            item.namaAkunTransaksiDalamJenisTransaksi.nama ===
                            "Pendapatan DP"
                              ? 4
                              : 2
                          }
                          className="border-2 border-neutral-500 px-4 py-1 text-left">
                          {item.keterangan}
                        </td>
                        <td
                          rowSpan={2}
                          className="border-2 border-neutral-500 px-4 py-1 text-right">
                          {item.namaAkunTransaksiDalamJenisTransaksi.nama ===
                          "Pendapatan DP"
                            ? convertIDRCurrency(item.jumlah / 0.3)
                            : convertIDRCurrency(item.jumlah)}
                        </td>
                        <td
                          rowSpan={1}
                          className="border-2 border-neutral-500 px-4 py-1 align-top">
                          {
                            item?.namaAkunTransaksiDalamJenisTransaksi
                              ?.akunTransaksi[0]?.namaAkunTransaksi?.nama
                          }
                          {/* {console.log(
                            item?.namaAkunTransaksiDalamJenisTransaksi
                              ?.akunTransaksi[0]?.namaAkunTransaksi?.nama,
                          )} */}
                        </td>
                        <td
                          rowSpan={1}
                          className="border-2 border-neutral-500 px-4 py-1 text-right align-top">
                          {item.namaAkunTransaksiDalamJenisTransaksi.nama ===
                          "Pendapatan DP"
                            ? convertIDRCurrency(item.jumlah / 0.3)
                            : ""}
                          {item?.namaAkunTransaksiDalamJenisTransaksi
                            ?.akunTransaksi[0]?.namaAkunTransaksi?.nama !==
                            undefined &&
                          item.namaAkunTransaksiDalamJenisTransaksi.nama !==
                            "Pendapatan DP"
                            ? convertIDRCurrency(item.jumlah)
                            : ""}
                        </td>
                        <td
                          rowSpan={1}
                          className="border-2 border-neutral-500 px-4 py-1 text-left align-bottom"></td>
                      </tr>
                      <tr>
                        <td
                          rowSpan={1}
                          className="border-2 border-neutral-500 px-4 py-1 align-top">
                          {
                            item.namaAkunTransaksiDalamJenisTransaksi
                              ?.akunTransaksi[1]?.namaAkunTransaksi?.nama
                          }
                        </td>
                        <td
                          rowSpan={1}
                          className="border-2 border-neutral-500 px-4 py-1 text-left"></td>
                        <td
                          rowSpan={1}
                          className="border-2 border-neutral-500 px-4 py-1 text-right align-top">
                          {item.namaAkunTransaksiDalamJenisTransaksi.nama ===
                          "Pendapatan DP"
                            ? convertIDRCurrency(item.jumlah / 0.3)
                            : ""}
                          {item?.namaAkunTransaksiDalamJenisTransaksi
                            ?.akunTransaksi[0]?.namaAkunTransaksi?.nama !==
                            undefined &&
                          item.namaAkunTransaksiDalamJenisTransaksi.nama !==
                            "Pendapatan DP"
                            ? convertIDRCurrency(item.jumlah)
                            : ""}
                        </td>
                      </tr>
                      {item.namaAkunTransaksiDalamJenisTransaksi.nama ===
                        "Pendapatan DP" && (
                        <>
                          <tr>
                            <td
                              rowSpan={2}
                              className="border-2 border-neutral-500 px-4 py-1 text-right align-middle">
                              {convertIDRCurrency(item.jumlah)}
                            </td>
                            <td className="border-2 border-neutral-500 px-4 py-1 align-top">
                              {
                                item.namaAkunTransaksiDalamJenisTransaksi
                                  ?.akunTransaksi[2]?.namaAkunTransaksi?.nama
                              }
                            </td>
                            <td className="border-2 border-neutral-500 px-4 py-1 text-right align-top">
                              {convertIDRCurrency(item.jumlah)}
                            </td>
                            <td className="border-2 border-neutral-500 px-4 py-1 text-right align-top"></td>
                          </tr>
                          <tr>
                            <td className="border-2 border-neutral-500 px-4 py-1 align-top">
                              {
                                item.namaAkunTransaksiDalamJenisTransaksi
                                  ?.akunTransaksi[3]?.namaAkunTransaksi?.nama
                              }
                            </td>
                            <td className="border-2 border-neutral-500 px-4 py-1 text-right align-top"></td>
                            <td className="border-2 border-neutral-500 px-4 py-1 text-right align-top">
                              {convertIDRCurrency(item.jumlah)}
                            </td>
                          </tr>
                        </>
                      )}
                    </Fragment>
                  );
                })
              ) : (
                <tr>
                  <td
                    colSpan={20}
                    className="border-2 border-neutral-500 p-4 text-center text-sm text-neutral-900">
                    Data Kosong
                  </td>
                </tr>
              )}
              <tr className="bg-amber-300">
                <td colSpan={4} className="p-2 font-bold">
                  Total
                </td>
                <td className="p-2 text-right">{convertIDRCurrency(jumlah)}</td>
                <td className="p-2 text-right"></td>
                <td className="p-2 text-right">{convertIDRCurrency(jumlah)}</td>
                <td className="p-2 text-right">{convertIDRCurrency(jumlah)}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div style={{ display: "none" }}>
          <DokumenJurnal
            ref={refJurnal}
            tanggalAwal={tanggalAwal}
            tanggalAkhir={tanggalAkhir}
          />
        </div>
      </div>
    </section>
  );
};

const DokumenJurnal = forwardRef((props, ref) => {
  const [transaksiData, setTransaksiData] = useState();

  const tanggalAwal = props?.tanggalAwal;
  const tanggalAkhir = props?.tanggalAkhir;

  const { refetch } = useQuery({
    queryKey: ["transaksi-cetak"],
    queryFn: async () => {
      if (!!tanggalAwal && !!tanggalAkhir) {
        let tanggalAkhirModified = new Date(tanggalAkhir);
        tanggalAkhirModified.setHours(23, 59, 59);

        return await axios.get(
          `${process.env.REACT_APP_BASE_API}/transaksi?firstDate=${tanggalAwal}&lastDate=${tanggalAkhirModified}`,
        );
      } else {
        return await axios.get(`${process.env.REACT_APP_BASE_API}/transaksi`);
      }
    },
    onSuccess: (data) => {
      setTransaksiData(data.data.data.listTransaksi);
      // console.log(data.data.data);
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
      size: landscape !important;
    }`;
  };

  useEffect(() => {
    refetch();
  }, [tanggalAwal, tanggalAkhir]);

  return (
    <section ref={ref}>
      <style>{setStyles()}</style>
      <div className="flex flex-col gap-2 font-archivo">
        <div className="flex w-full items-center justify-center">
          <img src="/logo-kop.png" alt="" className="aspect-auto h-24" />
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="font-archivo text-xl font-bold">Jurnal</p>
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
        <table className="w-full border-collapse rounded-lg border-2 border-neutral-500 text-[8pt]">
          <thead>
            <tr className="border bg-amber-300">
              <th className="px-3 py-2 text-center">Tanggal</th>
              <th className="px-3 py-2 text-center">Transaksi</th>
              <th className="px-3 py-2 text-center">Nama Akun</th>
              <th className="px-3 py-2 text-center">Keterangan</th>
              <th className="px-3 py-2 text-center">Jumlah</th>
              <th className="px-3 py-2 text-center">Akun</th>
              <th className="px-3 py-2 text-center">Debet</th>
              <th className="px-3 py-2 text-center">Kredit</th>
            </tr>
          </thead>
          <tbody>
            {!!transaksiData && transaksiData.length !== 0 ? (
              transaksiData.map((item, index) => {
                const { id } = item;

                // console.log(item.tanggal);
                // console.log(formatterTime.format(new Date(item.tanggal)));

                return (
                  <Fragment key={id}>
                    <tr>
                      <td
                        rowSpan={
                          item.namaAkunTransaksiDalamJenisTransaksi.nama ===
                          "Pendapatan DP"
                            ? 4
                            : 2
                        }
                        className="border-2 border-neutral-500 px-4 py-1 text-left">
                        {formatterTime.format(new Date(item.tanggal))}
                      </td>
                      <td
                        rowSpan={
                          item.namaAkunTransaksiDalamJenisTransaksi.nama ===
                          "Pendapatan DP"
                            ? 4
                            : 2
                        }
                        className="border-2 border-neutral-500 px-4 py-1 text-left">
                        {item.jenis_transaksi.nama}
                      </td>
                      <td
                        rowSpan={
                          item.namaAkunTransaksiDalamJenisTransaksi.nama ===
                          "Pendapatan DP"
                            ? 4
                            : 2
                        }
                        className="border-2 border-neutral-500 px-4 py-1 text-left">
                        {item.namaAkunTransaksiDalamJenisTransaksi.nama ===
                        "Pendapatan DP"
                          ? "Pendapatan"
                          : item.namaAkunTransaksiDalamJenisTransaksi.nama}
                      </td>
                      <td
                        rowSpan={
                          item.namaAkunTransaksiDalamJenisTransaksi.nama ===
                          "Pendapatan DP"
                            ? 4
                            : 2
                        }
                        className="border-2 border-neutral-500 px-4 py-1 text-left">
                        {item.keterangan}
                      </td>
                      <td
                        rowSpan={2}
                        className="border-2 border-neutral-500 px-4 py-1 text-right">
                        {item.namaAkunTransaksiDalamJenisTransaksi.nama ===
                        "Pendapatan DP"
                          ? convertIDRCurrency(item.jumlah / 0.3)
                          : convertIDRCurrency(item.jumlah)}
                      </td>
                      <td
                        rowSpan={1}
                        className="border-2 border-neutral-500 px-4 py-1 align-top">
                        {
                          item?.namaAkunTransaksiDalamJenisTransaksi
                            ?.akunTransaksi[0]?.namaAkunTransaksi?.nama
                        }
                        {/* {console.log(
                            item?.namaAkunTransaksiDalamJenisTransaksi
                              ?.akunTransaksi[0]?.namaAkunTransaksi?.nama,
                          )} */}
                      </td>
                      <td
                        rowSpan={1}
                        className="border-2 border-neutral-500 px-4 py-1 text-right align-top">
                        {item.namaAkunTransaksiDalamJenisTransaksi.nama ===
                        "Pendapatan DP"
                          ? convertIDRCurrency(item.jumlah / 0.3)
                          : ""}
                        {item?.namaAkunTransaksiDalamJenisTransaksi
                          ?.akunTransaksi[0]?.namaAkunTransaksi?.nama !==
                          undefined &&
                        item.namaAkunTransaksiDalamJenisTransaksi.nama !==
                          "Pendapatan DP"
                          ? convertIDRCurrency(item.jumlah)
                          : ""}
                      </td>
                      <td
                        rowSpan={1}
                        className="border-2 border-neutral-500 px-4 py-1 text-left align-bottom"></td>
                    </tr>
                    <tr>
                      <td
                        rowSpan={1}
                        className="border-2 border-neutral-500 px-4 py-1 align-top">
                        {
                          item.namaAkunTransaksiDalamJenisTransaksi
                            ?.akunTransaksi[1]?.namaAkunTransaksi?.nama
                        }
                      </td>
                      <td
                        rowSpan={1}
                        className="border-2 border-neutral-500 px-4 py-1 text-left"></td>
                      <td
                        rowSpan={1}
                        className="border-2 border-neutral-500 px-4 py-1 text-right align-top">
                        {item.namaAkunTransaksiDalamJenisTransaksi.nama ===
                        "Pendapatan DP"
                          ? convertIDRCurrency(item.jumlah / 0.3)
                          : ""}
                        {item?.namaAkunTransaksiDalamJenisTransaksi
                          ?.akunTransaksi[0]?.namaAkunTransaksi?.nama !==
                          undefined &&
                        item.namaAkunTransaksiDalamJenisTransaksi.nama !==
                          "Pendapatan DP"
                          ? convertIDRCurrency(item.jumlah)
                          : ""}
                      </td>
                    </tr>
                    {item.namaAkunTransaksiDalamJenisTransaksi.nama ===
                      "Pendapatan DP" && (
                      <>
                        <tr>
                          <td
                            rowSpan={2}
                            className="border-2 border-neutral-500 px-4 py-1 text-right align-middle">
                            {convertIDRCurrency(item.jumlah)}
                          </td>
                          <td className="border-2 border-neutral-500 px-4 py-1 align-top">
                            {
                              item.namaAkunTransaksiDalamJenisTransaksi
                                ?.akunTransaksi[2]?.namaAkunTransaksi?.nama
                            }
                          </td>
                          <td className="border-2 border-neutral-500 px-4 py-1 text-right align-top">
                            {convertIDRCurrency(item.jumlah)}
                          </td>
                          <td className="border-2 border-neutral-500 px-4 py-1 text-right align-top"></td>
                        </tr>
                        <tr>
                          <td className="border-2 border-neutral-500 px-4 py-1 align-top">
                            {
                              item.namaAkunTransaksiDalamJenisTransaksi
                                ?.akunTransaksi[3]?.namaAkunTransaksi?.nama
                            }
                          </td>
                          <td className="border-2 border-neutral-500 px-4 py-1 text-right align-top"></td>
                          <td className="border-2 border-neutral-500 px-4 py-1 text-right align-top">
                            {convertIDRCurrency(item.jumlah)}
                          </td>
                        </tr>
                      </>
                    )}
                  </Fragment>
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
