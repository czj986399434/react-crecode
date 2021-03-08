import * as types from '../types/index'
export const startLoading = ()=> ({
    type:types.LOADING_START,
})
export const endLoading=()=>({
    type:types.LOADING_END,
})
