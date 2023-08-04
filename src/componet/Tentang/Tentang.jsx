import style from './Tentang.module.css'
import img from '../../Asset/Picture11.jpg'

function Tentang() {
    return (
        <div id='tentang' className={style.containerTentang}>
            <h2>Tentang Kami</h2>
            <div className={style.contentTentang}>
                <img src={img} alt="" />
                <div className={style.contentTextTentang}>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit dignissimos accusamus laborum alias inventore voluptatibus numquam nostrum aut, optio provident deserunt, quidem id asperiores temporibus </p>
                    <p>quis velit ea excepturi sint blanditiis necessitatibus nulla, cumque molestias! Facilis beatae id, repellat corrupti quas magni quam vitae vel assumenda, delectus provident ratione expedita explicabo dolorem placeat modi reiciendis accusamus, optio nostrum perspiciatis minima!</p>
                    <input type="button" value="Selengkapnya" />
                </div>
            </div>
        </div>
    )
}

export default Tentang