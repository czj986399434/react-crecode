import { saveBlog } from "./../action/save-blog";
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
        loginUser: {
          ...action.loginUser,
        },
        isFetching: false,
        isLogin: true,
      };
    //开始请求登出
    case types.REQUEST_LOGOUT:
      return {
        ...state,
        isFetching: true,
      };
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
        loading: false,
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
    case types.SAVE_BLOG:
      console.log(action.blogData);
      return {
        ...state,
        blogData: action.blogData,
      };
    case types.INITIAL_BLOG:
      return {
        ...state,
        blogData: {
          content: "",
          title: "",
        },
      };
    case types.GET_SELF_LIKES:
      return {
        ...state,
        loginUser: {
          ...state.loginUser,
          likes: action.likes,
        },
      };
    default:
      return state;
  }
};
export interface DefaultContext {
  defaultState: DefaultState;
  dispatch: any;
}
export interface DefaultState {
  isFetching: boolean;
  loginUser: LoginUser ;
  isLogin: boolean;
  router_index: number;
  loading: boolean;
  blogData: BlogData;
}
interface LoginUser {
  autograph: string;
  blog_count: number;
  diary_count: number;
  head_portrait: string;
  likes: any[];
  nickname: string;
  open_id: string;
  type: "admin" | "common";
  user_id: number;
  username: string;
}
export interface BlogData {
  content: string;
  title: string;
}
export const defaultState: DefaultState = {
  isFetching: false,
  loginUser: {} as LoginUser,
  isLogin: false,
  router_index: 0,
  loading: false,
  blogData: {
    content: "",
    title: "",
  },
};
