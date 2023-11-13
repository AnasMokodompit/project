import Product from "../Product/Product";

function Content({ product }) {
  return (
    <div className="flex flex-col gap-4 px-6 lg:gap-8 lg:px-0">
      <div>
        <h2 className="font-open-sans text-lg font-bold md:text-xl lg:text-2xl">
          Produk Kami
        </h2>
        <hr className="rounded-lg border-8 border-amber-300" />
      </div>
      <Product product={product} />
    </div>
  );
}

export default Content;
