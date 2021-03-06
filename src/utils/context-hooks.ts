import { useContext } from "react";
import { DefalutContext } from "../App";

export const useGlobal = () => {
  const { dispatch, defaultState } = useContext(DefalutContext);
  return { dispatch, defaultState };
};
