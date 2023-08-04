import style from './Sidebar.module.css'
import {Link} from 'react-router-dom'

function Sidebar() {
    return (
        <div id= 'hero' className={style.sidebar}>
            <ul className={style.contentSidebar}>
                <h4 className={style.jdlSidebar}>CATEGORIES</h4>
                <li>All Products</li>
                <li>Meja</li>
                <li>Kursi</li>
                <li>Lemari</li>
            </ul>
        </div>
    )
}

export default Sidebar