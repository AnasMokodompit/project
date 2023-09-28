import React, { useState } from "react";
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

export const Jurnal = () => {
  const [transaksiData, setTransaksiData] = useState();
  const [tanggalAwal, setTanggalAwal] = useState();
  const [tanggalAkhir, setTanggalAkhir] = useState();

  const { refetch } = useQuery({
    queryKey: ["transaksi"],
    queryFn: async () => {
      return await axios.get(`${process.env.REACT_APP_BASE_API}/transaksi`);
    },
    onSuccess: (data) => {
      // console.log(data.data.data);
      setTransaksiData(data.data.data);
    },
  });

  const optionsTime = {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "Asia/Makassar",
  };
  const formatterTime = new Intl.DateTimeFormat("id-ID", optionsTime);

  const optionsCurrency = {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  };
  const formatterCurrency = new Intl.NumberFormat("id-ID", optionsCurrency);

  // console.log(transaksiData);

  return (
    <section className="flex max-w-full overflow-auto font-archivo">
      <div className="flex w-full flex-col gap-4 font-archivo">
        <div>
          <p className="text-2xl font-bold">Jurnal</p>
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
                <PopoverContent className="w-auto p-0">
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
                <PopoverContent className="w-auto p-0">
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
          <div>
            <Input className="w-60" placeholder="Cari" />
          </div>
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
                  console.log(item);
                  const {
                    id,
                    jenis_transaksi: { nama: jenisTransaksi },
                    nama_akun_transaksi: { nama: namaAkunTransaksi },
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
                })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};
