import { useState } from "react";
import style from "./ContactUs.module.css";
import axios from "axios";

import MarkerPin01 from "../../Asset/icons/untitled-ui-icons/line/components/MarkerPin01";
import Phone from "../../Asset/icons/untitled-ui-icons/line/components/Phone";
import Mail01 from "../../Asset/icons/untitled-ui-icons/line/components/Mail01";

function Contact() {
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
        setNamaLengkap("");
        setEmail("");
        setPesan("");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div id="contactus" className="flex flex-col gap-8 font-archivo">
      <div>
        <p className="font-open-sans text-2xl font-bold">Kontak Kami</p>
        <hr className="rounded-lg border-8 border-amber-300" />
      </div>
      <div>
        <p>
          Anda dapat menghubungi kami disetiap saat, untuk mendapatkan informasi
          - informasi yagn dibutuhkan. Staf kami akan memberi bantuan sesuai
          dengan yang anda butuhkan.
        </p>
      </div>
      <div className="grid grid-cols-3 items-center justify-center gap-8 px-32">
        <div className="col-span-1 flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <MarkerPin01 className="text-xl" />
            <div>
              <p className="font-bold">Alamat</p>
              <p>Jl. Raya Leilem Kabupaten Minahasa</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Phone className="text-xl" />
            <div>
              <p className="font-bold">Telepon</p>
              <p>+6281340096717</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Mail01 className="text-xl" />
            <div>
              <p className="font-bold">E-Mail</p>
              <p>deisy@gmail.com</p>
            </div>
          </div>
        </div>
        <div className="col-span-2 flex flex-col gap-4">
          {/* <form action="" id={style.contactForm} onSubmit={hendleSumbitContactUs}> */}
          <p className="text-lg font-bold">Kirim Pesan</p>
          <div className="flex flex-col">
            <p>Nama Lengkap</p>
            <input
              className="rounded-lg border-2 border-neutral-400 p-2"
              type="text"
              required="true"
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
              required="true"
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

          <div className="flex items-center justify-center rounded-lg bg-amber-300 p-2 text-lg">
            <input
              type="submit"
              value="Kirim"
              onClick={() => hendleSumbitContactUs()}
            />
          </div>
          {/* </form> */}
        </div>
      </div>
    </div>
  );
}

export default Contact;
