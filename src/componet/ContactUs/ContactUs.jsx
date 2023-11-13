import { useState } from "react";
import axios from "axios";

import MarkerPin01 from "../../Asset/icons/untitled-ui-icons/line/components/MarkerPin01";
import Phone from "../../Asset/icons/untitled-ui-icons/line/components/Phone";
import Mail01 from "../../Asset/icons/untitled-ui-icons/line/components/Mail01";

const Contact = () => {
  const [namaLengkap, setNamaLengkap] = useState("");
  const [email, setEmail] = useState("");
  const [pesan, setPesan] = useState("");

  const hendleSumbitContactUs = (e) => {
    // e.preventDefault()

    const data = {
      namaLengkap: namaLengkap,
      email: email,
      pesan: pesan,
    };

    axios
      .post(`${process.env.REACT_APP_BASE_API}/contactUs`, data)
      .then(() => {
        alert("Pesan Berhasil Dikirim");
        setNamaLengkap("");
        setEmail("");
        setPesan("");
      })
      .catch((err) => {
        alert("Pesan Gagal Dikirim");
        console.log(err);
      });
  };

  return (
    <div
      id="contactus"
      className="flex flex-col gap-4 px-6 font-archivo lg:gap-8 lg:px-0">
      <div>
        <h2 className="font-open-sans text-lg font-bold md:text-xl lg:text-2xl">
          Kontak Kami
        </h2>
        <hr className="rounded-lg border-8 border-amber-300" />
      </div>
      <div>
        <p>
          Anda dapat menghubungi kami disetiap saat, untuk mendapatkan informasi
          - informasi yang dibutuhkan. Staf kami akan memberi bantuan sesuai
          dengan yang anda butuhkan.
        </p>
      </div>
      <div className="grid w-full gap-8 lg:grid-cols-3">
        <div className="flex flex-col gap-4 lg:col-span-1">
          <div className="flex items-center gap-4">
            <MarkerPin01 className="flex-shrink-0 text-xl" />
            <div>
              <p className="font-bold">Alamat</p>
              <p>
                Jl. Perkebunan Talongka, Desa Leilem, Kec. Sonder,Kab.
                Minahasa-Sulut
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Phone className="flex-shrink-0 text-xl" />
            <div>
              <p className="font-bold">Telepon</p>
              <p>+6281340096717</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Mail01 className="flex-shrink-0 text-xl" />
            <div>
              <p className="font-bold">E-Mail</p>
              <p>deisy@gmail.com</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 lg:col-span-2">
          <p className="text-lg font-bold md:text-xl lg:text-2xl">
            Kirim Pesan
          </p>
          <div className="flex flex-col">
            <p>Nama Lengkap</p>
            <input
              className="rounded-lg border-2 border-neutral-400 p-2"
              type="text"
              required
              name=""
              value={namaLengkap}
              onChange={(e) => setNamaLengkap(e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <p>Email</p>
            <input
              className="rounded-lg border-2 border-neutral-400 p-2"
              type="text"
              required
              name=""
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <p>Pesan</p>
            <textarea
              className="rounded-lg border-2 border-neutral-400 p-2"
              required="true"
              name=""
              value={pesan}
              onChange={(e) => setPesan(e.target.value)}></textarea>
          </div>
          <input
            className="flex cursor-pointer items-center justify-center rounded-lg bg-amber-300 p-2 text-lg"
            type="submit"
            value="Kirim"
            onClick={() => hendleSumbitContactUs()}
          />
          {/* </form> */}
        </div>
      </div>
    </div>
  );
};

export default Contact;
