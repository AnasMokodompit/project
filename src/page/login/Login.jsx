import { useDispatch, useSelector } from "react-redux";
import style from "./Login.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { UserLogin } from "../../config/actions/UserAction";
import jwt from "jwt-decode";

function Login() {
  const { dataLogin } = useSelector((tes) => tes.CvTalangkaJaya);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const hendleLogin = async (e) => {
    const login = {
      email: email,
      password: password,
    };

    axios
      .post(`http://localhost:3000/api/v1.0/users/login`, login)
      .then((res) => {
        console.log("Berhasil");
        dispatch(UserLogin(email, password));

        setTimeout(() => {
          // console.log(jwt(res.data.data.token))
          // document.cookie = "REFRESH_TOKEN=" + res.data.data.token
          const decode = jwt(res.data.data.token);
          if (decode.rolesId === 1) {
            navigate("/product");
          } else {
            navigate("/");
          }
        }, 400);
      })
      .catch((err) => {
        console.log(err);
        if (err?.response?.data?.message[0]?.msg) {
          alert(err.response.data.message[0].msg);
        } else {
          alert(err?.response?.data?.message);
        }
      });
  };

  // setInterval(() => {
  //     window.location.reload(false);
  // }, 1000);

  useEffect(() => {}, []);

  return (
    <div className={style.container}>
      <div className={style.contactForm}>
        {/* <form action="" id={style.contactForm}> */}
        <h3>Login</h3>
        <div className={style.inputBox}>
          <label htmlFor="">Email</label>
          <input type="email" required="true" name="" onChange={(e) => setEmail(e.target.value)} />
          {/* <span>Email</span> */}
        </div>

        <div className={style.inputBox}>
          <label htmlFor="">Password</label>
          <input
            type="password"
            required="true"
            name=""
            onChange={(e) => setPassword(e.target.value)}
          />
          {/* <span>Password</span> */}
        </div>

        {/* <div className={style.inputBox}>
                    <textarea required="true" name=""></textarea>
                    <span>Pesan...</span>
                    </div> */}

        <div className={style.inputBox}>
          <input type="submit" value="Login" name="" onClick={(e) => hendleLogin(e)} />
        </div>
        {/* </form> */}
        {/* <div className={style.notAcount}> */}
        <span>
          Don't have an account ? <NavLink to="/register">Sign Up</NavLink>
        </span>
        {/* </div> */}
      </div>
    </div>
  );
}

export default Login;
