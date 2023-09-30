import React, { useState, useEffect, Fragment } from "react";
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

export const Jurnal = () => {
  const [transaksiData, setTransaksiData] = useState();
  const [tanggalAwal, setTanggalAwal] = useState();
  const [tanggalAkhir, setTanggalAkhir] = useState();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  // console.log(search);

  // console.log(tanggalAwal);

  console.log(transaksiData?.length);

  const { refetch } = useQuery({
    queryKey: ["transaksi"],
    queryFn: async () => {
      if (!!tanggalAwal && !!tanggalAkhir && !!search) {
        let tanggalAkhirModified = new Date(tanggalAkhir);
        tanggalAkhirModified.setHours(23, 59, 59);

        return await axios.get(
          `${process.env.REACT_APP_BASE_API}/transaksi?firstDate=${tanggalAwal}&lastDate=${tanggalAkhirModified}&search=${search}&page=${page}`,
        );
      } else if (!!tanggalAwal && !!tanggalAkhir) {
        let tanggalAkhirModified = new Date(tanggalAkhir);
        tanggalAkhirModified.setHours(23, 59, 59);

        return await axios.get(
          `${process.env.REACT_APP_BASE_API}/transaksi?firstDate=${tanggalAwal}&lastDate=${tanggalAkhirModified}&page=${page}`,
        );
      } else if (!!search) {
        return await axios.get(
          `${process.env.REACT_APP_BASE_API}/transaksi?search=${search}&page=${page}`,
        );
      } else {
        return await axios.get(
          `${process.env.REACT_APP_BASE_API}/transaksi?page=${page}`,
        );
      }
    },
    onSuccess: (data) => {
      setTransaksiData(data.data.data);
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

  useEffect(() => {
    refetch();
  }, [tanggalAwal, tanggalAkhir, search, page]);

  return (
    <section className="flex max-w-full overflow-auto font-archivo">
      <div className="flex w-full flex-col gap-4 font-archivo">
        <div>
          <p className="text-2xl font-bold">Jurnal</p>
        </div>
        <div className="flex justify-between gap-4 rounded-lg bg-neutral-100 p-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setTanggalAwal();
                setTanggalAkhir();
              }}
              className="flex-shrink-0 rounded-lg bg-amber-300 p-2">
              <Refresh />
            </button>
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
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={tanggalAwal}
                    onSelect={setTanggalAwal}
                    initialFocus
                    disabled={{ after: new Date() }}
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
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={tanggalAkhir}
                    onSelect={setTanggalAkhir}
                    initialFocus
                    disabled={{ after: new Date() }}
                  />
                </PopoverContent>
              </Popover>
            </div>
            <button className="flex-shrink-0 rounded-lg bg-amber-300 p-2">
              <Printer />
            </button>
          </div>
          <div className="relative">
            <Search className="absolute bottom-0 left-2 top-0 m-auto" />
            <Input
              className="w-96 px-8 pr-4"
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
          <table className="w-full table-auto border-collapse rounded-lg border-2 text-sm">
            <thead>
              <tr className="border-b-2 bg-amber-300">
                <th className="px-4 py-3 text-center">Tanggal</th>
                <th className="px-4 py-3 text-center">Transaksi</th>
                <th className="px-4 py-3 text-center">Nama Akun</th>
                <th className="px-4 py-3 text-center">Keterangan</th>
                <th className="px-4 py-3 text-center">Jumlah</th>
                <th className="px-4 py-3 text-center">Akun</th>
                <th className="px-4 py-3 text-center">Debet</th>
                <th className="px-4 py-3 text-center">Kredit</th>
              </tr>
            </thead>
            <tbody>
              {!!transaksiData &&
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
                          className="border border-black px-4 py-1 text-left">
                          {formatterTime.format(new Date(item.tanggal))}
                        </td>
                        <td
                          rowSpan={
                            item.namaAkunTransaksiDalamJenisTransaksi.nama ===
                            "Pendapatan DP"
                              ? 4
                              : 2
                          }
                          className="border border-black px-4 py-1 text-left">
                          {item.jenis_transaksi.nama}
                        </td>
                        <td
                          rowSpan={
                            item.namaAkunTransaksiDalamJenisTransaksi.nama ===
                            "Pendapatan DP"
                              ? 4
                              : 2
                          }
                          className="border border-black px-4 py-1 text-left">
                          {item.namaAkunTransaksiDalamJenisTransaksi.nama}
                        </td>
                        <td
                          rowSpan={
                            item.namaAkunTransaksiDalamJenisTransaksi.nama ===
                            "Pendapatan DP"
                              ? 4
                              : 2
                          }
                          className="border border-black px-4 py-1 text-left">
                          {item.keterangan}
                        </td>
                        <td
                          rowSpan={2}
                          className="border border-black px-4 py-1 text-right">
                          {item.namaAkunTransaksiDalamJenisTransaksi.nama === "Pendapatan DP"  ? convertIDRCurrency(item.jumlah / 0.3) : convertIDRCurrency(item.jumlah)}
                        </td>
                        <td
                          rowSpan={1}
                          className="border border-black px-4 py-1 align-top">
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
                          className="border border-black px-4 py-1 text-right align-top">
                            {item.namaAkunTransaksiDalamJenisTransaksi.nama === "Pendapatan DP"  ? convertIDRCurrency(item.jumlah / 0.3) : ""}
                          {item?.namaAkunTransaksiDalamJenisTransaksi
                            ?.akunTransaksi[0]?.namaAkunTransaksi?.nama !==
                          undefined && item.namaAkunTransaksiDalamJenisTransaksi.nama !==
                          "Pendapatan DP"
                            ? convertIDRCurrency(item.jumlah)
                            : ""}
                        </td>
                        <td
                          rowSpan={1}
                          className="border border-black px-4 py-1 text-left align-bottom"></td>
                      </tr>
                      <tr>
                        <td
                          rowSpan={1}
                          className="border border-black px-4 py-1 align-top">
                          {
                            item.namaAkunTransaksiDalamJenisTransaksi
                              ?.akunTransaksi[1]?.namaAkunTransaksi?.nama
                          }
                        </td>
                        <td
                          rowSpan={1}
                          className="border border-black px-4 py-1 text-left"></td>
                        <td
                          rowSpan={1}
                          className="border border-black px-4 py-1 text-right align-top">
                          {item.namaAkunTransaksiDalamJenisTransaksi.nama === "Pendapatan DP"  ? convertIDRCurrency(item.jumlah / 0.3) : ""}
                          {item?.namaAkunTransaksiDalamJenisTransaksi
                            ?.akunTransaksi[0]?.namaAkunTransaksi?.nama !==
                          undefined && item.namaAkunTransaksiDalamJenisTransaksi.nama !==
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
                              className="border border-black px-4 py-1 text-right align-middle">
                              {convertIDRCurrency(item.jumlah)}
                            </td>
                            <td className="border border-black px-4 py-1 align-top">
                              {
                                item.namaAkunTransaksiDalamJenisTransaksi
                                  ?.akunTransaksi[2]?.namaAkunTransaksi?.nama
                              }
                            </td>
                            <td className="border border-black px-4 py-1 text-right align-top">
                              {convertIDRCurrency(item.jumlah )}
                            </td>
                            <td className="border border-black px-4 py-1 text-right align-top"></td>
                          </tr>
                          <tr>
                            <td className="border border-black px-4 py-1 align-top">
                              {
                                item.namaAkunTransaksiDalamJenisTransaksi
                                  ?.akunTransaksi[3]?.namaAkunTransaksi?.nama
                              }
                            </td>
                            <td className="border border-black px-4 py-1 text-right align-top"></td>
                            <td className="border border-black px-4 py-1 text-right align-top">
                              {convertIDRCurrency(item.jumlah)}
                            </td>
                          </tr>
                        </>
                      )}
                    </Fragment>
                  );
                })}
              {/* {!!transaksiData &&
                transaksiData.map((item, index) => {
                  console.log(item);
                  const {
                    id,
                    jenis_transaksi: { nama: jenisTransaksi },
                    namaAkunTransaksiDalamJenisTransaksi: { nama: namaAkunTransaksi },
                    keterangan,
                    jumlah,
                    tanggal,
                  } = item;

                  const tanggalWITA = formatterTime.format(new Date(tanggal));
                  const jumlahIDR = formatterCurrency.format(jumlah);

                  let jumlahDPIDR;

                  if (namaAkunTransaksi === "Pendapatan DP") {
                    jumlahDPIDR = jumlah * 0.3;
                    jumlahDPIDR = formatterCurrency.format(jumlahDPIDR);
                  }

                  return (
                    <React.Fragment key={id}>
                      <tr>
                        <td
                          rowSpan={
                            namaAkunTransaksi === "Pendapatan DP" ? 4 : 2
                          }
                          className="border border-black px-4 py-1 text-left">
                          {tanggalWITA}
                        </td>
                        <td
                          rowSpan={
                            namaAkunTransaksi === "Pendapatan DP" ? 4 : 2
                          }
                          className="border border-black px-4 py-1 text-left">
                          {jenisTransaksi}
                        </td>
                        <td
                          rowSpan={
                            namaAkunTransaksi === "Pendapatan DP" ? 4 : 2
                          }
                          className="border border-black px-4 py-1 text-left">
                          {namaAkunTransaksi}
                        </td>
                        <td
                          rowSpan={
                            namaAkunTransaksi === "Pendapatan DP" ? 4 : 2
                          }
                          className="border border-black px-4 py-1 text-left">
                          {keterangan}
                        </td>
                        <td
                          rowSpan={2}
                          className="border border-black px-4 py-1 text-right">
                          {jumlahIDR}
                        </td>
                        <td
                          rowSpan={1}
                          className="border border-black px-4 py-1 text-left">
                          {jenisTransaksi === "Pemasukan" &&
                          namaAkunTransaksi === "Pendapatan"
                            ? "Kas"
                            : null}
                          {jenisTransaksi === "Pemasukan" &&
                          namaAkunTransaksi === "Pendapatan DP"
                            ? "Piutang"
                            : null}
                          {jenisTransaksi !== "Pemasukan"
                            ? `${namaAkunTransaksi}`
                            : null}
                        </td>
                        <td
                          rowSpan={1}
                          className="border border-black px-4 py-1 text-right align-top">
                          {jumlahIDR}
                        </td>
                        <td
                          rowSpan={1}
                          className="border border-black px-4 py-1 text-left align-bottom"></td>
                      </tr>
                      <tr>
                        <td
                          rowSpan={1}
                          className="border border-black px-4 py-1 text-left">
                          {jenisTransaksi === "Pemasukan"
                            ? "Pendapatan"
                            : "Kas"}
                          {!namaAkunTransaksi === "Pendapatan" &&
                          "Pendapatan DP"
                            ? "Kas"
                            : null}
                        </td>
                        <td
                          rowSpan={1}
                          className="border border-black px-4 py-1 text-left"></td>
                        <td
                          rowSpan={1}
                          className="border border-black px-4 py-1 text-right align-bottom">
                          {jumlahIDR}
                        </td>
                      </tr>
                      {namaAkunTransaksi === "Pendapatan DP" && (
                        <>
                          <tr>
                            <td
                              rowSpan={2}
                              className="border border-black px-4 py-1 text-right align-middle">
                              {jumlahDPIDR}
                            </td>
                            <td className="border border-black px-4 py-1 align-top">
                              Kas
                            </td>
                            <td className="border border-black px-4 py-1 text-right align-top">
                              {jumlahDPIDR}
                            </td>
                            <td className="border border-black px-4 py-1 text-right align-top"></td>
                          </tr>
                          <tr>
                            <td className="border border-black px-4 py-1 align-top">
                              Piutang
                            </td>
                            <td className="border border-black px-4 py-1 text-right align-top"></td>
                            <td className="border border-black px-4 py-1 text-right align-top">
                              {jumlahDPIDR}
                            </td>
                          </tr>
                        </>
                      )}
                    </React.Fragment>
                  );
                })} */}
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
