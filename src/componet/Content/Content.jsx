import Product from "../Product/Product"
import style from './Content.module.css'

function Content() {
    return (
        <div className={style.content}>
            <h3>Top Products</h3>
           <Product/>
        </div>
    )
}

export default Content