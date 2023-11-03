import axios from "axios";

export const UserLogin = (email, password) => {
  let login = { email, password };

  console.log(login);
  return (dispatch) => {
    axios
      .post(`${process.env.REACT_APP_BASE_API}/users/login`, login)
      .then((response) => {
        console.log(response);
        dispatch({
          type: "SET_DATA_LOGIN",
          payload: { dataLogin: response.data.data },
        });
      })
      .catch((err) => {
        console.log(err);
        alert(err.response.data.message);
      });
  };
};

export const UserLogOut = () => {
  return (dispatch) => {
    dispatch({ type: "HAPUS_DATA_LOGIN" });
  };
};
