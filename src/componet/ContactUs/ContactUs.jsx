import { useState } from 'react'
import style from './ContactUs.module.css'
import axios from 'axios'


function Contact() {
    const [namaLengkap, setNamaLengkap] = useState('')
    const [email, setEmail] = useState('')
    const [pesan, setPesan] = useState('')

    const hendleSumbitContactUs = (e) => {
        // e.preventDefault()
        
        const data = {
            namaLengkap: namaLengkap,
            email: email,
            pesan: pesan
        }

        axios.post(`${process.env.REACT_APP_BASE_API}/contactUs`, data)
        .then(() => {
            setNamaLengkap('')
            setEmail('')
            setPesan('')

        }).catch((err) => {
            console.log(err)
        })
        
    }

    return (
        <div id='contactus' className={style.containerContact}>
            <h2>Contact Us</h2>
            <span className={style.text}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti facere, quasi maiores animi minus nostrum reiciendis nemo illo veritatis numquam, officia fugit temporibus minima dolorem, adipisci dolorum amet unde obcaecati!</span>
            <div className={style.content}>
                <div className={style.contentInfo}>
                    <div className={style.itemContentInfo}>
                        <i className="fa-solid fa-house-chimney"></i>
                        <div className={style.contentInfoDesk}>
                            <h4>Address</h4>
                            <span>Jl. Raya Politeknik, Kota Manado</span>
                        </div>
                    </div>
                    <div className={style.itemContentInfo}>
                        <i className="fa-solid fa-phone-flip"></i>
                        <div className={style.contentInfoDesk}>
                            <h4>Phone</h4>
                            <span>+62 856 962 413 63</span>
                        </div>
                    </div>
                    <div className={style.itemContentInfo}>
                        <i className="fa-solid fa-envelope"></i>
                        <div className={style.contentInfoDesk}>
                            <h4>Email</h4>
                            <span>mokodompitanas09@gmail.com</span>
                        </div>
                    </div>
                </div>
                <div className={style.contactForm}>
                    {/* <form action="" id={style.contactForm} onSubmit={hendleSumbitContactUs}> */}
                        <h3>Kirim Pesan</h3>
                        <div className={style.inputBox}>
                            <input type="text" required="true" name="" value={namaLengkap} onChange={(e) => setNamaLengkap(e.target.value)}/>
                            <span>Nama Lengkap</span>
                        </div>
                        
                        <div className={style.inputBox}>
                            <input type="text" required="true" name="" value={email} onChange={(e) => setEmail(e.target.value)}/>
                            <span>Email</span>
                        </div>
                        
                        <div className={style.inputBox}>
                            <textarea required="true" name="" value={pesan} onChange={(e) => setPesan(e.target.value)}></textarea>
                            <span>Pesan...</span>
                        </div>
                        
                        <div className={style.inputBox}>
                            <input type="submit" value="Send" onClick={() => hendleSumbitContactUs()}/>
                        </div>
                    {/* </form> */}
                </div>
            </div>
        </div>
    )
}

export default Contact