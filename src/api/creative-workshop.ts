import { Axios } from './index';
import axios from "axios";
export const getWork = async (start:number, limit:number, user_id?:number) => {
  let params;
  if (user_id) {
    params = {
      start,
      limit,
      user_id,
    };
  } else {
    params = {
      start,
      limit,
      user_id,
    };
  }
 const data=await Axios.get("/work/get", {
    params: params,
  });
  return data.data
};
