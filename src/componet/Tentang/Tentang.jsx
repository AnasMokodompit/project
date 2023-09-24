import style from "./Tentang.module.css";
import img from "../../Asset/Picture11.jpg";

function Tentang() {
  return (
    <div id="tentang" className=" flex flex-col gap-8">
      <div>
        <p className="font-open-sans text-2xl font-bold">Tentang Kami</p>
        <hr className="rounded-lg border-8 border-amber-300" />
      </div>
      <div className="flex gap-8">
        <img className="rounded-lg" src={img} alt="" />
        <div className="flex flex-col justify-center gap-4">
          <div className="flex flex-col gap-2 text-justify">
            <p>
              CV. Talongka Jaya berlokasi di Desa Leilem Kecamatan Sonder
              Kabupaten Minahasa yang dikenal dengan Desa Sentra Industri dan
              berpengalaman memproduksi furniture. CV. Talongka Jaya berdiri
              sekitar tahun 1980 dan masih termasuk kategori industri kecil.
              Usaha CV Talongka Jaya berawal dari orderan kerabat dekat, antara
              lain saudara dan kenalan untuk membuat perabot rumah tangga.
              Perabot yang dipesan dikerjakan sendiri oleh pemilik usaha.
            </p>
            <p>
              Keahlian dalam pembuatan mebel ini diwariskan dari pemilik usaha
              ke anaknya yang kemudian meneruskan pengelolaan bisnis tersebut
              sekaligus berganti manajemen baru di tahun 2010. Sejak saat itu,
              banyak penawaran datang dari berbagai macam instansi baik swasta
              maupun pemerintah sehingga usaha pembuatan furniture CV. Talongka
              Jaya semakin berkembang dan dikenal. Tempat produksi yang terbatas
              tidak cukup lagi menampung jumlah orderan dan permintaan konsumen
              yang terus meningkat sehingga pada tahun 2017 pemilik usaha
              akhirnya menambah lahan untuk memperluas area produksi. Penambahan
              area produksi tersebut selesai pada tahun 2020 sekaligus
              pendridian CV yang diberi nama “Talongka Jaya” dan bertindak
              sebagai Direktur adalah Bapak Michael Stanley Kilis. Perusahaan
              ini didirikan atas dasar beragamnya kebutuhan dan keinginan
              konsumen sehingga dalam pengerjaan desain disesuaikan dengan
              selera konsumen.
            </p>
            <p>
              Jenis-jenis furniture yang ditawarkan untuk diproduksi CV Talongka
              Jaya, antara lain:
            </p>
            <ol>
              <li className="list-inside list-decimal">
                Berbagai jenis furniture (kostum model) untuk kebutuhan
                perkantoran, rumah tangga, dan sekolah.
              </li>
              <li className="list-inside list-decimal">
                Kusen pintu dan kusen jendela serta pintu dan jendela.
              </li>
              <li className="list-inside list-decimal">
                Pekerjaan untuk interior ruangan.
              </li>
              <li className="list-inside list-decimal">
                Pekerjaan untuk kebutuhan booth pameran, counter, pajangan, dll
              </li>
              <li className="list-inside list-decimal">
                Finishing furniture : Cat Kayu (Waterbased, Laminating HPL, Cat
                Duko, dan Cat Semi Duko) Untuk harga disesuaikan
                dengan bahan dan model
              </li>
            </ol>
          </div>
          {/* <input
            className="rounded-lg bg-amber-300 p-2 text-base"
            type="button"
            value="Selengkapnya"
          /> */}
        </div>
      </div>
    </div>
  );
}

export default Tentang;
