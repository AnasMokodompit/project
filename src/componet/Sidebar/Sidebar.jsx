import style from "./Sidebar.module.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import LinkScroll from "react-scroll";
import jwt from "jwt-decode";
import { UserLogOut } from "../../config/actions/UserAction";

import CoinSwap02 from "../../Asset/icons/untitled-ui-icons/line/components/CoinsSwap02";
import HomeLine from "../../Asset/icons/untitled-ui-icons/line/components/HomeLine";
import Inbox02 from "../../Asset/icons/untitled-ui-icons/line/components/Inbox02";
import ShoppingCart02 from "../../Asset/icons/untitled-ui-icons/line/components/ShoppingCart02";
import UserSquare from "../../Asset/icons/untitled-ui-icons/line/components/UserSquare";
import LogOut01 from "../../Asset/icons/untitled-ui-icons/line/components/LogOut01";
import Table from "../../Asset/icons/untitled-ui-icons/line/components/Table";

function Sidebar({ nameSdiber }) {
  const { dataLogin } = useSelector((tes) => tes.userReducer);
  const [id, setId] = useState("");
  const [dataCategories, setDataCategories] = useState("");
  const navigate = useNavigate();

  const hendleGetAllCategory = () => {
    axios
      .get(`${process.env.REACT_APP_BASE_API}/categories`)
      .then((res) => {
        setDataCategories(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const hendleAccesRoleUser = () => {
    // console.log(dataLogin);
    if (dataLogin?.dataLogin?.token) {
      const decode = jwt(dataLogin.dataLogin.token);
      setId(decode.rolesId);
    } else {
      setId("");
    }
    // console.log(dataLogin, id);
  };

  const hendleLogout = () => {
    setId("");
    UserLogOut();
    localStorage.clear();
    setTimeout(() => {
      navigate("/");
    }, 300);
  };

  useEffect(() => {
    hendleGetAllCategory();
    hendleAccesRoleUser();
  }, []);

  return (
    <>
      {
        id === 1 ? (
          <div className="flex flex-col items-center bg-neutral-50 py-4 font-archivo">
            <div>
              <p className="font-bold">CV Talangka Jaya</p>
            </div>
            <div className="h-[100vh] w-64">
              <ul className="flex flex-col gap-4 p-12">
                {/* <Link to="/beranda">
                  <div className="flex items-center gap-2">
                    <HomeLine className="text-xl" />
                    <p>Beranda</p>
                  </div>
                </Link> */}
                <Link to="/product">
                  <div className="flex items-center gap-2">
                    <Inbox02 className="text-xl" />
                    <p>Produk</p>
                  </div>
                </Link>
                <Link to="/order">
                  <div className="flex items-center gap-2">
                    <ShoppingCart02 className="text-xl" />
                    <p>Order</p>
                  </div>
                </Link>
                <Link to="/order/custom">
                  <div className="flex items-center gap-2">
                    <ShoppingCart02 className="text-xl" />
                    <p>Order Custom</p>
                  </div>
                </Link>
                <Link to="/transaksi">
                  <div className="flex items-center gap-2">
                    <CoinSwap02 className="text-xl" />
                    <p>Transaksi</p>
                  </div>
                </Link>
                <Link to="/jurnal">
                  <div className="flex items-center gap-2">
                    <Table className="text-xl" />
                    <p>Jurnal</p>
                  </div>
                </Link>
                <Link to="/bahan-baku">
                  <div className="flex items-center gap-2">
                    <Table className="text-xl" />
                    <p>Persediaan Bahan Baku</p>
                  </div>
                </Link>
                {/* <Link>
                  <div className="flex items-center gap-2">
                    <UserSquare className="text-xl" />
                    <p>Akun Saya</p>
                  </div>
                </Link> */}
                <button onClick={hendleLogout}>
                  <div className="flex items-center gap-2">
                    <LogOut01 className="text-xl" />
                    <p>Logout</p>
                  </div>
                </button>
              </ul>
            </div>
          </div>
        ) : (
          // {id === "" && (
          <div id="hero" className={style.sidebar}>
            <ul className={style.contentSidebar}>
              <h4 className={style.jdlSidebar}>CATEGORIES</h4>
              <li>
                <LinkScroll.Link
                  to="product"
                  spy={true}
                  smooth={true}
                  offset={-215}
                  duration={500}
                  onClick={() => nameSdiber()}>
                  All Products
                </LinkScroll.Link>
              </li>
              {dataCategories.length !== 0 &&
                dataCategories.map((data, key) => {
                  return (
                    <li key={key}>
                      <LinkScroll.Link
                        to="product"
                        spy={true}
                        smooth={true}
                        offset={-215}
                        duration={500}
                        onClick={() => nameSdiber(data.id)}>
                        {data.name}
                      </LinkScroll.Link>
                    </li>
                  );
                })}
            </ul>
          </div>
        )
        // )}
      }
    </>
  );
}

export default Sidebar;
