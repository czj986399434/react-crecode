import * as types from '../types/index'

export const requestUser = ()=> ({
    type:types.REQUEST_LOGIN,
})
export const receiveUser=(json:any)=>({
    type:types.RECEIVE_LOGIN,
    loginUser:json.loginUser
})
export const changeRouter=(index:number)=>({
    type:types.CHANGEROUTER,
    router_index:index
})
export const initial=()=>({
    type:types.INITIAL
})