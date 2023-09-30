import { useState, useEffect, useRef, forwardRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { useReactToPrint } from "react-to-print";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import axios from "axios";

import { cn } from "../../utils/cn";

import { Button } from "../../componet/button";
import { Calendar } from "../../componet/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../componet/popover";

import CalendarIcon from "../../Asset/icons/untitled-ui-icons/line/components/Calendar";
import Printer from "../../Asset/icons/untitled-ui-icons/line/components/Printer";
import Minus from "../../Asset/icons/untitled-ui-icons/line/components/Minus";
import Refresh from "../../Asset/icons/untitled-ui-icons/line/components/RefreshCw04";

export const PosisiKeuangan = () => {
  const [tanggalAwal, setTanggalAwal] = useState();
  const [tanggalAkhir, setTanggalAkhir] = useState();
  const [posisiKeuanganData, setPosisiKeuanganData] = useState();
  const refLaporanPosisiKeuangan = useRef();
  const handlePrintLaporanPosisiKeuangan = useReactToPrint({
    content: () => refLaporanPosisiKeuangan.current,
    documentTitle: `Laporan Posisi Keuangan`,
    bodyClass: "bg-white",
  });

  const { refetch } = useQuery({
    queryKey: ["posisi-keuangan", { tanggalAwal, tanggalAkhir }],
    queryFn: async () => {
      if (!!tanggalAwal && !!tanggalAkhir) {
        let tanggalAkhirModified = new Date(tanggalAkhir);
        tanggalAkhirModified.setHours(23, 59, 59);

        return await axios.get(
          `${process.env.REACT_APP_BASE_API}/saldoAkunTransaksi?firstDate=${tanggalAwal}&lastDate=${tanggalAkhirModified}`,
        );
      } else {
        return await axios.get(
          `${process.env.REACT_APP_BASE_API}/saldoAkunTransaksi`,
        );
      }
    },
    onSuccess: (data) => {
      setPosisiKeuanganData(data.data.data);
    },
  });

  useEffect(() => {
    refetch();
  }, [tanggalAwal, tanggalAkhir]);

  if (!!posisiKeuanganData) {
    // Aktiva Lancar
    const saldoKas = posisiKeuanganData.posisiKeuangan[0]?.akun[0]?.saldo;
    const saldoPiutangUsaha =
      posisiKeuanganData.posisiKeuangan[0]?.akun[1]?.saldo;
    const saldoPersediaanBarangJadi =
      posisiKeuanganData.posisiKeuangan[0]?.akun[2]?.saldo;
    const saldoPersediaanBahanBaku =
      posisiKeuanganData.posisiKeuangan[0]?.akun[3]?.saldo;
    const saldoPersediaanBahanPembantu =
      posisiKeuanganData.posisiKeuangan[0]?.akun[4]?.saldo;

    // Aktiva Tetap
    const saldoTanah = posisiKeuanganData.posisiKeuangan[1]?.akun[0]?.saldo;
    const saldoGedung = posisiKeuanganData.posisiKeuangan[1]?.akun[1]?.saldo;
    const saldoAkumulasiPenyusutanGedung =
      posisiKeuanganData.posisiKeuangan[1]?.akun[2]?.saldo;
    const saldoMesin = posisiKeuanganData.posisiKeuangan[1]?.akun[3]?.saldo;
    const saldoAkumulasiPenyusutanMesin =
      posisiKeuanganData.posisiKeuangan[1]?.akun[4]?.saldo;
    const saldoPeralatan = posisiKeuanganData.posisiKeuangan[1]?.akun[5]?.saldo;
    const saldoAkumulasiPenyusutanPeralatan =
      posisiKeuanganData.posisiKeuangan[1]?.akun[6]?.saldo;
    const saldoKendaraan = posisiKeuanganData.posisiKeuangan[1]?.akun[7]?.saldo;
    const saldoAkumulasiPenyusutanKendaraan =
      posisiKeuanganData.posisiKeuangan[1]?.akun[8]?.saldo;
    const saldoTotalGedung = saldoGedung - saldoAkumulasiPenyusutanGedung;
    const saldoTotalMesin = saldoMesin - saldoAkumulasiPenyusutanMesin;
    const saldoTotalPeralatan =
      saldoPeralatan - saldoAkumulasiPenyusutanPeralatan;
    const saldoTotalKendaraan =
      saldoKendaraan - saldoAkumulasiPenyusutanKendaraan;

    // Kewajiban Lancar
    const saldoUtangUsaha =
      posisiKeuanganData.posisiKeuangan[2]?.akun[0]?.saldo;

    // Kewajiban Jangka Panjang
    const saldoUtangBank = posisiKeuanganData.posisiKeuangan[3]?.akun[0]?.saldo;

    // Modal
    const saldoModalPemilik =
      posisiKeuanganData.posisiKeuangan[4]?.akun[0]?.saldo;

    // Total
    const saldoTotalAktivaLancar =
      saldoKas +
      saldoPiutangUsaha +
      saldoPersediaanBarangJadi +
      saldoPersediaanBahanBaku +
      saldoPersediaanBahanPembantu;
    const saldoTotalAktivaTetap =
      saldoTotalGedung +
      saldoTotalMesin +
      saldoTotalPeralatan +
      saldoTotalKendaraan;
    const saldoTotalAktiva = saldoTotalAktivaLancar + saldoTotalAktivaTetap;
    const saldoTotalKewajiban = saldoUtangUsaha + saldoUtangBank;
    const saldoTotalKewajibanDanModal = saldoTotalKewajiban + saldoModalPemilik;

    const oldestDate = new Date(posisiKeuanganData?.oldestDate);

    return (
      <section className="font-archivo">
        <div className="flex flex-col gap-4">
          <div>
            <h1 className="text-2xl font-bold">Posisi Keuangan</h1>
          </div>
          <div className="flex justify-between gap-4 rounded-lg bg-neutral-100 p-3">
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setTanggalAwal();
                  setTanggalAkhir();
                }}
                className="flex-shrink-0 rounded-lg bg-amber-300 p-2">
                <Refresh />
              </button>
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
                  <PopoverContent align="start" className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={tanggalAwal}
                      onSelect={setTanggalAwal}
                      initialFocus
                      disabled={{ after: new Date(), before: oldestDate }}
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
                  <PopoverContent align="start" className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={tanggalAkhir}
                      onSelect={setTanggalAkhir}
                      initialFocus
                      disabled={{ after: new Date(), before: oldestDate }}
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <button
                onClick={handlePrintLaporanPosisiKeuangan}
                className="flex-shrink-0 rounded-lg bg-amber-300 p-2">
                <Printer />
              </button>
            </div>
          </div>
          <div className="flex flex-col gap-12">
            <table className="w-full table-auto border-collapse rounded-lg border-2 text-sm">
              <thead>
                <tr>
                  <th
                    colSpan={4}
                    className="bg-amber-300 px-4 py-3 text-left font-bold">
                    Laporan Posisi Keuangan
                  </th>
                </tr>
              </thead>
              <tbody>
                {/* Aktiva Lancar */}
                <tr className="border-b-2 bg-neutral-200">
                  <th colSpan={4} className="px-4 py-1 text-left">
                    Aktiva Lancar
                  </th>
                </tr>
                <tr>
                  <td className="border border-black px-4 py-1 text-left align-middle">
                    Kas
                  </td>
                  <td className="w-2/12 border border-black px-4 py-1 text-right align-middle"></td>
                  <td className="w-2/12 border border-black px-4 py-1 text-right align-middle">
                    {convertIDRCurrency(saldoKas)}
                  </td>
                  <td className="w-2/12 border border-black px-4 py-1 text-right align-middle"></td>
                </tr>
                <tr>
                  <td className="border border-black px-4 py-1 text-left align-middle">
                    Piutang Usaha
                  </td>
                  <td className="w-2/12 border border-black px-4 py-1 text-right align-middle"></td>
                  <td className="w-2/12 border border-black px-4 py-1 text-right align-middle">
                    {convertIDRCurrency(saldoPiutangUsaha)}
                  </td>
                  <td className="w-2/12 border border-black px-4 py-1 text-right align-middle"></td>
                </tr>
                <tr>
                  <td className="border border-black px-4 py-1 text-left align-middle">
                    Persediaan Barang Jadi
                  </td>
                  <td className="w-2/12 border border-black px-4 py-1 text-right align-middle"></td>
                  <td className="w-2/12 border border-black px-4 py-1 text-right align-middle">
                    {convertIDRCurrency(saldoPersediaanBarangJadi)}
                  </td>
                  <td className="w-2/12 border border-black px-4 py-1 text-right align-middle"></td>
                </tr>
                <tr>
                  <td className="border border-black px-4 py-1 text-left align-middle">
                    Persediaan Bahan Baku
                  </td>
                  <td className="w-2/12 border border-black px-4 py-1 text-right align-middle"></td>
                  <td className="w-2/12 border border-black px-4 py-1 text-right align-middle">
                    {convertIDRCurrency(saldoPersediaanBahanBaku)}
                  </td>
                  <td className="w-2/12 border border-black px-4 py-1 text-right align-middle"></td>
                </tr>
                <tr>
                  <td className="border border-black px-4 py-1 text-left align-middle">
                    Persediaan Bahan Pembantu
                  </td>
                  <td className="w-2/12 border border-black px-4 py-1 text-right align-middle"></td>
                  <td className="w-2/12 border border-black px-4 py-1 text-right align-middle">
                    {convertIDRCurrency(saldoPersediaanBahanPembantu)}
                  </td>
                  <td className="w-2/12 border border-black px-4 py-1 text-right align-middle"></td>
                </tr>
                <tr>
                  <td colSpan={4} className="p-3"></td>
                </tr>
                <tr>
                  <td className="border border-black px-4 py-1 text-left align-middle">
                    Total Aktiva Lancar
                  </td>
                  <td className="w-2/12 border border-black px-4 py-1 text-right align-middle"></td>
                  <td className="w-2/12 border border-black px-4 py-1 text-right align-middle"></td>
                  <td className="w-2/12 border border-black px-4 py-1 text-right align-middle">
                    {convertIDRCurrency(saldoTotalAktivaLancar)}
                  </td>
                </tr>
                {/* Aktiva Tetap */}
                <tr className="border-b-2 bg-neutral-200">
                  <th colSpan={4} className="px-4 py-1 text-left">
                    Aktiva Tetap
                  </th>
                </tr>
                <tr>
                  <td className="border border-black px-4 py-1 text-left align-middle">
                    Tanah
                  </td>
                  <td className="w-2/12 border border-black px-4 py-1 text-right align-middle"></td>
                  <td className="w-2/12 border border-black px-4 py-1 text-right align-middle">
                    {convertIDRCurrency(saldoTanah)}
                  </td>
                  <td className="w-2/12 border border-black px-4 py-1 text-right align-middle"></td>
                </tr>
                <tr>
                  <td colSpan={4} className="p-3"></td>
                </tr>
                <tr>
                  <td className="border border-black px-4 py-1 text-left align-middle">
                    Gedung
                  </td>
                  <td className="w-2/12 border border-black px-4 py-1 text-right align-middle">
                    {convertIDRCurrency(saldoGedung)}
                  </td>
                  <td className="w-2/12 border border-black px-4 py-1 text-right align-middle"></td>
                  <td className="w-2/12 border border-black px-4 py-1 text-right align-middle"></td>
                </tr>
                <tr>
                  <td className="border border-black px-4 py-1 text-left align-middle">
                    Akumulasi Penyusutan Gedung
                  </td>
                  <td className="w-2/12 border border-black px-4 py-1 text-right align-middle">
                    {convertIDRCurrency(saldoAkumulasiPenyusutanGedung)}
                  </td>
                  <td className="w-2/12 border border-black px-4 py-1 text-right align-middle"></td>
                  <td className="w-2/12 border border-black px-4 py-1 text-right align-middle"></td>
                </tr>
                <tr>
                  <td className="border border-black px-4 py-1 text-left align-middle"></td>
                  <td className="w-2/12 border border-black px-4 py-1 text-right align-middle"></td>
                  <td className="w-2/12 border border-black px-4 py-1 text-right align-middle">
                    {convertIDRCurrency(saldoTotalGedung)}
                  </td>
                  <td className="w-2/12 border border-black px-4 py-1 text-right align-middle"></td>
                </tr>
                <tr>
                  <td colSpan={4} className="p-3"></td>
                </tr>
                <tr>
                  <td className="border border-black px-4 py-1 text-left align-middle">
                    Mesin
                  </td>
                  <td className="w-2/12 border border-black px-4 py-1 text-right align-middle">
                    {convertIDRCurrency(saldoMesin)}
                  </td>
                  <td className="w-2/12 border border-black px-4 py-1 text-right align-middle"></td>
                  <td className="w-2/12 border border-black px-4 py-1 text-right align-middle"></td>
                </tr>
                <tr>
                  <td className="border border-black px-4 py-1 text-left align-middle">
                    Akumulasi Penyusutan Mesin
                  </td>
                  <td className="w-2/12 border border-black px-4 py-1 text-right align-middle">
                    {convertIDRCurrency(saldoAkumulasiPenyusutanMesin)}
                  </td>
                  <td className="w-2/12 border border-black px-4 py-1 text-right align-middle"></td>
                  <td className="w-2/12 border border-black px-4 py-1 text-right align-middle"></td>
                </tr>
                <tr>
                  <td className="border border-black px-4 py-1 text-left align-middle"></td>
                  <td className="w-2/12 border border-black px-4 py-1 text-right align-middle"></td>
                  <td className="w-2/12 border border-black px-4 py-1 text-right align-middle">
                    {convertIDRCurrency(saldoTotalMesin)}
                  </td>
                  <td className="w-2/12 border border-black px-4 py-1 text-right align-middle"></td>
                </tr>
                <tr>
                  <td colSpan={4} className="p-3"></td>
                </tr>
                <tr>
                  <td className="border border-black px-4 py-1 text-left align-middle">
                    Peralatan
                  </td>
                  <td className="w-2/12 border border-black px-4 py-1 text-right align-middle">
                    {convertIDRCurrency(saldoPeralatan)}
                  </td>
                  <td className="w-2/12 border border-black px-4 py-1 text-right align-middle"></td>
                  <td className="w-2/12 border border-black px-4 py-1 text-right align-middle"></td>
                </tr>
                <tr>
                  <td className="border border-black px-4 py-1 text-left align-middle">
                    Akumulasi Penyusutan Peralatan
                  </td>
                  <td className="w-2/12 border border-black px-4 py-1 text-right align-middle">
                    {convertIDRCurrency(saldoAkumulasiPenyusutanPeralatan)}
                  </td>
                  <td className="w-2/12 border border-black px-4 py-1 text-right align-middle"></td>
                  <td className="w-2/12 border border-black px-4 py-1 text-right align-middle"></td>
                </tr>
                <tr>
                  <td className="border border-black px-4 py-1 text-left align-middle"></td>
                  <td className="w-2/12 border border-black px-4 py-1 text-right align-middle"></td>
                  <td className="w-2/12 border border-black px-4 py-1 text-right align-middle">
                    {convertIDRCurrency(saldoTotalPeralatan)}
                  </td>
                  <td className="w-2/12 border border-black px-4 py-1 text-right align-middle"></td>
                </tr>
                <tr>
                  <td colSpan={4} className="p-3"></td>
                </tr>
                <tr>
                  <td className="border border-black px-4 py-1 text-left align-middle">
                    Kendaraan
                  </td>
                  <td className="w-2/12 border border-black px-4 py-1 text-right align-middle">
                    {convertIDRCurrency(saldoKendaraan)}
                  </td>
                  <td className="w-2/12 border border-black px-4 py-1 text-right align-middle"></td>
                  <td className="w-2/12 border border-black px-4 py-1 text-right align-middle"></td>
                </tr>
                <tr>
                  <td className="border border-black px-4 py-1 text-left align-middle">
                    Akumulasi Penyusutan Kendaraan
                  </td>
                  <td className="w-2/12 border border-black px-4 py-1 text-right align-middle">
                    {convertIDRCurrency(saldoAkumulasiPenyusutanKendaraan)}
                  </td>
                  <td className="w-2/12 border border-black px-4 py-1 text-right align-middle"></td>
                  <td className="w-2/12 border border-black px-4 py-1 text-right align-middle"></td>
                </tr>
                <tr>
                  <td className="border border-black px-4 py-1 text-left align-middle"></td>
                  <td className="w-2/12 border border-black px-4 py-1 text-right align-middle"></td>
                  <td className="w-2/12 border border-black px-4 py-1 text-right align-middle">
                    {convertIDRCurrency(saldoTotalKendaraan)}
                  </td>
                  <td className="w-2/12 border border-black px-4 py-1 text-right align-middle"></td>
                </tr>
                <tr>
                  <td colSpan={4} className="p-3"></td>
                </tr>
                <tr>
                  <td className="border border-black px-4 py-1 text-left align-middle">
                    Total Aktiva Tetap
                  </td>
                  <td className="w-2/12 border border-black px-4 py-1 text-right align-middle"></td>
                  <td className="w-2/12 border border-black px-4 py-1 text-right align-middle"></td>
                  <td className="w-2/12 border border-black px-4 py-1 text-right align-middle">
                    {convertIDRCurrency(saldoTotalAktivaTetap)}
                  </td>
                </tr>
                <tr className="border-b-2 bg-amber-300">
                  <td colSpan={3} className="px-4 py-1 text-left font-bold">
                    Total Aktiva
                  </td>
                  <td
                    colSpan={1}
                    className="w-2/12 border border-black px-4 py-1 text-right align-middle">
                    {convertIDRCurrency(saldoTotalAktiva)}
                  </td>
                </tr>
                {/* Kewajiban Lancar */}
                <tr className="border-b-2 bg-neutral-200">
                  <th colSpan={4} className="px-4 py-1 text-left">
                    Kewajiban Lancar
                  </th>
                </tr>
                <tr>
                  <td className="border border-black px-4 py-1 text-left align-middle">
                    Utang Usaha
                  </td>
                  <td className="w-2/12 border border-black px-4 py-1 text-right align-middle"></td>
                  <td className="w-2/12 border border-black px-4 py-1 text-right align-middle">
                    {convertIDRCurrency(saldoUtangUsaha)}
                  </td>
                  <td className="w-2/12 border border-black px-4 py-1 text-right align-middle"></td>
                </tr>
                {/* Keajiban Jangka Panjang */}
                <tr className="border-b-2 bg-neutral-200">
                  <th colSpan={4} className="px-4 py-1 text-left">
                    Kewajiban Jangka Panjang
                  </th>
                </tr>
                <tr>
                  <td className="border border-black px-4 py-1 text-left align-middle">
                    Utang Bank
                  </td>
                  <td className="w-2/12 border border-black px-4 py-1 text-right align-middle"></td>
                  <td className="w-2/12 border border-black px-4 py-1 text-right align-middle">
                    {convertIDRCurrency(saldoUtangBank)}
                  </td>
                  <td className="w-2/12 border border-black px-4 py-1 text-right align-middle"></td>
                </tr>
                <tr>
                  <td colSpan={4} className="p-3"></td>
                </tr>
                <tr>
                  <td className="border border-black px-4 py-1 text-left align-middle">
                    Total Kewajiban
                  </td>
                  <td className="w-2/12 border border-black px-4 py-1 text-right align-middle"></td>
                  <td className="w-2/12 border border-black px-4 py-1 text-right align-middle"></td>
                  <td className="w-2/12 border border-black px-4 py-1 text-right align-middle">
                    {convertIDRCurrency(saldoTotalKewajiban)}
                  </td>
                </tr>
                {/* Modal */}
                <tr className="border-b-2 bg-neutral-200">
                  <th colSpan={4} className="px-4 py-1 text-left">
                    Modal
                  </th>
                </tr>
                <tr>
                  <td className="border border-black px-4 py-1 text-left align-middle">
                    Modal Pemilik
                  </td>
                  <td className="w-2/12 border border-black px-4 py-1 text-right align-middle"></td>
                  <td className="w-2/12 border border-black px-4 py-1 text-right align-middle"></td>
                  <td className="w-2/12 border border-black px-4 py-1 text-right align-middle">
                    {convertIDRCurrency(saldoModalPemilik)}
                  </td>
                </tr>
                <tr className="border-b-2 bg-amber-300">
                  <td colSpan={3} className="px-4 py-1 text-left font-bold">
                    Total Kewajiban dan Modal
                  </td>
                  <td
                    colSpan={1}
                    className="w-2/12 border border-black px-4 py-1 text-right align-middle">
                    {convertIDRCurrency(saldoTotalKewajibanDanModal)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div style={{ display: "none" }}>
            <DokumenPosisiKeuangan
              ref={refLaporanPosisiKeuangan}
              tanggalAwal={tanggalAwal}
              tanggalAkhir={tanggalAkhir}
            />
          </div>
        </div>
      </section>
    );
  }
};

const DokumenPosisiKeuangan = forwardRef((props, ref) => {
  const [posisiKeuanganData, setPosisiKeuanganData] = useState();
  const tanggalAwal = props?.tanggalAwal;
  const tanggalAkhir = props?.tanggalAkhir;

  const { refetch } = useQuery({
    queryKey: ["posisi-keuangan", { tanggalAwal, tanggalAkhir }],
    queryFn: async () => {
      if (!!tanggalAwal && !!tanggalAkhir) {
        let tanggalAkhirModified = new Date(tanggalAkhir);
        tanggalAkhirModified.setHours(23, 59, 59);

        return await axios.get(
          `${process.env.REACT_APP_BASE_API}/saldoAkunTransaksi?firstDate=${tanggalAwal}&lastDate=${tanggalAkhirModified}`,
        );
      } else {
        return await axios.get(
          `${process.env.REACT_APP_BASE_API}/saldoAkunTransaksi`,
        );
      }
    },
    onSuccess: (data) => {
      setPosisiKeuanganData(data.data.data);
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

  if (!!posisiKeuanganData) {
    // Aktiva Lancar
    const saldoKas = posisiKeuanganData.posisiKeuangan[0]?.akun[0]?.saldo;
    const saldoPiutangUsaha =
      posisiKeuanganData.posisiKeuangan[0]?.akun[1]?.saldo;
    const saldoPersediaanBarangJadi =
      posisiKeuanganData.posisiKeuangan[0]?.akun[2]?.saldo;
    const saldoPersediaanBahanBaku =
      posisiKeuanganData.posisiKeuangan[0]?.akun[3]?.saldo;
    const saldoPersediaanBahanPembantu =
      posisiKeuanganData.posisiKeuangan[0]?.akun[4]?.saldo;

    // Aktiva Tetap
    const saldoTanah = posisiKeuanganData.posisiKeuangan[1]?.akun[0]?.saldo;
    const saldoGedung = posisiKeuanganData.posisiKeuangan[1]?.akun[1]?.saldo;
    const saldoAkumulasiPenyusutanGedung =
      posisiKeuanganData.posisiKeuangan[1]?.akun[2]?.saldo;
    const saldoMesin = posisiKeuanganData.posisiKeuangan[1]?.akun[3]?.saldo;
    const saldoAkumulasiPenyusutanMesin =
      posisiKeuanganData.posisiKeuangan[1]?.akun[4]?.saldo;
    const saldoPeralatan = posisiKeuanganData.posisiKeuangan[1]?.akun[5]?.saldo;
    const saldoAkumulasiPenyusutanPeralatan =
      posisiKeuanganData.posisiKeuangan[1]?.akun[6]?.saldo;
    const saldoKendaraan = posisiKeuanganData.posisiKeuangan[1]?.akun[7]?.saldo;
    const saldoAkumulasiPenyusutanKendaraan =
      posisiKeuanganData.posisiKeuangan[1]?.akun[8]?.saldo;
    const saldoTotalGedung = saldoGedung - saldoAkumulasiPenyusutanGedung;
    const saldoTotalMesin = saldoMesin - saldoAkumulasiPenyusutanMesin;
    const saldoTotalPeralatan =
      saldoPeralatan - saldoAkumulasiPenyusutanPeralatan;
    const saldoTotalKendaraan =
      saldoKendaraan - saldoAkumulasiPenyusutanKendaraan;

    // Kewajiban Lancar
    const saldoUtangUsaha =
      posisiKeuanganData.posisiKeuangan[2]?.akun[0]?.saldo;

    // Kewajiban Jangka Panjang
    const saldoUtangBank = posisiKeuanganData.posisiKeuangan[3]?.akun[0]?.saldo;

    // Modal
    const saldoModalPemilik =
      posisiKeuanganData.posisiKeuangan[4]?.akun[0]?.saldo;

    // Total
    const saldoTotalAktivaLancar =
      saldoKas +
      saldoPiutangUsaha +
      saldoPersediaanBarangJadi +
      saldoPersediaanBahanBaku +
      saldoPersediaanBahanPembantu;
    const saldoTotalAktivaTetap =
      saldoTotalGedung +
      saldoTotalMesin +
      saldoTotalPeralatan +
      saldoTotalKendaraan;
    const saldoTotalAktiva = saldoTotalAktivaLancar + saldoTotalAktivaTetap;
    const saldoTotalKewajiban = saldoUtangUsaha + saldoUtangBank;
    const saldoTotalKewajibanDanModal = saldoTotalKewajiban + saldoModalPemilik;

    return (
      <section ref={ref}>
        <style>{setStyles()}</style>
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-archivo text-xl font-bold">
                Laporan Posisi Keuangan
              </p>
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
          <div>
            <table className="w-full table-auto border-collapse rounded-lg border-2 text-sm">
              <thead>
                <tr>
                  <th
                    colSpan={4}
                    className="bg-amber-300 px-4 py-3 text-left font-bold">
                    Laporan Posisi Keuangan
                  </th>
                </tr>
              </thead>
              <tbody>
                {/* Aktiva Lancar */}
                <tr className="border-b-2 bg-neutral-200">
                  <th colSpan={4} className="px-4 py-1 text-left">
                    Aktiva Lancar
                  </th>
                </tr>
                <tr>
                  <td className="border border-black px-4 py-1 text-left align-middle">
                    Kas
                  </td>
                  <td className="w-2/12 border border-black px-4 py-1 text-right align-middle"></td>
                  <td className="w-2/12 border border-black px-4 py-1 text-right align-middle">
                    {convertIDRCurrency(saldoKas)}
                  </td>
                  <td className="w-2/12 border border-black px-4 py-1 text-right align-middle"></td>
                </tr>
                <tr>
                  <td className="border border-black px-4 py-1 text-left align-middle">
                    Piutang Usaha
                  </td>
                  <td className="w-2/12 border border-black px-4 py-1 text-right align-middle"></td>
                  <td className="w-2/12 border border-black px-4 py-1 text-right align-middle">
                    {convertIDRCurrency(saldoPiutangUsaha)}
                  </td>
                  <td className="w-2/12 border border-black px-4 py-1 text-right align-middle"></td>
                </tr>
                <tr>
                  <td className="border border-black px-4 py-1 text-left align-middle">
                    Persediaan Barang Jadi
                  </td>
                  <td className="w-2/12 border border-black px-4 py-1 text-right align-middle"></td>
                  <td className="w-2/12 border border-black px-4 py-1 text-right align-middle">
                    {convertIDRCurrency(saldoPersediaanBarangJadi)}
                  </td>
                  <td className="w-2/12 border border-black px-4 py-1 text-right align-middle"></td>
                </tr>
                <tr>
                  <td className="border border-black px-4 py-1 text-left align-middle">
                    Persediaan Bahan Baku
                  </td>
                  <td className="w-2/12 border border-black px-4 py-1 text-right align-middle"></td>
                  <td className="w-2/12 border border-black px-4 py-1 text-right align-middle">
                    {convertIDRCurrency(saldoPersediaanBahanBaku)}
                  </td>
                  <td className="w-2/12 border border-black px-4 py-1 text-right align-middle"></td>
                </tr>
                <tr>
                  <td className="border border-black px-4 py-1 text-left align-middle">
                    Persediaan Bahan Pembantu
                  </td>
                  <td className="w-2/12 border border-black px-4 py-1 text-right align-middle"></td>
                  <td className="w-2/12 border border-black px-4 py-1 text-right align-middle">
                    {convertIDRCurrency(saldoPersediaanBahanPembantu)}
                  </td>
                  <td className="w-2/12 border border-black px-4 py-1 text-right align-middle"></td>
                </tr>
                <tr>
                  <td colSpan={4} className="p-3"></td>
                </tr>
                <tr>
                  <td className="border border-black px-4 py-1 text-left align-middle">
                    Total Aktiva Lancar
                  </td>
                  <td className="w-2/12 border border-black px-4 py-1 text-right align-middle"></td>
                  <td className="w-2/12 border border-black px-4 py-1 text-right align-middle"></td>
                  <td className="w-2/12 border border-black px-4 py-1 text-right align-middle">
                    {convertIDRCurrency(saldoTotalAktivaLancar)}
                  </td>
                </tr>
                {/* Aktiva Tetap */}
                <tr className="border-b-2 bg-neutral-200">
                  <th colSpan={4} className="px-4 py-1 text-left">
                    Aktiva Tetap
                  </th>
                </tr>
                <tr>
                  <td className="border border-black px-4 py-1 text-left align-middle">
                    Tanah
                  </td>
                  <td className="w-2/12 border border-black px-4 py-1 text-right align-middle"></td>
                  <td className="w-2/12 border border-black px-4 py-1 text-right align-middle">
                    {convertIDRCurrency(saldoTanah)}
                  </td>
                  <td className="w-2/12 border border-black px-4 py-1 text-right align-middle"></td>
                </tr>
                <tr>
                  <td colSpan={4} className="p-3"></td>
                </tr>
                <tr>
                  <td className="border border-black px-4 py-1 text-left align-middle">
                    Gedung
                  </td>
                  <td className="w-2/12 border border-black px-4 py-1 text-right align-middle">
                    {convertIDRCurrency(saldoGedung)}
                  </td>
                  <td className="w-2/12 border border-black px-4 py-1 text-right align-middle"></td>
                  <td className="w-2/12 border border-black px-4 py-1 text-right align-middle"></td>
                </tr>
                <tr>
                  <td className="border border-black px-4 py-1 text-left align-middle">
                    Akumulasi Penyusutan Gedung
                  </td>
                  <td className="w-2/12 border border-black px-4 py-1 text-right align-middle">
                    {convertIDRCurrency(saldoAkumulasiPenyusutanGedung)}
                  </td>
                  <td className="w-2/12 border border-black px-4 py-1 text-right align-middle"></td>
                  <td className="w-2/12 border border-black px-4 py-1 text-right align-middle"></td>
                </tr>
                <tr>
                  <td className="border border-black px-4 py-1 text-left align-middle"></td>
                  <td className="w-2/12 border border-black px-4 py-1 text-right align-middle"></td>
                  <td className="w-2/12 border border-black px-4 py-1 text-right align-middle">
                    {convertIDRCurrency(saldoTotalGedung)}
                  </td>
                  <td className="w-2/12 border border-black px-4 py-1 text-right align-middle"></td>
                </tr>
                <tr>
                  <td colSpan={4} className="p-3"></td>
                </tr>
                <tr>
                  <td className="border border-black px-4 py-1 text-left align-middle">
                    Mesin
                  </td>
                  <td className="w-2/12 border border-black px-4 py-1 text-right align-middle">
                    {convertIDRCurrency(saldoMesin)}
                  </td>
                  <td className="w-2/12 border border-black px-4 py-1 text-right align-middle"></td>
                  <td className="w-2/12 border border-black px-4 py-1 text-right align-middle"></td>
                </tr>
                <tr>
                  <td className="border border-black px-4 py-1 text-left align-middle">
                    Akumulasi Penyusutan Mesin
                  </td>
                  <td className="w-2/12 border border-black px-4 py-1 text-right align-middle">
                    {convertIDRCurrency(saldoAkumulasiPenyusutanMesin)}
                  </td>
                  <td className="w-2/12 border border-black px-4 py-1 text-right align-middle"></td>
                  <td className="w-2/12 border border-black px-4 py-1 text-right align-middle"></td>
                </tr>
                <tr>
                  <td className="border border-black px-4 py-1 text-left align-middle"></td>
                  <td className="w-2/12 border border-black px-4 py-1 text-right align-middle"></td>
                  <td className="w-2/12 border border-black px-4 py-1 text-right align-middle">
                    {convertIDRCurrency(saldoTotalMesin)}
                  </td>
                  <td className="w-2/12 border border-black px-4 py-1 text-right align-middle"></td>
                </tr>
                <tr>
                  <td colSpan={4} className="p-3"></td>
                </tr>
                <tr>
                  <td className="border border-black px-4 py-1 text-left align-middle">
                    Peralatan
                  </td>
                  <td className="w-2/12 border border-black px-4 py-1 text-right align-middle">
                    {convertIDRCurrency(saldoPeralatan)}
                  </td>
                  <td className="w-2/12 border border-black px-4 py-1 text-right align-middle"></td>
                  <td className="w-2/12 border border-black px-4 py-1 text-right align-middle"></td>
                </tr>
                <tr>
                  <td className="border border-black px-4 py-1 text-left align-middle">
                    Akumulasi Penyusutan Peralatan
                  </td>
                  <td className="w-2/12 border border-black px-4 py-1 text-right align-middle">
                    {convertIDRCurrency(saldoAkumulasiPenyusutanPeralatan)}
                  </td>
                  <td className="w-2/12 border border-black px-4 py-1 text-right align-middle"></td>
                  <td className="w-2/12 border border-black px-4 py-1 text-right align-middle"></td>
                </tr>
                <tr>
                  <td className="border border-black px-4 py-1 text-left align-middle"></td>
                  <td className="w-2/12 border border-black px-4 py-1 text-right align-middle"></td>
                  <td className="w-2/12 border border-black px-4 py-1 text-right align-middle">
                    {convertIDRCurrency(saldoTotalPeralatan)}
                  </td>
                  <td className="w-2/12 border border-black px-4 py-1 text-right align-middle"></td>
                </tr>
                <tr>
                  <td colSpan={4} className="p-3"></td>
                </tr>
                <tr>
                  <td className="border border-black px-4 py-1 text-left align-middle">
                    Kendaraan
                  </td>
                  <td className="w-2/12 border border-black px-4 py-1 text-right align-middle">
                    {convertIDRCurrency(saldoKendaraan)}
                  </td>
                  <td className="w-2/12 border border-black px-4 py-1 text-right align-middle"></td>
                  <td className="w-2/12 border border-black px-4 py-1 text-right align-middle"></td>
                </tr>
                <tr>
                  <td className="border border-black px-4 py-1 text-left align-middle">
                    Akumulasi Penyusutan Kendaraan
                  </td>
                  <td className="w-2/12 border border-black px-4 py-1 text-right align-middle">
                    {convertIDRCurrency(saldoAkumulasiPenyusutanKendaraan)}
                  </td>
                  <td className="w-2/12 border border-black px-4 py-1 text-right align-middle"></td>
                  <td className="w-2/12 border border-black px-4 py-1 text-right align-middle"></td>
                </tr>
                <tr>
                  <td className="border border-black px-4 py-1 text-left align-middle"></td>
                  <td className="w-2/12 border border-black px-4 py-1 text-right align-middle"></td>
                  <td className="w-2/12 border border-black px-4 py-1 text-right align-middle">
                    {convertIDRCurrency(saldoTotalKendaraan)}
                  </td>
                  <td className="w-2/12 border border-black px-4 py-1 text-right align-middle"></td>
                </tr>
                <tr>
                  <td colSpan={4} className="p-3"></td>
                </tr>
                <tr>
                  <td className="border border-black px-4 py-1 text-left align-middle">
                    Total Aktiva Tetap
                  </td>
                  <td className="w-2/12 border border-black px-4 py-1 text-right align-middle"></td>
                  <td className="w-2/12 border border-black px-4 py-1 text-right align-middle"></td>
                  <td className="w-2/12 border border-black px-4 py-1 text-right align-middle">
                    {convertIDRCurrency(saldoTotalAktivaTetap)}
                  </td>
                </tr>
                <tr className="border-b-2 bg-amber-300">
                  <td colSpan={3} className="px-4 py-1 text-left font-bold">
                    Total Aktiva
                  </td>
                  <td
                    colSpan={1}
                    className="w-2/12 border border-black px-4 py-1 text-right align-middle">
                    {convertIDRCurrency(saldoTotalAktiva)}
                  </td>
                </tr>
                {/* Kewajiban Lancar */}
                <tr className="border-b-2 bg-neutral-200">
                  <th colSpan={4} className="px-4 py-1 text-left">
                    Kewajiban Lancar
                  </th>
                </tr>
                <tr>
                  <td className="border border-black px-4 py-1 text-left align-middle">
                    Utang Usaha
                  </td>
                  <td className="w-2/12 border border-black px-4 py-1 text-right align-middle"></td>
                  <td className="w-2/12 border border-black px-4 py-1 text-right align-middle">
                    {convertIDRCurrency(saldoUtangUsaha)}
                  </td>
                  <td className="w-2/12 border border-black px-4 py-1 text-right align-middle"></td>
                </tr>
                {/* Keajiban Jangka Panjang */}
                <tr className="border-b-2 bg-neutral-200">
                  <th colSpan={4} className="px-4 py-1 text-left">
                    Kewajiban Jangka Panjang
                  </th>
                </tr>
                <tr>
                  <td className="border border-black px-4 py-1 text-left align-middle">
                    Utang Bank
                  </td>
                  <td className="w-2/12 border border-black px-4 py-1 text-right align-middle"></td>
                  <td className="w-2/12 border border-black px-4 py-1 text-right align-middle">
                    {convertIDRCurrency(saldoUtangBank)}
                  </td>
                  <td className="w-2/12 border border-black px-4 py-1 text-right align-middle"></td>
                </tr>
                <tr>
                  <td colSpan={4} className="p-3"></td>
                </tr>
                <tr>
                  <td className="border border-black px-4 py-1 text-left align-middle">
                    Total Kewajiban
                  </td>
                  <td className="w-2/12 border border-black px-4 py-1 text-right align-middle"></td>
                  <td className="w-2/12 border border-black px-4 py-1 text-right align-middle"></td>
                  <td className="w-2/12 border border-black px-4 py-1 text-right align-middle">
                    {convertIDRCurrency(saldoTotalKewajiban)}
                  </td>
                </tr>
                {/* Modal */}
                <tr className="border-b-2 bg-neutral-200">
                  <th colSpan={4} className="px-4 py-1 text-left">
                    Modal
                  </th>
                </tr>
                <tr>
                  <td className="border border-black px-4 py-1 text-left align-middle">
                    Modal Pemilik
                  </td>
                  <td className="w-2/12 border border-black px-4 py-1 text-right align-middle"></td>
                  <td className="w-2/12 border border-black px-4 py-1 text-right align-middle"></td>
                  <td className="w-2/12 border border-black px-4 py-1 text-right align-middle">
                    {convertIDRCurrency(saldoModalPemilik)}
                  </td>
                </tr>
                <tr className="border-b-2 bg-amber-300">
                  <td colSpan={3} className="px-4 py-1 text-left font-bold">
                    Total Kewajiban dan Modal
                  </td>
                  <td
                    colSpan={1}
                    className="w-2/12 border border-black px-4 py-1 text-right align-middle">
                    {convertIDRCurrency(saldoTotalKewajibanDanModal)}
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
