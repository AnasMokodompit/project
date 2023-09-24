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
    <div className="flex h-[100dvh] items-center justify-center bg-neutral-100">
      <div className="flex flex-col gap-4 rounded-lg bg-neutral-100 p-12 font-archivo shadow-lg">
        <p className="text-center text-2xl font-bold">Login</p>
        <div className="flex flex-col">
          <label htmlFor="">Email</label>
          <input
            className="w-96 rounded-lg border border-neutral-500 px-3 py-2"
            type="email"
            required="true"
            name=""
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="">Password</label>
          <input
            className="rounded-lg border border-neutral-500 px-3 py-2"
            type="password"
            required="true"
            name=""
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <input
          className="w-full cursor-pointer rounded-lg bg-amber-300 p-3 transition-all hover:bg-amber-400"
          type="submit"
          value="Login"
          name=""
          onClick={(e) => hendleLogin(e)}
        />
      </div>
    </div>
  );
}

export default Login;
