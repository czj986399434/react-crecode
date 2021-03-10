import { BlogData } from './../reducer/index';
import * as types from '../types/index'
export const saveBlog = (blogData:BlogData)=> ({
    type:types.SAVE_BLOG,
    blogData
})
export const initialBlog =()=>({
    type:types.INITIAL_BLOG
})
