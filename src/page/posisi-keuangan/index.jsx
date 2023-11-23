import { useState, useEffect, useRef, forwardRef } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useReactToPrint } from "react-to-print";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import axios from "axios";

import { cn } from "../../utils/cn";

import { Button } from "../../componet/button";
import { Calendar } from "../../componet/calendar";
import { Command, CommandGroup, CommandItem } from "../../componet/command";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../componet/dialog";
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

export const PosisiKeuangan = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [openTahunPeriode, setOpenTahunPeriode] = useState(false);
  const [tahunPeriode, setTahunPeriode] = useState();
  const [tahun, setTahun] = useState([]);
  const [tanggalAwal, setTanggalAwal] = useState();
  const [tanggalAkhir, setTanggalAkhir] = useState();
  const [posisiKeuanganData, setPosisiKeuanganData] = useState();
  const [labaRugiData, setLabaRugiData] = useState();
  const refLaporanPosisiKeuangan = useRef();
  const handlePrintLaporanPosisiKeuangan = useReactToPrint({
    content: () => refLaporanPosisiKeuangan.current,
    documentTitle: `Laporan Posisi Keuangan`,
    bodyClass: "bg-white",
  });

  const { mutate: handleTutupBuku } = useMutation({
    mutationFn: async (data) => {
      return await axios.patch(
        `${process.env.REACT_APP_BASE_API}/saldoAkunTransaksi/tutupBuku`,
        { data },
      );
    },
    onSuccess: () => {
      setIsDialogOpen(false);
      // alert("Buku Tahun Ini Selesai");
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const hendleGetAllTanggalTutupBuku = () => {
    axios
      .get(`${process.env.REACT_APP_BASE_API}/tutupBuku`)
      .then((res) => {
        console.log(res.data.data);
        setTahun(res.data.data);
        // alert("Buku Tahun Ini Selesai");
        // console.log(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const { refetch: refetchPosisiKeuangan } = useQuery({
    queryKey: ["posisi-keuangan", { tanggalAwal, tanggalAkhir }],
    queryFn: async () => {
      let tanggalAkhirModified = new Date(tanggalAkhir).setHours(23, 59, 59);

      return await axios.get(
        `${process.env.REACT_APP_BASE_API}/saldoAkunTransaksi`,
        {
          params: {
            firstDate: tanggalAwal,
            lastDate: tanggalAkhirModified,
            idPeriode: tahunPeriode,
          },
        },
      );
    },
    onSuccess: (data) => {
      setPosisiKeuanganData(data.data.data);
    },
  });

  const { refetch: refetchLabaRugi } = useQuery({
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
              idPeriode: tahunPeriode,
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

  useEffect(() => {
    refetchPosisiKeuangan();
    refetchLabaRugi();
    hendleGetAllTanggalTutupBuku();
  }, [tahunPeriode, tanggalAwal, tanggalAkhir]);

  console.log(labaRugiData);

  if (!!posisiKeuanganData && !!labaRugiData) {
    const saldoPendapatan = labaRugiData[0]?.akun[0]?.saldo;
    const saldoAwalPersediaanBahanBaku = labaRugiData[1]?.akun[0]?.saldo;
    const saldoAwalPersediaanBarangJadi = labaRugiData[1]?.akun[1]?.saldo;
    const saldoBiayaBahanBaku = labaRugiData[2]?.akun[0]?.saldo;
    const saldoUpahPekerja = labaRugiData[2]?.akun[1]?.saldo;
    const saldoBiayaBahanPembantu = labaRugiData[2]?.akun[2]?.saldo;
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

    const saldoTotalBiayaProduksi =
      saldoBiayaBahanBaku + saldoUpahPekerja + saldoBiayaBahanPembantu;

    const saldoBarangSiapDijual =
      saldoAwalPersediaanBahanBaku +
      saldoAwalPersediaanBarangJadi +
      saldoTotalBiayaProduksi;

    const saldoTotalPersediaan =
      labaRugiData[2]?.akun[3]?.saldo + labaRugiData[2]?.akun[4]?.saldo;

    const saldoTotalHargaPokokPenjualanFinal =
      saldoBarangSiapDijual -
      (labaRugiData[2]?.akun[3]?.saldo + labaRugiData[2]?.akun[4]?.saldo);

    const saldoTotalHargaPokokPenjualan =
      saldoAwalPersediaanBahanBaku + saldoAwalPersediaanBarangJadi;

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

    //// Posisi Keuangan ////
    // Aktiva Lancar
    const saldoKas = posisiKeuanganData.posisiKeuangan[0]?.akun[0]?.saldo;
    const saldoPiutangUsaha =
      posisiKeuanganData.posisiKeuangan[0]?.akun[1]?.saldo;
    const saldoPiutang = posisiKeuanganData.posisiKeuangan[0]?.akun[2]?.saldo;
    const saldoPersediaanBarangJadi =
      posisiKeuanganData.posisiKeuangan[0]?.akun[3]?.saldo;
    const saldoPersediaanBahanBaku =
      posisiKeuanganData.posisiKeuangan[0]?.akun[4]?.saldo;
    const saldoPersediaanBahanPembantu =
      posisiKeuanganData.posisiKeuangan[0]?.akun[5]?.saldo;

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
      posisiKeuanganData.posisiKeuangan[4]?.akun[0]?.saldo +
      saldoTotalLabaRugiUsaha;

    // Total
    const saldoTotalAktivaLancar =
      saldoKas +
      // saldoPiutangUsaha +
      saldoPiutang +
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
      <section className="font-archivo">
        <div className="flex flex-col gap-4">
          <div>
            <h1 className="text-2xl font-bold">Posisi Keuangan</h1>
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
                        after: new Date(tanggalAkhir).setHours(23, 59, 59),
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
                        before: new Date(tanggalAwal).setHours(0, 0, 0),
                      }}
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <button
                onClick={handlePrintLaporanPosisiKeuangan}
                className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg border-2 border-neutral-500 bg-amber-300 p-2">
                <Printer />
              </button>

              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger>
                  <button className="w-30 flex h-10 flex-shrink-0 items-center justify-center rounded-lg border-2 border-neutral-500 bg-amber-300 p-2">
                    Tutup Buku
                  </button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader className="font-archivo text-xl font-bold">
                    Apakah anda yakin?
                  </DialogHeader>
                  <DialogDescription>
                    Apakah Anda yakin ingin melanjutkan proses penutupan buku?
                    Pastikan bahwa Anda telah melakukan semua verifikasi yang
                    diperlukan sebelumnya.
                  </DialogDescription>
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => setIsDialogOpen(false)}
                      className="flex flex-shrink-0 items-center justify-center rounded-lg border-2 bg-red-500 p-2.5 text-white transition-colors hover:bg-red-700">
                      Batal
                    </button>
                    <button
                      onClick={() =>
                        handleTutupBuku({ modalPemilik: saldoModalPemilik })
                      }
                      className="flex flex-shrink-0 items-center justify-center rounded-lg border-2  bg-amber-300 p-2.5 transition-colors hover:bg-amber-400">
                      Konfirmasi
                    </button>
                  </div>
                </DialogContent>
              </Dialog>
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
                      ? // ? tahun.find((tahun) => console.log(tahun, tahunPeriode))
                        tahun.map((tahun) => {
                          if (tahun.id === tahunPeriode) {
                            return formatterTime.format(
                              new Date(tahun.tanggal),
                            );
                          }
                        })
                      : "Pilih tahun"}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[140px] p-0">
                  <Command>
                    <ScrollArea className="h-48">
                      <CommandGroup>
                        {tahun.map(
                          (tahun) => (
                            console.log(tahun.id),
                            (
                              <CommandItem
                                key={tahun.id}
                                value={tahun.id}
                                onSelect={(currentValue) => {
                                  console.log(currentValue, tahunPeriode);
                                  setTahunPeriode(Number(tahun.id));
                                  setOpenTahunPeriode(false);
                                }}>
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    tahunPeriode == tahun.id
                                      ? "opacity-100"
                                      : "opacity-0",
                                  )}
                                />
                                {/* {tahun.id} */}
                                {formatterTime.format(new Date(tahun.tanggal))}
                              </CommandItem>
                            )
                          ),
                        )}
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
                <tr>
                  <th
                    colSpan={4}
                    className="border-2 border-neutral-500 bg-amber-300 px-4 py-3 text-left font-bold">
                    Laporan Posisi Keuangan
                  </th>
                </tr>
              </thead>
              <tbody>
                {/* Aktiva Lancar */}
                <tr className="border-2 border-neutral-500 bg-neutral-200">
                  <th colSpan={4} className="px-4 py-1 text-left">
                    Aktiva Lancar
                  </th>
                </tr>
                <tr className="border-2 border-neutral-500">
                  <td className="border-2 border-neutral-500 px-4 py-1 text-left align-middle">
                    Kas
                  </td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle">
                    {convertIDRCurrency(saldoKas)}
                  </td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                </tr>
                {/* <tr className="border-2 border-neutral-500">
                  <td className="border-2 border-neutral-500 px-4 py-1 text-left align-middle">
                    Piutang Usaha
                  </td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle">
                    {convertIDRCurrency(saldoPiutangUsaha)}
                  </td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                </tr> */}
                <tr className="border-2 border-neutral-500">
                  <td className="border-2 border-neutral-500 px-4 py-1 text-left align-middle">
                    Piutang
                  </td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle">
                    {convertIDRCurrency(saldoPiutang)}
                  </td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                </tr>
                <tr className="border-2 border-neutral-500">
                  <td className="border-2 border-neutral-500 px-4 py-1 text-left align-middle">
                    Persediaan Barang Jadi
                  </td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle">
                    {convertIDRCurrency(saldoPersediaanBarangJadi)}
                  </td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                </tr>
                <tr className="border-2 border-neutral-500">
                  <td className="border-2 border-neutral-500 px-4 py-1 text-left align-middle">
                    Persediaan Bahan Baku
                  </td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle">
                    {convertIDRCurrency(saldoPersediaanBahanBaku)}
                  </td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                </tr>
                <tr className="border-2 border-neutral-500">
                  <td className="border-2 border-neutral-500 px-4 py-1 text-left align-middle">
                    Persediaan Bahan Pembantu
                  </td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle">
                    {convertIDRCurrency(saldoPersediaanBahanPembantu)}
                  </td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                </tr>
                <tr className="border-2 border-neutral-500">
                  <td colSpan={4} className="p-3"></td>
                </tr>
                <tr className="border-2 border-neutral-500">
                  <td className="border-2 border-neutral-500 px-4 py-1 text-left align-middle">
                    Total Aktiva Lancar
                  </td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle">
                    {convertIDRCurrency(saldoTotalAktivaLancar)}
                  </td>
                </tr>
                {/* Aktiva Tetap */}
                <tr className="border-2 border-neutral-500 bg-neutral-200">
                  <th colSpan={4} className="px-4 py-1 text-left">
                    Aktiva Tetap
                  </th>
                </tr>
                <tr>
                  <td className="border-2 border-neutral-500 px-4 py-1 text-left align-middle">
                    Tanah
                  </td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle">
                    {convertIDRCurrency(saldoTanah)}
                  </td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                </tr>
                <tr>
                  <td colSpan={4} className="p-3"></td>
                </tr>
                <tr>
                  <td className="border-2 border-neutral-500 px-4 py-1 text-left align-middle">
                    Gedung
                  </td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle">
                    {convertIDRCurrency(saldoGedung)}
                  </td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                </tr>
                <tr>
                  <td className="border-2 border-neutral-500 px-4 py-1 text-left align-middle">
                    Akumulasi Penyusutan Gedung
                  </td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle">
                    {convertIDRCurrency(saldoAkumulasiPenyusutanGedung)}
                  </td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                </tr>
                <tr>
                  <td className="border-2 border-neutral-500 px-4 py-1 text-left align-middle"></td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle">
                    {convertIDRCurrency(saldoTotalGedung)}
                  </td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                </tr>
                <tr>
                  <td colSpan={4} className="p-3"></td>
                </tr>
                <tr>
                  <td className="border-2 border-neutral-500 px-4 py-1 text-left align-middle">
                    Mesin
                  </td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle">
                    {convertIDRCurrency(saldoMesin)}
                  </td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                </tr>
                <tr>
                  <td className="border-2 border-neutral-500 px-4 py-1 text-left align-middle">
                    Akumulasi Penyusutan Mesin
                  </td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle">
                    {convertIDRCurrency(saldoAkumulasiPenyusutanMesin)}
                  </td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                </tr>
                <tr>
                  <td className="border-2 border-neutral-500 px-4 py-1 text-left align-middle"></td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle">
                    {convertIDRCurrency(saldoTotalMesin)}
                  </td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                </tr>
                <tr>
                  <td colSpan={4} className="p-3"></td>
                </tr>
                <tr>
                  <td className="border-2 border-neutral-500 px-4 py-1 text-left align-middle">
                    Peralatan
                  </td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle">
                    {convertIDRCurrency(saldoPeralatan)}
                  </td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                </tr>
                <tr>
                  <td className="border-2 border-neutral-500 px-4 py-1 text-left align-middle">
                    Akumulasi Penyusutan Peralatan
                  </td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle">
                    {convertIDRCurrency(saldoAkumulasiPenyusutanPeralatan)}
                  </td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                </tr>
                <tr>
                  <td className="border-2 border-neutral-500 px-4 py-1 text-left align-middle"></td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle">
                    {convertIDRCurrency(saldoTotalPeralatan)}
                  </td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                </tr>
                <tr>
                  <td colSpan={4} className="p-3"></td>
                </tr>
                <tr>
                  <td className="border-2 border-neutral-500 px-4 py-1 text-left align-middle">
                    Kendaraan
                  </td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle">
                    {convertIDRCurrency(saldoKendaraan)}
                  </td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                </tr>
                <tr>
                  <td className="border-2 border-neutral-500 px-4 py-1 text-left align-middle">
                    Akumulasi Penyusutan Kendaraan
                  </td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle">
                    {convertIDRCurrency(saldoAkumulasiPenyusutanKendaraan)}
                  </td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                </tr>
                <tr>
                  <td className="border-2 border-neutral-500 px-4 py-1 text-left align-middle"></td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle">
                    {convertIDRCurrency(saldoTotalKendaraan)}
                  </td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                </tr>
                <tr>
                  <td colSpan={4} className="p-3"></td>
                </tr>
                <tr>
                  <td className="border-2 border-neutral-500 px-4 py-1 text-left align-middle">
                    Total Aktiva Tetap
                  </td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle">
                    {convertIDRCurrency(saldoTotalAktivaTetap)}
                  </td>
                </tr>
                <tr className="border-2 border-neutral-500 bg-amber-300">
                  <td colSpan={3} className="px-4 py-1 text-left font-bold">
                    Total Aktiva
                  </td>
                  <td
                    colSpan={1}
                    className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle">
                    {convertIDRCurrency(saldoTotalAktiva)}
                  </td>
                </tr>
                {/* Kewajiban Lancar */}
                <tr className="border-2 border-neutral-500 bg-neutral-200">
                  <th colSpan={4} className="px-4 py-1 text-left">
                    Kewajiban Lancar
                  </th>
                </tr>
                <tr>
                  <td className="border-2 border-neutral-500 px-4 py-1 text-left align-middle">
                    Utang Usaha
                  </td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle">
                    {convertIDRCurrency(saldoUtangUsaha)}
                  </td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                </tr>
                {/* Keajiban Jangka Panjang */}
                <tr className="border-2 border-neutral-500 bg-neutral-200">
                  <th colSpan={4} className="px-4 py-1 text-left">
                    Kewajiban Jangka Panjang
                  </th>
                </tr>
                <tr>
                  <td className="border-2 border-neutral-500 px-4 py-1 text-left align-middle">
                    Utang Bank
                  </td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle">
                    {convertIDRCurrency(saldoUtangBank)}
                  </td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                </tr>
                <tr>
                  <td colSpan={4} className="p-3"></td>
                </tr>
                <tr>
                  <td className="border-2 border-neutral-500 px-4 py-1 text-left align-middle">
                    Total Kewajiban
                  </td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle">
                    {convertIDRCurrency(saldoTotalKewajiban)}
                  </td>
                </tr>
                {/* Modal */}
                <tr className="border-2 border-neutral-500 bg-neutral-200">
                  <th colSpan={4} className="px-4 py-1 text-left">
                    Modal
                  </th>
                </tr>
                <tr>
                  <td className="border-2 border-neutral-500 px-4 py-1 text-left align-middle">
                    Modal Pemilik
                  </td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle">
                    {convertIDRCurrency(saldoModalPemilik)}
                  </td>
                </tr>
                <tr className="border-2 border-neutral-500 bg-amber-300">
                  <td
                    colSpan={3}
                    className="border-2 border-neutral-500 px-4 py-1 text-left font-bold">
                    Total Kewajiban dan Modal
                  </td>
                  <td
                    colSpan={1}
                    className="w-2/12 px-4 py-1 text-right align-middle">
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
              tahunPeriode={tahunPeriode}
            />
          </div>
        </div>
      </section>
    );
  }
};

const DokumenPosisiKeuangan = forwardRef((props, ref) => {
  const [posisiKeuanganData, setPosisiKeuanganData] = useState();
  const [labaRugiData, setLabaRugiData] = useState();
  const tanggalAwal = props?.tanggalAwal;
  const tanggalAkhir = props?.tanggalAkhir;
  const tahunPeriode = props?.tahunPeriode;

  const { refetchPosisiKeuangan } = useQuery({
    queryKey: ["posisi-keuangan", "dokumen", { tanggalAwal, tanggalAkhir }],
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

  const { refetch: refetchLabaRugi } = useQuery({
    queryKey: ["laba-rugi", { tahunPeriode, tanggalAwal, tanggalAkhir }],
    queryFn: async () => {
      if (!!tanggalAwal && !!tanggalAkhir) {
        let modifiedHour = new Date(tanggalAkhir);
        modifiedHour.setHours(23, 59, 59, 999);

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
              idPeriode: tahunPeriode,
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

  if (!!posisiKeuanganData && !!labaRugiData) {
    //// Laba Rugi ////
    const saldoPendapatan = labaRugiData[0]?.akun[0]?.saldo;
    const saldoAwalPersediaanBahanBaku = labaRugiData[1]?.akun[0]?.saldo;
    const saldoAwalPersediaanBarangJadi = labaRugiData[1]?.akun[1]?.saldo;
    const saldoBiayaBahanBaku = labaRugiData[2]?.akun[0]?.saldo;
    const saldoUpahPekerja = labaRugiData[2]?.akun[1]?.saldo;
    const saldoBiayaBahanPembantu = labaRugiData[2]?.akun[2]?.saldo;
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

    const saldoTotalBiayaProduksi =
      saldoBiayaBahanBaku + saldoUpahPekerja + saldoBiayaBahanPembantu;

    const saldoBarangSiapDijual =
      saldoAwalPersediaanBahanBaku +
      saldoAwalPersediaanBarangJadi +
      saldoTotalBiayaProduksi;

    const saldoTotalPersediaan =
      labaRugiData[2]?.akun[3]?.saldo + labaRugiData[2]?.akun[4]?.saldo;

    const saldoTotalHargaPokokPenjualanFinal =
      saldoBarangSiapDijual -
      (labaRugiData[2]?.akun[3]?.saldo + labaRugiData[2]?.akun[4]?.saldo);

    const saldoTotalHargaPokokPenjualan =
      saldoAwalPersediaanBahanBaku + saldoAwalPersediaanBarangJadi;

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

    //// Posisi Keuangan ////
    // Aktiva Lancar
    const saldoKas = posisiKeuanganData.posisiKeuangan[0]?.akun[0]?.saldo;
    const saldoPiutangUsaha =
      posisiKeuanganData.posisiKeuangan[0]?.akun[1]?.saldo;
    const saldoPiutang = posisiKeuanganData.posisiKeuangan[0]?.akun[2]?.saldo;
    const saldoPersediaanBarangJadi =
      posisiKeuanganData.posisiKeuangan[0]?.akun[3]?.saldo;
    const saldoPersediaanBahanBaku =
      posisiKeuanganData.posisiKeuangan[0]?.akun[4]?.saldo;
    const saldoPersediaanBahanPembantu =
      posisiKeuanganData.posisiKeuangan[0]?.akun[5]?.saldo;

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
      posisiKeuanganData.posisiKeuangan[4]?.akun[0]?.saldo +
      saldoTotalLabaRugiUsaha;

    // Total
    const saldoTotalAktivaLancar =
      saldoKas +
      // saldoPiutangUsaha +
      saldoPiutang +
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
        <div className="flex flex-col gap-2 font-archivo">
          <div className="flex w-full items-center justify-center">
            <img src="/logo-kop.png" alt="" className="aspect-auto h-24" />
          </div>
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
            {!!tahunPeriode && (
              <div className="flex items-center gap-2">
                <p className="text-xs font-bold">
                  History Tahun - {tahunPeriode}
                </p>
              </div>
            )}
          </div>
          <div>
            <table className="w-full table-auto border-collapse rounded-lg border-2 border-neutral-500 text-sm">
              <thead>
                <tr className="border-2 border-neutral-500">
                  <th
                    colSpan={4}
                    className="bg-amber-300 px-4 py-3 text-left font-bold">
                    Laporan Posisi Keuangan
                  </th>
                </tr>
              </thead>
              <tbody>
                {/* Aktiva Lancar */}
                <tr className="border-2 border-neutral-500 bg-neutral-200">
                  <th colSpan={4} className="px-4 py-1 text-left">
                    Aktiva Lancar
                  </th>
                </tr>
                <tr>
                  <td className="border-2 border-neutral-500 px-4 py-1 text-left align-middle">
                    Kas
                  </td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle">
                    {convertIDRCurrency(saldoKas)}
                  </td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                </tr>
                {/* <tr>
                  <td className="border-2 border-neutral-500 px-4 py-1 text-left align-middle">
                    Piutang Usaha
                  </td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle">
                    {convertIDRCurrency(saldoPiutangUsaha)}
                  </td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                </tr> */}
                <tr>
                  <td className="border-2 border-neutral-500 px-4 py-1 text-left align-middle">
                    Piutang
                  </td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle">
                    {convertIDRCurrency(saldoPiutang)}
                  </td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                </tr>
                <tr>
                  <td className="border-2 border-neutral-500 px-4 py-1 text-left align-middle">
                    Persediaan Barang Jadi
                  </td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle">
                    {convertIDRCurrency(saldoPersediaanBarangJadi)}
                  </td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                </tr>
                <tr>
                  <td className="border-2 border-neutral-500 px-4 py-1 text-left align-middle">
                    Persediaan Bahan Baku
                  </td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle">
                    {convertIDRCurrency(saldoPersediaanBahanBaku)}
                  </td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                </tr>
                <tr>
                  <td className="border-2 border-neutral-500 px-4 py-1 text-left align-middle">
                    Persediaan Bahan Pembantu
                  </td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle">
                    {convertIDRCurrency(saldoPersediaanBahanPembantu)}
                  </td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                </tr>
                <tr>
                  <td colSpan={4} className="p-3"></td>
                </tr>
                <tr>
                  <td className="border-2 border-neutral-500 px-4 py-1 text-left align-middle">
                    Total Aktiva Lancar
                  </td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle">
                    {convertIDRCurrency(saldoTotalAktivaLancar)}
                  </td>
                </tr>
                {/* Aktiva Tetap */}
                <tr className="border-2 border-neutral-500 bg-neutral-200">
                  <th colSpan={4} className="px-4 py-1 text-left">
                    Aktiva Tetap
                  </th>
                </tr>
                <tr>
                  <td className="border-2 border-neutral-500 px-4 py-1 text-left align-middle">
                    Tanah
                  </td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle">
                    {convertIDRCurrency(saldoTanah)}
                  </td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                </tr>
                <tr>
                  <td colSpan={4} className="p-3"></td>
                </tr>
                <tr>
                  <td className="border-2 border-neutral-500 px-4 py-1 text-left align-middle">
                    Gedung
                  </td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle">
                    {convertIDRCurrency(saldoGedung)}
                  </td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                </tr>
                <tr>
                  <td className="border-2 border-neutral-500 px-4 py-1 text-left align-middle">
                    Akumulasi Penyusutan Gedung
                  </td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle">
                    {convertIDRCurrency(saldoAkumulasiPenyusutanGedung)}
                  </td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                </tr>
                <tr>
                  <td className="border-2 border-neutral-500 px-4 py-1 text-left align-middle"></td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle">
                    {convertIDRCurrency(saldoTotalGedung)}
                  </td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                </tr>
                <tr>
                  <td colSpan={4} className="p-3"></td>
                </tr>
                <tr>
                  <td className="border-2 border-neutral-500 px-4 py-1 text-left align-middle">
                    Mesin
                  </td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle">
                    {convertIDRCurrency(saldoMesin)}
                  </td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                </tr>
                <tr>
                  <td className="border-2 border-neutral-500 px-4 py-1 text-left align-middle">
                    Akumulasi Penyusutan Mesin
                  </td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle">
                    {convertIDRCurrency(saldoAkumulasiPenyusutanMesin)}
                  </td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                </tr>
                <tr>
                  <td className="border-2 border-neutral-500 px-4 py-1 text-left align-middle"></td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle">
                    {convertIDRCurrency(saldoTotalMesin)}
                  </td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                </tr>
                <tr>
                  <td colSpan={4} className="p-3"></td>
                </tr>
                <tr>
                  <td className="border-2 border-neutral-500 px-4 py-1 text-left align-middle">
                    Peralatan
                  </td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle">
                    {convertIDRCurrency(saldoPeralatan)}
                  </td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                </tr>
                <tr>
                  <td className="border-2 border-neutral-500 px-4 py-1 text-left align-middle">
                    Akumulasi Penyusutan Peralatan
                  </td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle">
                    {convertIDRCurrency(saldoAkumulasiPenyusutanPeralatan)}
                  </td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                </tr>
                <tr>
                  <td className="border-2 border-neutral-500 px-4 py-1 text-left align-middle"></td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle">
                    {convertIDRCurrency(saldoTotalPeralatan)}
                  </td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                </tr>
                <tr>
                  <td colSpan={4} className="p-3"></td>
                </tr>
                <tr>
                  <td className="border-2 border-neutral-500 px-4 py-1 text-left align-middle">
                    Kendaraan
                  </td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle">
                    {convertIDRCurrency(saldoKendaraan)}
                  </td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                </tr>
                <tr>
                  <td className="border-2 border-neutral-500 px-4 py-1 text-left align-middle">
                    Akumulasi Penyusutan Kendaraan
                  </td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle">
                    {convertIDRCurrency(saldoAkumulasiPenyusutanKendaraan)}
                  </td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                </tr>
                <tr>
                  <td className="border-2 border-neutral-500 px-4 py-1 text-left align-middle"></td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle">
                    {convertIDRCurrency(saldoTotalKendaraan)}
                  </td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                </tr>
                <tr>
                  <td colSpan={4} className="p-3"></td>
                </tr>
                <tr>
                  <td className="border-2 border-neutral-500 px-4 py-1 text-left align-middle">
                    Total Aktiva Tetap
                  </td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle">
                    {convertIDRCurrency(saldoTotalAktivaTetap)}
                  </td>
                </tr>
                <tr className="border-2 border-neutral-500 bg-amber-300">
                  <td colSpan={3} className="px-4 py-1 text-left font-bold">
                    Total Aktiva
                  </td>
                  <td
                    colSpan={1}
                    className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle">
                    {convertIDRCurrency(saldoTotalAktiva)}
                  </td>
                </tr>
                {/* Kewajiban Lancar */}
                <tr className="border-2 border-neutral-500 bg-neutral-200">
                  <th colSpan={4} className="px-4 py-1 text-left">
                    Kewajiban Lancar
                  </th>
                </tr>
                <tr>
                  <td className="border-2 border-neutral-500 px-4 py-1 text-left align-middle">
                    Utang Usaha
                  </td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle">
                    {convertIDRCurrency(saldoUtangUsaha)}
                  </td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                </tr>
                {/* Keajiban Jangka Panjang */}
                <tr className="border-2 border-neutral-500 bg-neutral-200">
                  <th colSpan={4} className="px-4 py-1 text-left">
                    Kewajiban Jangka Panjang
                  </th>
                </tr>
                <tr>
                  <td className="border-2 border-neutral-500 px-4 py-1 text-left align-middle">
                    Utang Bank
                  </td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle">
                    {convertIDRCurrency(saldoUtangBank)}
                  </td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                </tr>
                <tr>
                  <td colSpan={4} className="p-3"></td>
                </tr>
                <tr>
                  <td className="border-2 border-neutral-500 px-4 py-1 text-left align-middle">
                    Total Kewajiban
                  </td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle">
                    {convertIDRCurrency(saldoTotalKewajiban)}
                  </td>
                </tr>
                {/* Modal */}
                <tr className="border-2 border-neutral-500 bg-neutral-200">
                  <th colSpan={4} className="px-4 py-1 text-left">
                    Modal
                  </th>
                </tr>
                <tr>
                  <td className="border-2 border-neutral-500 px-4 py-1 text-left align-middle">
                    Modal Pemilik
                  </td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle"></td>
                  <td className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle">
                    {convertIDRCurrency(saldoModalPemilik)}
                  </td>
                </tr>
                <tr className="border-2 border-neutral-500 bg-amber-300">
                  <td colSpan={3} className="px-4 py-1 text-left font-bold">
                    Total Kewajiban dan Modal
                  </td>
                  <td
                    colSpan={1}
                    className="w-2/12 border-2 border-neutral-500 px-4 py-1 text-right align-middle">
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
