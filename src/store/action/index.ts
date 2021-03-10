import * as types from '../types/index'

export const requestUser = ()=> ({
    type:types.REQUEST_LOGIN,
})
export const receiveUser=(loginUser:any)=>({
    type:types.RECEIVE_LOGIN,
    loginUser:loginUser
})
export const changeRouter=(index:number)=>({
    type:types.CHANGEROUTER,
    router_index:index
})
export const initial=()=>({
    type:types.INITIAL
})