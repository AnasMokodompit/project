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
import { Input, CurrencyInput, NumericInput } from "../../../componet/input";
import { Label } from "../../../componet/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../../componet/popover";
import { ScrollArea } from "../../../componet/scroll-area";
import { Textarea } from "../../../componet/textarea";

import Check from "../../../Asset/icons/untitled-ui-icons/line/components/Check";
import ChevronDown from "../../../Asset/icons/untitled-ui-icons/line/components/ChevronDown";
import ChevronsUpDown from "../../../Asset/icons/untitled-ui-icons/line/components/ChevronSelectorVertical";
import Delete from "../../../Asset/icons/untitled-ui-icons/line/components/Delete";
import Edit from "../../../Asset/icons/untitled-ui-icons/line/components/Edit03";
import PlusCircle from "../../../Asset/icons/untitled-ui-icons/line/components/PlusCircle";
import X from "../../../Asset/icons/untitled-ui-icons/line/components/X";
import Plus from "../../../Asset/icons/untitled-ui-icons/line/components/Plus";
import Minus from "../../../Asset/icons/untitled-ui-icons/line/components/Minus";
import Package from "../../../Asset/icons/untitled-ui-icons/line/components/Package";
import { id } from "date-fns/locale";

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

  // State Remake
  const [namaProduk, setNamaProduk] = useState("");
  const [namaKategori, setNamaKategori] = useState();
  const [ukuranProduk, setUkuranProduk] = useState("");
  const [deskripsiProduk, setDeskripsiProduk] = useState("");
  const [hargaProduk, setHargaProduk] = useState(0);
  const [gambarProduk, setGambarProduk] = useState([]);
  const [namaPembeli, setNamaPembeli] = useState("");
  const [nomorTeleponPembeli, setNomorTeleponPembeli] = useState("");
  const [emailPembeli, setEmailPembeli] = useState("");
  const [alamatPembeli, setAlamatPembeli] = useState("");

  const [isMeter, setIsMeter] = useState();

  const [IDBahanBaku, setIDBahanBaku] = useState();
  const [IDKategori, setIDKategori] = useState();
  const [satuanBahanBaku, setSatuanBahanBaku] = useState("");
  const [jumlahBahanBaku, setJumlahBahanBaku] = useState();

  const [bahanBakuProduk, setBahanBakuProduk] = useState([]);
  const [pesananPengadaanMeubel, setPesananPengadaanMeubel] = useState([]);

  const [dataProduk, setDataProduk] = useState([]);
  const [dataBahanBaku, setDataBahanBaku] = useState([]);
  const [dataSatuanBahanBaku, setDataSatuanBahanBaku] = useState([]);

  const [popoverStatusProduk, setPopoverStatusProduk] = useState(false);
  const [popoverStatusTambahBahanBaku, setPopoverStatusTambahBahanBaku] =
    useState(false);
  const [popoverStatusEditBahanBaku, setPopoverStatusEditBahanBaku] =
    useState(false);
  const [popoverStatusIDBahanBaku, setPopoverStatusIDBahanBaku] =
    useState(false);
  const [popoverStatusBahanBaku, setPopoverStatusBahanBaku] = useState(false);

  const {} = useQuery({
    queryKey: ["produk"],
    queryFn: async () => {
      return await axios.get(`${process.env.REACT_APP_BASE_API}/products`);
    },
    onSuccess: (data) => {
      setProdukData(data.data.data);
      setDataProduk(data.data.data);
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
      setDataBahanBaku(data.data.data);
    },
  });

  const {} = useQuery({
    queryKey: ["satuan-bahan-baku", IDBahanBaku],
    queryFn: async () => {
      return axios.get(
        `${process.env.REACT_APP_BASE_API}/persediaanBahanBaku/${IDBahanBaku}`,
        {
          headers: { Authorization: `Bearer ${dataLogin.dataLogin.token}` },
        },
      );
    },
    onSuccess: (data) => {
      setDataSatuanBahanBaku([data.data.data]);
    },
    enabled: !!IDBahanBaku,
  });

  const { mutate } = useMutation({
    mutationFn: async (data) => {
      return axios.post(
        `${process.env.REACT_APP_BASE_API}/pengadaanMeubel`,
        data,
      );
    },
    onSuccess: (data) => {
      setPesananPengadaanMeubel([]);
      setNamaPembeli("");
      setNomorTeleponPembeli("");
      setEmailPembeli("");
      setAlamatPembeli("");
    },
  });

  const setProduk = (data) => {
    const {
      name,
      ukuran,
      Deskripsi_produk,
      harga,
      bahanBakuProduk,
      product_images,
      categoriesId,
      categories: { name: namaKategori },
      IsPermeter,
    } = data;

    setNamaProduk(name);
    setUkuranProduk(ukuran);
    setDeskripsiProduk(Deskripsi_produk);
    setHargaProduk(harga);
    setBahanBakuProduk(bahanBakuProduk);
    setGambarProduk(product_images);
    setNamaKategori(namaKategori);
    setIDKategori(categoriesId);
    setIsMeter(IsPermeter);
  };

  const addBahanBaku = () => {
    if (!!jumlahBahanBaku && !!satuanBahanBaku && !!IDBahanBaku) {
      const { id, nama } = dataBahanBaku.find(
        (bahanBaku) => bahanBaku.id === IDBahanBaku,
      );

      const newValue = {
        id_produk: undefined,
        id_bahan_baku: IDBahanBaku,
        satuan: satuanBahanBaku,
        jumlah: jumlahBahanBaku,
        bahanBaku: { id, nama },
      };

      setBahanBakuProduk([...bahanBakuProduk, newValue]);

      setIDBahanBaku();
      setSatuanBahanBaku("");
      setJumlahBahanBaku();

      setPopoverStatusTambahBahanBaku(false);
    }
  };

  const editBahanBaku = (index) => {
    const newArray = [...bahanBakuProduk];

    const { id, nama } = dataBahanBaku.find(
      (bahanBaku) => bahanBaku.id === IDBahanBaku,
    );

    const newValue = {
      id_produk: 1,
      id_bahan_baku: 1,
      satuan: satuanBahanBaku,
      jumlah: jumlahBahanBaku,
      bahanBaku: { id, nama },
    };

    newArray[index] = newValue;

    setBahanBakuProduk(newArray);
  };

  const deleteBahanBaku = (index) => {
    const newArray = [...bahanBakuProduk];
    newArray.splice(index, 1);
    setBahanBakuProduk(newArray);
  };

  const deleteProdukPengadaanMeubel = (index) => {
    const newArray = [...pesananPengadaanMeubel];
    newArray.splice(index, 1);
    setPesananPengadaanMeubel(newArray);
  };

  const addPesananPengadaanMeubel = () => {
    const newValue = {
      name: namaProduk,
      ukuran: ukuranProduk,
      harga: hargaProduk,
      Deskripsi_produk: deskripsiProduk,
      kategoryId: IDKategori,
      namaKategori,
      jumlah: 1,
      jumlahHarga: hargaProduk,
      product_images: gambarProduk,
      bahanBakuProduk,
      isMeter,
    };

    if (!!isMeter) {
      newValue.jumlah_meter = 1;
    }

    setPesananPengadaanMeubel([...pesananPengadaanMeubel, newValue]);
    setNamaProduk("");
    setUkuranProduk("");
    setDeskripsiProduk("");
    setHargaProduk(0);
    setBahanBakuProduk([]);
    setGambarProduk([]);
    setIDKategori();
    setNamaKategori("");
    setIsMeter();
  };

  const decreaseKuantitas = (index) => {
    const newArray = [...pesananPengadaanMeubel];

    if (newArray[index].isMeter === true) {
      newArray[index].jumlah -= 1;
      newArray[index].jumlahHarga =
        newArray[index].harga *
        newArray[index].jumlah_meter *
        newArray[index].jumlah;

      setPesananPengadaanMeubel(newArray);
    } else if (newArray[index].isMeter === false) {
      newArray[index].jumlah -= 1;
      newArray[index].jumlahHarga -= newArray[index].harga;

      setPesananPengadaanMeubel(newArray);
    }
  };

  const increaseKuantitas = (index) => {
    const newArray = [...pesananPengadaanMeubel];

    if (newArray[index].isMeter === true) {
      newArray[index].jumlah += 1;
      newArray[index].jumlahHarga =
        newArray[index].harga *
        newArray[index].jumlah_meter *
        newArray[index].jumlah;

      setPesananPengadaanMeubel(newArray);
    } else if (newArray[index].isMeter === false) {
      newArray[index].jumlah += 1;
      newArray[index].jumlahHarga += newArray[index].harga;

      setPesananPengadaanMeubel(newArray);
    }
  };

  const decreaseKuantitasMeter = (index) => {
    const newArray = [...pesananPengadaanMeubel];
    if (newArray[index].jumlah_meter > 1) {
      newArray[index].jumlah_meter -= 1;
      newArray[index].jumlahHarga =
        newArray[index].harga *
        newArray[index].jumlah_meter *
        newArray[index].jumlah;

      setPesananPengadaanMeubel(newArray);
    }
  };

  const increaseKuantitasMeter = (index) => {
    const newArray = [...pesananPengadaanMeubel];

    newArray[index].jumlah_meter += 1;
    newArray[index].jumlahHarga =
      newArray[index].harga *
      newArray[index].jumlah_meter *
      newArray[index].jumlah;

    setPesananPengadaanMeubel(newArray);
  };

  const checkoutPesananPengadaanMeubel = () => {
    const data = {
      user: {
        nama: namaPembeli,
        nomor: nomorTeleponPembeli,
        email: emailPembeli,
        alamat: alamatPembeli,
        status: 2,
      },
      order: pesananPengadaanMeubel,
    };

    mutate(data);

    setNamaPembeli("");
    setNomorTeleponPembeli("");
    setEmailPembeli("");
    setAlamatPembeli("");
    setPesananPengadaanMeubel([]);
  };

  // Debugging Area

  // console.log(bahanBakuValue);
  // console.log(dataBahanBaku);
  // console.log(IDBahanBaku);
  // console.log(dataSatuanBahanBaku);
  // console.log(satuanBahanBaku);
  // console.log(jumlahBahanBaku);
  // console.log(bahanBakuProduk);
  // console.log(pesananPengadaanMeubel);
  // console.log(dataProduk);

  return (
    <section className="font-archivo">
      <div className="flex flex-col gap-4">
        <div>
          <h1 className="text-2xl font-bold">Pengadaan Meubel</h1>
        </div>
        <div className="grid grid-cols-2 gap-12">
          <div className="flex flex-col gap-24">
            <div className="flex flex-col gap-2">
              <p className="text-lg font-bold">Pesanan</p>
              <div>
                <Label htmlFor="nama_produk">Nama Produk</Label>
                <div className="flex gap-1">
                  <Input
                    id="nama_produk"
                    value={namaProduk}
                    onChange={(event) => {
                      setNamaProduk(event.target.value);
                    }}
                  />
                  <Popover
                    open={popoverStatusProduk}
                    onOpenChange={(status) => {
                      setPopoverStatusProduk(status);
                    }}>
                    <PopoverTrigger>
                      <button className="flex h-full items-center justify-center rounded-lg border-2 border-neutral-500 bg-amber-300 p-2 transition-colors hover:bg-amber-400">
                        <ChevronDown />
                      </button>
                    </PopoverTrigger>
                    <PopoverContent
                      align="end"
                      className="border-2 border-neutral-500 p-0 shadow-2xl">
                      <Command>
                        <CommandGroup className="shadow-lg">
                          <ScrollArea className="h-32">
                            {!!dataProduk &&
                              dataProduk.map((produk) => (
                                <CommandItem
                                  key={produk.id}
                                  onSelect={(currentValue) => {
                                    setProduk(produk);
                                    setPopoverStatusProduk(false);
                                  }}
                                  className="cursor-pointer font-archivo transition-all hover:bg-neutral-200">
                                  {produk.name}
                                </CommandItem>
                              ))}
                          </ScrollArea>
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              <div>
                <Label htmlFor="ukuran_produk">Ukuran Produk</Label>
                <Input
                  id="ukuran_produk"
                  value={ukuranProduk}
                  onChange={(event) => {
                    setUkuranProduk(event.target.value);
                  }}
                />
              </div>
              <div>
                <Label htmlFor="deskripsi_produk">Deskripsi Produk</Label>
                <Textarea
                  id="deskripsi_produk"
                  value={deskripsiProduk}
                  onChange={(event) => {
                    setDeskripsiProduk(event.target.value);
                  }}
                  className="h-32"
                />
              </div>
              <div>
                <Label htmlFor="harga_produk">Harga Produk</Label>
                <CurrencyInput
                  id="harga_produk"
                  value={hargaProduk}
                  onChange={setHargaProduk}
                  className="text-right"
                />
              </div>
              <div className="flex flex-col gap-1 pt-2">
                <p className="text-sm font-medium leading-none">
                  Keperluan Bahan Baku
                </p>
                <div className="flex flex-col gap-2 rounded-lg border-2 border-neutral-500 p-4">
                  <Popover
                    open={popoverStatusTambahBahanBaku}
                    onOpenChange={(status) => {
                      setPopoverStatusTambahBahanBaku(status);
                    }}>
                    <PopoverTrigger>
                      <button className="flex w-max items-center gap-2 rounded-lg border-2 border-neutral-500 bg-amber-300 p-2">
                        <PlusCircle className="text-xs" />
                        <p className="text-xs">Bahan Baku</p>
                      </button>
                    </PopoverTrigger>
                    <PopoverContent
                      align="start"
                      className="border-2 border-neutral-500 shadow-2xl">
                      <div className="flex flex-col gap-3">
                        <p className="font-archivo font-bold">
                          Tambah Bahan Baku
                        </p>
                        <Popover
                          open={popoverStatusIDBahanBaku}
                          onOpenChange={(status) =>
                            setPopoverStatusIDBahanBaku(status)
                          }>
                          <PopoverTrigger className="w-full">
                            <div className="flex w-full flex-col items-start gap-1">
                              <Label className="font-archivo">Bahan Baku</Label>
                              <Button
                                variant="outline"
                                className="w-full justify-between capitalize">
                                {IDBahanBaku
                                  ? dataBahanBaku.find(
                                      (bahanBaku) =>
                                        bahanBaku.id === IDBahanBaku,
                                    )?.nama
                                  : "Pilih Bahan Baku"}
                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                              </Button>
                            </div>
                          </PopoverTrigger>
                          <PopoverContent align="start" className="p-0">
                            <Command>
                              <CommandGroup className="shadow-lg">
                                <ScrollArea className="h-32">
                                  {!!dataBahanBaku &&
                                    dataBahanBaku.map((bahanBaku) => (
                                      <CommandItem
                                        key={bahanBaku.id}
                                        onSelect={(currentValue) => {
                                          setIDBahanBaku(
                                            currentValue === IDBahanBaku
                                              ? ""
                                              : bahanBaku.id,
                                          );
                                          setSatuanBahanBaku();
                                          setPopoverStatusIDBahanBaku(false);
                                        }}
                                        className="cursor-pointer transition-all hover:bg-neutral-200">
                                        {bahanBaku.nama}
                                      </CommandItem>
                                    ))}
                                </ScrollArea>
                              </CommandGroup>
                            </Command>
                          </PopoverContent>
                        </Popover>
                        <Popover
                          open={popoverStatusBahanBaku}
                          onOpenChange={(status) =>
                            setPopoverStatusBahanBaku(status)
                          }>
                          <PopoverTrigger className="w-full">
                            <div className="flex w-full flex-col items-start gap-1">
                              <Label className="font-archivo">
                                Satuan Bahan Baku
                              </Label>
                              <Button
                                disabled={!IDBahanBaku}
                                variant="outline"
                                className="w-full justify-between capitalize">
                                {satuanBahanBaku
                                  ? dataSatuanBahanBaku.find(
                                      (bahanBaku) =>
                                        bahanBaku.satuan.toLowerCase() ===
                                        satuanBahanBaku.toLowerCase(),
                                    )?.satuan
                                  : "Pilih Satuan Bahan Baku"}
                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                              </Button>
                            </div>
                          </PopoverTrigger>
                          <PopoverContent align="start" className="p-0">
                            <Command>
                              <CommandGroup>
                                <ScrollArea className="h-32">
                                  {!!dataSatuanBahanBaku &&
                                    dataSatuanBahanBaku.map(
                                      (satuanBahanBaku) => (
                                        <CommandItem
                                          key={satuanBahanBaku.id}
                                          onSelect={(currentValue) => {
                                            setSatuanBahanBaku(
                                              currentValue === satuanBahanBaku
                                                ? ""
                                                : satuanBahanBaku.satuan,
                                            );
                                            setPopoverStatusBahanBaku(false);
                                          }}
                                          className="cursor-pointer capitalize transition-all hover:bg-neutral-200">
                                          {satuanBahanBaku.satuan}
                                        </CommandItem>
                                      ),
                                    )}
                                </ScrollArea>
                              </CommandGroup>
                            </Command>
                          </PopoverContent>
                        </Popover>
                        <div className="flex w-full flex-col items-start gap-1">
                          <Label
                            htmlFor="jumlah_bahan_baku"
                            className="font-archivo">
                            Jumlah Bahan Baku
                          </Label>
                          <NumericInput
                            id="jumlah_bahan_baku"
                            value={jumlahBahanBaku}
                            onChange={(event) => {
                              setJumlahBahanBaku(() => event);
                            }}
                            className="py-2"
                          />
                        </div>
                        <button
                          onClick={() => addBahanBaku()}
                          className="flex items-center justify-center gap-2 rounded-lg border-2 border-neutral-500 bg-amber-300 p-2">
                          <p className="font-archivo text-sm font-bold">
                            Simpan
                          </p>
                        </button>
                      </div>
                    </PopoverContent>
                  </Popover>
                  <div className="overflow-hidden overflow-x-auto rounded-lg border-2 border-neutral-500">
                    {bahanBakuProduk.length !== 0 ? (
                      <table className="w-full table-auto font-archivo text-sm">
                        <thead className="bg-amber-300">
                          <tr className="rounded-t-lg">
                            <th className="p-2 text-center font-medium">No.</th>
                            <th className="p-2 text-center font-medium">
                              Bahan Baku
                            </th>
                            <th className="p-2 text-center font-medium">
                              Satuan
                            </th>
                            <th className="p-2 text-center font-medium">
                              Jumlah
                            </th>
                            <th className="p-2 text-center font-medium"></th>
                            <th className="p-2 text-center font-medium"></th>
                          </tr>
                        </thead>
                        <tbody>
                          {bahanBakuProduk.length !== 0 &&
                            bahanBakuProduk.map((data, index) => {
                              const {
                                id,
                                satuan,
                                jumlah,
                                bahanBaku: {
                                  id: idBahanBaku,
                                  nama: namaBahanBaku,
                                },
                              } = data;
                              return (
                                <tr
                                  key={id}
                                  className="odd:bg-white even:bg-neutral-200">
                                  <td className="w-0 p-2.5 text-center">
                                    {index + 1}.
                                  </td>
                                  <td className="p-2.5 capitalize">
                                    {namaBahanBaku}
                                  </td>
                                  <td className="p-2.5 text-center capitalize">
                                    {satuan}
                                  </td>
                                  <td className="p-2.5 text-center">
                                    {convertNumeric(jumlah)}
                                  </td>
                                  <td className="text-center">
                                    <Popover
                                      key={index}
                                      onOpenChange={(status) => {
                                        if (!!status) {
                                          setIDBahanBaku(idBahanBaku);
                                          setSatuanBahanBaku(satuan);
                                          setJumlahBahanBaku(jumlah);
                                        }

                                        if (!status) {
                                          setIDBahanBaku();
                                          setSatuanBahanBaku("");
                                          setJumlahBahanBaku();
                                        }
                                      }}>
                                      <PopoverTrigger className="flex-shrink-0">
                                        <button className="flex items-center gap-2 rounded-lg bg-amber-300 p-2 text-neutral-900">
                                          <Edit className="flex-shrink-0 text-sm" />
                                        </button>
                                      </PopoverTrigger>
                                      <PopoverContent
                                        align="start"
                                        className="border-2 border-neutral-500 shadow-2xl">
                                        <div className="flex flex-col gap-3">
                                          <p className="font-archivo font-bold">
                                            Edit Bahan Baku
                                          </p>
                                          <Popover
                                            open={popoverStatusIDBahanBaku}
                                            onOpenChange={(status) =>
                                              setPopoverStatusIDBahanBaku(
                                                status,
                                              )
                                            }>
                                            <PopoverTrigger className="w-full">
                                              <div className="flex w-full flex-col items-start gap-1">
                                                <Label className="font-archivo">
                                                  Bahan Baku
                                                </Label>
                                                <Button
                                                  variant="outline"
                                                  className="w-full justify-between capitalize">
                                                  {IDBahanBaku
                                                    ? dataBahanBaku.find(
                                                        (bahanBaku) =>
                                                          bahanBaku.id ===
                                                          IDBahanBaku,
                                                      )?.nama
                                                    : "Pilih Bahan Baku"}
                                                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                </Button>
                                              </div>
                                            </PopoverTrigger>
                                            <PopoverContent
                                              align="start"
                                              className="p-0">
                                              <Command>
                                                <CommandGroup className="shadow-lg">
                                                  <ScrollArea className="h-32">
                                                    {!!dataBahanBaku &&
                                                      dataBahanBaku.map(
                                                        (bahanBaku) => (
                                                          <CommandItem
                                                            key={bahanBaku.id}
                                                            onSelect={(
                                                              currentValue,
                                                            ) => {
                                                              setIDBahanBaku(
                                                                currentValue ===
                                                                  IDBahanBaku
                                                                  ? ""
                                                                  : bahanBaku.id,
                                                              );
                                                              setSatuanBahanBaku();
                                                              setPopoverStatusIDBahanBaku(
                                                                false,
                                                              );
                                                            }}
                                                            className="cursor-pointer transition-all hover:bg-neutral-200">
                                                            {bahanBaku.nama}
                                                          </CommandItem>
                                                        ),
                                                      )}
                                                  </ScrollArea>
                                                </CommandGroup>
                                              </Command>
                                            </PopoverContent>
                                          </Popover>
                                          <Popover
                                            open={popoverStatusBahanBaku}
                                            onOpenChange={(status) =>
                                              setPopoverStatusBahanBaku(status)
                                            }>
                                            <PopoverTrigger className="w-full">
                                              <div className="flex w-full flex-col items-start gap-1">
                                                <Label className="font-archivo">
                                                  Satuan Bahan Baku
                                                </Label>
                                                <Button
                                                  disabled={!IDBahanBaku}
                                                  variant="outline"
                                                  className="w-full justify-between capitalize">
                                                  {satuanBahanBaku
                                                    ? dataSatuanBahanBaku.find(
                                                        (bahanBaku) =>
                                                          bahanBaku.satuan.toLowerCase() ===
                                                          satuanBahanBaku.toLowerCase(),
                                                      )?.satuan
                                                    : "Pilih Satuan Bahan Baku"}
                                                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                </Button>
                                              </div>
                                            </PopoverTrigger>
                                            <PopoverContent
                                              align="start"
                                              className="p-0">
                                              <Command>
                                                <CommandGroup>
                                                  <ScrollArea className="h-32">
                                                    {!!dataSatuanBahanBaku &&
                                                      dataSatuanBahanBaku.map(
                                                        (satuanBahanBaku) => (
                                                          <CommandItem
                                                            key={
                                                              satuanBahanBaku.id
                                                            }
                                                            onSelect={(
                                                              currentValue,
                                                            ) => {
                                                              setSatuanBahanBaku(
                                                                currentValue ===
                                                                  satuanBahanBaku
                                                                  ? ""
                                                                  : satuanBahanBaku.satuan,
                                                              );
                                                              setPopoverStatusBahanBaku(
                                                                false,
                                                              );
                                                            }}
                                                            className="cursor-pointer capitalize transition-all hover:bg-neutral-200">
                                                            {
                                                              satuanBahanBaku.satuan
                                                            }
                                                          </CommandItem>
                                                        ),
                                                      )}
                                                  </ScrollArea>
                                                </CommandGroup>
                                              </Command>
                                            </PopoverContent>
                                          </Popover>
                                          <div className="flex w-full flex-col items-start gap-1">
                                            <Label
                                              htmlFor="jumlah_bahan_baku"
                                              className="font-archivo">
                                              Jumlah Bahan Baku
                                            </Label>
                                            <NumericInput
                                              id="jumlah_bahan_baku"
                                              value={jumlahBahanBaku}
                                              onChange={(event) => {
                                                setJumlahBahanBaku(() => event);
                                              }}
                                              className="py-2"
                                            />
                                          </div>
                                          <button
                                            onClick={() => editBahanBaku(index)}
                                            className="flex items-center justify-center gap-2 rounded-lg border-2 border-neutral-500 bg-amber-300 p-2">
                                            <p className="font-archivo text-sm font-bold">
                                              Simpan
                                            </p>
                                          </button>
                                        </div>
                                      </PopoverContent>
                                    </Popover>
                                  </td>
                                  <td className="text-center">
                                    <button
                                      onClick={() => deleteBahanBaku(index)}
                                      className="flex flex-shrink-0 items-center gap-2 rounded-lg bg-red-500 p-2 text-white">
                                      <Delete className="flex-shrink-0 text-sm" />
                                    </button>
                                  </td>
                                </tr>
                              );
                            })}
                        </tbody>
                      </table>
                    ) : (
                      <div className="flex items-center justify-center p-4">
                        <p className="text-sm">Belum ada Bahan Baku</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <Button
                disabled={
                  !namaProduk ||
                  !ukuranProduk ||
                  !deskripsiProduk ||
                  !hargaProduk ||
                  bahanBakuProduk.length === 0
                }
                onClick={() => addPesananPengadaanMeubel()}
                className="mt-8 border-2 border-neutral-500 p-3 text-base font-bold">
                Tambah Produk
              </Button>
            </div>
          </div>
          <div className="flex flex-col gap-24">
            <div className="flex flex-col gap-2">
              <p className="text-lg font-bold">Pembeli</p>
              <div className="flex flex-col gap-1">
                <p className="text-sm font-medium leading-none">
                  Produk Pesanan
                </p>
                <div className="flex flex-col gap-2 rounded-lg border-2 border-neutral-500 p-4">
                  {pesananPengadaanMeubel.length !== 0 ? (
                    pesananPengadaanMeubel.map((data, index) => {
                      const {
                        name,
                        namaKategori,
                        ukuran,
                        Deskripsi_produk,
                        jumlahHarga,
                        product_images,
                        jumlah,
                        jumlah_meter,
                        harga,
                        isMeter,
                      } = data;

                      const urlGambar = product_images[0]?.url_image;

                      return (
                        <div className="relative flex gap-4 rounded-lg border-2 border-neutral-500 bg-neutral-100 p-3">
                          <div className="flex-shrink-0">
                            {!!urlGambar && (
                              <img
                                src={urlGambar}
                                className="block h-20 w-16 rounded-lg object-cover"
                              />
                            )}
                            {!urlGambar && (
                              <div className="flex h-20 w-16 items-center justify-center rounded-lg bg-neutral-300 object-cover">
                                <Package className="flex-shrink-0 text-3xl text-neutral-600" />
                              </div>
                            )}
                          </div>
                          <div className="flex w-full gap-2">
                            <div className="flex flex-col justify-between">
                              <div>
                                <p className="text-sm font-semibold">{name}</p>
                                <p className="text-sm">
                                  {convertIDRCurrency(jumlahHarga)}
                                </p>
                              </div>
                              {/* <table className="w-[30ch] text-xs font-light">
                                  <tbody>
                                    <tr>
                                      <td className="align-top">Kategori</td>
                                      <td className="px-2 align-top">:</td>
                                      <td className="align-top">
                                        {namaKategori}
                                      </td>
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
                                </table> */}

                              <div className="flex flex-shrink-0 items-center gap-8">
                                <div className="flex flex-shrink-0 items-center gap-2">
                                  <button
                                    disabled={jumlah === 1}
                                    className="rounded-md bg-amber-300 p-1 transition-colors hover:bg-amber-400 disabled:pointer-events-none disabled:opacity-50"
                                    onClick={() => decreaseKuantitas(index)}>
                                    <Minus className="flex-shrink-0 text-xs" />
                                  </button>
                                  <p className="flex w-5 flex-shrink-0 items-center justify-center text-xs">
                                    {jumlah}
                                  </p>
                                  <button
                                    className="rounded-md bg-amber-300 p-1 transition-colors hover:bg-amber-400"
                                    onClick={() => increaseKuantitas(index)}>
                                    <Plus className="flex-shrink-0 text-xs" />
                                  </button>
                                  <p className="text-xs">Set</p>
                                </div>
                                {!!isMeter && (
                                  <div className="flex flex-shrink-0 items-center gap-2">
                                    <button
                                      disabled={jumlah_meter === 1}
                                      className="rounded-md bg-amber-300 p-1 transition-colors hover:bg-amber-400 disabled:pointer-events-none disabled:opacity-50"
                                      onClick={() =>
                                        decreaseKuantitasMeter(index)
                                      }>
                                      <Minus className="flex-shrink-0 text-xs" />
                                    </button>
                                    <p className="flex w-5 flex-shrink-0 items-center justify-center text-xs">
                                      {jumlah_meter}
                                    </p>
                                    <button
                                      className="rounded-md bg-amber-300 p-1 transition-colors hover:bg-amber-400"
                                      onClick={() =>
                                        increaseKuantitasMeter(index)
                                      }>
                                      <Plus className="flex-shrink-0 text-xs" />
                                    </button>
                                    <p className="text-xs">Meter</p>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                          <button
                            onClick={() => {
                              deleteProdukPengadaanMeubel(index);
                            }}
                            className="absolute right-2 top-2 rounded-lg bg-red-500 p-1 text-white transition-colors hover:bg-red-700">
                            <X className="text-sm" />
                          </button>
                        </div>
                      );
                    })
                  ) : (
                    <div className="flex items-center justify-center rounded-lg border-2 border-neutral-500 p-4">
                      <p className="text-sm">Belum ada Produk Pesanan</p>
                    </div>
                  )}
                </div>
              </div>
              <div>
                <Label htmlFor="nama_pembeli">Nama</Label>
                <Input
                  id="nama_pembeli"
                  value={namaPembeli}
                  onChange={(event) => {
                    setNamaPembeli(event.target.value);
                  }}
                />
              </div>
              <div>
                <Label htmlFor="nomor_telepon_pembeli">Nomor Telepon</Label>
                <Input
                  id="nomor_telepon_pembeli"
                  value={nomorTeleponPembeli}
                  onChange={(event) => {
                    setNomorTeleponPembeli(event.target.value);
                  }}
                />
              </div>
              <div>
                <Label htmlFor="email_pembeli">Email</Label>
                <Input
                  id="email_pembeli"
                  value={emailPembeli}
                  onChange={(event) => {
                    setEmailPembeli(event.target.value);
                  }}
                />
              </div>
              <div>
                <Label htmlFor="alamat_pembeli">Alamat</Label>
                <Textarea
                  id="alamat_pembeli"
                  value={alamatPembeli}
                  onChange={(event) => {
                    setAlamatPembeli(event.target.value);
                  }}
                  className="h-32"
                />
              </div>
              <Button
                disabled={
                  !namaPembeli ||
                  !nomorTeleponPembeli ||
                  !emailPembeli ||
                  !alamatPembeli ||
                  pesananPengadaanMeubel.length === 0
                }
                onClick={() => checkoutPesananPengadaanMeubel()}
                className="mt-8 border-2 border-neutral-500 p-3 text-base font-bold">
                Checkout
              </Button>
            </div>
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

function convertNumeric(value) {
  const optionsCurrency = {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  };
  const formatterCurrency = new Intl.NumberFormat("id-ID", optionsCurrency);
  const convertValue = formatterCurrency.format(value);
  return convertValue;
}
