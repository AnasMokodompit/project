export const saveOrder = (data) => {
  console.log(data);
  return (dispatch) => {
    dispatch({ type: "SAVE_ORDER", payload: data });
  };
};

export const kurangOrder = (data) => {
  console.log(data);
  return (dispatch) => {
    dispatch({ type: "KURANG_ORDER", payload: data });
  };
};

export const deleteOrder = (data) => {
  console.log(data);
  return (dispatch) => {
    dispatch({ type: "HAPUS_ORDER", payload: data });
  };
};

export const tambahMeterOrder = (data) => {
  console.log(data)
  return (dispatch) => {
    dispatch({type: "TAMBAH_METER_ORDER", payload: data})
  }
}

export const kurangMeterOrder = (data) => {
  console.log(data)
  return (dispatch) => {
    dispatch({type: "KURANG_METER_ORDER", payload: data})
  }
}

export const ResetDataOrder = () => {
  return (dispatch) => {
    dispatch({ type: "RESET_ORDER" });
  };
};
