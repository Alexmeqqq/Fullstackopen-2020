export const notificationCreater = (msg) => {
    return{
        type:"NOTIFY",
        payload:msg
    }
}
export const notificationDelete = () => {
    return{
        type:"DELETE"
    }
}


const notificationReducer = (state=null,action) => {

    switch(action.type){
        case "NOTIFY":
            return action.payload
        case "DELETE":
            return null   
        default:
            return state;    
    }

}

export default notificationReducer;