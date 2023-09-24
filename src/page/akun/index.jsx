// Packages
import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import axios from "axios";

// Assets
import Delete from "../../Asset/icons/untitled-ui-icons/line/components/Delete";
import Edit05 from "../../Asset/icons/untitled-ui-icons/line/components/Edit05";
import PlusCircle from "../../Asset/icons/untitled-ui-icons/line/components/PlusCircle";

// Components
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
import { Popover, PopoverContent, PopoverTrigger } from "../../componet/popover";

export const Akun = () => {
  const form = useForm({
    defaultValues: {
      nama: "",
    },
  });

  const formCreate = useForm({
    defaultValues: {
      nama: "",
    },
  });

  const [namaAkunTransaksiData, setNamaAkunTransaksiData] = useState();
  const [namaAkunTransaksiID, setNamaAkunTransaksiID] = useState();

  const { refetch } = useQuery({
    queryKey: ["jenis-transaksi"],
    queryFn: () => {
      return axios.get(`${process.env.REACT_APP_BASE_API}/namaAkunTransaksi`);
    },
    onSuccess: (res) => {
      setNamaAkunTransaksiData(res.data.data);
    },
  });

  const { mutate: createNamaAkunTransaksi } = useMutation({
    mutationFn: async (data) => {
      await axios.post(`${process.env.REACT_APP_BASE_API}/namaAkunTransaksi`, data);
    },
    onSuccess: () => {
      refetch();
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

  const { mutate: updateJenisTransaksi } = useMutation({
    mutationFn: async (data) => {
      await axios.patch(
        `${process.env.REACT_APP_BASE_API}/namaAkunTransaksi/${namaAkunTransaksiID}`,
        data,
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

  const onSubmitUpdate = form.handleSubmit((data) => {
    updateJenisTransaksi(data);
  });

  const onSubmitCreate = formCreate.handleSubmit((data) => {
    createNamaAkunTransaksi(data);
    // console.log(data);
  });

  return (
    <div className="flex flex-col gap-8">
      <div>
        <p className="text-2xl font-bold text-black">Akun</p>
      </div>
      <div className="flex flex-col gap-2">
        <div>
          <Popover>
            <PopoverTrigger>
              <button className="flex items-center gap-2 rounded-lg bg-amber-300 p-2">
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
                        <FormLabel className="font-archivo">Nama Akun Transaksi</FormLabel>
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
          </Popover>
        </div>
        <table className="w-full table-auto border-collapse overflow-hidden rounded-lg">
          <thead>
            <tr className="border-b-2 border-neutral-500 bg-amber-300">
              <th className="w-0 px-4 py-3 text-center font-semibold">No.</th>
              <th className="px-4 py-3 text-center font-semibold">Kode</th>
              <th className="px-4 py-3 text-center font-semibold">Nama Akun Transaksi</th>
              <th className="px-4 py-2 text-center font-semibold"></th>
            </tr>
          </thead>
          <tbody>
            {!!namaAkunTransaksiData &&
              namaAkunTransaksiData.map((item, index) => {
                const { id, kode, nama } = item;

                return (
                  <tr key={id} className="border-b even:bg-neutral-50">
                    <td className="p-3 text-center">{index + 1}.</td>
                    <td className="w-0 p-2">{kode}</td>
                    <td className="p-2">{nama}</td>
                    <td className="p-2 text-center">
                      <div className="flex items-center justify-end gap-4">
                        <Popover>
                          <PopoverTrigger>
                            <button className="flex items-center gap-2 rounded-lg bg-neutral-500 p-2 text-white">
                              <Edit05 className="flex-shrink-0 text-sm text-white" />
                              <p className="text-sm">Edit</p>
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
                                      <FormLabel className="font-archivo">Kode</FormLabel>
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
                        </Popover>
                        <button
                          onClick={() => {
                            setNamaAkunTransaksiID(id);
                            deleteNamaAkunTransaksi();
                          }}
                          className="flex items-center gap-2 rounded-lg bg-red-500 p-2 text-white">
                          <Delete className="flex-shrink-0 text-sm text-white" />
                          <p className="text-sm">Hapus</p>
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
