export const saveOrder = (data) => {
    console.log(data)
    return (dispatch) => {
        dispatch({ type: "SAVE_ORDER", payload: data})
    }
}