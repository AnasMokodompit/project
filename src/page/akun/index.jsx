// Packages
import { useState, useEffect, Fragment } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useForm, useFieldArray } from "react-hook-form";
import axios from "axios";

import { cn } from "../../utils/cn";

// Assets
import Delete from "../../Asset/icons/untitled-ui-icons/line/components/Delete";
import Edit from "../../Asset/icons/untitled-ui-icons/line/components/Edit03";
import PlusCircle from "../../Asset/icons/untitled-ui-icons/line/components/PlusCircle";
import Search from "../../Asset/icons/untitled-ui-icons/line/components/SearchLg";
import ChevronLeft from "../../Asset/icons/untitled-ui-icons/line/components/ChevronLeft";
import ChevronRight from "../../Asset/icons/untitled-ui-icons/line/components/ChevronRight";
import ChevronsUpDown from "../../Asset/icons/untitled-ui-icons/line/components/ChevronSelectorVertical";
import Check from "../../Asset/icons/untitled-ui-icons/line/components/Check";

// Components
import { Button } from "../../componet/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "../../componet/command";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "../../componet/dialog";
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

export const Akun = () => {
  const form = useForm({
    defaultValues: {
      nama: "",
    },
  });

  const [namaAkunTransaksiData, setNamaAkunTransaksiData] = useState();
  const [keteranganNamaAkunTransaksiData, setKeteranganNamaAkunTransaksiData] =
    useState();
  const [tipeAkunTransaksiData, setTipeAkunTransaksiData] = useState();
  const [namaAkunTransaksiID, setNamaAkunTransaksiID] = useState();
  const [search, setSearch] = useState();
  const [page, setPage] = useState(1);
  const [isDialogCreateOpen, setIsDialogCreateOpen] = useState(false);
  const [isDialogUpdateOpen, setIsDialogUpdateOpen] = useState(false);

  const formUpdate = useForm({});
  const formCreate = useForm({});

  const { refetch } = useQuery({
    queryKey: ["nama-akun-transaksi"],
    queryFn: () => {
      return axios.get(`${process.env.REACT_APP_BASE_API}/namaAkunTransaksi`, {
        params: {
          search,
          page,
          row: 20,
        },
      });
    },
    onSuccess: (res) => {
      setNamaAkunTransaksiData(res.data.data);
    },
  });

  const { refetch: refetchKeteranganNamaAkunTransaksi } = useQuery({
    queryKey: ["keterangan-nama-akun-transaksi"],
    queryFn: () => {
      return axios.get(
        `${process.env.REACT_APP_BASE_API}/keteranganNamaAkunTransaksi`,
        {},
      );
    },
    onSuccess: (res) => {
      setKeteranganNamaAkunTransaksiData(res.data.data);
    },
  });

  const { refetch: refetchTipeAkunTransaksi } = useQuery({
    queryKey: ["tipe-akun-transaksi"],
    queryFn: () => {
      return axios.get(
        `${process.env.REACT_APP_BASE_API}/tipeAkunTransaksi`,
        {},
      );
    },
    onSuccess: (res) => {
      setTipeAkunTransaksiData(res.data.data);
    },
  });

  const { mutate: createNamaAkunTransaksi } = useMutation({
    mutationFn: async (data) => {
      return await axios.post(
        `${process.env.REACT_APP_BASE_API}/namaAkunTransaksi`,
        data,
      );
    },
    onSuccess: (data) => {
      refetch();
      setIsDialogCreateOpen(false);
      formCreate.reset();
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const { mutate: deleteNamaAkunTransaksi } = useMutation({
    mutationFn: async () => {
      await axios.delete(
        `${process.env.REACT_APP_BASE_API}/namaAkunTransaksi/${namaAkunTransaksiID}`,
      );
    },
    onSuccess: () => {
      refetch();
      setNamaAkunTransaksiID();
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const { mutate: updateNamaAkunTransaksi } = useMutation({
    mutationFn: async (data) => {
      await axios.patch(
        `${process.env.REACT_APP_BASE_API}/namaAkunTransaksi/${namaAkunTransaksiID}`,
        data,
      );
    },
    onSuccess: () => {
      refetch();
      setNamaAkunTransaksiID();
      formUpdate.reset();
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const onSubmitUpdate = formUpdate.handleSubmit((data) => {
    updateNamaAkunTransaksi(data);
    // console.log(data);
  });

  const onSubmitCreate = formCreate.handleSubmit((data) => {
    createNamaAkunTransaksi(data);
    // console.log(data);
  });

  useEffect(() => {
    refetch();
  }, [page, search]);

  return (
    <div className="flex flex-col gap-4">
      <div>
        <p className="text-2xl font-bold text-black">Akun</p>
      </div>
      <div className="flex justify-between gap-4 rounded-lg border-2 border-neutral-500 bg-neutral-100 p-3">
        <div>
          <Dialog
            open={isDialogCreateOpen}
            onOpenChange={(open) => setIsDialogCreateOpen(open)}>
            <DialogTrigger>
              <button className="flex items-center gap-2 rounded-lg border-2 border-neutral-500 bg-amber-300 p-2">
                <PlusCircle className="text-sm" />
                <p className="text-sm font-bold">Buat</p>
              </button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader className="text-left font-archivo text-xl font-bold">
                Buat Akun
              </DialogHeader>
              <div className="flex flex-col gap-4">
                <Form {...formCreate}>
                  <FormField
                    control={formCreate.control}
                    name="kode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-archivo">Kode</FormLabel>
                        <FormControl>
                          <Input {...field} className="p-2.5" />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={formCreate.control}
                    name="nama"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-archivo">Nama</FormLabel>
                        <FormControl>
                          <Input {...field} className="p-2.5" />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={formCreate.control}
                    name="id_keterangan"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel className="font-archivo">
                          Keterangan
                        </FormLabel>
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
                                  ? `${
                                      keteranganNamaAkunTransaksiData.find(
                                        (keterangan) =>
                                          keterangan.id === field.value,
                                      )?.post
                                    } (${
                                      keteranganNamaAkunTransaksiData.find(
                                        (keterangan) =>
                                          keterangan.id === field.value,
                                      )?.saldoNormal
                                    })`
                                  : "Pilih Keterangan"}
                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent align="start" className="p-0">
                            <Command>
                              <ScrollArea className="h-40">
                                <CommandGroup>
                                  {keteranganNamaAkunTransaksiData.map(
                                    (keterangan) => (
                                      <CommandItem
                                        value={keterangan.id}
                                        key={keterangan.id}
                                        onSelect={() => {
                                          formCreate.setValue(
                                            "id_keterangan",
                                            keterangan.id,
                                          );
                                        }}>
                                        <Check
                                          className={cn(
                                            "mr-2 h-4 w-4",
                                            keterangan.id === field.value
                                              ? "opacity-100"
                                              : "opacity-0",
                                          )}
                                        />
                                        {`${keterangan.post} (${keterangan.saldoNormal})`}
                                      </CommandItem>
                                    ),
                                  )}
                                </CommandGroup>
                              </ScrollArea>
                            </Command>
                          </PopoverContent>
                        </Popover>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={formCreate.control}
                    name="id_tipe_akun_transaksi"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel className="font-archivo">Tipe</FormLabel>
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
                                  ? tipeAkunTransaksiData.find(
                                      (tipe) => tipe.id === field.value,
                                    )?.nama
                                  : "Pilih Tipe"}
                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent align="start" className="p-0">
                            <Command>
                              <ScrollArea className="h-40">
                                <CommandGroup>
                                  {tipeAkunTransaksiData.map((tipe) => (
                                    <CommandItem
                                      value={tipe.id}
                                      key={tipe.id}
                                      onSelect={() => {
                                        formCreate.setValue(
                                          "id_tipe_akun_transaksi",
                                          tipe.id,
                                        );
                                      }}>
                                      <Check
                                        className={cn(
                                          "mr-2 h-4 w-4",
                                          tipe.id === field.value
                                            ? "opacity-100"
                                            : "opacity-0",
                                        )}
                                      />
                                      {tipe.nama}
                                    </CommandItem>
                                  ))}
                                </CommandGroup>
                              </ScrollArea>
                            </Command>
                          </PopoverContent>
                        </Popover>
                      </FormItem>
                    )}
                  />
                </Form>
                <button
                  onClick={async () => {
                    onSubmitCreate();
                  }}
                  className="rounded-lg bg-amber-300 p-3 font-archivo text-sm font-bold shadow-lg">
                  Simpan
                </button>
              </div>
            </DialogContent>
          </Dialog>
          {/* <Popover>
            <PopoverTrigger>
              <button className="flex items-center gap-2 rounded-lg border-2 border-neutral-500 bg-amber-300 p-2">
                <PlusCircle className="text-sm" />
                <p className="text-sm font-bold">Buat</p>
              </button>
            </PopoverTrigger>
            <PopoverContent align="start">
              <div className="flex flex-col gap-2">
                <Form {...formCreate}>
                  <FormField
                    control={formCreate.control}
                    name="kode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-archivo">Kode</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={formCreate.control}
                    name="nama"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-archivo">Nama</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </Form>
                <button
                  onClick={async () => {
                    onSubmitCreate();
                  }}
                  className="rounded-lg bg-amber-300 p-2 text-sm font-bold shadow-lg">
                  Simpan
                </button>
              </div>
            </PopoverContent>
          </Popover> */}
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
      <div className="flex flex-col gap-2">
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
            disabled={namaAkunTransaksiData?.length < 20}>
            <ChevronRight />
          </button>
        </div>
        <table className="w-full table-auto border-collapse text-sm">
          <thead>
            <tr className="border-2 border-neutral-500 bg-amber-300">
              <th className="px-3 py-2 text-center font-semibold">Kode</th>
              <th className="px-3 py-2 text-center font-semibold">
                Nama Akun Transaksi
              </th>
              <th className="px-3 py-2 text-center font-semibold"></th>
            </tr>
          </thead>
          <tbody>
            {!!namaAkunTransaksiData &&
              namaAkunTransaksiData.map((item, index) => {
                const {
                  id,
                  kode,
                  nama,
                  keteranganNamaAkunTransaksi: { id: idKeterangan },
                  tipe_akun_transaksi: { id: idTipeAkunTransaksi },
                } = item;
                // console.log(item);

                // console.log(namaAkunTransaksiDalamJenisTransaksi);

                return (
                  <tr key={id} className="border-b even:bg-neutral-50">
                    <td className="w-0 border-2 border-neutral-500 p-2">
                      {kode}
                    </td>
                    <td className="border-2 border-neutral-500 p-2">{nama}</td>
                    <td className="w-1/12 border-2 border-neutral-500 p-2 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <Dialog>
                          <DialogTrigger>
                            <button
                              onClick={() => {
                                formUpdate.reset({
                                  kode: kode,
                                  nama: nama,
                                  id_keterangan: idKeterangan,
                                  id_tipe_akun_transaksi: idTipeAkunTransaksi,
                                });
                              }}
                              className="flex items-center gap-2 rounded-lg bg-amber-300 p-2 text-white">
                              <Edit className="flex-shrink-0 text-sm text-neutral-900" />
                            </button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader className="text-left font-archivo text-xl font-bold">
                              Update Akun
                            </DialogHeader>
                            <div className="flex flex-col gap-4">
                              <Form {...formUpdate}>
                                <FormField
                                  control={formUpdate.control}
                                  name="kode"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel className="font-archivo">
                                        Kode
                                      </FormLabel>
                                      <FormControl>
                                        <Input {...field} className="p-2.5" />
                                      </FormControl>
                                    </FormItem>
                                  )}
                                />
                                <FormField
                                  control={formUpdate.control}
                                  name="nama"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel className="font-archivo">
                                        Nama
                                      </FormLabel>
                                      <FormControl>
                                        <Input {...field} className="p-2.5" />
                                      </FormControl>
                                    </FormItem>
                                  )}
                                />
                                <FormField
                                  control={formUpdate.control}
                                  name="id_keterangan"
                                  render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                      <FormLabel className="font-archivo">
                                        Keterangan
                                      </FormLabel>
                                      <Popover>
                                        <PopoverTrigger asChild>
                                          <FormControl>
                                            <Button
                                              variant="outline"
                                              role="combobox"
                                              className={cn(
                                                "justify-between p-2.5",
                                                !field.value &&
                                                  "text-muted-foreground",
                                              )}>
                                              {field.value
                                                ? `${
                                                    keteranganNamaAkunTransaksiData.find(
                                                      (keterangan) =>
                                                        keterangan.id ===
                                                        field.value,
                                                    )?.post
                                                  } (${
                                                    keteranganNamaAkunTransaksiData.find(
                                                      (keterangan) =>
                                                        keterangan.id ===
                                                        field.value,
                                                    )?.saldoNormal
                                                  })`
                                                : "Pilih Keterangan"}
                                              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                            </Button>
                                          </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent
                                          align="start"
                                          className="p-0">
                                          <Command>
                                            <ScrollArea className="h-40">
                                              <CommandGroup>
                                                {keteranganNamaAkunTransaksiData.map(
                                                  (keterangan) => (
                                                    <CommandItem
                                                      value={keterangan.id}
                                                      key={keterangan.id}
                                                      onSelect={() => {
                                                        formUpdate.setValue(
                                                          "id_keterangan",
                                                          keterangan.id,
                                                        );
                                                      }}>
                                                      <Check
                                                        className={cn(
                                                          "mr-2 h-4 w-4",
                                                          keterangan.id ===
                                                            field.value
                                                            ? "opacity-100"
                                                            : "opacity-0",
                                                        )}
                                                      />
                                                      {`${keterangan.post} (${keterangan.saldoNormal})`}
                                                    </CommandItem>
                                                  ),
                                                )}
                                              </CommandGroup>
                                            </ScrollArea>
                                          </Command>
                                        </PopoverContent>
                                      </Popover>
                                    </FormItem>
                                  )}
                                />
                                <FormField
                                  control={formUpdate.control}
                                  name="id_tipe_akun_transaksi"
                                  render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                      <FormLabel className="font-archivo">
                                        Tipe
                                      </FormLabel>
                                      <Popover>
                                        <PopoverTrigger asChild>
                                          <FormControl>
                                            <Button
                                              variant="outline"
                                              role="combobox"
                                              className={cn(
                                                "justify-between p-2.5",
                                                !field.value &&
                                                  "text-muted-foreground",
                                              )}>
                                              {field.value
                                                ? tipeAkunTransaksiData.find(
                                                    (tipe) =>
                                                      tipe.id === field.value,
                                                  )?.nama
                                                : "Pilih Tipe"}
                                              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                            </Button>
                                          </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent
                                          align="start"
                                          className="p-0">
                                          <Command>
                                            <ScrollArea className="h-40">
                                              <CommandGroup>
                                                {tipeAkunTransaksiData.map(
                                                  (tipe) => (
                                                    <CommandItem
                                                      value={tipe.id}
                                                      key={tipe.id}
                                                      onSelect={() => {
                                                        formUpdate.setValue(
                                                          "id_tipe_akun_transaksi",
                                                          tipe.id,
                                                        );
                                                      }}>
                                                      <Check
                                                        className={cn(
                                                          "mr-2 h-4 w-4",
                                                          tipe.id ===
                                                            field.value
                                                            ? "opacity-100"
                                                            : "opacity-0",
                                                        )}
                                                      />
                                                      {tipe.nama}
                                                    </CommandItem>
                                                  ),
                                                )}
                                              </CommandGroup>
                                            </ScrollArea>
                                          </Command>
                                        </PopoverContent>
                                      </Popover>
                                    </FormItem>
                                  )}
                                />
                              </Form>
                              <button
                                onClick={async () => {
                                  setNamaAkunTransaksiID(id);
                                  onSubmitUpdate();
                                }}
                                className="rounded-lg bg-amber-300 p-3 font-archivo text-sm font-bold shadow-lg">
                                Simpan
                              </button>
                            </div>
                          </DialogContent>
                        </Dialog>
                        {/* <Popover>
                          <PopoverTrigger>
                            <button className="flex items-center gap-2 rounded-lg bg-amber-300 p-2 text-white">
                              <Edit className="flex-shrink-0 text-sm text-neutral-900" />
                            </button>
                          </PopoverTrigger>
                          <PopoverContent>
                            <div className="flex flex-col gap-2">
                              <Form {...form}>
                                <FormField
                                  control={form.control}
                                  name="kode"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel className="font-archivo">
                                        Kode
                                      </FormLabel>
                                      <FormControl>
                                        <Input {...field} />
                                      </FormControl>
                                    </FormItem>
                                  )}
                                />
                                <FormField
                                  control={form.control}
                                  name="nama"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel className="font-archivo">
                                        Nama Akun Transaksi
                                      </FormLabel>
                                      <FormControl>
                                        <Input {...field} />
                                      </FormControl>
                                    </FormItem>
                                  )}
                                />
                              </Form>
                              <button
                                onClick={async () => {
                                  setNamaAkunTransaksiID(id);
                                  onSubmitUpdate();
                                }}
                                className="rounded-lg bg-amber-300 p-2 text-sm font-bold shadow-lg">
                                Perbarui
                              </button>
                            </div>
                          </PopoverContent>
                        </Popover> */}
                        <button
                          onClick={() => {
                            setNamaAkunTransaksiID(id);
                            deleteNamaAkunTransaksi();
                          }}
                          className="flex items-center gap-2 rounded-lg bg-red-500 p-2 text-white">
                          <Delete className="flex-shrink-0 text-sm text-white" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
