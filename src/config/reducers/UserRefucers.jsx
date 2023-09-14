const initialstate = {
    dataLogin: null
}

const userReducer = (state = initialstate, action) => {
    switch (action.type) {
        case "SET_DATA_LOGIN":
            return {
                ...state,
                dataLogin: action.payload
            };
        case 'HAPUS_DATA_LOGIN':
            return {
                ...state,
                dataLogin: null
            };
        default:
            return state
    }
}

export default userReducer