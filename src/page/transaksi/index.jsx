import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useQuery, useMutation } from "@tanstack/react-query";

import axios from "axios";

import Sidebar from "../../componet/Sidebar/Sidebar";

import { cn } from "../../utils/cn";

import { Button, buttonVariants } from "../../componet/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "../../componet/command";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../componet/form";
import { Input } from "../../componet/input";
import { Popover, PopoverContent, PopoverTrigger } from "../../componet/popover";
import { Textarea } from "../../componet/textarea";

import Check from "../../Asset/icons/untitled-ui-icons/line/components/Check";
import ChevronSelectorVertical from "../../Asset/icons/untitled-ui-icons/line/components/ChevronSelectorVertical";

export const Transaksi = () => {
  const [jenisTransaksiData, setJenisTransaksiData] = useState();
  const [namaAkunTransaksiData, setNamaAkunTransaksiData] = useState();
  const [idJenisTransaksi, setIdJenisTransaksi] = useState("");
  const [jumlahValue, setJumlahValue] = useState();

  const form = useForm({
    defaultValues: {
      id_jenis_transaksi: "",
      id_nama_akun_transaksi: "",
      keterangan: "",
      jumlah: "",
    },
  });

  const listJenisTransaksi = () => {
    axios
      .get(`${process.env.REACT_APP_BASE_API}/jenisTransaksi`)
      .then((res) => {
        setJenisTransaksiData(res.data.data);
        // console.log(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const { refetch: refetchJenisTransaksi } = useQuery({
    queryKey: ["jenis-transaksi"],
    queryFn: () => {
      return axios.get(`${process.env.REACT_APP_BASE_API}/jenisTransaksi`);
    },
    onSuccess: (data) => {
      // console.log(data.data.data);
      setJenisTransaksiData(data.data.data);
    },
  });

  const { refetch: refetchNamaAkunTransaksi } = useQuery({
    queryKey: ["nama-akun", idJenisTransaksi],
    queryFn: () => {
      return axios.get(
        `${process.env.REACT_APP_BASE_API}/jenisTransaksi/${idJenisTransaksi}/namaAkunTransaksi`,
      );
    },
    onSuccess: (data) => {
      // console.log(data.data.data);

      const test = data?.data?.data?.nama_akun_transaksi_dalam_jenis_transaksi;

      const extractedData = test.map((item) => {
        const { id, nama } = item.nama_akun_transaksi;
        return { id, nama };
      });

      setNamaAkunTransaksiData(extractedData);
    },
    enabled: !!idJenisTransaksi,
  });

  const { mutate } = useMutation({
    mutationFn: (data) => {
      return axios.post(`${process.env.REACT_APP_BASE_API}/transaksi`, data);
    },
    onSuccess: (data) => {
      console.log(data);
      form.reset();

      // alert("Transaksi Berhasil di Simpan");
    },
  });

  const onSubmit = (data) => {
    try {
      mutate({
        ...data,
        jumlah: Number(data.jumlah),
      });
    } catch (error) {
      console.log(error);
    }
    //  finally {
    //   form.reset();
    // }
  };

  const restrictAlphabet = (event) => {
    const allowedKeys = [
      8, 9, 13, 33, 34, 35, 36, 37, 38, 39, 40, 46, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 96, 97,
      98, 99, 100, 101, 102, 103, 104, 105,
    ];
    const key = event.which || event.keyCode;
    const isCtrlPressed = event.ctrlKey || event.metaKey; // Check if Ctrl key is pressed

    // Check for allowed keys and Ctrl key combinations, except Ctrl + V
    const isAllowed =
      allowedKeys.includes(key) || (isCtrlPressed && (key === 65 || key === 67 || key === 88));

    if (!isAllowed) {
      event.preventDefault();
    }
  };

  const optionsCurrency = {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  };
  const formatterCurrency = new Intl.NumberFormat("id-ID", optionsCurrency);

  return (
    <div className="flex font-archivo">
      <Sidebar />
      <div className="flex w-full flex-col gap-8 p-4 font-archivo">
        <div>
          <p className="text-2xl font-bold">Transaksi</p>
        </div>
        <div className="flex flex-col gap-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="id_jenis_transaksi"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Jenis Transaksi</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          // aria-expanded={open}
                          className="w-6/12 justify-between px-3 py-4">
                          {field.value
                            ? jenisTransaksiData.find((data) => data.id === field.value)?.nama
                            : "Pilih Jenis Transaksi..."}
                          <ChevronSelectorVertical className="ml-2 h-4 w-4 shrink-0 text-right opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-[200px] p-0">
                        <Command>
                          <CommandInput placeholder="Cari Jenis Transaksi..." />
                          <CommandEmpty>Jenis Transaksi tidak tersedia.</CommandEmpty>
                          <CommandGroup>
                            {!!jenisTransaksiData &&
                              jenisTransaksiData.map((data) => (
                                <CommandItem
                                  key={data.id}
                                  value={data.id}
                                  onSelect={(value) => {
                                    form.setValue("id_jenis_transaksi", data.id, {
                                      shouldValidate: true,
                                    });
                                    form.setValue("id_nama_akun_transaksi", null);
                                    setIdJenisTransaksi(data.id);
                                  }}>
                                  <Check
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      data.id === field.value ? "opacity-100" : "opacity-0",
                                    )}
                                  />
                                  {data.nama}
                                </CommandItem>
                              ))}
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="id_nama_akun_transaksi"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Akun</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          disabled={!form.watch("id_jenis_transaksi")}
                          variant="outline"
                          role="combobox"
                          // aria-expanded={open}
                          className="w-6/12 justify-between px-3 py-4">
                          {field.value
                            ? namaAkunTransaksiData.find((data) => data.id === field.value)?.nama
                            : "Pilih Akun Transaksi..."}
                          <ChevronSelectorVertical className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-[200px] p-0">
                        <Command>
                          <CommandInput placeholder="Cari Akun..." />
                          <CommandEmpty>Akun Transaksi tidak tersedia.</CommandEmpty>
                          <CommandGroup>
                            {!!namaAkunTransaksiData &&
                              namaAkunTransaksiData.map((data) => (
                                <CommandItem
                                  // className="bg-red-500 text-black"
                                  key={data.id}
                                  value={data.id}
                                  onSelect={(value) => {
                                    form.setValue("id_nama_akun_transaksi", data.id, {
                                      shouldValidate: true,
                                    });
                                  }}>
                                  <Check
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      data.id === field.value ? "opacity-100" : "opacity-0",
                                    )}
                                  />
                                  {data.nama}
                                </CommandItem>
                              ))}
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="keterangan"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Keterangan</FormLabel>
                    <FormControl>
                      <Textarea className="w-6/12" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="jumlah"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Jumlah</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          className="w-6/12 px-3 py-4 text-right"
                          {...field}
                          // value={jumlahValue}
                          // onChange={(event) => {
                          //   form.setValue("jumlah", event.target.value);

                          //   const value = event.target.value;

                          //   // setJumlahValue(formattedValue);
                          // }}
                          onKeyDown={restrictAlphabet}
                        />
                        <p className="absolute left-4 top-0 translate-y-1/2">Rp.</p>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className="bg-amber-300" type="submit">
                Simpan
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};
