import { useState, useEffect, Fragment } from "react";
import { useForm } from "react-hook-form";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { format } from "date-fns";
import { id } from "date-fns/locale";

import axios from "axios";

import Sidebar from "../../componet/Sidebar/Sidebar";

import { cn } from "../../utils/cn";

import { Button, buttonVariants } from "../../componet/button";
import { Calendar } from "../../componet/calendar";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../componet/popover";
import { ScrollArea } from "../../componet/scroll-area";
import { Textarea } from "../../componet/textarea";

import CalendarIcon from "../../Asset/icons/untitled-ui-icons/line/components/Calendar";
import Check from "../../Asset/icons/untitled-ui-icons/line/components/Check";
import ChevronSelectorVertical from "../../Asset/icons/untitled-ui-icons/line/components/ChevronSelectorVertical";

export const Transaksi = () => {
  const { dataLogin } = useSelector((tes) => tes.userReducer);

  const [jenisTransaksiData, setJenisTransaksiData] = useState();
  const [namaAkunTransaksiData, setNamaAkunTransaksiData] = useState();
  const [idJenisTransaksi, setIdJenisTransaksi] = useState("");
  const [idBahanBaku, setIdBahanBaku] = useState();
  const [satuanBahanBakuData, setSatuanBahanBakuData] = useState();
  const [jumlahValue, setJumlahValue] = useState();
  const [isBiayaBahanBaku, setIsBiayaBahanBaku] = useState(false);
  const [bahanBakuData, setBahanBakuData] = useState();

  // console.log(isBiayaBahanBaku);

  const form = useForm({
    defaultValues: {
      id_jenis_transaksi: "",
      id_nama_akun_jenis_transaksi: "",
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
        // console.log(item);
        const { id, nama } = item;
        return { id, nama };
      });

      setNamaAkunTransaksiData(extractedData);
    },
    enabled: !!idJenisTransaksi,
  });

  const {} = useQuery({
    queryKey: ["bahan-baku"],
    queryFn: async () => {
      return axios.get(`${process.env.REACT_APP_BASE_API}/bahanBaku`, {
        headers: { Authorization: `Bearer ${dataLogin.dataLogin.token}` },
      });
    },
    onSuccess: (data) => {
      // console.log(data.data.data);
      setBahanBakuData(data.data.data);
    },
  });

  const { refetch: refetchSatuanBahanBaku } = useQuery({
    queryKey: ["satuan"],
    queryFn: async () => {
      return axios.get(
        `${process.env.REACT_APP_BASE_API}/persediaanBahanBaku`,
        {
          headers: { Authorization: `Bearer ${dataLogin.dataLogin.token}` },
          params: { id_bahan_baku: idBahanBaku },
        },
      );
    },
    onSuccess: (data) => {
      // console.log(data.data.data);
      setSatuanBahanBakuData(data.data.data);
    },
    enabled: !!idBahanBaku,
  });

  const { mutate } = useMutation({
    mutationFn: (data) => {
      if (data.id_nama_akun_jenis_transaksi == 2) {
        data.jumlah = 0.3 * data.jumlah;
      }

      // return console.log(data)

      return axios.post(`${process.env.REACT_APP_BASE_API}/transaksi`, data);
    },
    onSuccess: (data) => {
      // console.log(data);
      form.reset();
      setIsBiayaBahanBaku(false);

      // alert("Transaksi Berhasil di Simpan");
    },
  });

  const onSubmit = (data) => {
    const {
      id_jenis_transaksi,
      id_nama_akun_jenis_transaksi,
      jumlah: jumlahHarga,
      keterangan,
      tanggal,
    } = data;

    const id_bahan_baku = data?.bahanBaku?.id_bahan_baku;
    const jumlah = data?.bahanBaku?.jumlah;
    const satuan = data?.bahanBaku?.satuan;

    try {
      if (!!isBiayaBahanBaku) {
        mutate({
          bahanBaku: [
            {
              id_bahan_baku,
              jumlah: Number(jumlah),
              satuan,
            },
          ],
          id_jenis_transaksi,
          id_nama_akun_jenis_transaksi,
          jumlah: Number(jumlahHarga),
          keterangan,
          tanggal,
        });
      } else {
        mutate({
          id_jenis_transaksi,
          id_nama_akun_jenis_transaksi,
          jumlah: Number(jumlahHarga),
          keterangan,
          tanggal,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const restrictAlphabet = (event) => {
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
  };

  const optionsCurrency = {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  };
  const formatterCurrency = new Intl.NumberFormat("id-ID", optionsCurrency);

  useEffect(() => {
    refetchSatuanBahanBaku();
  }, [idBahanBaku]);

  return (
    <div className="flex font-archivo">
      <div className="flex w-full flex-col gap-8 font-archivo">
        <div>
          <h1 className="text-2xl font-bold">Transaksi</h1>
        </div>
        <div className="flex flex-col gap-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
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
                              "p-3 text-left font-normal",
                              !field.value && "text-muted-foreground",
                            )}>
                            {field.value ? (
                              format(field.value, "PPP", { locale: id })
                            ) : (
                              <span>Pilih Tanggal</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          // disabled={(date) =>
                          //   date > new Date() || date < new Date("1900-01-01")
                          // }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
                          className="w-full justify-between p-3">
                          {field.value
                            ? jenisTransaksiData.find(
                                (data) => data.id === field.value,
                              )?.nama
                            : "Pilih Jenis Transaksi..."}
                          <ChevronSelectorVertical className="ml-2 h-4 w-4 shrink-0 text-right opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent align="start" className="p-0">
                        <Command>
                          <CommandInput placeholder="Cari Jenis Transaksi..." />
                          <CommandEmpty>
                            Jenis Transaksi tidak tersedia.
                          </CommandEmpty>
                          <CommandGroup>
                            <ScrollArea className="h-48">
                              {!!jenisTransaksiData &&
                                jenisTransaksiData.map((data) => (
                                  <CommandItem
                                    key={data.id}
                                    value={data.id}
                                    onSelect={(value) => {
                                      form.setValue(
                                        "id_jenis_transaksi",
                                        data.id,
                                        {
                                          shouldValidate: true,
                                        },
                                      );
                                      form.setValue(
                                        "id_nama_akun_jenis_transaksi",
                                        null,
                                      );
                                      setIdJenisTransaksi(data.id);
                                    }}>
                                    <Check
                                      className={cn(
                                        "mr-2 h-4 w-4",
                                        data.id === field.value
                                          ? "opacity-100"
                                          : "opacity-0",
                                      )}
                                    />
                                    {data.nama}
                                  </CommandItem>
                                ))}
                            </ScrollArea>
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
                name="id_nama_akun_jenis_transaksi"
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
                          className="w-full justify-between p-3">
                          {field.value
                            ? namaAkunTransaksiData.find(
                                (data) => data.id === field.value,
                              )?.nama
                            : "Pilih Akun Transaksi..."}
                          <ChevronSelectorVertical className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent align="start" className="p-0">
                        <Command>
                          <CommandInput placeholder="Cari Akun..." />
                          <CommandEmpty>
                            Akun Transaksi tidak tersedia.
                          </CommandEmpty>
                          <CommandGroup>
                            <ScrollArea className="h-48">
                              {!!namaAkunTransaksiData &&
                                namaAkunTransaksiData.map((data) => (
                                  <CommandItem
                                    className="min-w-max"
                                    key={data.id}
                                    value={data.id}
                                    onSelect={(value) => {
                                      form.setValue(
                                        "id_nama_akun_jenis_transaksi",
                                        data.id,
                                        {
                                          shouldValidate: true,
                                        },
                                      );
                                      if (data.id === 3) {
                                        setIsBiayaBahanBaku(true);
                                      } else if (data.id !== 3) {
                                        setIsBiayaBahanBaku(false);
                                      }
                                    }}>
                                    <Check
                                      className={cn(
                                        "mr-2 h-4 w-4",
                                        data.id === field.value
                                          ? "opacity-100"
                                          : "opacity-0",
                                      )}
                                    />
                                    {data.nama}
                                  </CommandItem>
                                ))}
                            </ScrollArea>
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {!!isBiayaBahanBaku && (
                <Fragment>
                  <div className="flex flex-col gap-4 rounded-lg border-2 border-neutral-500 p-12">
                    <FormField
                      control={form.control}
                      name="bahanBaku.id_bahan_baku"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Bahan Baku</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                role="combobox"
                                className="w-full justify-between p-3">
                                {field.value
                                  ? bahanBakuData.find(
                                      (data) => data.id === field.value,
                                    )?.nama
                                  : "Pilih Bahan Baku..."}
                                <ChevronSelectorVertical className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent align="start" className="p-0">
                              <Command>
                                <CommandInput placeholder="Cari Akun..." />
                                <CommandEmpty>
                                  Bahan Baku tidak tersedia.
                                </CommandEmpty>
                                <CommandGroup>
                                  <ScrollArea className="h-48">
                                    {!!bahanBakuData &&
                                      bahanBakuData.map((data) => (
                                        <CommandItem
                                          className="min-w-max"
                                          key={data.id}
                                          value={data.id}
                                          onSelect={(value) => {
                                            form.setValue(
                                              "bahanBaku.id_bahan_baku",
                                              data.id,
                                              {
                                                shouldValidate: true,
                                              },
                                            );
                                            form.setValue(
                                              "bahanBaku.satuan",
                                              null,
                                              {
                                                shouldValidate: true,
                                              },
                                            );
                                            setIdBahanBaku(data.id);
                                            // setIdBahanBaku();
                                          }}>
                                          <Check
                                            className={cn(
                                              "mr-2 h-4 w-4",
                                              data.id === field.value
                                                ? "opacity-100"
                                                : "opacity-0",
                                            )}
                                          />
                                          {data.nama}
                                        </CommandItem>
                                      ))}
                                  </ScrollArea>
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
                      name="bahanBaku.jumlah"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Jumlah</FormLabel>
                          <FormControl>
                            <Input
                              className="z-20 w-full border-2 border-neutral-500 p-3  text-right"
                              {...field}
                              onKeyDown={restrictAlphabet}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="bahanBaku.satuan"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Bahan Baku</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                disabled={!idBahanBaku}
                                variant="outline"
                                role="combobox"
                                className="w-full justify-between p-3">
                                {field.value
                                  ? satuanBahanBakuData.find(
                                      (data) => data.satuan === field.value,
                                    )?.satuan
                                  : "Pilih Satuan..."}
                                <ChevronSelectorVertical className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent align="start" className="p-0">
                              <Command>
                                {/* <CommandInput placeholder="Cari Akun..." /> */}
                                <CommandEmpty>
                                  Satuan tidak tersedia.
                                </CommandEmpty>
                                <CommandGroup>
                                  <ScrollArea className="h-48">
                                    {!!satuanBahanBakuData &&
                                      satuanBahanBakuData.map((data) => (
                                        <CommandItem
                                          className="min-w-max"
                                          key={data.id}
                                          value={data.satuan}
                                          onSelect={(value) => {
                                            form.setValue(
                                              "bahanBaku.satuan",
                                              data.satuan,
                                              {
                                                shouldValidate: true,
                                              },
                                            );
                                          }}>
                                          <Check
                                            className={cn(
                                              "mr-2 h-4 w-4",
                                              data.satuan === field.value
                                                ? "opacity-100"
                                                : "opacity-0",
                                            )}
                                          />
                                          {data.satuan}
                                        </CommandItem>
                                      ))}
                                  </ScrollArea>
                                </CommandGroup>
                              </Command>
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {/* <FormField
                      control={form.control}
                      name="bahanBaku.satuan"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Satuan</FormLabel>
                          <FormControl>
                            <Input
                              className="z-20 w-full border-2 border-neutral-500 p-3  text-right"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    /> */}
                  </div>
                </Fragment>
              )}
              <FormField
                control={form.control}
                name="keterangan"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Keterangan</FormLabel>
                    <FormControl>
                      <Textarea
                        className="min-h-[5rem] w-full border-2 border-neutral-500"
                        {...field}
                      />
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
                          className="z-20 w-full border-2 border-neutral-500 p-3  text-right"
                          {...field}
                          // value={jumlahValue}
                          // onChange={(event) => {
                          //   form.setValue("jumlah", event.target.value);

                          //   const value = event.target.value;

                          //   // setJumlahValue(formattedValue);
                          // }}
                          onKeyDown={restrictAlphabet}
                        />
                        <div className="absolute left-4 top-1/2 m-auto flex -translate-y-1/2 items-center">
                          <p className="text-sm">Rp.</p>
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                className="w-full border-2 border-neutral-500 bg-amber-300 p-3 text-lg font-bold"
                type="submit">
                Simpan
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};
