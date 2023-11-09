import { useState } from "react";
import { useForm } from "react-hook-form";
import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";

import { Button } from "../../componet/button";
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
  FormItem,
  FormLabel,
  FormField,
} from "../../componet/form";
import { Input } from "../../componet/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../componet/popover";
import { ScrollArea } from "../../componet/scroll-area";

import { cn } from "../../utils/cn";

import ChevronSelectorVertical from "../../Asset/icons/untitled-ui-icons/line/components/ChevronSelectorVertical";
import Check from "../../Asset/icons/untitled-ui-icons/line/components/Check";
import Plus from "../../Asset/icons/untitled-ui-icons/line/components/PlusCircle";
import Delete from "../../Asset/icons/untitled-ui-icons/line/components/Delete";
import Edit from "../../Asset/icons/untitled-ui-icons/line/components/Edit03";

const languages = [
  { label: "English", value: "en" },
  { label: "French", value: "fr" },
  { label: "German", value: "de" },
  { label: "Spanish", value: "es" },
  { label: "Portuguese", value: "pt" },
  { label: "Russian", value: "ru" },
  { label: "Japanese", value: "ja" },
  { label: "Korean", value: "ko" },
  { label: "Chinese", value: "zh" },
];

const Akun = [
  {
    namaAkunTransaksi: "Kas",
    tipe: "Debit",
  },
  {
    namaAkunTransaksi: "Peralatan",
    tipe: "Debit",
  },
  {
    namaAkunTransaksi: "Persediaan Bahan Baku",
    tipe: "Debit",
  },
  {
    namaAkunTransaksi: "Persediaan Barang Jadi",
    tipe: "Debit",
  },
  {
    namaAkunTransaksi: "Modal Pemilik",
    tipe: "Kredit",
  },
];

export const SaldoAwal = () => {
  const [saldoAwalData, setSaldoAwalData] = useState();
  const [jumlahDebit, setJumlahDebit] = useState()
  const [jumlahKredit, setJumlahKredit] = useState()
  const [saldoAwalID, setSaldoAwalID] = useState();

  const formCreate = useForm({});
  const formUpdate = useForm({});

  const { refetch } = useQuery({
    queryKey: ["saldo-awal"],
    queryFn: () => {
      return axios.get(
        `${process.env.REACT_APP_BASE_API}/saldoAkunTransaksi/saldoAwal`,
      );
    },
    onSuccess: (data) => {
      // console.log(data.data.data);
      setSaldoAwalData(data.data.data.SaldoAwal);
      setJumlahDebit(data.data.data.Total.Debit)
      setJumlahKredit(data.data.data.Total.Kredit)
    },
  });

  const { mutate: updateSaldoAwal } = useMutation({
    mutationFn: async (data) => {
      return await axios.patch(
        `${process.env.REACT_APP_BASE_API}/saldoAkunTransaksi/saldoAwal/${saldoAwalID}`,
        data,
      );
    },
    onSuccess: (data) => {
      console.log(data);
      refetch();
      setSaldoAwalID();
    },
  });

  const onSubmitUpdate = (data) => {
    const { saldo } = data;

    // console.log({ saldo: Number(saldo) });
    updateSaldoAwal({ saldo: Number(saldo) });
  };

  // console.log(saldoAwalData);

  const optionsTime = {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "Asia/Makassar",
  };
  const formatterTime = new Intl.DateTimeFormat("id-ID", optionsTime);

  console.log(saldoAwalID);

  return (
    <section className="font-archivo text-neutral-800">
      <div className="flex flex-col gap-4">
        <div>
          <h1 className="text-2xl font-bold">Saldo Awal</h1>
        </div>
        <div className="flex flex-col gap-2">
          {/* <div>
            <Popover>
              <PopoverTrigger>
                <button className="flex w-max items-center gap-1 rounded-lg border-2 border-neutral-500 bg-amber-300 px-3 py-2 text-sm font-bold">
                  <Plus className="text-sm" />
                  Buat
                </button>
              </PopoverTrigger>
              <PopoverContent
                align="start"
                className="border-2 border-neutral-500">
                <div className="flex flex-col gap-4">
                  <p className="font-archivo text-sm font-bold">
                    Buat Saldo Awal
                  </p>
                  <Form {...formCreate}>
                    <form
                      onSubmit={formCreate.handleSubmit(onSubmitCreate)}
                      className="flex flex-col gap-4">
                      <FormField
                        control={formCreate.control}
                        name="language"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormLabel>Akun</FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant="outline"
                                    role="combobox"
                                    className={cn(
                                      "relative w-full justify-between font-normal",
                                      !field.value && "text-muted-foreground",
                                    )}>
                                    {field.value
                                      ? languages.find(
                                          (language) =>
                                            language.value === field.value,
                                        )?.label
                                      : "Pilih Akun"}
                                    <ChevronSelectorVertical className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent
                                align="start"
                                side="right"
                                className="w-full border-2 border-neutral-500 p-0">
                                <Command>
                                  <CommandInput placeholder="Search framework..." />
                                  <CommandEmpty>
                                    No framework found.
                                  </CommandEmpty>
                                  <ScrollArea className="h-32">
                                    <CommandGroup>
                                      {languages.map((language) => (
                                        <CommandItem
                                          value={language.label}
                                          key={language.value}
                                          onSelect={() => {
                                            formCreate.setValue(
                                              "language",
                                              language.value,
                                            );
                                          }}>
                                          <Check
                                            className={cn(
                                              "mr-2 h-4 w-4",
                                              language.value === field.value
                                                ? "opacity-100"
                                                : "opacity-0",
                                            )}
                                          />
                                          {language.label}
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
                      <FormField
                        control={formCreate.control}
                        name="debit"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Debit</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <p className="absolute bottom-0 left-3 top-0 m-auto flex items-center font-archivo text-sm">
                                  Rp.
                                </p>
                                <Input
                                  {...field}
                                  onKeyDown={restrictAlphabet}
                                  className="px-10 pr-3 text-right"
                                />
                              </div>
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={formCreate.control}
                        name="kredit"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Kredit</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <p className="absolute bottom-0 left-3 top-0 m-auto flex items-center font-archivo text-sm">
                                  Rp.
                                </p>
                                <Input
                                  {...field}
                                  onKeyDown={restrictAlphabet}
                                  className="px-10 pr-3 text-right"
                                />
                              </div>
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <Button>Simpan</Button>
                    </form>
                  </Form>
                </div>
              </PopoverContent>
            </Popover>
          </div> */}
          <table className="w-full border-collapse border-2 border-neutral-500 text-sm">
            <thead className="bg-amber-300">
              <tr>
                <th className="w-1/12 px-3 py-2 text-center">Tanggal</th>
                <th className="w-7/12 px-3 py-2 text-center">Nama Akun</th>
                <th className="w-2/12 px-3 py-2 text-center">Debit</th>
                <th className="w-2/12 px-3 py-2 text-center">Kredit</th>
                <th className="w-0 px-3 py-2 text-center"></th>
              </tr>
            </thead>
            <tbody>
              {!!saldoAwalData &&
                saldoAwalData.map((data) => {
                  // console.log(data);

                  const {
                    id,
                    namaAkunTransaksi: { nama },
                    saldo,
                    updated_at: tanggal,
                  } = data;
                  return (
                    <tr id={id}>
                      <td className="border-2 border-neutral-500 p-2">
                        {formatterTime.format(new Date(tanggal))}
                      </td>
                      <td className="border-2 border-neutral-500 p-2">
                        {nama}
                      </td>
                      <td className="border-2 border-neutral-500 p-2 text-right">
                        {nama !== "Modal Pemilik"
                          ? convertIDRCurrency(saldo)
                          : ""}
                      </td>
                      <td className="border-2 border-neutral-500 p-2 text-right">
                        {nama === "Modal Pemilik"
                          ? convertIDRCurrency(saldo)
                          : ""}
                      </td>
                      <td className="border-2 border-neutral-500 p-2">
                        <div className="flex items-center justify-center gap-2">
                          <Popover>
                            <PopoverTrigger>
                              <button
                                onClick={() => {
                                  setSaldoAwalID(id);
                                }}
                                className="h-8 w-8 flex-shrink-0 items-center gap-2 overflow-hidden rounded-lg border-2 border-amber-300 bg-amber-300 p-2 transition-colors">
                                <Edit />
                              </button>
                            </PopoverTrigger>
                            <PopoverContent
                              align="end"
                              className="border-2 border-neutral-500">
                              <div className="flex flex-col gap-4">
                                <p className="font-archivo text-sm font-bold">
                                  Edit Saldo Awal
                                </p>
                                <Form {...formUpdate}>
                                  <form
                                    onSubmit={formUpdate.handleSubmit(
                                      onSubmitUpdate,
                                    )}
                                    className="flex flex-col gap-4">
                                    {/* <FormField
                                      control={formUpdate.control}
                                      name="language"
                                      render={({ field }) => (
                                        <FormItem className="flex flex-col">
                                          <FormLabel>Akun</FormLabel>
                                          <Popover>
                                            <PopoverTrigger asChild>
                                              <FormControl>
                                                <Button
                                                  variant="outline"
                                                  role="combobox"
                                                  className={cn(
                                                    "relative w-full justify-between",
                                                    !field.value &&
                                                      "text-muted-foreground",
                                                  )}>
                                                  {field.value
                                                    ? languages.find(
                                                        (language) =>
                                                          language.value ===
                                                          field.value,
                                                      )?.label
                                                    : "Pilih Akun"}
                                                  <ChevronSelectorVertical className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                </Button>
                                              </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent
                                              align="start"
                                              side="right"
                                              className="w-full border-2 border-neutral-500 p-0">
                                              <Command>
                                                <CommandInput placeholder="Search framework..." />
                                                <CommandEmpty>
                                                  No framework found.
                                                </CommandEmpty>
                                                <ScrollArea className="h-32">
                                                  <CommandGroup>
                                                    {languages.map(
                                                      (language) => (
                                                        <CommandItem
                                                          value={language.label}
                                                          key={language.value}
                                                          onSelect={() => {
                                                            formUpdate.setValue(
                                                              "language",
                                                              language.value,
                                                            );
                                                          }}>
                                                          <Check
                                                            className={cn(
                                                              "mr-2 h-4 w-4",
                                                              language.value ===
                                                                field.value
                                                                ? "opacity-100"
                                                                : "opacity-0",
                                                            )}
                                                          />
                                                          {language.label}
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
                                      name="debit"
                                      render={({ field }) => (
                                        <FormItem>
                                          <FormLabel>Debit</FormLabel>
                                          <FormControl>
                                            <div className="relative">
                                              <p className="absolute bottom-0 left-3 top-0 m-auto flex items-center font-archivo text-sm">
                                                Rp.
                                              </p>
                                              <Input
                                                {...field}
                                                onKeyDown={restrictAlphabet}
                                                className="px-10 pr-3 text-right"
                                              />
                                            </div>
                                          </FormControl>
                                        </FormItem>
                                      )}
                                    />
                                    <FormField
                                      control={formUpdate.control}
                                      name="kredit"
                                      render={({ field }) => (
                                        <FormItem>
                                          <FormLabel>Kredit</FormLabel>
                                          <FormControl>
                                            <div className="relative">
                                              <p className="absolute bottom-0 left-3 top-0 m-auto flex items-center font-archivo text-sm">
                                                Rp.
                                              </p>
                                              <Input
                                                {...field}
                                                onKeyDown={restrictAlphabet}
                                                className="px-10 pr-3 text-right"
                                              />
                                            </div>
                                          </FormControl>
                                        </FormItem>
                                      )}
                                    /> */}
                                    <FormField
                                      control={formUpdate.control}
                                      name="saldo"
                                      render={({ field }) => (
                                        <FormItem>
                                          <FormLabel>Saldo Awal</FormLabel>
                                          <FormControl>
                                            <div className="relative">
                                              <p className="absolute bottom-0 left-3 top-0 m-auto flex items-center font-archivo text-sm">
                                                Rp.
                                              </p>
                                              <Input
                                                {...field}
                                                onKeyDown={restrictAlphabet}
                                                className="px-10 pr-3 text-right"
                                              />
                                            </div>
                                          </FormControl>
                                        </FormItem>
                                      )}
                                    />
                                    <Button>Simpan</Button>
                                  </form>
                                </Form>
                              </div>
                            </PopoverContent>
                          </Popover>
                          {/* <button className="h-8 w-8 flex-shrink-0 items-center gap-2 overflow-hidden rounded-lg border-2 border-red-500 bg-red-500 p-2 text-white transition-colors">
                            <Delete />
                          </button> */}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              <tr className="bg-amber-300">
                <td colSpan={2} className="p-2 font-bold">
                  Total
                </td>
                <td className="p-2 text-right">{convertIDRCurrency(jumlahDebit)}</td>
                <td className="p-2 text-right">{convertIDRCurrency(jumlahKredit)}</td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

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
