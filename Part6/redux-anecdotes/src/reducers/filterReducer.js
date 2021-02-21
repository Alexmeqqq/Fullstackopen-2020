export const filterAction = (id) => {
    return{
        type:"FILTER",
        payload:id
    }
}


const filterReducer = (state="",action) => {

    switch(action.type){
        case "FILTER":
            return action.payload.id
        default:
            return state
    }
}

export default filterReducer