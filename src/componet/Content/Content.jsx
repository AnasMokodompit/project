import Product from "../Product/Product"
import style from './Content.module.css'

function Content({product}) {
    return (
        <div className={style.content}>
            <h3>Top Products</h3>
           <Product product={product}/>
        </div>
    )
}

export default Content