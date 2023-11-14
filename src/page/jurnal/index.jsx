import React, {
  useState,
  useEffect,
  useRef,
  forwardRef,
  Fragment,
} from "react";
import { useReactToPrint } from "react-to-print";
import { useForm } from "react-hook-form";
import { useQuery, useMutation } from "@tanstack/react-query";
import { format } from "date-fns";
import { id as indonesia } from "date-fns/locale";
import axios from "axios";

import { cn } from "../../utils/cn";

import { Button } from "../../componet/button";
import { Calendar } from "../../componet/calendar";
import { Input } from "../../componet/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "../../componet/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../componet/popover";
import { Textarea } from "../../componet/textarea";

import Search from "../../Asset/icons/untitled-ui-icons/line/components/SearchLg";
import CalendarIcon from "../../Asset/icons/untitled-ui-icons/line/components/Calendar";
import Printer from "../../Asset/icons/untitled-ui-icons/line/components/Printer";
import Minus from "../../Asset/icons/untitled-ui-icons/line/components/Minus";
import Refresh from "../../Asset/icons/untitled-ui-icons/line/components/RefreshCw04";
import ChevronLeft from "../../Asset/icons/untitled-ui-icons/line/components/ChevronLeft";
import ChevronRight from "../../Asset/icons/untitled-ui-icons/line/components/ChevronRight";
import ChevronDown from "../../Asset/icons/untitled-ui-icons/line/components/ChevronDown";
import Edit from "../../Asset/icons/untitled-ui-icons/line/components/Edit03";
import Delete from "../../Asset/icons/untitled-ui-icons/line/components/Delete";

export const Jurnal = () => {
  const formEdit = useForm({
    defaultValues: {
      keterangan: "",
      jumlah: "",
      tanggal: "",
    },
  });

  const [transaksiData, setTransaksiData] = useState();
  const [transaskiDataSingle, setTransaksiDataSingle] = useState();
  const [idTransaksi, setIdTransaksi] = useState();

  const [jumlah, setJumlah] = useState();
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
      setTransaksiData(data?.data?.data?.listTransaksi);
      setOldestDate(data?.data?.data?.oldestDate);
      setJumlah(data?.data?.data?.jumlah);
    },
  });

  const { mutate: updateTransaksi } = useMutation({
    mutationFn: async (data) => {
      return await axios.patch(
        `${process.env.REACT_APP_BASE_API}/transaksi/${idTransaksi}`,
        data,
      );
    },
    onSuccess: (data) => {
      console.log(data);
      refetch();
    },
  });

  const { mutate: deleteTransaksi } = useMutation({
    mutationFn: async () => {
      await axios.delete(
        `${process.env.REACT_APP_BASE_API}/transaksi/${idTransaksi}`,
      );
    },
    onSuccess: (data) => {
      console.log(data);
      refetch();
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
    function getObjectById(data, id) {
      for (let i = 0; i < data?.length; i++) {
        if (data[i].id === id) {
          return data[i];
        }
      }
      return null;
    }

    if (!!transaksiData) {
      const data = getObjectById(transaksiData, idTransaksi);

      const jumlah = data?.jumlah;
      const keterangan = data?.keterangan;
      const tanggal = data?.tanggal;

      formEdit.reset({
        jumlah,
        keterangan,
        tanggal: new Date(tanggal),
      });
    }
  }, [idTransaksi]);

  useEffect(() => {
    refetch();
  }, [tanggalAwal, tanggalAkhir, search, page]);

  const onSubmitUpdate = formEdit.handleSubmit((data) => {
    const jumlah = data?.jumlah;
    const keterangan = data?.keterangan;
    const tanggal = data?.tanggal;

    updateTransaksi({
      keterangan,
      jumlah: Number(jumlah),
      tanggal,
    });
  });

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
                      format(tanggalAwal, "PPP", { locale: indonesia })
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
                      format(tanggalAkhir, "PPP", { locale: indonesia })
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
                <th className="p-2 text-center"></th>
              </tr>
            </thead>
            <tbody>
              {!!transaksiData && transaksiData.length !== 0 ? (
                transaksiData.map((item, index) => {
                  const { id } = item;

                  console.log(item);
                  return (
                    <Fragment key={id}>
                      <tr>
                        <td
                          rowSpan={
                            item?.namaAkunTransaksiDalamJenisTransaksi.nama ===
                            "Pendapatan DP Meubel"
                              ? 9
                              : item?.namaAkunTransaksiDalamJenisTransaksi
                                  .nama === "Pendapatan Meubel"
                              ? 5
                              : item?.namaAkunTransaksiDalamJenisTransaksi
                                  .nama === "Pendapatan DP"
                              ? 4
                              : 2
                          }
                          className="border-2 border-neutral-500 px-4 py-1 text-left">
                          {formatterTime.format(new Date(item?.tanggal))}
                        </td>
                        <td
                          rowSpan={
                            item?.namaAkunTransaksiDalamJenisTransaksi.nama ===
                            "Pendapatan DP Meubel"
                              ? 9
                              : item?.namaAkunTransaksiDalamJenisTransaksi
                                  .nama === "Pendapatan Meubel"
                              ? 5
                              : item?.namaAkunTransaksiDalamJenisTransaksi
                                  .nama === "Pendapatan DP"
                              ? 4
                              : 2
                          }
                          className="border-2 border-neutral-500 px-4 py-1 text-left">
                          {item?.jenis_transaksi.nama}
                        </td>
                        <td
                          rowSpan={
                            item?.namaAkunTransaksiDalamJenisTransaksi.nama ===
                            "Pendapatan DP Meubel"
                              ? 9
                              : item?.namaAkunTransaksiDalamJenisTransaksi
                                  .nama === "Pendapatan Meubel"
                              ? 5
                              : item?.namaAkunTransaksiDalamJenisTransaksi
                                  .nama === "Pendapatan DP"
                              ? 4
                              : 2
                          }
                          className="border-2 border-neutral-500 px-4 py-1 text-left">
                          {item?.namaAkunTransaksiDalamJenisTransaksi.nama ===
                          "Pendapatan DP"
                            ? "Pendapatan"
                            : item?.namaAkunTransaksiDalamJenisTransaksi.nama}
                        </td>
                        <td
                          rowSpan={
                            item?.namaAkunTransaksiDalamJenisTransaksi.nama ===
                            "Pendapatan DP Meubel"
                              ? 9
                              : item?.namaAkunTransaksiDalamJenisTransaksi
                                  .nama === "Pendapatan Meubel"
                              ? 5
                              : item?.namaAkunTransaksiDalamJenisTransaksi
                                  .nama === "Pendapatan DP"
                              ? 4
                              : 2
                          }
                          className="border-2 border-neutral-500 px-4 py-1 text-left">
                          {item?.keterangan}
                        </td>
                        <td
                          rowSpan={
                            item?.namaAkunTransaksiDalamJenisTransaksi.nama ===
                            "Pendapatan DP Meubel"
                              ? 4
                              : 2
                          }
                          className="border-2 border-neutral-500 px-4 py-1 text-right">
                          {item?.namaAkunTransaksiDalamJenisTransaksi.nama ===
                          "Pendapatan DP"
                            ? convertIDRCurrency(item?.jumlah / 0.3)
                            : convertIDRCurrency(item?.jumlah)}
                        </td>
                        <td
                          rowSpan={1}
                          className="border-2 border-neutral-500 px-4 py-1 align-top">
                          {
                            item?.namaAkunTransaksiDalamJenisTransaksi
                              ?.akunTransaksi[0]?.namaAkunTransaksi?.nama
                          }
                        </td>
                        <td
                          rowSpan={1}
                          className="border-2 border-neutral-500 px-4 py-1 text-right align-top">
                          {item?.namaAkunTransaksiDalamJenisTransaksi.nama ===
                          "Pendapatan DP"
                            ? convertIDRCurrency(item?.jumlah / 0.3)
                            : ""}
                          {item?.namaAkunTransaksiDalamJenisTransaksi.nama ===
                          "Pendapatan DP Meubel"
                            ? convertIDRCurrency(item?.jumlah / 0.3)
                            : ""}
                          {item?.namaAkunTransaksiDalamJenisTransaksi
                            ?.akunTransaksi[0]?.namaAkunTransaksi?.nama !==
                            undefined &&
                          item?.namaAkunTransaksiDalamJenisTransaksi.nama !==
                            "Pendapatan DP" &&
                          item?.namaAkunTransaksiDalamJenisTransaksi.nama !==
                            "Pendapatan DP Meubel"
                            ? convertIDRCurrency(item?.jumlah)
                            : ""}
                        </td>
                        <td
                          rowSpan={1}
                          className="border-2 border-neutral-500 px-4 py-1 text-left align-bottom"></td>
                        <td
                          rowSpan={
                            item?.namaAkunTransaksiDalamJenisTransaksi.nama ===
                            "Pendapatan DP Meubel"
                              ? 9
                              : item?.namaAkunTransaksiDalamJenisTransaksi
                                  .nama === "Pendapatan Meubel"
                              ? 5
                              : item?.namaAkunTransaksiDalamJenisTransaksi
                                  .nama === "Pendapatan DP"
                              ? 4
                              : 2
                          }
                          className="border-2 border-neutral-500 p-1 text-center">
                          <div className="flex items-center justify-center gap-2">
                            <Popover>
                              <PopoverTrigger asChild>
                                <button
                                  className="flex flex-shrink-0 items-center gap-2 rounded-lg bg-amber-300 p-2 text-white"
                                  onClick={() => {
                                    setIdTransaksi(id);
                                  }}>
                                  <Edit className="flex-shrink-0 text-sm text-neutral-900" />
                                </button>
                              </PopoverTrigger>
                              <PopoverContent
                                side="left"
                                align="start"
                                className="w-[32rem]">
                                <Form {...formEdit}>
                                  <FormField
                                    control={formEdit.control}
                                    name="tanggal"
                                    render={({ field }) => (
                                      <FormItem className="flex flex-col">
                                        <FormLabel>Tanggal Transaksi</FormLabel>
                                        <Popover>
                                          <PopoverTrigger asChild>
                                            <FormControl>
                                              <Button
                                                variant={"outline"}
                                                className={cn(
                                                  "text-left font-normal",
                                                  !field.value &&
                                                    "text-muted-foreground",
                                                )}>
                                                {field.value ? (
                                                  format(field.value, "PPP", {
                                                    locale: indonesia,
                                                  })
                                                ) : (
                                                  <span>Pilih Tanggal</span>
                                                )}
                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                              </Button>
                                            </FormControl>
                                          </PopoverTrigger>
                                          <PopoverContent
                                            className="w-auto p-0"
                                            align="start">
                                            <Calendar
                                              mode="single"
                                              selected={field.value}
                                              onSelect={field.onChange}
                                              initialFocus
                                            />
                                          </PopoverContent>
                                        </Popover>
                                      </FormItem>
                                    )}
                                  />
                                  <FormField
                                    control={formEdit.control}
                                    name="keterangan"
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormLabel>Keterangan</FormLabel>
                                        <FormControl>
                                          <Textarea
                                            className="min-h-[5rem] w-full border-2 border-neutral-500 font-archivo"
                                            {...field}
                                          />
                                        </FormControl>
                                      </FormItem>
                                    )}
                                  />
                                  <FormField
                                    control={formEdit.control}
                                    name="jumlah"
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormLabel>Jumlah</FormLabel>
                                        <FormControl>
                                          <div className="relative">
                                            <Input
                                              className="z-20 w-full border-2 border-neutral-500 text-right font-archivo"
                                              {...field}
                                              onKeyDown={restrictAlphabet}
                                            />
                                            <div className="absolute left-4 top-1/2 m-auto flex -translate-y-1/2 items-center">
                                              <p className="font-archivo text-sm">
                                                Rp.
                                              </p>
                                            </div>
                                          </div>
                                        </FormControl>
                                      </FormItem>
                                    )}
                                  />
                                  <Button
                                    variant="sm"
                                    className="mt-3 w-full border-2 border-neutral-500 bg-amber-300 font-bold"
                                    onClick={() => onSubmitUpdate()}
                                    type="submit">
                                    Simpan Perubahan
                                  </Button>
                                </Form>
                              </PopoverContent>
                            </Popover>
                            <button
                              className="flex flex-shrink-0 items-center gap-2 rounded-lg bg-red-500 p-2 text-white"
                              onClick={() => {
                                setIdTransaksi(id);
                                deleteTransaksi();
                              }}>
                              <Delete className="flex-shrink-0 text-sm text-white" />
                            </button>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td
                          rowSpan={1}
                          className="border-2 border-neutral-500 px-4 py-1 align-top">
                          {
                            item?.namaAkunTransaksiDalamJenisTransaksi
                              ?.akunTransaksi[1]?.namaAkunTransaksi?.nama
                          }
                        </td>
                        <td
                          rowSpan={1}
                          className="border-2 border-neutral-500 px-4 py-1 text-left"></td>
                        <td
                          rowSpan={1}
                          className="border-2 border-neutral-500 px-4 py-1 text-right align-top">
                          {item?.namaAkunTransaksiDalamJenisTransaksi.nama ===
                          "Pendapatan DP"
                            ? convertIDRCurrency(item?.jumlah / 0.3)
                            : ""}
                          {item?.namaAkunTransaksiDalamJenisTransaksi.nama ===
                          "Pendapatan DP Meubel"
                            ? convertIDRCurrency(item?.jumlah / 0.3 / 1.125)
                            : ""}
                          {item?.namaAkunTransaksiDalamJenisTransaksi
                            ?.akunTransaksi[0]?.namaAkunTransaksi?.nama !==
                            undefined &&
                          item?.namaAkunTransaksiDalamJenisTransaksi.nama !==
                            "Pendapatan DP" &&
                          item?.namaAkunTransaksiDalamJenisTransaksi.nama !==
                            "Pendapatan DP Meubel"
                            ? convertIDRCurrency(item?.jumlah)
                            : ""}
                        </td>
                      </tr>
                      {item?.namaAkunTransaksiDalamJenisTransaksi.nama ===
                        "Pendapatan DP" && (
                        <>
                          <tr>
                            <td
                              rowSpan={2}
                              className="border-2 border-neutral-500 px-4 py-1 text-right align-middle">
                              {convertIDRCurrency(item?.jumlah)}
                            </td>
                            <td className="border-2 border-neutral-500 px-4 py-1 align-top">
                              {
                                item?.namaAkunTransaksiDalamJenisTransaksi
                                  ?.akunTransaksi[2]?.namaAkunTransaksi?.nama
                              }
                            </td>
                            <td className="border-2 border-neutral-500 px-4 py-1 text-right align-top">
                              {convertIDRCurrency(item?.jumlah)}
                            </td>
                            <td className="border-2 border-neutral-500 px-4 py-1 text-right align-top"></td>
                          </tr>
                          <tr>
                            <td className="border-2 border-neutral-500 px-4 py-1 align-top">
                              {
                                item?.namaAkunTransaksiDalamJenisTransaksi
                                  ?.akunTransaksi[3]?.namaAkunTransaksi?.nama
                              }
                            </td>
                            <td className="border-2 border-neutral-500 px-4 py-1 text-right align-top"></td>
                            <td className="border-2 border-neutral-500 px-4 py-1 text-right align-top">
                              {convertIDRCurrency(item?.jumlah)}
                            </td>
                          </tr>
                        </>
                      )}
                      {item?.namaAkunTransaksiDalamJenisTransaksi.nama ===
                        "Pendapatan DP Meubel" && (
                        <>
                          <tr>
                            <td
                              rowSpan={1}
                              className="border-2 border-neutral-500 px-4 py-1 align-top">
                              {
                                item?.namaAkunTransaksiDalamJenisTransaksi
                                  ?.akunTransaksi[3]?.namaAkunTransaksi?.nama
                              }
                            </td>
                            <td
                              rowSpan={1}
                              className="border-2 border-neutral-500 px-4 py-1 text-left"></td>
                            <td
                              rowSpan={1}
                              className="border-2 border-neutral-500 px-4 py-1 text-right align-top">
                              {convertIDRCurrency(
                                (item?.jumlah / 0.3 / 1.125) * 0.11,
                              )}
                            </td>
                          </tr>
                          <tr>
                            <td
                              rowSpan={1}
                              className="border-2 border-neutral-500 px-4 py-1 align-top">
                              {
                                item?.namaAkunTransaksiDalamJenisTransaksi
                                  ?.akunTransaksi[4]?.namaAkunTransaksi?.nama
                              }
                            </td>
                            <td
                              rowSpan={1}
                              className="border-2 border-neutral-500 px-4 py-1 text-left"></td>
                            <td
                              rowSpan={1}
                              className="border-2 border-neutral-500 px-4 py-1 text-right align-top">
                              {convertIDRCurrency(
                                (item?.jumlah / 0.3 / 1.125) * 0.015,
                              )}
                            </td>
                          </tr>
                          <tr>
                            <td
                              rowSpan={5}
                              className="border-2 border-neutral-500 px-4 py-1 text-right align-middle">
                              {convertIDRCurrency(item?.jumlah)}
                            </td>
                            <td
                              rowSpan={1}
                              className="border-2 border-neutral-500 px-4 py-1 align-top">
                              {
                                item?.namaAkunTransaksiDalamJenisTransaksi
                                  ?.akunTransaksi[5]?.namaAkunTransaksi?.nama
                              }
                            </td>
                            <td
                              rowSpan={1}
                              className="border-2 border-neutral-500 px-4 py-1 text-right">
                              {convertIDRCurrency(item?.jumlah)}
                            </td>
                            <td
                              rowSpan={1}
                              className="border-2 border-neutral-500 px-4 py-1 text-right align-top"></td>
                          </tr>
                          <tr>
                            <td
                              rowSpan={1}
                              className="border-2 border-neutral-500 px-4 py-1 align-top">
                              {
                                item?.namaAkunTransaksiDalamJenisTransaksi
                                  ?.akunTransaksi[6]?.namaAkunTransaksi?.nama
                              }
                            </td>
                            <td
                              rowSpan={1}
                              className="border-2 border-neutral-500 px-4 py-1 text-left"></td>
                            <td
                              rowSpan={1}
                              className="border-2 border-neutral-500 px-4 py-1 text-right align-top">
                              {convertIDRCurrency(item?.jumlah)}
                            </td>
                          </tr>
                          <tr>
                            <td
                              rowSpan={1}
                              className="border-2 border-neutral-500 px-4 py-1 align-top">
                              {
                                item?.namaAkunTransaksiDalamJenisTransaksi
                                  ?.akunTransaksi[7]?.namaAkunTransaksi?.nama
                              }
                            </td>
                            <td
                              rowSpan={1}
                              className="border-2 border-neutral-500 px-4 py-1 text-right">
                              {convertIDRCurrency(
                                (item?.jumlah / 0.3 / 1.125) * 0.11 * 0.3,
                              )}
                            </td>
                            <td
                              rowSpan={1}
                              className="border-2 border-neutral-500 px-4 py-1 text-right align-top"></td>
                          </tr>
                          <tr>
                            <td
                              rowSpan={1}
                              className="border-2 border-neutral-500 px-4 py-1 align-top">
                              {
                                item?.namaAkunTransaksiDalamJenisTransaksi
                                  ?.akunTransaksi[8]?.namaAkunTransaksi?.nama
                              }
                            </td>
                            <td
                              rowSpan={1}
                              className="border-2 border-neutral-500 px-4 py-1 text-right">
                              {convertIDRCurrency(
                                (item?.jumlah / 0.3 / 1.125) * 0.015 * 0.3,
                              )}
                            </td>
                            <td
                              rowSpan={1}
                              className="border-2 border-neutral-500 px-4 py-1 text-right align-top"></td>
                          </tr>
                          <tr>
                            <td
                              rowSpan={1}
                              className="border-2 border-neutral-500 px-4 py-1 align-top">
                              {
                                item?.namaAkunTransaksiDalamJenisTransaksi
                                  ?.akunTransaksi[9]?.namaAkunTransaksi?.nama
                              }
                            </td>
                            <td
                              rowSpan={1}
                              className="border-2 border-neutral-500 px-4 py-1 text-left"></td>
                            <td
                              rowSpan={1}
                              className="border-2 border-neutral-500 px-4 py-1 text-right align-top">
                              {convertIDRCurrency(
                                (item?.jumlah / 0.3 / 1.125) * 0.11 * 0.3 +
                                  (item?.jumlah / 0.3 / 1.125) * 0.015 * 0.3,
                              )}
                            </td>
                          </tr>
                        </>
                      )}
                      {item?.namaAkunTransaksiDalamJenisTransaksi.nama ===
                        "Pendapatan Meubel" && (
                        <>
                          <tr>
                            <td
                              rowSpan={3}
                              className="border-2 border-neutral-500 px-4 py-1 text-right align-middle">
                              {convertIDRCurrency(item?.jumlah)}
                            </td>
                            <td
                              rowSpan={1}
                              className="border-2 border-neutral-500 px-4 py-1 align-top">
                              {
                                item?.namaAkunTransaksiDalamJenisTransaksi
                                  ?.akunTransaksi[2]?.namaAkunTransaksi?.nama
                              }
                            </td>
                            <td
                              rowSpan={1}
                              className="border-2 border-neutral-500 px-4 py-1 text-right">
                              {convertIDRCurrency(
                                (item?.jumlah / 1.125) * 0.11,
                              )}
                            </td>
                            <td
                              rowSpan={1}
                              className="border-2 border-neutral-500 px-4 py-1 text-right align-top"></td>
                          </tr>
                          <tr>
                            <td
                              rowSpan={1}
                              className="border-2 border-neutral-500 px-4 py-1 align-top">
                              {
                                item?.namaAkunTransaksiDalamJenisTransaksi
                                  ?.akunTransaksi[3]?.namaAkunTransaksi?.nama
                              }
                            </td>
                            <td
                              rowSpan={1}
                              className="border-2 border-neutral-500 px-4 py-1 text-right">
                              {convertIDRCurrency(
                                (item?.jumlah / 1.125) * 0.015,
                              )}
                            </td>
                            <td
                              rowSpan={1}
                              className="border-2 border-neutral-500 px-4 py-1 text-right align-top"></td>
                          </tr>
                          <tr>
                            <td
                              rowSpan={1}
                              className="border-2 border-neutral-500 px-4 py-1 align-top">
                              {
                                item?.namaAkunTransaksiDalamJenisTransaksi
                                  ?.akunTransaksi[4]?.namaAkunTransaksi?.nama
                              }
                            </td>
                            <td
                              rowSpan={1}
                              className="border-2 border-neutral-500 px-4 py-1 text-left"></td>
                            <td
                              rowSpan={1}
                              className="border-2 border-neutral-500 px-4 py-1 text-right align-top">
                              {convertIDRCurrency(
                                (item?.jumlah / 1.125) * 0.11 +
                                  (item?.jumlah / 1.125) * 0.015,
                              )}
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
                <td className="p-2 text-right"></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div style={{ display: "none" }}>
          <DokumenJurnal
            ref={refJurnal}
            tanggalAwal={tanggalAwal}
            tanggalAkhir={tanggalAkhir}
            jumlah={jumlah}
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
  const jumlah = props?.jumlah;

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
      setTransaksiData(data?.data?.data?.listTransaksi);
      // console.log(data?.data?.data);
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

                // console.log(item?.tanggal);
                // console.log(formatterTime.format(new Date(item?.tanggal)));

                return (
                  <Fragment key={id}>
                    <tr>
                      <td
                        rowSpan={
                          item?.namaAkunTransaksiDalamJenisTransaksi.nama ===
                          "Pendapatan DP Meubel"
                            ? 9
                            : item?.namaAkunTransaksiDalamJenisTransaksi
                                .nama === "Pendapatan Meubel"
                            ? 5
                            : item?.namaAkunTransaksiDalamJenisTransaksi
                                .nama === "Pendapatan DP"
                            ? 4
                            : 2
                        }
                        className="border-2 border-neutral-500 px-4 py-1 text-left">
                        {formatterTime.format(new Date(item?.tanggal))}
                      </td>
                      <td
                        rowSpan={
                          item?.namaAkunTransaksiDalamJenisTransaksi.nama ===
                          "Pendapatan DP Meubel"
                            ? 9
                            : item?.namaAkunTransaksiDalamJenisTransaksi
                                .nama === "Pendapatan Meubel"
                            ? 5
                            : item?.namaAkunTransaksiDalamJenisTransaksi
                                .nama === "Pendapatan DP"
                            ? 4
                            : 2
                        }
                        className="border-2 border-neutral-500 px-4 py-1 text-left">
                        {item?.jenis_transaksi.nama}
                      </td>
                      <td
                        rowSpan={
                          item?.namaAkunTransaksiDalamJenisTransaksi.nama ===
                          "Pendapatan DP Meubel"
                            ? 9
                            : item?.namaAkunTransaksiDalamJenisTransaksi
                                .nama === "Pendapatan Meubel"
                            ? 5
                            : item?.namaAkunTransaksiDalamJenisTransaksi
                                .nama === "Pendapatan DP"
                            ? 4
                            : 2
                        }
                        className="border-2 border-neutral-500 px-4 py-1 text-left">
                        {item?.namaAkunTransaksiDalamJenisTransaksi.nama ===
                        "Pendapatan DP"
                          ? "Pendapatan"
                          : item?.namaAkunTransaksiDalamJenisTransaksi.nama}
                      </td>
                      <td
                        rowSpan={
                          item?.namaAkunTransaksiDalamJenisTransaksi.nama ===
                          "Pendapatan DP Meubel"
                            ? 9
                            : item?.namaAkunTransaksiDalamJenisTransaksi
                                .nama === "Pendapatan Meubel"
                            ? 5
                            : item?.namaAkunTransaksiDalamJenisTransaksi
                                .nama === "Pendapatan DP"
                            ? 4
                            : 2
                        }
                        className="border-2 border-neutral-500 px-4 py-1 text-left">
                        {item?.keterangan}
                      </td>
                      <td
                        rowSpan={
                          item?.namaAkunTransaksiDalamJenisTransaksi.nama ===
                          "Pendapatan DP Meubel"
                            ? 4
                            : 2
                        }
                        className="border-2 border-neutral-500 px-4 py-1 text-right">
                        {item?.namaAkunTransaksiDalamJenisTransaksi.nama ===
                        "Pendapatan DP"
                          ? convertIDRCurrency(item?.jumlah / 0.3)
                          : convertIDRCurrency(item?.jumlah)}
                      </td>
                      <td
                        rowSpan={1}
                        className="border-2 border-neutral-500 px-4 py-1 align-top">
                        {
                          item?.namaAkunTransaksiDalamJenisTransaksi
                            ?.akunTransaksi[0]?.namaAkunTransaksi?.nama
                        }
                      </td>
                      <td
                        rowSpan={1}
                        className="border-2 border-neutral-500 px-4 py-1 text-right align-top">
                        {item?.namaAkunTransaksiDalamJenisTransaksi.nama ===
                        "Pendapatan DP"
                          ? convertIDRCurrency(item?.jumlah / 0.3)
                          : ""}
                        {item?.namaAkunTransaksiDalamJenisTransaksi.nama ===
                        "Pendapatan DP Meubel"
                          ? convertIDRCurrency(item?.jumlah / 0.3)
                          : ""}
                        {item?.namaAkunTransaksiDalamJenisTransaksi
                          ?.akunTransaksi[0]?.namaAkunTransaksi?.nama !==
                          undefined &&
                        item?.namaAkunTransaksiDalamJenisTransaksi.nama !==
                          "Pendapatan DP" &&
                        item?.namaAkunTransaksiDalamJenisTransaksi.nama !==
                          "Pendapatan DP Meubel"
                          ? convertIDRCurrency(item?.jumlah)
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
                          item?.namaAkunTransaksiDalamJenisTransaksi
                            ?.akunTransaksi[1]?.namaAkunTransaksi?.nama
                        }
                      </td>
                      <td
                        rowSpan={1}
                        className="border-2 border-neutral-500 px-4 py-1 text-left"></td>
                      <td
                        rowSpan={1}
                        className="border-2 border-neutral-500 px-4 py-1 text-right align-top">
                        {item?.namaAkunTransaksiDalamJenisTransaksi.nama ===
                        "Pendapatan DP"
                          ? convertIDRCurrency(item?.jumlah / 0.3)
                          : ""}
                        {item?.namaAkunTransaksiDalamJenisTransaksi.nama ===
                        "Pendapatan DP Meubel"
                          ? convertIDRCurrency(item?.jumlah / 0.3 / 1.125)
                          : ""}
                        {item?.namaAkunTransaksiDalamJenisTransaksi
                          ?.akunTransaksi[0]?.namaAkunTransaksi?.nama !==
                          undefined &&
                        item?.namaAkunTransaksiDalamJenisTransaksi.nama !==
                          "Pendapatan DP" &&
                        item?.namaAkunTransaksiDalamJenisTransaksi.nama !==
                          "Pendapatan DP Meubel"
                          ? convertIDRCurrency(item?.jumlah)
                          : ""}
                      </td>
                    </tr>
                    {item?.namaAkunTransaksiDalamJenisTransaksi.nama ===
                      "Pendapatan DP" && (
                      <>
                        <tr>
                          <td
                            rowSpan={2}
                            className="border-2 border-neutral-500 px-4 py-1 text-right align-middle">
                            {convertIDRCurrency(item?.jumlah)}
                          </td>
                          <td className="border-2 border-neutral-500 px-4 py-1 align-top">
                            {
                              item?.namaAkunTransaksiDalamJenisTransaksi
                                ?.akunTransaksi[2]?.namaAkunTransaksi?.nama
                            }
                          </td>
                          <td className="border-2 border-neutral-500 px-4 py-1 text-right align-top">
                            {convertIDRCurrency(item?.jumlah)}
                          </td>
                          <td className="border-2 border-neutral-500 px-4 py-1 text-right align-top"></td>
                        </tr>
                        <tr>
                          <td className="border-2 border-neutral-500 px-4 py-1 align-top">
                            {
                              item?.namaAkunTransaksiDalamJenisTransaksi
                                ?.akunTransaksi[3]?.namaAkunTransaksi?.nama
                            }
                          </td>
                          <td className="border-2 border-neutral-500 px-4 py-1 text-right align-top"></td>
                          <td className="border-2 border-neutral-500 px-4 py-1 text-right align-top">
                            {convertIDRCurrency(item?.jumlah)}
                          </td>
                        </tr>
                      </>
                    )}
                    {item?.namaAkunTransaksiDalamJenisTransaksi.nama ===
                      "Pendapatan DP Meubel" && (
                      <>
                        <tr>
                          <td
                            rowSpan={1}
                            className="border-2 border-neutral-500 px-4 py-1 align-top">
                            {
                              item?.namaAkunTransaksiDalamJenisTransaksi
                                ?.akunTransaksi[3]?.namaAkunTransaksi?.nama
                            }
                          </td>
                          <td
                            rowSpan={1}
                            className="border-2 border-neutral-500 px-4 py-1 text-left"></td>
                          <td
                            rowSpan={1}
                            className="border-2 border-neutral-500 px-4 py-1 text-right align-top">
                            {convertIDRCurrency(
                              (item?.jumlah / 0.3 / 1.125) * 0.11,
                            )}
                          </td>
                        </tr>
                        <tr>
                          <td
                            rowSpan={1}
                            className="border-2 border-neutral-500 px-4 py-1 align-top">
                            {
                              item?.namaAkunTransaksiDalamJenisTransaksi
                                ?.akunTransaksi[4]?.namaAkunTransaksi?.nama
                            }
                          </td>
                          <td
                            rowSpan={1}
                            className="border-2 border-neutral-500 px-4 py-1 text-left"></td>
                          <td
                            rowSpan={1}
                            className="border-2 border-neutral-500 px-4 py-1 text-right align-top">
                            {convertIDRCurrency(
                              (item?.jumlah / 0.3 / 1.125) * 0.015,
                            )}
                          </td>
                        </tr>
                        <tr>
                          <td
                            rowSpan={5}
                            className="border-2 border-neutral-500 px-4 py-1 text-right align-middle">
                            {convertIDRCurrency(item?.jumlah)}
                          </td>
                          <td
                            rowSpan={1}
                            className="border-2 border-neutral-500 px-4 py-1 align-top">
                            {
                              item?.namaAkunTransaksiDalamJenisTransaksi
                                ?.akunTransaksi[5]?.namaAkunTransaksi?.nama
                            }
                          </td>
                          <td
                            rowSpan={1}
                            className="border-2 border-neutral-500 px-4 py-1 text-right">
                            {convertIDRCurrency(item?.jumlah)}
                          </td>
                          <td
                            rowSpan={1}
                            className="border-2 border-neutral-500 px-4 py-1 text-right align-top"></td>
                        </tr>
                        <tr>
                          <td
                            rowSpan={1}
                            className="border-2 border-neutral-500 px-4 py-1 align-top">
                            {
                              item?.namaAkunTransaksiDalamJenisTransaksi
                                ?.akunTransaksi[6]?.namaAkunTransaksi?.nama
                            }
                          </td>
                          <td
                            rowSpan={1}
                            className="border-2 border-neutral-500 px-4 py-1 text-left"></td>
                          <td
                            rowSpan={1}
                            className="border-2 border-neutral-500 px-4 py-1 text-right align-top">
                            {convertIDRCurrency(item?.jumlah)}
                          </td>
                        </tr>
                        <tr>
                          <td
                            rowSpan={1}
                            className="border-2 border-neutral-500 px-4 py-1 align-top">
                            {
                              item?.namaAkunTransaksiDalamJenisTransaksi
                                ?.akunTransaksi[7]?.namaAkunTransaksi?.nama
                            }
                          </td>
                          <td
                            rowSpan={1}
                            className="border-2 border-neutral-500 px-4 py-1 text-right">
                            {convertIDRCurrency(
                              (item?.jumlah / 0.3 / 1.125) * 0.11 * 0.3,
                            )}
                          </td>
                          <td
                            rowSpan={1}
                            className="border-2 border-neutral-500 px-4 py-1 text-right align-top"></td>
                        </tr>
                        <tr>
                          <td
                            rowSpan={1}
                            className="border-2 border-neutral-500 px-4 py-1 align-top">
                            {
                              item?.namaAkunTransaksiDalamJenisTransaksi
                                ?.akunTransaksi[8]?.namaAkunTransaksi?.nama
                            }
                          </td>
                          <td
                            rowSpan={1}
                            className="border-2 border-neutral-500 px-4 py-1 text-right">
                            {convertIDRCurrency(
                              (item?.jumlah / 0.3 / 1.125) * 0.015 * 0.3,
                            )}
                          </td>
                          <td
                            rowSpan={1}
                            className="border-2 border-neutral-500 px-4 py-1 text-right align-top"></td>
                        </tr>
                        <tr>
                          <td
                            rowSpan={1}
                            className="border-2 border-neutral-500 px-4 py-1 align-top">
                            {
                              item?.namaAkunTransaksiDalamJenisTransaksi
                                ?.akunTransaksi[9]?.namaAkunTransaksi?.nama
                            }
                          </td>
                          <td
                            rowSpan={1}
                            className="border-2 border-neutral-500 px-4 py-1 text-left"></td>
                          <td
                            rowSpan={1}
                            className="border-2 border-neutral-500 px-4 py-1 text-right align-top">
                            {convertIDRCurrency(
                              (item?.jumlah / 0.3 / 1.125) * 0.11 * 0.3 +
                                (item?.jumlah / 0.3 / 1.125) * 0.015 * 0.3,
                            )}
                          </td>
                        </tr>
                      </>
                    )}
                    {item?.namaAkunTransaksiDalamJenisTransaksi.nama ===
                      "Pendapatan Meubel" && (
                      <>
                        <tr>
                          <td
                            rowSpan={3}
                            className="border-2 border-neutral-500 px-4 py-1 text-right align-middle">
                            {convertIDRCurrency(item?.jumlah)}
                          </td>
                          <td
                            rowSpan={1}
                            className="border-2 border-neutral-500 px-4 py-1 align-top">
                            {
                              item?.namaAkunTransaksiDalamJenisTransaksi
                                ?.akunTransaksi[2]?.namaAkunTransaksi?.nama
                            }
                          </td>
                          <td
                            rowSpan={1}
                            className="border-2 border-neutral-500 px-4 py-1 text-right">
                            {convertIDRCurrency((item?.jumlah / 1.125) * 0.11)}
                          </td>
                          <td
                            rowSpan={1}
                            className="border-2 border-neutral-500 px-4 py-1 text-right align-top"></td>
                        </tr>
                        <tr>
                          <td
                            rowSpan={1}
                            className="border-2 border-neutral-500 px-4 py-1 align-top">
                            {
                              item?.namaAkunTransaksiDalamJenisTransaksi
                                ?.akunTransaksi[3]?.namaAkunTransaksi?.nama
                            }
                          </td>
                          <td
                            rowSpan={1}
                            className="border-2 border-neutral-500 px-4 py-1 text-right">
                            {convertIDRCurrency((item?.jumlah / 1.125) * 0.015)}
                          </td>
                          <td
                            rowSpan={1}
                            className="border-2 border-neutral-500 px-4 py-1 text-right align-top"></td>
                        </tr>
                        <tr>
                          <td
                            rowSpan={1}
                            className="border-2 border-neutral-500 px-4 py-1 align-top">
                            {
                              item?.namaAkunTransaksiDalamJenisTransaksi
                                ?.akunTransaksi[4]?.namaAkunTransaksi?.nama
                            }
                          </td>
                          <td
                            rowSpan={1}
                            className="border-2 border-neutral-500 px-4 py-1 text-left"></td>
                          <td
                            rowSpan={1}
                            className="border-2 border-neutral-500 px-4 py-1 text-right align-top">
                            {convertIDRCurrency(
                              (item?.jumlah / 1.125) * 0.11 +
                                (item?.jumlah / 1.125) * 0.015,
                            )}
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

function restrictAlphabet(event) {
  const allowedKeys = [
    8, 9, 13, 33, 34, 35, 36, 37, 38, 39, 40, 46, 48, 49, 50, 51, 52, 53, 54,
    55, 56, 57, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105,
  ];
  const key = event.which || event.keyCode;
  const isCtrlPressed = event.ctrlKey || event.metaKey; // Check if Ctrl key is pressed

  // Check for allowed keys and Ctrl key combinations, except Ctrl + V
  const isAllowed =
    allowedKeys.includes(key) ||
    (isCtrlPressed && (key === 65 || key === 67 || key === 88));

  if (!isAllowed) {
    event.preventDefault();
  }
}
