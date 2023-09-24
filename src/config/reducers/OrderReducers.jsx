const initialstate = {
  dataOrder: [],
};

export const dataOrder = (state = initialstate, action) => {
  switch (action.type) {
    case "SAVE_ORDER":
      const itemIndexTambah = state.dataOrder.findIndex(
        (item) => item.id === action.payload.id,
      );

      if (itemIndexTambah >= 0) {
        const newArrayDataOrder = [...state.dataOrder];
        newArrayDataOrder[itemIndexTambah].jumlah += action.payload.jumlah;
        newArrayDataOrder[itemIndexTambah].jumlahHarga += action.payload.harga;

        // console.log(newArrayDataOrder[itemIndexTambah].harga, action.payload.harga)

        return {
          ...state,
          dataOrder: newArrayDataOrder,
        };
      } else {
        return {
          ...state,
          dataOrder: [...state.dataOrder, action.payload],
        };
      }
    case "KURANG_ORDER":
      const dataKurang = state.dataOrder.filter(
        (item) => item.id === action.payload.id,
      );
      const itemIndexKurang = state.dataOrder.findIndex(
        (item) => item.id === action.payload.id,
      );

      console.log(itemIndexKurang);
      if (dataKurang[0].jumlah > 1) {
        const newArrayDataOrder = [...state.dataOrder];
        newArrayDataOrder[itemIndexKurang].jumlah -= action.payload.jumlah;
        newArrayDataOrder[itemIndexKurang].jumlahHarga -= action.payload.harga;

        // console.log(newArrayDataOrder[itemIndexKurang].harga, action.payload.harga)

        return {
          ...state,
          dataOrder: newArrayDataOrder,
        };
      } else {
        return {
          ...state,
          dataOrder: state.dataOrder.filter(
            (data) => data.id !== action.payload.id,
          ),
        };
      }
    case "HAPUS_ORDER":
      return {
        ...state,
        dataOrder: state.dataOrder.filter(
          (data) => data.id !== action.payload.id,
        ),
      };
    case "RESET_ORDER":
      return {
        ...state,
        dataOrder: [],
      };
    default:
      return state;
  }
};
