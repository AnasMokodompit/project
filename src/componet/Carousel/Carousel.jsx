import style from './Carousel.module.css'
import img from '../../Asset/Picture8.jpg'
import img1 from '../../Asset/Picture9.jpg'
import img2 from '../../Asset/Picture5.jpg'
import img3 from '../../Asset/Picture1.jpg'
import img4 from '../../Asset/Picture6.jpg'

function Carousel() {
    return (
        <div className={style.Carousel}>
          <div className={style.content}>
            <div className={style.detail}>
              <h2>CV Talongka Jaya</h2>
              <span>Tempat Pengrajin kayu</span>
              <input type="button" value="Sejarah" />
            </div> 
          </div>
        </div>
        )
      }
      
export default Carousel