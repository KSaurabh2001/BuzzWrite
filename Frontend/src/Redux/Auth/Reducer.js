import { LOGIN, SIGNUP } from "./ActionType"

const initialValue={
    signup:null,
    login:null,
}

export const AuthReducer=(store=initialValue,{type,payload})=>{

    if(type===LOGIN){
        return{...store,login:payload}
    }
    else if(type===SIGNUP){
        return{...store,signup:payload}
    }

    return store;

}