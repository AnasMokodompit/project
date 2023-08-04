const initialstate = {
    dataOrder: []
}


export const dataOrder = (state= initialstate , action) => {
    switch (action.type) {
        case 'SAVE_ORDER':
            console.log(action)
            return {
                ...state,
                dataOrder: [...state.dataOrder, action.payload]
            };
        default:
            return state
    }
}