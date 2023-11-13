import { useState, Fragment } from "react";
import { useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import ReactStars from "react-rating-stars-component";
import axios from "axios";

import { saveOrder } from "../../config/actions/OrderAction";
import { Dialog, DialogContent, DialogTrigger } from "../../componet/dialog";
import { ScrollArea } from "../../componet/scroll-area";

import ShoppingCart02 from "../../Asset/icons/untitled-ui-icons/line/components/ShoppingCart02";
import Plus from "../../Asset/icons/untitled-ui-icons/line/components/Plus";
import User from "../../Asset/icons/untitled-ui-icons/line/components/User01";

const Product = () => {
  const [idProduk, setIdProduk] = useState();
  const [dataProduk, setDataProduk] = useState([]);
  const [dataProdukByID, setDataProdukByID] = useState([]);
  const [jumlahBintang, setJumlahBintang] = useState(0);
  const [indexImageProduk, setIndexImageProduct] = useState(0);
  const dispatch = useDispatch();

  const {} = useQuery({
    queryKey: ["produk", idProduk],
    queryFn: async () => {
      return await axios.get(
        `${process.env.REACT_APP_BASE_API}/products/${idProduk}`,
      );
    },
    onSuccess: (data) => {
      setDataProdukByID([data.data.data]);

      const dataReview = data.data.data.reviewevUserProduct;
      let countStart = 0;
      dataReview.map((data) => {
        countStart += data.bintang;
      });
      setJumlahBintang(countStart);
    },
  });

  const {} = useQuery({
    queryKey: ["produk"],
    queryFn: async () => {
      return await axios.get(`${process.env.REACT_APP_BASE_API}/products`);
    },
    onSuccess: (data) => {
      setDataProduk(data.data.data);
    },
  });

  const handleKeranjangPembelian = (id) => {
    axios(`${process.env.REACT_APP_BASE_API}/products/${id}`)
      .then((res) => {
        const option = {
          id: res.data.data.id,
          url_image: res.data.data?.product_images[0]?.url_image,
          name: res.data.data.name,
          tipe: res.data.data.categories.name,
          jumlah: 1,
          harga: res.data.data.harga,
          jumlahHarga: res.data.data.harga,
        };

        if (res.data.data.IsPermeter == true) {
          option.jumlah_meter = 1;
        }

        dispatch(saveOrder(option));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="flex flex-col gap-12">
      <div
        id="product"
        className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 lg:gap-6">
        {!!dataProduk &&
          dataProduk.map((data, index) => {
            const {
              id,
              name: nama,
              categories: { name: kategori },
              harga,
              Deskripsi_produk: deskripsi,
              ukuran,
              product_images: gambarProduk,
            } = data;
            return (
              <div
                key={id}
                className="flex flex-col gap-2 rounded-lg shadow-lg">
                <img
                  className="aspect-square h-2/3 rounded-t-lg object-cover"
                  src={gambarProduk[0]?.url_image}
                  alt="Gambar Produk"
                />
                <div className="flex w-full flex-col gap-4 self-start px-3 pb-3">
                  <div className="flex flex-col gap-2">
                    <div>
                      <p className="truncate text-base lg:text-lg">{nama}</p>
                      <p className="text-xs font-light leading-none md:text-sm">
                        {kategori}
                      </p>
                    </div>
                    <p className="text-sm font-normal">
                      {convertIDRCurrency(harga)}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Dialog
                      onOpenChange={(isOpen) => {
                        if (isOpen === false) {
                          setIndexImageProduct(0);
                        }
                      }}>
                      <DialogTrigger asChild>
                        <button
                          className="flex w-full items-center justify-center gap-2 rounded-lg bg-amber-300 px-6 py-2 text-sm text-black lg:text-base"
                          onClick={() => setIdProduk(id)}>
                          Lihat Produk
                        </button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl">
                        {dataProdukByID.length !== 0 &&
                          dataProdukByID.map((data) => {
                            const {
                              name: nama,
                              categories: { name: kategori },
                              harga,
                              Deskripsi_produk: deskripsi,
                              ukuran,
                              product_images: gambarProduk,
                              reviewevUserProduct: reviewer,
                            } = data;
                            return (
                              <div className="flex flex-col gap-4 px-0 py-4 font-archivo md:flex-row md:px-4">
                                <div className="flex flex-shrink-0 flex-col gap-1">
                                  <div>
                                    <a
                                      href={
                                        gambarProduk[indexImageProduk].url_image
                                      }
                                      target="_blank"
                                      rel="noreferrer">
                                      <img
                                        src={
                                          gambarProduk.length === 1
                                            ? gambarProduk[0].url_image
                                            : gambarProduk[indexImageProduk]
                                                .url_image
                                        }
                                        alt=""
                                        className="h-40 w-full rounded-lg object-cover sm:h-60 md:aspect-square md:h-80 lg:h-auto lg:w-80"
                                      />
                                    </a>
                                  </div>
                                  {gambarProduk.length !== 0 && (
                                    <div className="flex w-80 gap-2 overflow-hidden overflow-x-auto py-2">
                                      {gambarProduk.map((data, index) => {
                                        const { url_image: urlImage } = data;
                                        return (
                                          <button
                                            className="flex-shrink-0"
                                            onClick={() =>
                                              setIndexImageProduct(index)
                                            }>
                                            <img
                                              src={urlImage}
                                              alt="Gambar Produk"
                                              className="hover aspect-square w-10 cursor-pointer rounded-lg object-cover outline outline-2 outline-transparent transition-all hover:outline-black sm:w-12 md:w-14"
                                            />
                                          </button>
                                        );
                                      })}
                                    </div>
                                  )}
                                </div>
                                <div className="flex h-[35dvh] w-full flex-col gap-3 overflow-hidden overflow-y-auto md:h-auto">
                                  <div>
                                    <p className="text-lg font-bold">{nama}</p>
                                    <p className="text-xs">{kategori}</p>
                                    <div className="flex items-center gap-1">
                                      <div className="flex items-center gap-1">
                                        <ReactStars
                                          edit={false}
                                          count={5}
                                          size={18}
                                          value={
                                            jumlahBintang
                                              ? jumlahBintang / reviewer.length
                                              : 0
                                          }
                                          isHalf={true}
                                          activeColor="#ffd700"
                                        />
                                        <p className="font-archivo text-xs">
                                          {reviewer.length} Penilai
                                        </p>
                                      </div>
                                    </div>
                                    <p className="text-lg font-bold">
                                      {convertIDRCurrency(harga)}
                                    </p>
                                  </div>
                                  <div className="flex flex-col gap-1">
                                    <div>
                                      <p className="text-sm font-semibold">
                                        Keterangan
                                      </p>
                                    </div>
                                    <div>
                                      <p className="text-sm">{ukuran}</p>
                                      <p className="text-sm">{deskripsi}</p>
                                    </div>
                                  </div>
                                  <div className="flex flex-col gap-1">
                                    <div>
                                      <p className="text-sm font-semibold">
                                        Penilaian
                                      </p>
                                    </div>
                                    <div className="flex flex-col gap-2 rounded-lg">
                                      <ScrollArea className="h-40">
                                        <div className="flex flex-col gap-3 pl-0 pr-6">
                                          {reviewer.length !== 0 ? (
                                            reviewer.map((data) => {
                                              const {
                                                bintang,
                                                updated_at: tanggalReview,
                                                komentar,
                                                users: { name: namaReviewer },
                                              } = data;

                                              const inputDate = new Date(
                                                tanggalReview,
                                              );

                                              const options = {
                                                year: "numeric",
                                                month: "long",
                                                day: "numeric",
                                              };

                                              const tanggalReviewModified =
                                                inputDate.toLocaleString(
                                                  "id-ID",
                                                  options,
                                                );

                                              return (
                                                <Fragment>
                                                  <div className="flex gap-2">
                                                    <div>
                                                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-300">
                                                        <User className="flex-shrink-0 text-lg text-white" />
                                                      </div>
                                                    </div>
                                                    <div>
                                                      <div className="flex justify-between">
                                                        <p className="text-sm">
                                                          {namaReviewer}
                                                        </p>
                                                        <p className="text-xs">
                                                          {
                                                            tanggalReviewModified
                                                          }
                                                        </p>
                                                      </div>
                                                      <ReactStars
                                                        edit={false}
                                                        count={5}
                                                        size={14}
                                                        value={bintang}
                                                        activeColor="#fcd34d"
                                                      />
                                                      <p className="text-sm font-light">
                                                        {komentar}
                                                      </p>
                                                    </div>
                                                  </div>
                                                </Fragment>
                                              );
                                            })
                                          ) : (
                                            <p className="text-sm">
                                              Belum ada penilaian
                                            </p>
                                          )}
                                        </div>
                                      </ScrollArea>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                      </DialogContent>
                    </Dialog>
                    <button
                      onClick={() => `${handleKeranjangPembelian(data.id)}`}
                      className="flex items-center justify-center rounded-lg border-2 border-amber-300 p-2 text-black">
                      <ShoppingCart02 className="flex-shrink-0 text-base" />
                      <sup className="flex-shrink-0">
                        <Plus className="flex-shrink-0" />
                      </sup>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Product;

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
