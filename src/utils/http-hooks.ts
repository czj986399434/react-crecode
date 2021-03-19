import { myHttp } from './../api/index';
import { useContext } from "react";
import { DefalutContext } from "../App";
export const useHttp = () => {
    const { dispatch, defaultState:{loading} } = useContext(DefalutContext);
    const get =myHttp.get;
    const post =myHttp.post
    return {get,post,loading}
  };
  