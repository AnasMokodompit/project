import { useState, useRef, useEffect, forwardRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { useReactToPrint } from "react-to-print";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import axios from "axios";

import { cn } from "../../utils/cn";

import { Button } from "../../componet/button";
import { Calendar } from "../../componet/calendar";
import { Command, CommandGroup, CommandItem } from "../../componet/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../componet/popover";
import { ScrollArea } from "../../componet/scroll-area";

import CalendarIcon from "../../Asset/icons/untitled-ui-icons/line/components/Calendar";
import Check from "../../Asset/icons/untitled-ui-icons/line/components/Check";
import ChevronsUpDown from "../../Asset/icons/untitled-ui-icons/line/components/ChevronSelectorVertical";
import Printer from "../../Asset/icons/untitled-ui-icons/line/components/Printer";
import Minus from "../../Asset/icons/untitled-ui-icons/line/components/Minus";
import Refresh from "../../Asset/icons/untitled-ui-icons/line/components/RefreshCw04";

const tahun = [
  {
    label: 2000,
    value: 2000,
  },
  {
    label: 2001,
    value: 2001,
  },
  {
    label: 2002,
    value: 2002,
  },
  {
    label: 2003,
    value: 2003,
  },
  {
    label: 2004,
    value: 2004,
  },
  {
    label: 2005,
    value: 2005,
  },
  {
    label: 2006,
    value: 2006,
  },
  {
    label: 2007,
    value: 2007,
  },
  {
    label: 2008,
    value: 2008,
  },
  {
    label: 2009,
    value: 2009,
  },
  {
    label: 2010,
    value: 2010,
  },
  {
    label: 2011,
    value: 2011,
  },
  {
    label: 2012,
    value: 2012,
  },
  {
    label: 2013,
    value: 2013,
  },
  {
    label: 2014,
    value: 2014,
  },
  {
    label: 2015,
    value: 2015,
  },
  {
    label: 2016,
    value: 2016,
  },
  {
    label: 2017,
    value: 2017,
  },
  {
    label: 2018,
    value: 2018,
  },
  {
    label: 2019,
    value: 2019,
  },
  {
    label: 2020,
    value: 2020,
  },
  {
    label: 2021,
    value: 2021,
  },
  {
    label: 2022,
    value: 2022,
  },
  {
    label: 2023,
    value: 2023,
  },
  {
    label: 2024,
    value: 2024,
  },
  {
    label: 2025,
    value: 2025,
  },
  {
    label: 2026,
    value: 2026,
  },
  {
    label: 2027,
    value: 2027,
  },
  {
    label: 2028,
    value: 2028,
  },
  {
    label: 2029,
    value: 2029,
  },
  {
    label: 2030,
    value: 2030,
  },
  {
    label: 2031,
    value: 2031,
  },
  {
    label: 2032,
    value: 2032,
  },
  {
    label: 2033,
    value: 2033,
  },
  {
    label: 2034,
    value: 2034,
  },
  {
    label: 2035,
    value: 2035,
  },
  {
    label: 2036,
    value: 2036,
  },
  {
    label: 2037,
    value: 2037,
  },
  {
    label: 2038,
    value: 2038,
  },
  {
    label: 2039,
    value: 2039,
  },
  {
    label: 2040,
    value: 2040,
  },
  {
    label: 2041,
    value: 2041,
  },
  {
    label: 2042,
    value: 2042,
  },
  {
    label: 2043,
    value: 2043,
  },
  {
    label: 2044,
    value: 2044,
  },
  {
    label: 2045,
    value: 2045,
  },
  {
    label: 2046,
    value: 2046,
  },
  {
    label: 2047,
    value: 2047,
  },
  {
    label: 2048,
    value: 2048,
  },
  {
    label: 2049,
    value: 2049,
  },
  {
    label: 2050,
    value: 2050,
  },
  {
    label: 2051,
    value: 2051,
  },
  {
    label: 2052,
    value: 2052,
  },
  {
    label: 2053,
    value: 2053,
  },
  {
    label: 2054,
    value: 2054,
  },
  {
    label: 2055,
    value: 2055,
  },
  {
    label: 2056,
    value: 2056,
  },
  {
    label: 2057,
    value: 2057,
  },
  {
    label: 2058,
    value: 2058,
  },
  {
    label: 2059,
    value: 2059,
  },
  {
    label: 2060,
    value: 2060,
  },
  {
    label: 2061,
    value: 2061,
  },
  {
    label: 2062,
    value: 2062,
  },
  {
    label: 2063,
    value: 2063,
  },
  {
    label: 2064,
    value: 2064,
  },
  {
    label: 2065,
    value: 2065,
  },
  {
    label: 2066,
    value: 2066,
  },
  {
    label: 2067,
    value: 2067,
  },
  {
    label: 2068,
    value: 2068,
  },
  {
    label: 2069,
    value: 2069,
  },
  {
    label: 2070,
    value: 2070,
  },
  {
    label: 2071,
    value: 2071,
  },
  {
    label: 2072,
    value: 2072,
  },
  {
    label: 2073,
    value: 2073,
  },
  {
    label: 2074,
    value: 2074,
  },
  {
    label: 2075,
    value: 2075,
  },
  {
    label: 2076,
    value: 2076,
  },
  {
    label: 2077,
    value: 2077,
  },
  {
    label: 2078,
    value: 2078,
  },
  {
    label: 2079,
    value: 2079,
  },
  {
    label: 2080,
    value: 2080,
  },
  {
    label: 2081,
    value: 2081,
  },
  {
    label: 2082,
    value: 2082,
  },
  {
    label: 2083,
    value: 2083,
  },
  {
    label: 2084,
    value: 2084,
  },
  {
    label: 2085,
    value: 2085,
  },
  {
    label: 2086,
    value: 2086,
  },
  {
    label: 2087,
    value: 2087,
  },
  {
    label: 2088,
    value: 2088,
  },
  {
    label: 2089,
    value: 2089,
  },
  {
    label: 2090,
    value: 2090,
  },
  {
    label: 2091,
    value: 2091,
  },
  {
    label: 2092,
    value: 2092,
  },
  {
    label: 2093,
    value: 2093,
  },
  {
    label: 2094,
    value: 2094,
  },
  {
    label: 2095,
    value: 2095,
  },
  {
    label: 2096,
    value: 2096,
  },
  {
    label: 2097,
    value: 2097,
  },
  {
    label: 2098,
    value: 2098,
  },
  {
    label: 2099,
    value: 2099,
  },
  {
    label: 2100,
    value: 2100,
  },
];

export const LabaRugi = () => {
  const [openTahunPeriode, setOpenTahunPeriode] = useState(false);
  const [tahunPeriode, setTahunPeriode] = useState();
  const [tanggalAwal, setTanggalAwal] = useState();
  const [tanggalAkhir, setTanggalAkhir] = useState();
  const [labaRugiData, setLabaRugiData] = useState();
  const refLaporanLabaRugi = useRef();

  const [oldestDate, setOldestDate] = useState();

  const handlePrintLaporanLabaRugi = useReactToPrint({
    content: () => refLaporanLabaRugi.current,
    documentTitle: `Laporan Laba Rugi`,
    bodyClass: "bg-white",
  });

  const { refetch } = useQuery({
    queryKey: ["laba-rugi", { tahunPeriode, tanggalAwal, tanggalAkhir }],
    queryFn: async () => {
      if (!!tanggalAwal && !!tanggalAkhir) {
        let modifiedHour = new Date(tanggalAkhir);
        modifiedHour.setHours(23, 59, 59, 999);

        setTanggalAkhir(modifiedHour);
        return await axios.get(
          `${process.env.REACT_APP_BASE_API}/saldoAkunTransaksi/labaRugi`,
          {
            params: {
              firstDate: tanggalAwal,
              lastDate: tanggalAkhir,
            },
          },
        );
      } else {
        return await axios.get(
          `${process.env.REACT_APP_BASE_API}/saldoAkunTransaksi/labaRugi`,
          {
            params: {
              year: tahunPeriode,
            },
          },
        );
      }
    },
    onSuccess: (data) => {
      setLabaRugiData(data.data.data.labaRugi);
      setOldestDate(data.data.data.oldestDate);
    },
  });

  // useEffect(() => {
  //   setTanggalAkhir(new Date());
  // }, [tanggalAkhir]);

  useEffect(() => {
    setTahunPeriode();
  }, [tanggalAwal, tanggalAkhir]);

  useEffect(() => {
    refetch();
  }, [tahunPeriode, tanggalAwal, tanggalAkhir]);

  if (!!labaRugiData) {
    const saldoPendapatan = labaRugiData[0]?.akun[0]?.saldo;
    const saldoAwalPersediaanBahanBaku = labaRugiData[1]?.akun[0]?.saldo;
    const saldoAwalPersediaanBarangJadi = labaRugiData[1]?.akun[1]?.saldo;
    const saldoBiayaBahanBaku = labaRugiData[2]?.akun[0]?.saldo;
    const saldoUpahPekerja = labaRugiData[2]?.akun[1]?.saldo;
    const saldoBiayaBahanPembantu = labaRugiData[2]?.akun[2]?.saldo;
    const saldoPersediaanBahanBaku = labaRugiData[2]?.akun[3]?.saldo;
    const saldoPersediaanBarangJadi = labaRugiData[2]?.akun[4]?.saldo;
    const saldoBiayaTransport = labaRugiData[3]?.akun[0]?.saldo;
    const saldoBiayaGajiPegawai = labaRugiData[3]?.akun[1]?.saldo;
    const saldoBiayaPerlengkapan = labaRugiData[3]?.akun[2]?.saldo;
    const saldoBiayaSewa = labaRugiData[3]?.akun[3]?.saldo;
    const saldoBiayaTelepon = labaRugiData[3]?.akun[4]?.saldo;
    const saldoBiayaListrik = labaRugiData[3]?.akun[5]?.saldo;
    const saldoBiayaATMATK = labaRugiData[3]?.akun[6]?.saldo;
    const saldoBiayaLainLain = labaRugiData[3]?.akun[7]?.saldo;
    const saldoBiayaPenyusutanPeralatan = labaRugiData[3]?.akun[8]?.saldo;
    const saldoBiayaPenyusutanMesin = labaRugiData[3]?.akun[9]?.saldo;
    const saldoBiayaPenyusutanKendaraan = labaRugiData[3]?.akun[10]?.saldo;
    const saldoBiayaPenyusutanGedung = labaRugiData[3]?.akun[11]?.saldo;
    const saldoPendapatanBunga = labaRugiData[4]?.akun[0]?.saldo;
    const saldoBebanBunga = labaRugiData[4]?.akun[1]?.saldo;

    const saldoTotalHargaPokokPenjualan =
      saldoAwalPersediaanBahanBaku + saldoAwalPersediaanBarangJadi;
    const saldoTotalBiayaProduksi =
      saldoBiayaBahanBaku + saldoUpahPekerja + saldoBiayaBahanPembantu;
    const saldoTotalPersediaan =
      saldoPersediaanBahanBaku - saldoPersediaanBarangJadi;
    const saldoTotalHargaPokokPenjualanFinal =
      saldoTotalHargaPokokPenjualan +
      saldoTotalBiayaProduksi +
      saldoPersediaanBahanBaku;
    const saldoTotalLabaRugiKotor =
      saldoPendapatan - saldoTotalHargaPokokPenjualanFinal;
    const saldoTotalBiayaOperasional =
      saldoBiayaTransport +
      saldoBiayaGajiPegawai +
      saldoBiayaPerlengkapan +
      saldoBiayaSewa +
      saldoBiayaTelepon +
      saldoBiayaListrik +
      saldoBiayaATMATK +
      saldoBiayaLainLain +
      saldoBiayaPenyusutanPeralatan +
      saldoBiayaPenyusutanMesin +
      saldoBiayaPenyusutanKendaraan +
      saldoBiayaPenyusutanGedung;
    const saldoTotalLabaRugiOperasi =
      saldoTotalLabaRugiKotor - saldoTotalBiayaOperasional;
    const saldoTotalPendapatanDanBebanLainLain =
      saldoPendapatanBunga - saldoBebanBunga;
    const saldoTotalLabaRugiUsaha =
      saldoTotalLabaRugiOperasi - saldoTotalPendapatanDanBebanLainLain;
    const saldoTotalLabaRugiUsahaPPh1 = 0.005 * saldoTotalLabaRugiUsaha;
    const saldoTotalLabaRugiUsahaPPh2 = 0.5 * 0.22 * saldoTotalLabaRugiUsaha;

    // console.log(labaRugiData);

    return (
      <section className="font-archivo">
        <div className="flex flex-col gap-4">
          <div>
            <h1 className="text-2xl font-bold">Laba Rugi</h1>
          </div>
          <div className="flex justify-between gap-4 rounded-lg border-2 border-neutral-500 bg-neutral-100 p-3">
            <div className="flex items-center gap-2">
              <button
                disabled={!!tahunPeriode}
                onClick={() => {
                  setTanggalAwal();
                  setTanggalAkhir();
                }}
                className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg border-2 border-neutral-500 bg-amber-300 p-2 disabled:opacity-50">
                <Refresh />
              </button>
              <div>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      disabled={!!tahunPeriode}
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
                  <PopoverContent align="start" className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={tanggalAwal}
                      onSelect={setTanggalAwal}
                      initialFocus
                      disabled={{
                        after: new Date(tanggalAkhir),
                      }}
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <Minus />
              <div>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      disabled={!!tahunPeriode}
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
                  <PopoverContent align="start" className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={tanggalAkhir}
                      onSelect={setTanggalAkhir}
                      initialFocus
                      disabled={{
                        before: new Date(tanggalAwal),
                      }}
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <button
                onClick={handlePrintLaporanLabaRugi}
                className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg border-2 border-neutral-500 bg-amber-300 p-2">
                <Printer />
              </button>
            </div>
            <div className="flex items-center gap-2">
              <button
                disabled={!!tanggalAwal || !!tanggalAkhir}
                onClick={() => {
                  setTahunPeriode();
                }}
                className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg border-2 border-neutral-500 bg-amber-300 p-2 disabled:opacity-50">
                <Refresh />
              </button>
              <Popover
                open={openTahunPeriode}
                onOpenChange={setOpenTahunPeriode}>
                <PopoverTrigger asChild>
                  <Button
                    disabled={!!tanggalAwal || !!tanggalAkhir}
                    variant="outline"
                    role="combobox"
                    aria-expanded={openTahunPeriode}
                    className="w-[140px] justify-between">
                    {tahunPeriode
                      ? tahun.find((tahun) => tahun.value === tahunPeriode)
                          ?.label
                      : "Pilih tahun"}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[140px] p-0">
                  <Command>
                    <ScrollArea className="h-48">
                      <CommandGroup>
                        {tahun.map((tahun) => (
                          <CommandItem
                            key={tahun.value}
                            value={tahun.value}
                            onSelect={(currentValue) => {
                              setTahunPeriode(
                                currentValue === tahunPeriode
                                  ? ""
                                  : Number(currentValue),
                              );
                              setOpenTahunPeriode(false);
                              setTanggalAwal();
                              setTanggalAkhir();
                            }}>
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                tahunPeriode === tahun.value
                                  ? "opacity-100"
                                  : "opacity-0",
                              )}
                            />
                            {tahun.label}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </ScrollArea>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>
          </div>
          <div className="flex flex-col gap-12">
            <table className="w-full table-auto border-collapse rounded-lg border-2 border-neutral-500 text-sm">
              <thead>
                <tr className="border-2 border-neutral-500">
                  <th
                    colSpan={4}
                    className="bg-amber-300 px-4 py-3 text-left font-bold">
                    Laporan Laba Rugi
                  </th>
                </tr>
              </thead>
              <tbody>
                {/* Pendapatan */}
                <tr className="border-2 border-neutral-500 bg-neutral-200">
                  <th colSpan={4} className="px-4 py-1 text-left">
                    Pendapatan
                  </th>
                </tr>
                <tr>
                  <td className="border-2 border-neutral-500 px-4 py-1 text-left align-middle">
                    Pendapatan
                  </td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle">
                    {convertIDRCurrency(saldoPendapatan)}
                  </td>
                </tr>
                {/* Harga Pokok Penjualan */}
                <tr className="border-2 border-neutral-500 bg-neutral-200">
                  <th colSpan={4} className="px-4 py-1 text-left">
                    Harga Pokok Penjualan
                  </th>
                </tr>
                <tr>
                  <td className="border-2 border-neutral-500 px-4 py-1 text-left align-middle">
                    Persediaan Bahan Baku
                  </td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle">
                    {convertIDRCurrency(saldoAwalPersediaanBahanBaku)}
                  </td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                </tr>
                <tr>
                  <td className="border-2 border-neutral-500 px-4 py-1 text-left align-middle">
                    Persediaan Barang Jadi
                  </td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle">
                    {convertIDRCurrency(saldoAwalPersediaanBarangJadi)}
                  </td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                </tr>
                <tr>
                  <td className="border-2 border-neutral-500 px-4 py-1 text-left align-middle"></td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle">
                    {convertIDRCurrency(saldoTotalHargaPokokPenjualan)}
                  </td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                </tr>
                {/* Biaya Produksi */}
                <tr className="border-2 border-neutral-500 bg-neutral-200">
                  <th colSpan={4} className="px-4 py-1 text-left">
                    Biaya Produksi
                  </th>
                </tr>
                <tr>
                  <td className="border-2 border-neutral-500 px-4 py-1 text-left align-middle">
                    Biaya Bahan Baku
                  </td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle">
                    {convertIDRCurrency(saldoBiayaBahanBaku)}
                  </td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                </tr>
                <tr>
                  <td className="border-2 border-neutral-500 px-4 py-1 text-left align-middle">
                    Upah Pekerja
                  </td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle">
                    {convertIDRCurrency(saldoUpahPekerja)}
                  </td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                </tr>
                <tr>
                  <td className="border-2 border-neutral-500 px-4 py-1 text-left align-middle">
                    Biaya Bahan Pembantu
                  </td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle">
                    {convertIDRCurrency(saldoBiayaBahanPembantu)}
                  </td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                </tr>
                <tr>
                  <td className="border-2 border-neutral-500 px-4 py-1 text-left align-middle">
                    Total Biaya Produksi
                  </td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle">
                    {convertIDRCurrency(saldoTotalBiayaProduksi)}
                  </td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                </tr>
                <tr>
                  <td className="border-2 border-neutral-500 px-4 py-1 text-left align-middle">
                    Barang Siap Dijual
                  </td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle">
                    {convertIDRCurrency(0)}
                  </td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                </tr>
                <tr>
                  <td colSpan={4} className="p-3"></td>
                </tr>
                <tr>
                  <td className="border-2 border-neutral-500 px-4 py-1 text-left align-middle">
                    Persediaan Bahan Baku
                  </td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle">
                    {convertIDRCurrency(saldoPersediaanBahanBaku)}
                  </td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                </tr>
                <tr>
                  <td className="border-2 border-neutral-500 px-4 py-1 text-left align-middle">
                    Persediaan Barang Jadi
                  </td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle">
                    {convertIDRCurrency(saldoPersediaanBarangJadi)}
                  </td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle">
                    {convertIDRCurrency(saldoTotalPersediaan)}
                  </td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                </tr>
                {/* <tr>
                  <td className="border-2 border-neutral-500 px-4 py-1 text-left align-middle"></td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle">
                    {convertIDRCurrency(saldoTotalPersediaan)}
                  </td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                </tr> */}
                <tr className="border-2 border-neutral-500 bg-amber-300">
                  <td colSpan={3} className="px-4 py-1 text-left font-bold">
                    Harga Pokok Penjualan
                  </td>
                  <td
                    colSpan={1}
                    className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle">
                    {convertIDRCurrency(saldoTotalHargaPokokPenjualanFinal)}
                  </td>
                </tr>
                <tr className="border-2 border-neutral-500 bg-amber-300">
                  <td colSpan={3} className="px-4 py-1 text-left font-bold">
                    Laba (Rugi) Kotor
                  </td>
                  <td
                    colSpan={1}
                    className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle">
                    {convertIDRCurrency(saldoTotalLabaRugiKotor)}
                  </td>
                </tr>
                {/* Biaya Operasional */}
                <tr className="border-2 border-neutral-500 bg-neutral-200">
                  <th colSpan={4} className="px-4 py-1 text-left">
                    Biaya Operasional
                  </th>
                </tr>
                <tr>
                  <td className="border-2 border-neutral-500 px-4 py-1 text-left align-middle">
                    Biaya Transport
                  </td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle">
                    {convertIDRCurrency(saldoBiayaTransport)}
                  </td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                </tr>
                <tr>
                  <td className="border-2 border-neutral-500 px-4 py-1 text-left align-middle">
                    Biaya Gaji Pegawai
                  </td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle">
                    {convertIDRCurrency(saldoBiayaGajiPegawai)}
                  </td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                </tr>
                <tr>
                  <td className="border-2 border-neutral-500 px-4 py-1 text-left align-middle">
                    Biaya Perlengkapan
                  </td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle">
                    {convertIDRCurrency(saldoBiayaPerlengkapan)}
                  </td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                </tr>
                <tr>
                  <td className="border-2 border-neutral-500 px-4 py-1 text-left align-middle">
                    Biaya Sewa
                  </td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle">
                    {convertIDRCurrency(saldoBiayaSewa)}
                  </td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                </tr>
                <tr>
                  <td className="border-2 border-neutral-500 px-4 py-1 text-left align-middle">
                    Biaya Telepon
                  </td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle">
                    {convertIDRCurrency(saldoBiayaTelepon)}
                  </td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                </tr>
                <tr>
                  <td className="border-2 border-neutral-500 px-4 py-1 text-left align-middle">
                    Biaya Listrik
                  </td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle">
                    {convertIDRCurrency(saldoBiayaListrik)}
                  </td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                </tr>
                <tr>
                  <td className="border-2 border-neutral-500 px-4 py-1 text-left align-middle">
                    Biaya ATM/ATK
                  </td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle">
                    {convertIDRCurrency(saldoBiayaATMATK)}
                  </td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                </tr>
                <tr>
                  <td className="border-2 border-neutral-500 px-4 py-1 text-left align-middle">
                    Biaya Lain-Lain
                  </td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle">
                    {convertIDRCurrency(saldoBiayaLainLain)}
                  </td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                </tr>
                <tr>
                  <td className="border-2 border-neutral-500 px-4 py-1 text-left align-middle">
                    Biaya Penyusutan Peralatan
                  </td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle">
                    {convertIDRCurrency(saldoBiayaPenyusutanPeralatan)}
                  </td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                </tr>
                <tr>
                  <td className="border-2 border-neutral-500 px-4 py-1 text-left align-middle">
                    Biaya Penyusutan Mesin
                  </td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle">
                    {convertIDRCurrency(saldoBiayaPenyusutanMesin)}
                  </td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                </tr>
                <tr>
                  <td className="border-2 border-neutral-500 px-4 py-1 text-left align-middle">
                    Biaya Penyusutan Kendaraan
                  </td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle">
                    {convertIDRCurrency(saldoBiayaPenyusutanKendaraan)}
                  </td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                </tr>
                <tr>
                  <td className="border-2 border-neutral-500 px-4 py-1 text-left align-middle">
                    Biaya Penyusutan Gedung
                  </td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle">
                    {convertIDRCurrency(saldoBiayaPenyusutanGedung)}
                  </td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                </tr>
                <tr className="border-2 border-neutral-500 bg-amber-300">
                  <td colSpan={3} className="px-4 py-1 text-left font-bold">
                    Total Biaya Operasional
                  </td>
                  <td
                    colSpan={1}
                    className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle">
                    {convertIDRCurrency(saldoTotalBiayaOperasional)}
                  </td>
                </tr>
                <tr className="border-2 border-neutral-500 bg-amber-300">
                  <td colSpan={3} className="px-4 py-1 text-left font-bold">
                    Laba (Rugi) Operasi
                  </td>
                  <td
                    colSpan={1}
                    className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle">
                    {convertIDRCurrency(saldoTotalLabaRugiOperasi)}
                  </td>
                </tr>
                {/* Pendapatan dan Beban Lain-Lain */}
                <tr className="border-2 border-neutral-500 bg-neutral-200">
                  <th colSpan={4} className="px-4 py-1 text-left">
                    Pendapatan dan Beban Lain-Lain
                  </th>
                </tr>
                <tr>
                  <td className="border-2 border-neutral-500 px-4 py-1 text-left align-middle">
                    Pendapatan Bunga
                  </td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle">
                    {convertIDRCurrency(saldoPendapatanBunga)}
                  </td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                </tr>
                <tr>
                  <td className="border-2 border-neutral-500 px-4 py-1 text-left align-middle">
                    Beban Bunga
                  </td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle">
                    {convertIDRCurrency(saldoBebanBunga)}
                  </td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                </tr>
                <tr className="border-2 border-neutral-500 bg-amber-300">
                  <td colSpan={3} className="px-4 py-1 text-left font-bold">
                    Total Pendapatan dan Beban Lain-Lain
                  </td>
                  <td
                    colSpan={1}
                    className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle">
                    {convertIDRCurrency(saldoTotalPendapatanDanBebanLainLain)}
                  </td>
                </tr>
                <tr className="border-2 border-neutral-500 bg-amber-300">
                  <td colSpan={3} className="px-4 py-1 text-left font-bold">
                    Laba (Rugi) Usaha
                  </td>
                  <td
                    colSpan={1}
                    className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle">
                    {convertIDRCurrency(saldoTotalLabaRugiUsaha)}
                  </td>
                </tr>
                {/* <tr className="border-2 border-neutral-500 bg-amber-300">
                  <td colSpan={3} className="px-4 py-1 text-left font-bold">
                    PPh 0.5%
                  </td>
                  <td
                    colSpan={1}
                    className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle">
                    {convertIDRCurrency(saldoTotalLabaRugiUsahaPPh1)}
                  </td>
                </tr>
                <tr className="border-2 border-neutral-500 bg-amber-300">
                  <td colSpan={3} className="px-4 py-1 text-left font-bold">
                    PPh 50%
                  </td>
                  <td
                    colSpan={1}
                    className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle">
                    {convertIDRCurrency(saldoTotalLabaRugiUsahaPPh2)}
                  </td>
                </tr> */}
              </tbody>
            </table>
          </div>
          <div style={{ display: "none" }}>
            <DokumenLabaRugi
              ref={refLaporanLabaRugi}
              tanggalAwal={tanggalAwal}
              tanggalAkhir={tanggalAkhir}
              tahunPeriode={tahunPeriode}
            />
          </div>
        </div>
      </section>
    );
  }
};

const DokumenLabaRugi = forwardRef((props, ref) => {
  const [labaRugiData, setLabaRugiData] = useState();

  const tanggalAwal = props?.tanggalAwal;
  const tanggalAkhir = props?.tanggalAkhir;
  const tahunPeriode = props?.tahunPeriode;

  const { refetch } = useQuery({
    queryKey: [
      "laba-rugi",
      "dokumen",
      { tahunPeriode, tanggalAwal, tanggalAkhir },
    ],
    queryFn: async () => {
      if (!!tanggalAwal && !!tanggalAkhir) {
        return await axios.get(
          `${process.env.REACT_APP_BASE_API}/saldoAkunTransaksi/labaRugi`,
          {
            params: {
              firstDate: tanggalAwal,
              lastDate: tanggalAkhir,
            },
          },
        );
      } else {
        return await axios.get(
          `${process.env.REACT_APP_BASE_API}/saldoAkunTransaksi/labaRugi`,
          {
            params: {
              year: tahunPeriode,
            },
          },
        );
      }
    },
    onSuccess: (data) => {
      setLabaRugiData(data.data.data.labaRugi);
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
    }`;
  };

  if (!!labaRugiData) {
    const saldoPendapatan = labaRugiData[0]?.akun[0]?.saldo;
    const saldoAwalPersediaanBahanBaku = labaRugiData[1]?.akun[0]?.saldo;
    const saldoAwalPersediaanBarangJadi = labaRugiData[1]?.akun[1]?.saldo;
    const saldoBiayaBahanBaku = labaRugiData[2]?.akun[0]?.saldo;
    const saldoUpahPekerja = labaRugiData[2]?.akun[1]?.saldo;
    const saldoBiayaBahanPembantu = labaRugiData[2]?.akun[2]?.saldo;
    const saldoPersediaanBahanBaku = labaRugiData[2]?.akun[3]?.saldo;
    const saldoPersediaanBarangJadi = labaRugiData[2]?.akun[4]?.saldo;
    const saldoBiayaTransport = labaRugiData[3]?.akun[0]?.saldo;
    const saldoBiayaGajiPegawai = labaRugiData[3]?.akun[1]?.saldo;
    const saldoBiayaPerlengkapan = labaRugiData[3]?.akun[2]?.saldo;
    const saldoBiayaSewa = labaRugiData[3]?.akun[3]?.saldo;
    const saldoBiayaTelepon = labaRugiData[3]?.akun[4]?.saldo;
    const saldoBiayaListrik = labaRugiData[3]?.akun[5]?.saldo;
    const saldoBiayaATMATK = labaRugiData[3]?.akun[6]?.saldo;
    const saldoBiayaLainLain = labaRugiData[3]?.akun[7]?.saldo;
    const saldoBiayaPenyusutanPeralatan = labaRugiData[3]?.akun[8]?.saldo;
    const saldoBiayaPenyusutanMesin = labaRugiData[3]?.akun[9]?.saldo;
    const saldoBiayaPenyusutanKendaraan = labaRugiData[3]?.akun[10]?.saldo;
    const saldoBiayaPenyusutanGedung = labaRugiData[3]?.akun[11]?.saldo;
    const saldoPendapatanBunga = labaRugiData[4]?.akun[0]?.saldo;
    const saldoBebanBunga = labaRugiData[4]?.akun[1]?.saldo;

    const saldoTotalHargaPokokPenjualan =
      saldoAwalPersediaanBahanBaku + saldoAwalPersediaanBarangJadi;
    const saldoTotalBiayaProduksi =
      saldoBiayaBahanBaku + saldoUpahPekerja + saldoBiayaBahanPembantu;
    const saldoTotalPersediaan =
      saldoPersediaanBahanBaku - saldoPersediaanBarangJadi;
    const saldoTotalHargaPokokPenjualanFinal =
      saldoTotalHargaPokokPenjualan +
      saldoTotalBiayaProduksi +
      saldoPersediaanBahanBaku;
    const saldoTotalLabaRugiKotor =
      saldoPendapatan - saldoTotalHargaPokokPenjualanFinal;
    const saldoTotalBiayaOperasional =
      saldoBiayaTransport +
      saldoBiayaGajiPegawai +
      saldoBiayaPerlengkapan +
      saldoBiayaSewa +
      saldoBiayaTelepon +
      saldoBiayaListrik +
      saldoBiayaATMATK +
      saldoBiayaLainLain +
      saldoBiayaPenyusutanPeralatan +
      saldoBiayaPenyusutanMesin +
      saldoBiayaPenyusutanKendaraan +
      saldoBiayaPenyusutanGedung;
    const saldoTotalLabaRugiOperasi =
      saldoTotalLabaRugiKotor - saldoTotalBiayaOperasional;
    const saldoTotalPendapatanDanBebanLainLain =
      saldoPendapatanBunga - saldoBebanBunga;
    const saldoTotalLabaRugiUsaha =
      saldoTotalLabaRugiOperasi - saldoTotalPendapatanDanBebanLainLain;

    // console.log(labaRugiData);

    return (
      <section ref={ref}>
        <style>{setStyles()}</style>
        <div className="flex flex-col gap-4">
          <div className="flex w-full items-center justify-center">
            <img src="/logo-kop.png" alt="" className="aspect-auto h-24" />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-archivo text-xl font-bold">Laba Rugi</p>
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
            {!!tahunPeriode && (
              <div className="flex items-center gap-2">
                <p className="text-xs font-bold">
                  History Tahun - {tahunPeriode}
                </p>
              </div>
            )}
          </div>
          <div className="flex flex-col gap-12">
            <table className="w-full table-auto border-collapse rounded-lg border-2 border-neutral-500 text-sm">
              <thead>
                <tr className="border-2 border-neutral-500">
                  <th
                    colSpan={4}
                    className="bg-amber-300 px-4 py-3 text-left font-bold">
                    Laporan Laba Rugi
                  </th>
                </tr>
              </thead>
              <tbody>
                {/* Pendapatan */}
                <tr className="border-2 border-neutral-500 bg-neutral-200">
                  <th colSpan={4} className="px-4 py-1 text-left">
                    Pendapatan
                  </th>
                </tr>
                <tr>
                  <td className="border-2 border-neutral-500 px-4 py-1 text-left align-middle">
                    Pendapatan
                  </td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle">
                    {convertIDRCurrency(saldoPendapatan)}
                  </td>
                </tr>
                {/* Harga Pokok Penjualan */}
                <tr className="border-2 border-neutral-500 bg-neutral-200">
                  <th colSpan={4} className="px-4 py-1 text-left">
                    Harga Pokok Penjualan
                  </th>
                </tr>
                <tr>
                  <td className="border-2 border-neutral-500 px-4 py-1 text-left align-middle">
                    Persediaan Bahan Baku
                  </td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle">
                    {convertIDRCurrency(saldoAwalPersediaanBahanBaku)}
                  </td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                </tr>
                <tr>
                  <td className="border-2 border-neutral-500 px-4 py-1 text-left align-middle">
                    Persediaan Barang Jadi
                  </td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle">
                    {convertIDRCurrency(saldoAwalPersediaanBarangJadi)}
                  </td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                </tr>
                <tr>
                  <td className="border-2 border-neutral-500 px-4 py-1 text-left align-middle"></td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle">
                    {convertIDRCurrency(saldoTotalHargaPokokPenjualan)}
                  </td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                </tr>
                {/* Biaya Produksi */}
                <tr className="border-2 border-neutral-500 bg-neutral-200">
                  <th colSpan={4} className="px-4 py-1 text-left">
                    Biaya Produksi
                  </th>
                </tr>
                <tr>
                  <td className="border-2 border-neutral-500 px-4 py-1 text-left align-middle">
                    Biaya Bahan Baku
                  </td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle">
                    {convertIDRCurrency(saldoBiayaBahanBaku)}
                  </td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                </tr>
                <tr>
                  <td className="border-2 border-neutral-500 px-4 py-1 text-left align-middle">
                    Upah Pekerja
                  </td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle">
                    {convertIDRCurrency(saldoUpahPekerja)}
                  </td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                </tr>
                <tr>
                  <td className="border-2 border-neutral-500 px-4 py-1 text-left align-middle">
                    Biaya Bahan Pembantu
                  </td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle">
                    {convertIDRCurrency(saldoBiayaBahanPembantu)}
                  </td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                </tr>
                <tr>
                  <td className="border-2 border-neutral-500 px-4 py-1 text-left align-middle">
                    Total Biaya Produksi
                  </td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle">
                    {convertIDRCurrency(saldoTotalBiayaProduksi)}
                  </td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                </tr>
                <tr>
                  <td className="border-2 border-neutral-500 px-4 py-1 text-left align-middle">
                    Barang Siap Dijual
                  </td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle">
                    {convertIDRCurrency(0)}
                  </td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                </tr>
                <tr>
                  <td colSpan={4} className="p-3"></td>
                </tr>
                <tr>
                  <td className="border-2 border-neutral-500 px-4 py-1 text-left align-middle">
                    Persediaan Bahan Baku
                  </td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle">
                    {convertIDRCurrency(saldoPersediaanBahanBaku)}
                  </td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                </tr>
                <tr>
                  <td className="border-2 border-neutral-500 px-4 py-1 text-left align-middle">
                    Persediaan Barang Jadi
                  </td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle">
                    {convertIDRCurrency(saldoPersediaanBarangJadi)}
                  </td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle">
                    {convertIDRCurrency(saldoTotalPersediaan)}
                  </td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                </tr>
                {/* <tr>
                  <td className="border-2 border-neutral-500 px-4 py-1 text-left align-middle"></td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle">
                    {convertIDRCurrency(saldoTotalPersediaan)}
                  </td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                </tr> */}
                <tr className="border-2 border-neutral-500 bg-amber-300">
                  <td colSpan={3} className="px-4 py-1 text-left font-bold">
                    Harga Pokok Penjualan
                  </td>
                  <td
                    colSpan={1}
                    className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle">
                    {convertIDRCurrency(saldoTotalHargaPokokPenjualanFinal)}
                  </td>
                </tr>
                <tr className="border-2 border-neutral-500 bg-amber-300">
                  <td colSpan={3} className="px-4 py-1 text-left font-bold">
                    Laba (Rugi) Kotor
                  </td>
                  <td
                    colSpan={1}
                    className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle">
                    {convertIDRCurrency(saldoTotalLabaRugiKotor)}
                  </td>
                </tr>
                {/* Biaya Operasional */}
                <tr className="border-2 border-neutral-500 bg-neutral-200">
                  <th colSpan={4} className="px-4 py-1 text-left">
                    Biaya Operasional
                  </th>
                </tr>
                <tr>
                  <td className="border-2 border-neutral-500 px-4 py-1 text-left align-middle">
                    Biaya Transport
                  </td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle">
                    {convertIDRCurrency(saldoBiayaTransport)}
                  </td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                </tr>
                <tr>
                  <td className="border-2 border-neutral-500 px-4 py-1 text-left align-middle">
                    Biaya Gaji Pegawai
                  </td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle">
                    {convertIDRCurrency(saldoBiayaGajiPegawai)}
                  </td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                </tr>
                <tr>
                  <td className="border-2 border-neutral-500 px-4 py-1 text-left align-middle">
                    Biaya Perlengkapan
                  </td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle">
                    {convertIDRCurrency(saldoBiayaPerlengkapan)}
                  </td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                </tr>
                <tr>
                  <td className="border-2 border-neutral-500 px-4 py-1 text-left align-middle">
                    Biaya Sewa
                  </td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle">
                    {convertIDRCurrency(saldoBiayaSewa)}
                  </td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                </tr>
                <tr>
                  <td className="border-2 border-neutral-500 px-4 py-1 text-left align-middle">
                    Biaya Telepon
                  </td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle">
                    {convertIDRCurrency(saldoBiayaTelepon)}
                  </td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                </tr>
                <tr>
                  <td className="border-2 border-neutral-500 px-4 py-1 text-left align-middle">
                    Biaya Listrik
                  </td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle">
                    {convertIDRCurrency(saldoBiayaListrik)}
                  </td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                </tr>
                <tr>
                  <td className="border-2 border-neutral-500 px-4 py-1 text-left align-middle">
                    Biaya ATM/ATK
                  </td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle">
                    {convertIDRCurrency(saldoBiayaATMATK)}
                  </td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                </tr>
                <tr>
                  <td className="border-2 border-neutral-500 px-4 py-1 text-left align-middle">
                    Biaya Lain-Lain
                  </td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle">
                    {convertIDRCurrency(saldoBiayaLainLain)}
                  </td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                </tr>
                <tr>
                  <td className="border-2 border-neutral-500 px-4 py-1 text-left align-middle">
                    Biaya Penyusutan Peralatan
                  </td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle">
                    {convertIDRCurrency(saldoBiayaPenyusutanPeralatan)}
                  </td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                </tr>
                <tr>
                  <td className="border-2 border-neutral-500 px-4 py-1 text-left align-middle">
                    Biaya Penyusutan Mesin
                  </td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle">
                    {convertIDRCurrency(saldoBiayaPenyusutanMesin)}
                  </td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                </tr>
                <tr>
                  <td className="border-2 border-neutral-500 px-4 py-1 text-left align-middle">
                    Biaya Penyusutan Kendaraan
                  </td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle">
                    {convertIDRCurrency(saldoBiayaPenyusutanKendaraan)}
                  </td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                </tr>
                <tr>
                  <td className="border-2 border-neutral-500 px-4 py-1 text-left align-middle">
                    Biaya Penyusutan Gedung
                  </td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle">
                    {convertIDRCurrency(saldoBiayaPenyusutanGedung)}
                  </td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                </tr>
                <tr className="border-2 border-neutral-500 bg-amber-300">
                  <td colSpan={3} className="px-4 py-1 text-left font-bold">
                    Total Biaya Operasional
                  </td>
                  <td
                    colSpan={1}
                    className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle">
                    {convertIDRCurrency(saldoTotalBiayaOperasional)}
                  </td>
                </tr>
                <tr className="border-2 border-neutral-500 bg-amber-300">
                  <td colSpan={3} className="px-4 py-1 text-left font-bold">
                    Laba (Rugi) Operasi
                  </td>
                  <td
                    colSpan={1}
                    className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle">
                    {convertIDRCurrency(saldoTotalLabaRugiOperasi)}
                  </td>
                </tr>
                {/* Pendapatan dan Beban Lain-Lain */}
                <tr className="border-2 border-neutral-500 bg-neutral-200">
                  <th colSpan={4} className="px-4 py-1 text-left">
                    Pendapatan dan Beban Lain-Lain
                  </th>
                </tr>
                <tr>
                  <td className="border-2 border-neutral-500 px-4 py-1 text-left align-middle">
                    Pendapatan Bunga
                  </td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle">
                    {convertIDRCurrency(saldoPendapatanBunga)}
                  </td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                </tr>
                <tr>
                  <td className="border-2 border-neutral-500 px-4 py-1 text-left align-middle">
                    Beban Bunga
                  </td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle">
                    {convertIDRCurrency(saldoBebanBunga)}
                  </td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                </tr>
                <tr className="border-2 border-neutral-500 bg-amber-300">
                  <td colSpan={3} className="px-4 py-1 text-left font-bold">
                    Total Pendapatan dan Beban Lain-Lain
                  </td>
                  <td
                    colSpan={1}
                    className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle">
                    {convertIDRCurrency(saldoTotalPendapatanDanBebanLainLain)}
                  </td>
                </tr>
                <tr className="border-2 border-neutral-500 bg-amber-300">
                  <td colSpan={3} className="px-4 py-1 text-left font-bold">
                    Laba (Rugi) Usaha
                  </td>
                  <td
                    colSpan={1}
                    className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle">
                    {convertIDRCurrency(saldoTotalLabaRugiUsaha)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    );
  }
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
