import * as types from "../types/index";
export const getSelfLikes = (likes: any) => ({
  type: types.GET_SELF_LIKES,
  likes,
});
