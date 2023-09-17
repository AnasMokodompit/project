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
          <div className="flex flex-col gap-2">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit dignissimos
              accusamus laborum alias inventore voluptatibus numquam nostrum aut, optio provident
              deserunt, quidem id asperiores temporibus Lorem ipsum dolor, sit amet consectetur
              adipisicing elit. Molestias dignissimos corporis quasi? Itaque numquam quibusdam earum
              ducimus! Dolorem sequi optio aperiam ea nihil enim eaque natus libero molestiae harum,
              accusantium cumque sit voluptatem impedit dolores reprehenderit consequatur at
              delectus repudiandae!
            </p>
            <p>
              quis velit ea excepturi sint blanditiis necessitatibus nulla, cumque molestias!
              Facilis beatae id, repellat corrupti quas magni quam vitae vel assumenda, delectus
              provident ratione expedita explicabo dolorem placeat modi reiciendis accusamus, optio
              nostrum perspiciatis minima!
            </p>
          </div>
          <input
            className="rounded-lg bg-amber-300 p-2 text-base"
            type="button"
            value="Selengkapnya"
          />
        </div>
      </div>
    </div>
  );
}

export default Tentang;
