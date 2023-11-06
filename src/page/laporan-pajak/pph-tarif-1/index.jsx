import { useState, useEffect, useRef, forwardRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { useReactToPrint } from "react-to-print";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import axios from "axios";

import { cn } from "../../../utils/cn";

import { Button } from "../../../componet/button";
import { Calendar } from "../../../componet/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../../componet/popover";

import CalendarIcon from "../../../Asset/icons/untitled-ui-icons/line/components/Calendar";
import Printer from "../../../Asset/icons/untitled-ui-icons/line/components/Printer";
import Minus from "../../../Asset/icons/untitled-ui-icons/line/components/Minus";
import Refresh from "../../../Asset/icons/untitled-ui-icons/line/components/RefreshCw04";

export const PPhTarif1 = () => {
  const [tanggalAwal, setTanggalAwal] = useState();
  const [tanggalAkhir, setTanggalAkhir] = useState();
  const [labaRugiData, setLabaRugiData] = useState();
  const refLaporanPPhTarif1 = useRef();

  const handlePrintLaporanLabaRugi = useReactToPrint({
    content: () => refLaporanPPhTarif1.current,
    documentTitle: `Laporan PPh 25 Tarif 0.5%`,
    bodyClass: "bg-white",
  });

  const { refetch } = useQuery({
    queryKey: ["laba-rugi", "pph-tarif-1", { tanggalAwal, tanggalAkhir }],
    queryFn: async () => {
      if (!!tanggalAwal && !!tanggalAkhir) {
        let tanggalAkhirModified = new Date(tanggalAkhir);
        tanggalAkhirModified.setHours(23, 59, 59);

        return await axios.get(
          `${process.env.REACT_APP_BASE_API}/saldoAkunTransaksi/labaRugi`,
          {
            params: {
              firstDate: tanggalAwal,
              lastDate: tanggalAkhirModified,
            },
          },
        );
      } else {
        return await axios.get(
          `${process.env.REACT_APP_BASE_API}/saldoAkunTransaksi/labaRugi`,
        );
      }
    },
    onSuccess: (data) => {
      setLabaRugiData(data.data.data.labaRugi);
    },
  });

  useEffect(() => {
    refetch();
  }, [tanggalAwal, tanggalAkhir]);

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

    return (
      <section className="font-archivo">
        <div className="flex flex-col gap-4">
          <div>
            <p className="text-xs font-bold leading-none">Laporan Pajak</p>
            <h1 className="text-2xl font-bold">PPh 25 Tarif 0.5%</h1>
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
                      // disabled={{
                      //   after: new Date(),
                      //   before: new Date(oldestDate),
                      // }}
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
                      // disabled={{
                      //   after: new Date(),
                      //   before: new Date(oldestDate),
                      // }}
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
          </div>
          <div>
            <table className="w-full table-auto border-collapse rounded-lg border-2 border-neutral-500 text-sm">
              <tbody>
                <tr className="border-2 border-neutral-500 bg-amber-300">
                  <td colSpan={3} className="p-3 text-left font-bold">
                    PPh 25 Tarif 0.5%
                  </td>
                  <td
                    colSpan={1}
                    className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle font-bold">
                    {convertIDRCurrency(saldoTotalLabaRugiUsahaPPh1)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div style={{ display: "none" }}>
            <DokumenPPhTarif1
              ref={refLaporanPPhTarif1}
              tanggalAwal={tanggalAwal}
              tanggalAkhir={tanggalAkhir}
            />
          </div>
        </div>
      </section>
    );
  }
};

const DokumenPPhTarif1 = forwardRef((props, ref) => {
  const [labaRugiData, setLabaRugiData] = useState();

  const tanggalAwal = props?.tanggalAwal;
  const tanggalAkhir = props?.tanggalAkhir;

  const { refetch } = useQuery({
    queryKey: ["laba-rugi", "pph-tarif-1", { tanggalAwal, tanggalAkhir }],
    queryFn: async () => {
      if (!!tanggalAwal && !!tanggalAkhir) {
        let tanggalAkhirModified = new Date(tanggalAkhir);
        tanggalAkhirModified.setHours(23, 59, 59);

        return await axios.get(
          `${process.env.REACT_APP_BASE_API}/saldoAkunTransaksi/labaRugi`,
          {
            params: {
              firstDate: tanggalAwal,
              lastDate: tanggalAkhirModified,
            },
          },
        );
      } else {
        return await axios.get(
          `${process.env.REACT_APP_BASE_API}/saldoAkunTransaksi/labaRugi`,
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
    const saldoTotalLabaRugiUsahaPPh1 = 0.005 * saldoTotalLabaRugiUsaha;
    const saldoTotalLabaRugiUsahaPPh2 = 0.5 * 0.22 * saldoTotalLabaRugiUsaha;

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
              <p className="text-xs font-bold leading-none">Laporan Pajak</p>
              <h1 className="text-2xl font-bold">PPh 25 Tarif 0.5%</h1>
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
          <div className="flex flex-col gap-12">
            <table className="w-full table-auto border-collapse rounded-lg border-2 border-neutral-500 text-sm">
              <tbody>
                <tr className="border-2 border-neutral-500 bg-amber-300">
                  <td colSpan={3} className="p-3 text-left font-bold">
                    PPh 25 Tarif 0.5%
                  </td>
                  <td
                    colSpan={1}
                    className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle font-bold">
                    {convertIDRCurrency(saldoTotalLabaRugiUsahaPPh1)}
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
