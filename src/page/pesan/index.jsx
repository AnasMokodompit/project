import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Input } from "../../componet/input";
import axios from "axios";

import ChevronLeft from "../../Asset/icons/untitled-ui-icons/line/components/ChevronLeft";
import ChevronRight from "../../Asset/icons/untitled-ui-icons/line/components/ChevronRight";
import Delete from "../../Asset/icons/untitled-ui-icons/line/components/Delete";
import Search from "../../Asset/icons/untitled-ui-icons/line/components/SearchLg";

export const Pesan = () => {
  const [pesanData, setPesanData] = useState();
  const [pesanID, setPesanID] = useState();
  const [search, setSearch] = useState();
  const [page, setPage] = useState(1);

  const { refetch } = useQuery({
    queryKey: ["pesan"],
    queryFn: async () => {
      return await axios.get(`${process.env.REACT_APP_BASE_API}/contactUs`, {
        params: {
          search,
          page,
          row: 8,
        },
      });
    },
    onSuccess: (data) => {
      // console.log(data.data.data);
      setPesanData(data.data.data);
    },
  });

  const { mutate: deletePesan } = useMutation({
    mutationFn: async () => {
      return await axios.delete(
        `${process.env.REACT_APP_BASE_API}/contactUs/${pesanID}`,
      );
    },
    onSuccess: (data) => {
      console.log(data.data.data);
      setPesanID();
      refetch();
    },
  });

  useEffect(() => {
    refetch();
  }, [search, page]);

  return (
    <section className="font-archivo">
      <div className="flex flex-col gap-4">
        <div>
          <h1 className="text-2xl font-bold">Pesan</h1>
        </div>
        <div className="flex justify-end gap-4 rounded-lg border-2 border-neutral-500 bg-neutral-100 p-3">
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
        <div className="flex flex-col gap-4">
          <div className="flex w-full items-center justify-end gap-4 text-xs">
            <button
              onClick={() => {
                setPage(page - 1);
              }}
              disabled={page <= 1}
              className="rounded-lg bg-amber-300 p-2 disabled:bg-amber-200">
              <ChevronLeft />
            </button>
            <div className="w-4 text-center">{page}</div>
            <button
              onClick={() => {
                setPage(page + 1);
              }}
              disabled={pesanData?.length < 8}
              className="rounded-lg bg-amber-300 p-2 disabled:bg-amber-200">
              <ChevronRight />
            </button>
          </div>
          <table className="w-full border-collapse border-2 border-neutral-500 text-sm">
            <thead className="bg-amber-300">
              <tr>
                <th className="w-0 px-3 py-2 text-center">No.</th>
                <th className="w-3/12 px-3 py-2 text-center">Nama</th>
                <th className="w-3/12 px-3 py-2 text-center">Email</th>
                <th className="w-6/12 px-3 py-2 text-center">Pesan</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {!!pesanData &&
                pesanData.map((value, index) => {
                  const { id, email, nama_lengkap: namaLengkap, pesan } = value;
                  return (
                    <tr key={id}>
                      <td className="border-2 border-neutral-500 p-2 text-center">
                        {index + 1}.
                      </td>
                      <td className="border-2 border-neutral-500 p-2">
                        {namaLengkap}
                      </td>
                      <td className="border-2 border-neutral-500 p-2">
                        {email}
                      </td>
                      <td className="border-2 border-neutral-500 p-2">
                        {pesan}
                      </td>
                      <td className="border-2 border-neutral-500 p-2">
                        <button
                          onClick={() => {
                            setPesanID(id);
                            deletePesan();
                          }}
                          className="h-8 w-8 flex-shrink-0 items-center gap-2 overflow-hidden rounded-lg border-2 border-red-500 bg-red-500 p-2 text-white transition-colors">
                          <Delete />
                        </button>
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
};
