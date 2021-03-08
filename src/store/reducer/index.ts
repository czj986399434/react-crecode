import { type } from "node:os";
import * as types from "../types/index";
const storageKey = "local";
export const reducer = (state: any, action: any) => {
  switch (action.type) {
    //开始请求登录
    case types.REQUEST_LOGIN:
      return {
        ...state,
        isFetching: true,
      };
      break;
    //请求成功登录
    case types.RECEIVE_LOGIN:
      return {
        ...state,
        loginUser: action.loginUser,
        isFetching: false,
        isLogin: true,
      };
      break;
    //开始请求登出
    case types.REQUEST_LOGOUT:
      return {
        ...state,
        isFetching: true,
      };
      break;
    //请求成功登出
    case types.RECEIVE_LOGOUT:
      return {
        ...state,
        isFetching: false,
        loginUser: {},
      };
    case types.CHANGEROUTER:
      return {
        ...state,
        router_index: action.router_index,
      };
    case types.INITIAL:
      return {
        ...state,
        ...(localStorage.getItem(storageKey)
          ? JSON.parse(localStorage.getItem(storageKey) as string)
          : {}),
      };
    case types.LOADING_START:
      return {
        ...state,
        loading: true,
      };
    case types.LOADING_END:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};
export interface DefaultState {
  isFetching: boolean;
  loginUser: object;
  isLogin: boolean;
  router_index: number;
  loading: boolean;
}
export const defaultState: DefaultState = {
  isFetching: false,
  loginUser: {
    user_id: 1,
    str_autograph: "哦哦哦哦哦哦",
    blog_count: 15,
    diary_count: 10,
    type: "admin",
    username: "czjczj",
    nickname: "czjczj",
  },
  isLogin: false,
  router_index: 0,
  loading: false,
};
