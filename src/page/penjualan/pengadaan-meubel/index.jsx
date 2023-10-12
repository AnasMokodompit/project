import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import axios from "axios";

import { cn } from "../../../utils/cn";

import { Button } from "../../../componet/button";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "../../../componet/command";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../componet/form";
import { Input } from "../../../componet/input";
import { Label } from "../../../componet/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../../componet/popover";
import { ScrollArea } from "../../../componet/scroll-area";
import { Textarea } from "../../../componet/textarea";

import Check from "../../../Asset/icons/untitled-ui-icons/line/components/Check";
import ChevronsUpDown from "../../../Asset/icons/untitled-ui-icons/line/components/ChevronSelectorVertical";
import Delete from "../../../Asset/icons/untitled-ui-icons/line/components/Delete";
import Edit from "../../../Asset/icons/untitled-ui-icons/line/components/Edit03";
import PlusCircle from "../../../Asset/icons/untitled-ui-icons/line/components/PlusCircle";
import X from "../../../Asset/icons/untitled-ui-icons/line/components/X";
import Plus from "../../../Asset/icons/untitled-ui-icons/line/components/Plus";
import Minus from "../../../Asset/icons/untitled-ui-icons/line/components/Minus";
import { set } from "date-fns";

export const PengadaanMeubel = () => {
  const { dataLogin } = useSelector((tes) => tes.userReducer);

  const [produkID, setProdukID] = useState();
  const [produkData, setProdukData] = useState();
  const [bahanBakuData, setBahanBakuData] = useState();
  const [bahanBakuID, setBahanBakuID] = useState();
  const [satuanBahanBakuData, setSatuanBahanBakuData] = useState();

  const [produkDataBySelectCombobox, setProdukDataBySelectCombobox] =
    useState();

  // Untuk Draf Order
  const [produkDataDraf, setProdukDataDraf] = useState();
  const [bahanBakuProdukDataDraf, setBahanBakuProdukDataDraf] = useState([]);
  const [orderDataDraf, setOrderDataDraf] = useState([]);

  // Untuk Draf Bahan Baku
  const [bahanBakuValue, setBahanBakuValue] = useState();

  const formAddProduk = useForm({});

  const form = useForm({});

  const {} = useQuery({
    queryKey: ["produk"],
    queryFn: async () => {
      return await axios.get(`${process.env.REACT_APP_BASE_API}/products`);
    },
    onSuccess: (data) => {
      // console.log(data.data.data);
      setProdukData(data.data.data);
    },
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
      // setBahanBakuProdukDataDraf(data.data.data);
    },
  });

  const { refetch: refetchSatuanBahanBaku } = useQuery({
    queryKey: ["satuan"],
    queryFn: async () => {
      return axios.get(
        `${process.env.REACT_APP_BASE_API}/persediaanBahanBaku`,
        {
          headers: { Authorization: `Bearer ${dataLogin.dataLogin.token}` },
          params: { id_bahan_baku: bahanBakuID },
        },
      );
    },
    onSuccess: (data) => {
      setSatuanBahanBakuData(data.data.data);
    },
    enabled: !!bahanBakuID,
  });

  const { mutate } = useMutation({
    mutationFn: async (data) => {
      return axios.post(
        `${process.env.REACT_APP_BASE_API}/pengadaanMeubel`,
        data,
      );
    },
    onSuccess: (data) => {
      console.log(data.data.data);
      alert('Data Berhasil Ditambahkan')
    },
  });

  const onSubmitAddProduk = (data) => {
    // return console.log(data, produkDataBySelectCombobox)
    const { Deskripsi_produk, harga, ukuran } = data;

    const {
      name,
      categories: { id: kategoryId, name: namaKategori },
      product_images,
      IsPermeter,
    } = produkDataBySelectCombobox;

    const option = {
      name,
      ukuran,
      harga,
      Deskripsi_produk,
      kategoryId,
      namaKategori,
      product_images,
      jumlah: 1,
      jumlahHarga: harga,
      bahanBakuProduk: [...bahanBakuProdukDataDraf],
    };

    if (IsPermeter == true) {
      option.jumlah_meter = 1;
    }

    setOrderDataDraf([...orderDataDraf, option]);

    formAddProduk.reset({
      id: null,
      ukuran: "",
      Deskripsi_produk: "",
      harga: 0,
    });
  };


  const hendleTambahOrder = (name, Deskripsi_produk) => {
    const dataPermeterTambah = orderDataDraf.filter(
      (item) => (item.name == name && item.Deskripsi_produk == Deskripsi_produk && item.jumlah_meter)
    );

    const itemIndexTambah = orderDataDraf.findIndex(
      (item) => item.name == name && item.Deskripsi_produk == Deskripsi_produk,
    );
    
    const newArrayDataOrder = [...orderDataDraf];
    if (itemIndexTambah >= 0 && dataPermeterTambah.length !== 0) {
      newArrayDataOrder[itemIndexTambah].jumlah += 1;
      newArrayDataOrder[itemIndexTambah].jumlahHarga = (newArrayDataOrder[itemIndexTambah].harga * newArrayDataOrder[itemIndexTambah].jumlah_meter) * newArrayDataOrder[itemIndexTambah].jumlah ;

      setOrderDataDraf(newArrayDataOrder);
    }
    else if (itemIndexTambah >= 0) {
      newArrayDataOrder[itemIndexTambah].jumlah += 1;
      newArrayDataOrder[itemIndexTambah].jumlahHarga += newArrayDataOrder[itemIndexTambah].harga;

      setOrderDataDraf(newArrayDataOrder);
    }
  };


  const hendleKurangOrder = (name, Deskripsi_produk) => {
    const dataPermeterTambah = orderDataDraf.filter(
      (item) => (item.name == name && item.Deskripsi_produk == Deskripsi_produk && item.jumlah_meter)
    );

    const itemIndexTambah = orderDataDraf.findIndex(
      (item) => item.name == name && item.Deskripsi_produk == Deskripsi_produk,
    );

    const newArrayDataOrder = [...orderDataDraf];
    if (itemIndexTambah >= 0  && newArrayDataOrder[itemIndexTambah].jumlah > 1 && dataPermeterTambah.length !== 0) {
      newArrayDataOrder[itemIndexTambah].jumlah -= 1;
      newArrayDataOrder[itemIndexTambah].jumlahHarga = (newArrayDataOrder[itemIndexTambah].harga * newArrayDataOrder[itemIndexTambah].jumlah_meter) * newArrayDataOrder[itemIndexTambah].jumlah ;

      setOrderDataDraf(newArrayDataOrder);

    }
    else if (itemIndexTambah >= 0 && newArrayDataOrder[itemIndexTambah].jumlah > 1) {
      newArrayDataOrder[itemIndexTambah].jumlah -= 1;
      newArrayDataOrder[itemIndexTambah].jumlahHarga -= newArrayDataOrder[itemIndexTambah].harga;

      setOrderDataDraf(newArrayDataOrder);
    }else{
      setOrderDataDraf(orderDataDraf.filter(item => item.name !== name && item.Deskripsi_produk !== Deskripsi_produk) )
    }
  };

  const hendleTambahMeterOrder = (name, Deskripsi_produk, harga) => {
    const itemIndexTambah = orderDataDraf.findIndex(
      (item) => item.name == name && item.Deskripsi_produk == Deskripsi_produk,
    );

    if (itemIndexTambah >= 0) {
      const newArrayDataOrder = [...orderDataDraf];
      newArrayDataOrder[itemIndexTambah].jumlah_meter += 1;
      newArrayDataOrder[itemIndexTambah].jumlahHarga = (newArrayDataOrder[itemIndexTambah].harga * newArrayDataOrder[itemIndexTambah].jumlah_meter) * newArrayDataOrder[itemIndexTambah].jumlah ;

      setOrderDataDraf(newArrayDataOrder);
    }
  }

  const hendleKurangMeterOrder = (name, Deskripsi_produk, harga) => {
    const itemIndexTambah = orderDataDraf.findIndex(
      (item) => item.name == name && item.Deskripsi_produk == Deskripsi_produk,
    );
    
    const newArrayDataOrder = [...orderDataDraf];
  
    if (itemIndexTambah >= 0 && newArrayDataOrder[itemIndexTambah].jumlah > 1) {
      newArrayDataOrder[itemIndexTambah].jumlah_meter -= 1;
      newArrayDataOrder[itemIndexTambah].jumlahHarga = (newArrayDataOrder[itemIndexTambah].harga * newArrayDataOrder[itemIndexTambah].jumlah_meter) * newArrayDataOrder[itemIndexTambah].jumlah;
  
      setOrderDataDraf(newArrayDataOrder);
    }else{
      setOrderDataDraf(orderDataDraf.filter(item => item.name !== name && item.Deskripsi_produk !== Deskripsi_produk) )
    }
  }

  const onSubmit = (data) => {
    // console.log({
    //   user: {
    //     ...data,
    //     status: 2,
    //   },
    //   order: orderDataDraf,
    // });

    mutate({
      user: {
        ...data,
        status: 2,
      },
      order: orderDataDraf,
    });
  };

  // console.log(produkDataBySelectCombobox);\

  // console.log(orderDataDraf);

  return (
    <section className="font-archivo">
      <div className="flex flex-col gap-4">
        <div>
          <h1 className="text-2xl font-bold">Pengadaan Meubel</h1>
        </div>
        <div className="grid grid-cols-2 gap-12">
          <div>
            <Form {...formAddProduk}>
              <div className="flex flex-col gap-4">
                <p className="text-lg font-bold">Pesanan</p>
                <FormField
                  control={formAddProduk.control}
                  name="id_produk"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Nama Produk</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              className={cn(
                                "justify-between p-2.5",
                                !field.value && "text-muted-foreground",
                              )}>
                              {field.value
                                ? produkData.find(
                                    (produk) => produk.id === field.value,
                                  )?.name
                                : "Pilih Produk"}
                              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent align="start" className="w-[200px] p-0">
                          <Command>
                            <ScrollArea className="h-48">
                              <CommandGroup>
                                {!!produkData &&
                                  produkData.map((produk) => (
                                    <CommandItem
                                      value={produk.id}
                                      key={produk.id}
                                      onSelect={() => {
                                        formAddProduk.reset({
                                          ukuran: produk.ukuran,
                                          Deskripsi_produk:
                                            produk.Deskripsi_produk,
                                          harga: produk.harga,
                                        });
                                        formAddProduk.setValue(
                                          "id_produk",
                                          produk.id,
                                        );
                                        setBahanBakuProdukDataDraf(
                                          produk.bahanBakuProduk,
                                        );
                                        setProdukDataBySelectCombobox(produk);
                                      }}>
                                      {/* <Check
                                      className={cn(
                                        "mr-2 h-4 w-4",
                                        produk.id === field.value
                                          ? "opacity-100"
                                          : "opacity-0",
                                      )}
                                    /> */}
                                      {produk.name}
                                    </CommandItem>
                                  ))}
                              </CommandGroup>
                            </ScrollArea>
                          </Command>
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={formAddProduk.control}
                  name="ukuran"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Ukuran Produk</FormLabel>
                      <FormControl>
                        <Input {...field} className="p-2.5" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={formAddProduk.control}
                  name="Deskripsi_produk"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Deskripsi Produk</FormLabel>
                      <FormControl>
                        <Textarea {...field} className="min-h-[5rem] p-2.5" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={formAddProduk.control}
                  name="harga"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Harga</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <p className="absolute left-4 top-1/2 m-auto flex -translate-y-1/2 items-center text-xs">
                            Rp
                          </p>
                          <Input {...field} className="p-2.5 text-right" />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {!!formAddProduk.watch("id_produk") && (
                  <div className="flex flex-col gap-2">
                    <p className="text-sm">Keperluan Bahan Baku</p>
                    <Popover>
                      <PopoverTrigger asChild>
                        <button className="flex w-max items-center gap-2 rounded-lg border-2 border-neutral-500 bg-amber-300 p-2">
                          <PlusCircle className="text-sm" />
                          <p className="text-sm font-bold">Tambah Bahan Baku</p>
                        </button>
                      </PopoverTrigger>
                      <PopoverContent align="start" className="w-80">
                        <Popover>
                          <PopoverTrigger className="w-full">
                            <div className="flex w-full flex-col items-start">
                              <Label>Bahan Baku</Label>
                              <Button
                                variant="outline"
                                className="w-full justify-between">
                                {bahanBakuValue
                                  ? bahanBakuData.find(
                                      (bahanBaku) =>
                                        bahanBaku.id === bahanBakuValue,
                                    )?.label
                                  : "Pilih Bahan Baku"}
                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                              </Button>
                            </div>
                          </PopoverTrigger>
                          <PopoverContent
                            align="start"
                            className="w-[200px] p-0">
                            <Command>
                              <CommandGroup>
                                {!!bahanBakuData &&
                                  bahanBakuData.map((bahanBaku) => (
                                    <CommandItem
                                      key={bahanBaku.id}
                                      onSelect={(currentValue) => {
                                        setBahanBakuValue(
                                          currentValue === bahanBakuValue
                                            ? ""
                                            : currentValue,
                                        );
                                      }}>
                                      {/* <Check
                                      className={cn(
                                        "mr-2 h-4 w-4",
                                        value === framework.value
                                          ? "opacity-100"
                                          : "opacity-0",
                                      )}
                                    /> */}
                                      {bahanBaku.nama}
                                    </CommandItem>
                                  ))}
                              </CommandGroup>
                            </Command>
                          </PopoverContent>
                        </Popover>
                      </PopoverContent>
                    </Popover>
                    <table className="table-auto border-collapse font-archivo text-sm">
                      <thead className="border-2 border-neutral-500 bg-amber-300">
                        <tr>
                          <th className="p-2 text-center font-normal">No.</th>
                          <th className="p-2 text-center font-normal">
                            Bahan Baku
                          </th>
                          <th className="p-2 text-center font-normal">
                            Satuan
                          </th>
                          <th className="p-2 text-center font-normal">
                            Jumlah
                          </th>
                          <th className="p-2 text-center font-normal"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {!!bahanBakuProdukDataDraf &&
                          bahanBakuProdukDataDraf.map((data, index) => {
                            // console.log(data);
                            const {
                              id,
                              satuan,
                              jumlah,
                              bahanBaku: { nama: namaBahanBaku },
                            } = data;
                            return (
                              <tr key={id}>
                                <td className="w-0 border-2 border-neutral-500 p-2 text-center">
                                  {index + 1}.
                                </td>
                                <td className="border-2 border-neutral-500 p-2">
                                  {namaBahanBaku}
                                </td>
                                <td className="border-2 border-neutral-500 p-2">
                                  {satuan}
                                </td>
                                <td className="border-2 border-neutral-500 p-2">
                                  {jumlah}
                                </td>
                                <td className="w-2/12 border-2 border-neutral-500 p-2">
                                  <div className="flex justify-center gap-2">
                                    <button className="flex items-center gap-2 rounded-lg bg-amber-300 p-2 text-neutral-900">
                                      <Edit className="flex-shrink-0 text-sm" />
                                    </button>
                                    <button className="flex items-center gap-2 rounded-lg bg-red-500 p-2 text-white">
                                      <Delete className="flex-shrink-0 text-sm" />
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            );
                          })}
                      </tbody>
                    </table>
                  </div>
                )}
                <Button
                  onClick={formAddProduk.handleSubmit(onSubmitAddProduk)}
                  className="mt-8 border-2 border-neutral-500 p-3 text-base font-bold">
                  Tambah Produk
                </Button>
              </div>
            </Form>
          </div>
          <div>
            <Form {...form}>
              <div className="flex flex-col gap-4">
                <p className="text-lg font-bold">Pembeli</p>
                {!!orderDataDraf &&
                  orderDataDraf.map((data, index) => {
                    console.log(data);
                    const {
                      name,
                      namaKategori,
                      ukuran,
                      Deskripsi_produk,
                      jumlahHarga,
                      product_images,
                      jumlah,
                      jumlah_meter,
                      harga
                    } = data;

                    const urlGambar = product_images[0]?.url_image;

                    return (
                      <div className="relative flex gap-4 rounded-lg border-2 border-neutral-500 bg-neutral-100 p-3 shadow-md">
                        <div className="flex-shrink-0">
                          <img
                            src={urlGambar}
                            className="block h-24 w-16 rounded-lg object-cover"
                          />
                        </div>
                        <div className="flex flex-col gap-2">
                          <p>{name}</p>
                          <table className="text-xs font-light">
                            <tbody>
                              <tr>
                                <td className="align-top">Kategori</td>
                                <td className="px-2 align-top">:</td>
                                <td className="align-top">{namaKategori}</td>
                              </tr>
                              <tr>
                                <td className="align-top">Ukuran</td>
                                <td className="px-2 align-top">:</td>
                                <td className="align-top">{ukuran}</td>
                              </tr>
                              <tr>
                                <td className="align-top">Deskripsi</td>
                                <td className="px-2 align-top">:</td>
                                <td className="align-top">
                                  {Deskripsi_produk}
                                </td>
                              </tr>
                            </tbody>
                          </table>
                          {jumlah_meter && (
                            <>
                              <tr></tr>
                              <p className="text-xs font-bold">
                                harga permeter: {harga}
                              </p>
                              <p className="flex w-max border-collapse items-center justify-between gap-3 rounded-lg">
                                <button
                                  className="flex h-5 w-5 items-center justify-center rounded-md border-2 border-neutral-500 transition-colors hover:border-amber-300 hover:bg-amber-300"
                                  onClick={() =>
                                    hendleKurangMeterOrder(
                                      name,
                                      Deskripsi_produk,
                                      harga,
                                    )
                                  }
                                  >
                                  <Minus className="text-base" />
                                </button>
                                <p className="w-3 text-center">
                                  {data.jumlah_meter}
                                </p>
                                <button
                                  className="flex h-5 w-5 items-center justify-center rounded-md border-2 border-neutral-500 transition-colors hover:border-amber-300 hover:bg-amber-300"
                                  onClick={() =>
                                    hendleTambahMeterOrder(
                                      name,
                                      Deskripsi_produk,
                                      harga,
                                    )
                                  }
                                  >
                                  <Plus className="text-base" />
                                </button>
                                <span>Meter</span>
                              </p>
                            </>
                          )}
                          <p className="text-sm">
                            {convertIDRCurrency(jumlahHarga)}
                          </p>
                          <div className="flex flex-shrink-0 gap-4">
                            <button className="rounded-lg border-2 border-neutral-500 p-1"
                              onClick={() =>
                                hendleKurangOrder(
                                  name,
                                  Deskripsi_produk,
                                )
                              }
                            >
                              <Minus className="text-sm" />
                            </button>
                            <p>{jumlah}</p>
                            <button className="rounded-lg border-2 border-neutral-500 p-1"
                              onClick={() =>
                                hendleTambahOrder(
                                  name,
                                  Deskripsi_produk,
                                )
                              }>
                              <Plus className="text-sm" />
                            </button>
                          </div>
                        </div>
                        <button
                          onClick={() => {
                            const newOrderDataDraf = orderDataDraf.filter(
                              (order) => order !== data,
                            );
                            setOrderDataDraf(newOrderDataDraf);
                          }}
                          className="absolute right-2 top-2 rounded-lg bg-red-500 p-1 text-white">
                          <X className="text-base" />
                        </button>
                      </div>
                    );
                  })}
                <FormField
                  control={form.control}
                  name="nama"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Nama</FormLabel>
                      <FormControl>
                        <Input {...field} className="p-2.5" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="nomor"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Nomor Telepon</FormLabel>
                      <FormControl>
                        <Input {...field} className="p-2.5" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input {...field} className="p-2.5" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="alamat"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Alamat</FormLabel>
                      <FormControl>
                        <Textarea {...field} className="min-h-[5rem] p-2.5" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  onClick={form.handleSubmit(onSubmit)}
                  className="mt-8 border-2 border-neutral-500 p-3 text-base font-bold">
                  Checkout
                </Button>
              </div>
            </Form>
          </div>
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
