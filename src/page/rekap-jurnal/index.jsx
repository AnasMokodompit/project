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

const Akun = [
  {
    namaAkunTransaksi: "Kas",
    tipe: "Debit",
  },
  {
    namaAkunTransaksi: "Piutang Usaha",
    tipe: "Debit",
  },
  {
    namaAkunTransaksi: "Persediaan Barang Jadi",
    tipe: "Debit",
  },
  {
    namaAkunTransaksi: "Persediaan Bahan Baku",
    tipe: "Debit",
  },
  {
    namaAkunTransaksi: "Persediaan Bahan Pembantu",
    tipe: "Debit",
  },
  {
    namaAkunTransaksi: "Tanah",
    tipe: "Debit",
  },
  {
    namaAkunTransaksi: "Gedung",
    tipe: "Debit",
  },
  {
    namaAkunTransaksi: "Akumulasi Penyusutan Gedung",
    tipe: "Kredit",
  },
  {
    namaAkunTransaksi: "Mesin",
    tipe: "Debit",
  },
  {
    namaAkunTransaksi: "Akumulasi Penyusutan Mesin",
    tipe: "Kredit",
  },
  {
    namaAkunTransaksi: "Peralatan",
    tipe: "Debit",
  },
  {
    namaAkunTransaksi: "Akumulasi Penyusutan Peralatan",
    tipe: "Kredit",
  },
  {
    namaAkunTransaksi: "Kendaraan",
    tipe: "Debit",
  },
  {
    namaAkunTransaksi: "Akumulasi Penyusutan Kendaraan",
    tipe: "Kredit",
  },
  {
    namaAkunTransaksi: "Utang Usaha",
    tipe: "Kredit",
  },
  {
    namaAkunTransaksi: "Utang Bank",
    tipe: "Kredit",
  },
  {
    namaAkunTransaksi: "Modal Pemilik",
    tipe: "Kredit",
  },
  {
    namaAkunTransaksi: "Pendapatan",
    tipe: "Kredit",
  },
  {
    namaAkunTransaksi: "Biaya Bahan Baku",
    tipe: "Debit",
  },
  {
    namaAkunTransaksi: "Upah Pekerja",
    tipe: "Debit",
  },
  {
    namaAkunTransaksi: "Biaya Bahan Pembantu",
    tipe: "Debit",
  },
  {
    namaAkunTransaksi: "Biaya Transportasi",
    tipe: "Debit",
  },
  {
    namaAkunTransaksi: "Biaya Gaji Pegawai",
    tipe: "Debit",
  },
  {
    namaAkunTransaksi: "Biaya Perlengkapan",
    tipe: "Debit",
  },
  {
    namaAkunTransaksi: "Biaya Sewa",
    tipe: "Debit",
  },
  {
    namaAkunTransaksi: "Biaya Telepon",
    tipe: "Debit",
  },
  {
    namaAkunTransaksi: "Biaya Listrik",
    tipe: "Debit",
  },
  {
    namaAkunTransaksi: "Biaya ATM/ATK",
    tipe: "Debit",
  },
  {
    namaAkunTransaksi: "Biaya Lain-Lain",
    tipe: "Debit",
  },
  {
    namaAkunTransaksi: "Biaya Penyusutan Peralatan",
    tipe: "Debit",
  },
  {
    namaAkunTransaksi: "Biaya Penyusutan Mesin",
    tipe: "Debit",
  },
  {
    namaAkunTransaksi: "Biaya Penyusutan Kendaraan",
    tipe: "Debit",
  },
  {
    namaAkunTransaksi: "Biaya Penyusutan Gedung",
    tipe: "Debit",
  },
  {
    namaAkunTransaksi: "Pendapatan Bunga",
    tipe: "Kredit",
  },
  {
    namaAkunTransaksi: "Beban Bunga",
    tipe: "Debit",
  },
  {
    namaAkunTransaksi: "Piutang",
    tipe: "Debit",
  },
];

export const RekapJurnal = () => {
  const [tanggalAwal, setTanggalAwal] = useState();
  const [tanggalAkhir, setTanggalAkhir] = useState();
  const [rekapJurnalData, setRekapJurnalData] = useState();
  const refRekapJurnal = useRef();

  const handlePrintRekapJurnal = useReactToPrint({
    content: () => refRekapJurnal.current,
    documentTitle: `Rekap Jurnal`,
    bodyClass: "bg-white",
  });

  const { refetch } = useQuery({
    queryKey: ["rekap-jurnal", tanggalAwal, tanggalAkhir],
    queryFn: () => {
      if (!!tanggalAwal && !!tanggalAkhir) {
        let tanggalAkhirModified = new Date(tanggalAkhir);
        tanggalAkhirModified.setHours(23, 59, 59);
        return axios.get(
          `${process.env.REACT_APP_BASE_API}/saldoAkunTransaksi/rekapJurnal`,
          {
            params: {
              firstDate: tanggalAwal,
              lastDate: tanggalAkhirModified,
            },
          },
        );
      } else {
        return axios.get(
          `${process.env.REACT_APP_BASE_API}/saldoAkunTransaksi/rekapJurnal`,
        );
      }
    },
    onSuccess: (data) => {
      const Array2 = data.data.data;
      const Combine = combineArrays(Akun, Array2);
      setRekapJurnalData(Combine);
    },
  });

  useEffect(() => {
    refetch();
  }, [tanggalAwal, tanggalAkhir]);

  return (
    <section className="font-archivo text-neutral-800">
      <div className="flex flex-col gap-4">
        <div>
          <h1 className="text-2xl font-bold">Rekap Jurnal</h1>
        </div>
        <div className="flex justify-between gap-4 rounded-lg border-2 border-neutral-500 bg-neutral-100 p-3">
          <div className="flex items-center gap-2 ">
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
                    disabled={{ after: new Date() }}
                  />
                </PopoverContent>
              </Popover>
            </div>
            <Minus className="text-neutral-800" />
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
                    disabled={{ after: new Date() }}
                  />
                </PopoverContent>
              </Popover>
            </div>
            <button
              onClick={handlePrintRekapJurnal}
              className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg border-2 border-neutral-500 bg-amber-300 p-2">
              <Printer />
            </button>
          </div>
        </div>
        <div>
          <table className="w-full border-collapse border-2 border-neutral-500 text-sm">
            <thead className="bg-amber-300">
              <tr>
                <th
                  rowSpan={2}
                  className="border-2 border-neutral-500 px-3 py-2 text-center">
                  Nama Akun
                </th>
                <th
                  colSpan={2}
                  className="border-2 border-neutral-500 px-3 py-2 text-center">
                  Saldo
                </th>
              </tr>
              <tr>
                <th className="border-2 border-neutral-500 px-3 py-2 text-center">
                  Debit
                </th>
                <th className="border-2 border-neutral-500 px-3 py-2 text-center">
                  Kredit
                </th>
              </tr>
            </thead>
            <tbody>
              {!!rekapJurnalData &&
                rekapJurnalData.map((data) => {
                  const {
                    namaAkunTransaksi,
                    saldo: { debit, kredit },
                  } = data;

                  return (
                    <tr>
                      <td className="border-2 border-neutral-500 px-3 py-2">
                        {namaAkunTransaksi}
                      </td>
                      <td className="border-2 border-neutral-500 px-3 py-2 text-right">
                        {debit !== 0 ? convertIDRCurrency(debit) : ""}
                      </td>
                      <td className="border-2 border-neutral-500 px-3 py-2 text-right">
                        {kredit !== 0 ? convertIDRCurrency(kredit) : ""}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
        <div style={{ display: "none" }}>
          <DokumenRekapJurnal
            ref={refRekapJurnal}
            tanggalAwal={tanggalAwal}
            tanggalAkhir={tanggalAkhir}
          />
        </div>
      </div>
    </section>
  );
};

const DokumenRekapJurnal = forwardRef((props, ref) => {
  const tanggalAwal = props?.tanggalAwal;
  const tanggalAkhir = props?.tanggalAkhir;
  const [rekapJurnalData, setRekapJurnalData] = useState();

  const { refecth } = useQuery({
    queryKey: ["rekap-jurnal", tanggalAwal, tanggalAkhir],
    queryFn: () => {
      if (!!tanggalAwal && !!tanggalAkhir) {
        let tanggalAkhirModified = new Date(tanggalAkhir);
        tanggalAkhirModified.setHours(23, 59, 59);
        return axios.get(
          `${process.env.REACT_APP_BASE_API}/saldoAkunTransaksi/rekapJurnal`,
          {
            params: {
              firstDate: tanggalAwal,
              lastDate: tanggalAkhirModified,
            },
          },
        );
      } else {
        return axios.get(
          `${process.env.REACT_APP_BASE_API}/saldoAkunTransaksi/rekapJurnal`,
        );
      }
    },
    onSuccess: (data) => {
      const Array2 = data.data.data;
      const Combine = combineArrays(Akun, Array2);
      setRekapJurnalData(Combine);
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

  return (
    <section ref={ref}>
      <style>{setStyles()}</style>
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-archivo text-xl font-bold">Rekap Jurnal</p>
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
          <table className="w-full border-collapse border-2 border-neutral-500 text-sm">
            <thead className="bg-amber-300">
              <tr>
                <th
                  rowSpan={2}
                  className="border-2 border-neutral-500 px-3 py-2 text-center">
                  Nama Akun
                </th>
                <th
                  colSpan={2}
                  className="border-2 border-neutral-500 px-3 py-2 text-center">
                  Saldo
                </th>
              </tr>
              <tr>
                <th className="border-2 border-neutral-500 px-3 py-2 text-center">
                  Debit
                </th>
                <th className="border-2 border-neutral-500 px-3 py-2 text-center">
                  Kredit
                </th>
              </tr>
            </thead>
            <tbody>
              {!!rekapJurnalData &&
                rekapJurnalData.map((data) => {
                  const {
                    namaAkunTransaksi,
                    saldo: { debit, kredit },
                  } = data;

                  return (
                    <tr>
                      <td className="border-2 border-neutral-500 px-3 py-2">
                        {namaAkunTransaksi}
                      </td>
                      <td className="border-2 border-neutral-500 px-3 py-2 text-right">
                        {debit !== 0 ? convertIDRCurrency(debit) : ""}
                      </td>
                      <td className="border-2 border-neutral-500 px-3 py-2 text-right">
                        {kredit !== 0 ? convertIDRCurrency(kredit) : ""}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
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

function combineArrays(Array1, Array2) {
  const Array3 = [];

  for (const item1 of Array1) {
    const { namaAkunTransaksi, tipe } = item1;
    const { saldo: existingSaldo = { debit: 0, kredit: 0 } } =
      Array3.find((item) => item.namaAkunTransaksi === namaAkunTransaksi) || {};

    const { saldo = 0 } =
      Array2.find((item) => item.namaAkunTransaksi === namaAkunTransaksi) || {};

    if (tipe === "Debit") {
      existingSaldo.debit += saldo;
    } else if (tipe === "Kredit") {
      existingSaldo.kredit += saldo;
    }

    const newItem = {
      namaAkunTransaksi,
      saldo: existingSaldo,
    };

    const existingItemIndex = Array3.findIndex(
      (item) => item.namaAkunTransaksi === namaAkunTransaksi,
    );

    if (existingItemIndex !== -1) {
      Array3[existingItemIndex] = newItem;
    } else {
      Array3.push(newItem);
    }
  }

  // Remove items with zero balances
  const FilteredArray3 = Array3.filter(
    (item) => item.saldo.debit !== 0 || item.saldo.kredit !== 0,
  );

  return FilteredArray3;
}
