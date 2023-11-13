import { useDispatch, useSelector } from "react-redux";
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
      .post(`${process.env.REACT_APP_BASE_API}/users/login`, login)
      .then((res) => {
        console.log("Berhasil");
        dispatch(UserLogin(email, password));

        setTimeout(() => {
          const decode = jwt(res.data.data.token);
          if (decode.rolesId === 1) {
            navigate("/produksi/produk");
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

  return (
    <div className="flex h-[100dvh] items-center justify-center bg-neutral-100">
      <div className="m-4 flex w-[32rem] flex-col gap-4 rounded-lg bg-white p-6 font-archivo shadow-lg sm:p-8 md:p-12 lg:p-16">
        <p className="text-center text-2xl font-bold">Login</p>
        <div className="flex flex-col">
          <label htmlFor="">Email</label>
          <input
            className="w-full rounded-lg border border-neutral-500 px-3 py-2"
            type="email"
            required="true"
            name=""
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="">Password</label>
          <input
            className="w-full rounded-lg border border-neutral-500 px-3 py-2"
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
