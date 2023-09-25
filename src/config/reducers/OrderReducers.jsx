const initialstate = {
  dataOrder: [],
};

export const dataOrder = (state = initialstate, action) => {
  switch (action.type) {
    case "SAVE_ORDER":
      const itemIndexTambah = state.dataOrder.findIndex(
        (item) => item.id === action.payload.id,
      );

      const dataPermeterTambah = state.dataOrder.filter(
        (item) => (item.id === action.payload.id && item.jumlah_meter)
      );


      if (dataPermeterTambah.length !== 0) {
        const newArrayDataOrder = [...state.dataOrder];
        newArrayDataOrder[itemIndexTambah].jumlah += action.payload.jumlah;
        newArrayDataOrder[itemIndexTambah].jumlahHarga = (newArrayDataOrder[itemIndexTambah].harga * newArrayDataOrder[itemIndexTambah].jumlah_meter) * newArrayDataOrder[itemIndexTambah].jumlah ;

        // console.log(newArrayDataOrder[itemIndexTambah].harga, action.payload.harga)

        return {
          ...state,
          dataOrder: newArrayDataOrder,
        };
      }else if (itemIndexTambah >= 0) {
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
      const dataPermeterKurang = state.dataOrder.filter(
        (item) => (item.id === action.payload.id && item.jumlah_meter)
      );

      const dataKurang = state.dataOrder.filter(
        (item) => item.id === action.payload.id,
      );
      const itemIndexKurang = state.dataOrder.findIndex(
        (item) => item.id === action.payload.id,
      );

      if (dataPermeterKurang.length !== 0 && dataKurang[0].jumlah <= 0) {
        console.log('DUa')
        const newArrayDataOrder = [...state.dataOrder];
        newArrayDataOrder[itemIndexKurang].jumlah -= action.payload.jumlah;
        newArrayDataOrder[itemIndexKurang].jumlahHarga = (newArrayDataOrder[itemIndexKurang].harga * newArrayDataOrder[itemIndexKurang].jumlah_meter) * newArrayDataOrder[itemIndexKurang].jumlah ;
        
        // console.log(newArrayDataOrder[itemIndexKurang].harga, action.payload.harga)
        
        return {
          ...state,
          dataOrder: newArrayDataOrder,
        }
      }
      else if (dataKurang[0].jumlah >= 2) {
        console.log('Satu', dataKurang[0])
        const newArrayDataOrder = [...state.dataOrder];
        newArrayDataOrder[itemIndexKurang].jumlah -= action.payload.jumlah;
        newArrayDataOrder[itemIndexKurang].jumlahHarga -= action.payload.harga;
        
        // console.log(newArrayDataOrder[itemIndexKurang].harga, action.payload.harga)
        
        return {
          ...state,
          dataOrder: newArrayDataOrder,
        };
      }
      else {
        console.log('Tihass')
        return {
          ...state,
          dataOrder: state.dataOrder.filter(
            (data) => data.id !== action.payload.id,
          ),
        };
      }
    case "TAMBAH_METER_ORDER":
      const itemIndexTambahMeterOrder = state.dataOrder.findIndex(
        (item) => item.id === action.payload.id,
      );

      if (itemIndexTambahMeterOrder >= 0) {
        const newArrayDataOrder = [...state.dataOrder];
        newArrayDataOrder[itemIndexTambahMeterOrder].jumlah_meter += action.payload.jumlah_meter;
        newArrayDataOrder[itemIndexTambahMeterOrder].jumlahHarga = (newArrayDataOrder[itemIndexTambahMeterOrder].harga * newArrayDataOrder[itemIndexTambahMeterOrder].jumlah_meter) * newArrayDataOrder[itemIndexTambahMeterOrder].jumlah ;


        // console.log(newArrayDataOrder[itemIndexTambahMeterOrder].harga, action.payload.harga)

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
    case "KURANG_METER_ORDER":
      const dataKurangMeterOrdr = state.dataOrder.filter(
        (item) => item.id === action.payload.id,
      );
      const itemIndexKurangMeterOrder = state.dataOrder.findIndex(
        (item) => item.id === action.payload.id,
      );

      console.log(itemIndexKurangMeterOrder);
      if (dataKurangMeterOrdr[0].jumlah_meter > 1) {
        const newArrayDataOrder = [...state.dataOrder];
        newArrayDataOrder[itemIndexKurangMeterOrder].jumlah_meter -= action.payload.jumlah_meter;
        newArrayDataOrder[itemIndexKurangMeterOrder].jumlahHarga = (newArrayDataOrder[itemIndexKurangMeterOrder].harga * newArrayDataOrder[itemIndexKurangMeterOrder].jumlah_meter) * newArrayDataOrder[itemIndexKurangMeterOrder].jumlah ;

        // console.log(newArrayDataOrder[itemIndexKurangMeterOrder].harga, action.payload.harga)

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
