import Product from "../Product/Product";
import style from "./Content.module.css";

function Content({ product }) {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <p className="font-open-sans text-2xl font-bold">Produk Kami</p>
        <hr className="rounded-lg border-8 border-amber-300" />
      </div>
      <Product product={product} />
    </div>
  );
}

export default Content;
